import os
from flask import Flask, request, jsonify
from flask_cors import CORS
import pandas as pd
import json
import numpy as np
from sentence_transformers import SentenceTransformer
import scann
from openai import OpenAI

# --- 1. Load your data ---
DATA_DIR = os.environ.get("DATA_DIR", ".")

# --- Evacuation data files ---
crowd_csv = os.path.join(DATA_DIR, "crowd_density.csv")
roadblock_json = os.path.join(DATA_DIR, "roadblock_logs.json")

crowd_density = pd.read_csv(crowd_csv)
with open(roadblock_json, "r") as f:
    roadblock_logs = json.load(f)

crowd_density_chunks = [
    f"At {row['timestamp']}, Zone {row['zone'].split()[-1]} had a crowd density of {row['density']}."
    for _, row in crowd_density.iterrows()
]
roadblock_chunks = [
    f"At {item['timestamp']}, a roadblock at {item['location']} was caused by {item['reason']} and is currently {item['status']}."
    for item in roadblock_logs
]
evac_chunks = crowd_density_chunks + roadblock_chunks

# --- Medical triage data files ---
triage_csv = os.path.join(DATA_DIR, "triage_protocols.csv")
incident_logs_json = os.path.join(DATA_DIR, "incident_logs.json")
medical_guidelines_txt = os.path.join(DATA_DIR, "medical_guidelines.txt")

triage_protocols = pd.read_csv(triage_csv)
with open(incident_logs_json, "r") as f:
    incident_logs = json.load(f)
with open(medical_guidelines_txt, "r") as f:
    guidelines_text = f.read()

triage_chunks = [
    f"Triage Protocol for {row['symptom']}:\n{row['protocol']}" 
    for _, row in triage_protocols.iterrows()
]
incident_chunks = [
    f"On {item['date']} in Zone {item['zone']}, patient symptoms included {item['symptoms']}. Action taken: {item['action']}."
    for item in incident_logs
]
# Split guidelines by paragraphs for chunking
guideline_chunks = [para.strip() for para in guidelines_text.split("\n\n") if para.strip()]

medical_chunks = triage_chunks + incident_chunks + guideline_chunks

# --- 2. Load embedding model ---
model = SentenceTransformer('all-mpnet-base-v2')

# --- 3. Embed text chunks ---
evac_embeddings = model.encode(evac_chunks, show_progress_bar=False)
evac_embeddings_np = np.array(evac_embeddings).astype('float32')

medical_embeddings = model.encode(medical_chunks, show_progress_bar=False)
medical_embeddings_np = np.array(medical_embeddings).astype('float32')

# --- 4. Build ScaNN searchers ---
evac_searcher = (
    scann.scann_ops_pybind.builder(evac_embeddings_np, 3, "dot_product")
    .score_brute_force()
    .build()
)

medical_searcher = (
    scann.scann_ops_pybind.builder(medical_embeddings_np, 3, "dot_product")
    .score_brute_force()
    .build()
)

# --- 5. Initialize OpenAI client ---
OPENAI_API_KEY = os.environ.get("OPENAI_API_KEY")
if not OPENAI_API_KEY:
    raise ValueError("OPENAI_API_KEY environment variable is not set.")

client = OpenAI(api_key=OPENAI_API_KEY)

def custom_llm_generate(prompt: str) -> str:
    response = client.chat.completions.create(
        model="gpt-4o-mini",
        messages=[{"role": "user", "content": prompt}]
    )
    return response.choices[0].message.content

# --- 6. Create Flask app ---
app = Flask(__name__)
CORS(app)

@app.route("/")
def home():
    return "Combined RAG API is running! POST JSON to /get-evacuation-strategy or /get-medical-triage"

@app.route("/get-evacuation-strategy", methods=["POST"])
def get_evacuation_strategy():
    data = request.json
    user_query = data.get('query', '')
    if not user_query:
        return jsonify({"response": "Please provide a query."}), 400

    query_embedding = model.encode([user_query]).astype('float32')[0]
    neighbors, _ = evac_searcher.search(query_embedding)
    context_texts = [evac_chunks[i] for i in neighbors]

    prompt = f"Context:\n{chr(10).join(context_texts)}\n\nQuestion:\n{user_query}\nAnswer:"
    answer = custom_llm_generate(prompt)

    return jsonify({"response": answer})

@app.route("/get-medical-triage", methods=["POST"])
def get_medical_triage():
    data = request.json
    user_query = data.get('query', '')
    if not user_query:
        return jsonify({"response": "Please provide a query."}), 400

    query_embedding = model.encode([user_query]).astype('float32')[0]
    neighbors, _ = medical_searcher.search(query_embedding)
    context_texts = [medical_chunks[i] for i in neighbors]

    prompt = f"Context:\n{chr(10).join(context_texts)}\n\nQuestion:\n{user_query}\nAnswer:"
    answer = custom_llm_generate(prompt)

    return jsonify({"response": answer})

# --- Run app ---
if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8080))
    app.run(host="0.0.0.0", port=port)
