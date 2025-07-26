import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { AlertTriangle, Info, AlertCircle, CheckCircle, Bell } from "lucide-react"

const Alerts = () => {
  const alerts = [
    {
      id: 1,
      type: "critical",
      title: "Traffic Accident on Highway 101",
      description: "Major collision blocking 2 lanes. Emergency services on scene.",
      time: "2 minutes ago",
      location: "Highway 101, Mile 45"
    },
    {
      id: 2,
      type: "warning",
      title: "Heavy Traffic Congestion",
      description: "Unusual traffic buildup detected in downtown area.",
      time: "8 minutes ago",
      location: "Downtown District"
    },
    {
      id: 3,
      type: "info",
      title: "Road Maintenance Scheduled",
      description: "Scheduled maintenance on Oak Street starting tomorrow.",
      time: "1 hour ago",
      location: "Oak Street Bridge"
    },
    {
      id: 4,
      type: "resolved",
      title: "Signal Malfunction Resolved",
      description: "Traffic signal at Main & 5th is now functioning normally.",
      time: "2 hours ago",
      location: "Main St & 5th Ave"
    }
  ]

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "critical":
        return <AlertTriangle className="h-5 w-5 text-destructive" />
      case "warning":
        return <AlertCircle className="h-5 w-5 text-yellow-500" />
      case "info":
        return <Info className="h-5 w-5 text-blue-500" />
      case "resolved":
        return <CheckCircle className="h-5 w-5 text-green-500" />
      default:
        return <Info className="h-5 w-5" />
    }
  }

  const getAlertBadge = (type: string) => {
    switch (type) {
      case "critical":
        return <Badge variant="destructive">Critical</Badge>
      case "warning":
        return <Badge className="bg-yellow-500 text-yellow-50">Warning</Badge>
      case "info":
        return <Badge className="bg-blue-500 text-blue-50">Info</Badge>
      case "resolved":
        return <Badge className="bg-green-500 text-green-50">Resolved</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">System Alerts</h1>
        <Button variant="outline" size="sm">
          <Bell className="h-4 w-4 mr-2" />
          Notification Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-destructive/10 rounded-lg">
                <AlertTriangle className="h-6 w-6 text-destructive" />
              </div>
              <div>
                <div className="text-2xl font-bold">2</div>
                <div className="text-sm text-muted-foreground">Critical</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <AlertCircle className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">5</div>
                <div className="text-sm text-muted-foreground">Warnings</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Info className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Information</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <CheckCircle className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">8</div>
                <div className="text-sm text-muted-foreground">Resolved</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Alerts</CardTitle>
          <CardDescription>Latest system notifications and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {alerts.map((alert) => (
              <div key={alert.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                <div className="flex items-start gap-4">
                  <div className="mt-1">
                    {getAlertIcon(alert.type)}
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-center gap-3">
                      <h3 className="font-semibold">{alert.title}</h3>
                      {getAlertBadge(alert.type)}
                    </div>
                    <p className="text-sm text-muted-foreground">{alert.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>{alert.time}</span>
                      <span>•</span>
                      <span>{alert.location}</span>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Alerts