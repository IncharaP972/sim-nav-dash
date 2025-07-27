"use client";

import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { RefreshCw, Download } from "lucide-react";
import { initializeApp, getApps } from "firebase/app";
import { getDatabase, ref, onValue, off } from "firebase/database";

// Firebase config (your project)
const firebaseConfig = {
  apiKey: "AIzaSyBjUa8RvsTkyBoCyjYdDLsXdnO38IMlfUw",
  authDomain: "drishti2-5022b.firebaseapp.com",
  databaseURL: "https://drishti2-5022b-default-rtdb.firebaseio.com/",
  projectId: "drishti2-5022b",
  storageBucket: "drishti2-5022b.appspot.com",
  messagingSenderId: "434868659248",
  appId: "1:434868659248:web:be69fa19f8e4a96aad79f5",
  measurementId: "G-N8FB6HV8PZ",
};
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const db = getDatabase(app);

interface User {
  role: string;
}

interface SummaryData {
  summary: string;
  insights: string[];
  recommendations: string[];
  timestamp: string;
}

interface GeminiSummariesProps {
  user: User;
}

export function GeminiSummaries({ user }: GeminiSummariesProps) {
  const [liveSummary, setLiveSummary] = useState<SummaryData | null>(null);
  const [detailedSummary, setDetailedSummary] = useState<SummaryData | null>(null);
  const [detailedLoading, setDetailedLoading] = useState(false);
  const [showDetailed, setShowDetailed] = useState(false);

  useEffect(() => {
    const currentRef = ref(db, "summaries/current");
    const unsubscribe = onValue(currentRef, (snapshot) => {
      const data = snapshot.val();
      if (data) setLiveSummary(data);
    });
    return () => {
      off(currentRef);
      unsubscribe();
    };
  }, []);

  const handleRefresh = () => {
    const currentRef = ref(db, "summaries/current");
    onValue(
      currentRef,
      (snapshot) => {
        const data = snapshot.val();
        if (data) {
          setLiveSummary(data);
          setShowDetailed(false);
          setDetailedSummary(null);
        }
      },
      { onlyOnce: true }
    );
  };

  const handleRequestDetailed = () => {
    setDetailedLoading(true);
    setShowDetailed(true);
    const detailedRef = ref(db, "summaries/detailed");
    onValue(
      detailedRef,
      (snapshot) => {
        const data = snapshot.val();
        setDetailedLoading(false);
        if (data) setDetailedSummary(data);
        else setDetailedSummary(null);
      },
      { onlyOnce: true }
    );
  };

  const summary = liveSummary ?? {
    summary:
      "The system is currently monitoring elevated crowd density in Zone A (85%) with a predicted surge in the next 8-12 minutes. Main entrance congestion is building due to event start time. Recommend deploying 2 additional responders to manage flow and prevent bottlenecks.",
    insights: [
      "Zone A showing highest activity with 85% capacity",
      "Event start time correlation detected",
      "Traffic patterns suggest 15-minute peak window",
    ],
    recommendations: [
      "Deploy responders to Zone A immediately",
      "Activate secondary entrance routing",
      "Prepare crowd control barriers",
    ],
    timestamp: new Date().toISOString(),
  };

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Summary</h1>
          <p className="text-gray-600">Gemini-powered intelligent situation overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleRefresh}>
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      <Card className="hover:shadow-md transition-shadow border">
        <CardHeader>
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-2">
            <CardTitle className="text-lg font-semibold">Current Situation Overview</CardTitle>
            <div className="flex items-center gap-4">
              <Badge variant="destructive" className="capitalize text-xs">
                High Priority
              </Badge>
              <span className="text-xs text-gray-500">
                {liveSummary ? new Date(liveSummary.timestamp).toLocaleTimeString() : "Unknown"}
              </span>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <section className="bg-gray-800 rounded-md p-4 text-white">
            <h4 className="font-semibold text-sm mb-1">AI Analysis</h4>
            <p className="text-sm leading-relaxed">{summary.summary}</p>
          </section>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-1 text-gray-800">Key Insights</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {summary.insights.map((insight, idx) => (
                  <li key={idx}>{insight}</li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-1 text-gray-800">Recommendations</h4>
              <ul className="list-disc list-inside text-gray-700 space-y-1">
                {summary.recommendations.map((rec, idx) => (
                  <li key={idx}>{rec}</li>
                ))}
              </ul>
            </div>
          </div>

          <div>
            <Button variant="outline" size="sm" onClick={handleRequestDetailed}>
              Request Detailed Analysis
            </Button>
          </div>
        </CardContent>
      </Card>

      {showDetailed && (
        <Card className="border mt-6">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-primary">
              Detailed AI Situation Analysis
            </CardTitle>
            <CardDescription>Generated by Gemini AI</CardDescription>
          </CardHeader>

          <CardContent>
            {detailedLoading && (
              <p className="text-gray-600">Generating detailed analysis, please wait...</p>
            )}

            {!detailedLoading && detailedSummary && (
              <div className="bg-gray-900 rounded-md p-4 text-white space-y-4">
                <section>
                  <h5 className="font-semibold">Summary</h5>
                  <p>{detailedSummary.summary}</p>
                </section>

                <section>
                  <h5 className="font-semibold mt-4">Insights</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {detailedSummary.insights.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>

                <section>
                  <h5 className="font-semibold mt-4">Recommendations</h5>
                  <ul className="list-disc list-inside space-y-1">
                    {detailedSummary.recommendations.map((item, idx) => (
                      <li key={idx}>{item}</li>
                    ))}
                  </ul>
                </section>
              </div>
            )}

            {!detailedLoading && !detailedSummary && (
              <p className="text-gray-600">No detailed analysis is currently available.</p>
            )}
          </CardContent>
        </Card>
      )}
    </div>
  );
}

// Wrapper page component
const Summary = () => {
  const user = { role: "admin" };
  return (
    <div className="container mx-auto py-6 px-4">
      <GeminiSummaries user={user} />
    </div>
  );
};

export default Summary;
