import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Activity, MapPin, AlertTriangle, TrendingUp, Bot, Users } from "lucide-react"
import { Link } from "react-router-dom"

const Index = () => {
  const quickStats = [
    { title: "Active Simulations", value: "3", icon: Activity, color: "text-primary" },
    { title: "Monitored Routes", value: "47", icon: MapPin, color: "text-blue-500" },
    { title: "Active Alerts", value: "7", icon: AlertTriangle, color: "text-destructive" },
    { title: "Active Users", value: "1,247", icon: Users, color: "text-green-500" }
  ]

  const quickActions = [
    { title: "Start Simulation", description: "Launch traffic flow simulation", link: "/simulation", icon: Activity },
    { title: "View Map Routes", description: "Analyze route optimization", link: "/maproute", icon: MapPin },
    { title: "Check Alerts", description: "Review system notifications", link: "/alerts", icon: AlertTriangle },
    { title: "AI Assistant", description: "Get intelligent insights", link: "/ai-help", icon: Bot }
  ]

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-bold text-foreground">Navigation Dashboard</h1>
          <p className="text-xl text-muted-foreground mt-2">
            Welcome to your intelligent traffic management system
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {quickStats.map((stat, index) => (
          <Card key={index}>
            <CardContent className="p-6">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-secondary rounded-lg">
                  <stat.icon className={`h-6 w-6 ${stat.color}`} />
                </div>
                <div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Access frequently used features</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            {quickActions.map((action, index) => (
              <Link key={index} to={action.link}>
                <div className="flex items-center gap-3 p-3 border rounded-lg hover:bg-accent transition-colors cursor-pointer">
                  <div className="p-2 bg-primary/10 rounded-lg">
                    <action.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-medium">{action.title}</div>
                    <div className="text-sm text-muted-foreground">{action.description}</div>
                  </div>
                </div>
              </Link>
            ))}
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>System Status</CardTitle>
            <CardDescription>Current system health and performance</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span className="font-medium">All Systems Operational</span>
              </div>
              <span className="text-sm text-green-600">99.9% Uptime</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Traffic Processing</span>
              <span className="text-sm text-muted-foreground">Normal</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">AI Predictions</span>
              <span className="text-sm text-muted-foreground">Active</span>
            </div>
            
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <span className="font-medium">Data Sync</span>
              <span className="text-sm text-muted-foreground">Real-time</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest updates and system events</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-primary bg-secondary/50 rounded-r-lg">
              <TrendingUp className="h-4 w-4 text-primary" />
              <div className="text-sm">
                <span className="font-medium">Traffic optimization completed</span> for Highway 101 corridor
              </div>
              <div className="text-xs text-muted-foreground ml-auto">2 min ago</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-green-500 bg-secondary/50 rounded-r-lg">
              <Bot className="h-4 w-4 text-green-500" />
              <div className="text-sm">
                <span className="font-medium">AI bottleneck prediction</span> identified potential congestion
              </div>
              <div className="text-xs text-muted-foreground ml-auto">5 min ago</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-500 bg-secondary/50 rounded-r-lg">
              <MapPin className="h-4 w-4 text-blue-500" />
              <div className="text-sm">
                <span className="font-medium">New route analysis</span> completed for downtown district
              </div>
              <div className="text-xs text-muted-foreground ml-auto">12 min ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;
