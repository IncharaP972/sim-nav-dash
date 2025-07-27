
import time
import firebase_admin
from firebase_admin import credentials, db
import google.generativeai as genai
import os
from datetime import datetime, timezone


# 🔐 ENVIRONMENT CONFIG (Adjust path to your service account)
os.environ["GOOGLE_APPLICATION_CREDENTIALS"] = r"vertex-service-account.json"


# 🔧 CONFIG 
FIREBASE_PATH = "anomalies/test1"
SUMMARY_PATH = "summaries/current"
DETAILED_PATH = "summaries/detailed"


# Gemini API key from environment or fallback (replace with yours)
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY", "AIzaSyCM7_pdh31kb7V8Swot8A_4TvEXxoXReKI")


# Initialize Gemini
genai.configure(api_key=GEMINI_API_KEY)
model = genai.GenerativeModel("gemini-1.5-flash")


# Setup Firebase (avoid re-init if already initialized)
if not firebase_admin._apps:
    cred = credentials.Certificate("firebase-key.json")
    firebase_admin.initialize_app(cred, {
        "databaseURL": "https://drishti2-5022b-default-rtdb.firebaseio.com/"
    })

    
def summarize_all_anomalies(data):
    if not data:
        return "No anomalies found."
    prompt = "Summarize these anomaly records for emergency monitoring:\n\n"
    if isinstance(data, dict) and all(isinstance(v, dict) for v in data.values()):
        for key, anomaly in data.items():
            prompt += (
                f"- [{key}] {anomaly.get('type')} in {anomaly.get('zone')} "
                f"| Severity: {anomaly.get('severity')} | Source: {anomaly.get('source')} "
                f"| Time: {anomaly.get('timestamp')}\n"
            )
    elif isinstance(data, dict):
        prompt += (
            f"- [update] {data.get('type')} in {data.get('zone')} "
            f"| Severity: {data.get('severity')} | Source: {data.get('source')} "
            f"| Time: {data.get('timestamp')}\n"
        )
    else:
        return "Invalid data format."
    try:
        response = model.generate_content(prompt)
        return response.text.strip()
    except Exception as e:
        print("Gemini error:", e)
        return "Summary generation failed."


def get_data():
    return db.reference(FIREBASE_PATH).get()


def write_summary(summary, data):
    if isinstance(data, dict):
        if all(isinstance(v, dict) for v in data.values()):
            first = next(iter(data.values()))
        else:
            first = data
        severity = first.get('severity', '') or ''
        zone = first.get('zone', '') or ''
        source = first.get('source', '') or ''
        severity_lc = severity.lower()
        if severity_lc == "high":
            recommendations_list = [
                "Take immediate action",
                "Alert emergency response teams",
                "Initiate evacuation protocol"
            ]
        elif severity_lc == "medium":
            recommendations_list = [
                "Increase monitoring frequency",
                "Prepare emergency teams"
            ]
        else:
            recommendations_list = [
                "Continue regular monitoring",
                "Report any changes"
            ]
    else:
        severity = zone = source = ''
        recommendations_list = []
    try:
        db.reference(SUMMARY_PATH).set({
            "summary": summary,
            "insights": [
                f"Severity: {severity}",
                f"Zone: {zone}",
                f"Source: {source}",
            ],
            "recommendations": recommendations_list,
            "timestamp": datetime.now(timezone.utc).isoformat(),
        })
        print("Summary written to Firebase.")
    except Exception as e:
        print("Error writing to Firebase:", e)



# --- Detailed analysis functions ---


def generate_detailed_summary(data):
    if not data:
        return {
            "summary": "No anomalies found.",
            "insights": [],
            "recommendations": [],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    prompt = (
        "Provide an in-depth root-cause and impact analysis for emergency operations, "
        "listing contributing factors, possible escalation, and next best actions for these anomalies:\n\n"
    )
    if isinstance(data, dict) and all(isinstance(v, dict) for v in data.values()):
        for key, anomaly in data.items():
            prompt += (
                f"- [{key}] {anomaly.get('type')} in {anomaly.get('zone')} "
                f"| Severity: {anomaly.get('severity')} | Source: {anomaly.get('source')} "
                f"| Time: {anomaly.get('timestamp')}\n"
            )
    elif isinstance(data, dict):
        prompt += (
            f"- [update] {data.get('type')} in {data.get('zone')} "
            f"| Severity: {data.get('severity')} | Source: {data.get('source')} "
            f"| Time: {data.get('timestamp')}\n"
        )
    else:
        return {
            "summary": "Invalid data format.",
            "insights": [],
            "recommendations": [],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    try:
        # Ask Gemini for detailed analysis
        response = model.generate_content(prompt + "\nProvide: 1) Detailed analysis paragraph, 2) Numbered insights, 3) Numbered recommendations.")
        text = response.text.strip()
        lines = text.split('\n')
        summary = lines[0].strip() if lines else ""
        insights = []
        recommendations = []
        section = None
        for line in lines[1:]:
            low = line.lower()
            if "insight" in low:
                section = "insights"
            elif "recommendation" in low:
                section = "recommendations"
            elif line.strip().startswith(('1.', '-', '•')):
                content = line.strip().lstrip('•-1234567890. ')
                if section == "insights":
                    insights.append(content)
                elif section == "recommendations":
                    recommendations.append(content)
        return {
            "summary": summary,
            "insights": insights or ["More parsing needed."],
            "recommendations": recommendations or ["More parsing needed."],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }
    except Exception as e:
        print("Gemini error (detailed):", e)
        return {
            "summary": "Detailed analysis generation failed.",
            "insights": [],
            "recommendations": [],
            "timestamp": datetime.now(timezone.utc).isoformat()
        }


def write_detailed_summary(detailed):
    try:
        db.reference(DETAILED_PATH).set(detailed)
        print("Detailed summary written to Firebase.")
    except Exception as e:
        print("Error writing detailed summary:", e)


# --- Main loop ---


def main_loop():
    last_data = None
    while True:
        current_data = get_data()
        if current_data != last_data:
            print("Change detected in Firebase!")
            summary = summarize_all_anomalies(current_data)
            print("Summary:", summary)
            write_summary(summary, current_data)


            # Also generate detailed summary
            detailed = generate_detailed_summary(current_data)
            write_detailed_summary(detailed)


            last_data = current_data
        else:
            print("No change in Firebase data.")
        time.sleep(5)  # Wait before next check


if __name__ == "__main__":
    main_loop()