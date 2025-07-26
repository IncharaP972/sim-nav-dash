import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { TrendingUp, Brain, MapPin, Clock, AlertTriangle } from "lucide-react"

const BottleneckPrediction = () => {
  const predictions = [
    {
      id: 1,
      location: "Highway 101 & Oak Street",
      probability: 85,
      severity: "High",
      timeframe: "Next 30 minutes",
      cause: "Rush hour traffic buildup",
      confidence: 92
    },
    {
      id: 2,
      location: "Downtown Main Street",
      probability: 67,
      severity: "Medium",
      timeframe: "Next 45 minutes",
      cause: "Event-related congestion",
      confidence: 78
    },
    {
      id: 3,
      location: "Industrial District Bridge",
      probability: 43,
      severity: "Low",
      timeframe: "Next 2 hours",
      cause: "Construction detour effect",
      confidence: 65
    }
  ]

  const getSeverityColor = (severity: string) => {
    switch (severity.toLowerCase()) {
      case "high":
        return "destructive"
      case "medium":
        return "default"
      case "low":
        return "secondary"
      default:
        return "secondary"
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Bottleneck Prediction</h1>
        <Button variant="outline" size="sm">
          <Brain className="h-4 w-4 mr-2" />
          AI Model Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <TrendingUp className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">78%</div>
                <div className="text-sm text-muted-foreground">Prediction Accuracy</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">3</div>
                <div className="text-sm text-muted-foreground">High Risk Areas</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">25m</div>
                <div className="text-sm text-muted-foreground">Avg Prediction Time</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <MapPin className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Monitored Zones</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>AI-Powered Predictions</CardTitle>
          <CardDescription>Machine learning analysis of traffic patterns and bottleneck formation</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {predictions.map((prediction) => (
              <div key={prediction.id} className="p-4 border rounded-lg space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-primary" />
                    <h3 className="font-semibold">{prediction.location}</h3>
                    <Badge variant={getSeverityColor(prediction.severity)}>
                      {prediction.severity} Risk
                    </Badge>
                  </div>
                  <div className="text-sm text-muted-foreground">{prediction.timeframe}</div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Congestion Probability</span>
                      <span className="font-medium">{prediction.probability}%</span>
                    </div>
                    <Progress value={prediction.probability} className="h-2" />
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Model Confidence</span>
                      <span className="font-medium">{prediction.confidence}%</span>
                    </div>
                    <Progress value={prediction.confidence} className="h-2" />
                  </div>

                  <div className="flex items-center justify-center">
                    <div className="text-center">
                      <div className="text-sm text-muted-foreground">Primary Cause</div>
                      <div className="font-medium">{prediction.cause}</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Model Performance</CardTitle>
            <CardDescription>AI prediction model analytics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Daily Accuracy</span>
                <span className="text-sm text-muted-foreground">82%</span>
              </div>
              <Progress value={82} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Weekly Trend</span>
                <span className="text-sm text-muted-foreground">76%</span>
              </div>
              <Progress value={76} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">False Positive Rate</span>
                <span className="text-sm text-muted-foreground">15%</span>
              </div>
              <Progress value={15} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Prevention Strategies</CardTitle>
            <CardDescription>Recommended actions to prevent bottlenecks</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
              <div className="font-medium text-sm">Traffic Light Optimization</div>
              <div className="text-xs text-muted-foreground mt-1">
                Adjust signal timing at Highway 101 intersection
              </div>
            </div>
            
            <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
              <div className="font-medium text-sm">Alternative Route Suggestion</div>
              <div className="text-xs text-muted-foreground mt-1">
                Redirect traffic via Industrial Boulevard
              </div>
            </div>
            
            <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="font-medium text-sm">Dynamic Lane Management</div>
              <div className="text-xs text-muted-foreground mt-1">
                Open additional lane during peak hours
              </div>
            </div>
            
            <div className="p-3 bg-yellow-500/5 border border-yellow-500/20 rounded-lg">
              <div className="font-medium text-sm">Public Transit Alert</div>
              <div className="text-xs text-muted-foreground mt-1">
                Encourage public transport usage
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default BottleneckPrediction