import React, { useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Bot,
  Send,
  MessageSquare,
  HelpCircle,
  Lightbulb,
  Zap,
} from "lucide-react";

const AIHelp = () => {
  const suggestions = [
    "How can I optimize traffic flow during rush hour?",
    "What are the best routes to avoid congestion?",
    "How does the bottleneck prediction work?",
    "Can you analyze current traffic patterns?",
  ];

  const features = [
    {
      icon: <Bot className="h-6 w-6 text-primary" />,
      title: "Smart Analysis",
      description: "AI-powered traffic pattern analysis and optimization suggestions",
    },
    {
      icon: <Lightbulb className="h-6 w-6 text-yellow-500" />,
      title: "Intelligent Insights",
      description: "Get actionable insights based on real-time traffic data",
    },
    {
      icon: <Zap className="h-6 w-6 text-blue-500" />,
      title: "Quick Solutions",
      description: "Instant answers to complex traffic management questions",
    },
    {
      icon: <MessageSquare className="h-6 w-6 text-green-500" />,
      title: "Natural Language",
      description: "Ask questions in plain English and get clear explanations",
    },
  ];

  // ====== START ADDED STATE AND FUNCTIONS ======
  const [messages, setMessages] = useState([
    {
      role: "assistant",
      content:
        "Hello! I'm your AI traffic management assistant. I can help you with route optimization, traffic analysis, bottleneck predictions, and system insights. What would you like to know?",
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  // TODO: Replace with your actual backend URL
  const API_URL = "http://localhost:8082/get-evacuation-strategy";


  // Send message handler: val is optional override (like from suggestion click)
  const handleSend = async (val?: string) => {
    const userInput = val !== undefined ? val : input;
    if (!userInput.trim()) return;
    setMessages((prev) => [...prev, { role: "user", content: userInput }]);
    setLoading(true);
    setInput("");

    try {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: userInput }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.response }]);
    } catch (error) {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Error: Unable to get a response from the server." },
      ]);
    }
    setLoading(false);
  };

  // Send message on Enter key (except Shift+Enter for new lines)
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  // Handle suggestion click: populate input and send immediately
  const handleSuggestion = (suggestion: string) => {
    setInput(suggestion);
    handleSend(suggestion);
  };
  // ====== END ADDED STATE AND FUNCTIONS ======

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">AI Assistant</h1>
        <Button variant="outline" size="sm">
          <HelpCircle className="h-4 w-4 mr-2" />
          Help Guide
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="h-6 w-6 text-primary" />
                Chat with AI Assistant
              </CardTitle>
              <CardDescription>
                Ask questions about traffic management, routing, and system optimization
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="h-96 bg-secondary rounded-lg p-4 overflow-y-auto">
                <div className="space-y-4">
                  {messages.map((msg, idx) => (
                    <div
                      key={idx}
                      className={`flex items-start gap-3 ${
                        msg.role === "user" ? "justify-end" : ""
                      }`}
                    >
                      {msg.role === "assistant" && (
                        <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                          <Bot className="h-4 w-4 text-primary-foreground" />
                        </div>
                      )}
                      <div
                        className={`rounded-lg p-3 max-w-[80%] ${
                          msg.role === "assistant" ? "bg-primary/10" : "bg-accent"
                        }`}
                      >
                        <p className="text-sm whitespace-pre-line">{msg.content}</p>
                      </div>
                      {msg.role === "user" && (
                        <div className="w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                          <span className="text-xs font-medium">You</span>
                        </div>
                      )}
                    </div>
                  ))}
                  {loading && (
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                        <Bot className="h-4 w-4 text-primary-foreground" />
                      </div>
                      <div className="bg-primary/10 rounded-lg p-3 max-w-[80%] text-xs text-muted-foreground">
                        Thinking...
                      </div>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <Input
                  placeholder="Type your question here..."
                  className="flex-1"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  disabled={loading}
                />
                <Button size="icon" onClick={() => handleSend()} disabled={loading || !input.trim()}>
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Quick Questions</CardTitle>
              <CardDescription>Click on any suggestion to start a conversation</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {suggestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    className="h-auto p-3 text-left justify-start"
                    onClick={() => handleSuggestion(suggestion)}
                  >
                    <MessageSquare className="h-4 w-4 mr-2 flex-shrink-0" />
                    <span className="text-sm">{suggestion}</span>
                  </Button>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>AI Capabilities</CardTitle>
              <CardDescription>What our AI assistant can help you with</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={index}
                  className="flex items-start gap-3 p-3 bg-secondary rounded-lg"
                >
                  <div className="p-2 bg-background rounded-lg">{feature.icon}</div>
                  <div>
                    <div className="font-medium text-sm">{feature.title}</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {feature.description}
                    </div>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Insights</CardTitle>
              <CardDescription>AI-generated recommendations</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="font-medium text-sm">Traffic Optimization</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Consider implementing dynamic routing for downtown area during 4-6 PM
                </div>
              </div>

              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="font-medium text-sm">Predictive Alert</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Heavy congestion expected on Route 9 tomorrow at 8:30 AM
                </div>
              </div>

              <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="font-medium text-sm">Efficiency Improvement</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Alternative routes reduced average travel time by 12%
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Submit Feedback</CardTitle>
              <CardDescription>Help us improve the AI assistant</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Textarea
                placeholder="Share your feedback about the AI assistant..."
                className="min-h-[100px]"
              />
              <Button className="w-full">Submit Feedback</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default AIHelp;
