import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { TrendingUp, TrendingDown, Activity, Users, Clock, Route } from "lucide-react"

const Summary = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">System Summary</h1>
        <div className="text-sm text-muted-foreground">Last updated: 2 minutes ago</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Activity className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">94.2%</div>
                <div className="text-sm text-muted-foreground">System Uptime</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">1,847</div>
                <div className="text-sm text-muted-foreground">Active Users</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Route className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">342</div>
                <div className="text-sm text-muted-foreground">Routes Optimized</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">23.5m</div>
                <div className="text-sm text-muted-foreground">Avg Travel Time</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
            <CardDescription>Key system performance indicators</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Traffic Flow Efficiency</span>
                <span className="text-sm text-muted-foreground">87%</span>
              </div>
              <Progress value={87} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">Route Optimization</span>
                <span className="text-sm text-muted-foreground">92%</span>
              </div>
              <Progress value={92} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">System Response Time</span>
                <span className="text-sm text-muted-foreground">95%</span>
              </div>
              <Progress value={95} className="h-2" />
            </div>
            
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">User Satisfaction</span>
                <span className="text-sm text-muted-foreground">89%</span>
              </div>
              <Progress value={89} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Daily Statistics</CardTitle>
            <CardDescription>Today's activity summary</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Total Routes Calculated</div>
                  <div className="text-sm text-muted-foreground">8,543 routes</div>
                </div>
              </div>
              <div className="text-green-500 text-sm font-medium">+12%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">Average Speed Increase</div>
                  <div className="text-sm text-muted-foreground">18% improvement</div>
                </div>
              </div>
              <div className="text-green-500 text-sm font-medium">+5%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingDown className="h-5 w-5 text-red-500" />
                <div>
                  <div className="font-medium">Congestion Incidents</div>
                  <div className="text-sm text-muted-foreground">23 incidents</div>
                </div>
              </div>
              <div className="text-red-500 text-sm font-medium">-8%</div>
            </div>

            <div className="flex items-center justify-between p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-3">
                <TrendingUp className="h-5 w-5 text-green-500" />
                <div>
                  <div className="font-medium">User Engagement</div>
                  <div className="text-sm text-muted-foreground">4.2 hours avg</div>
                </div>
              </div>
              <div className="text-green-500 text-sm font-medium">+15%</div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>Latest system events and updates</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-primary bg-secondary/50 rounded-r-lg">
              <div className="text-sm">
                <span className="font-medium">Route optimization completed</span> for downtown area
              </div>
              <div className="text-xs text-muted-foreground ml-auto">5 min ago</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-green-500 bg-secondary/50 rounded-r-lg">
              <div className="text-sm">
                <span className="font-medium">Traffic signal synchronization</span> updated successfully
              </div>
              <div className="text-xs text-muted-foreground ml-auto">12 min ago</div>
            </div>
            
            <div className="flex items-center gap-3 p-3 border-l-4 border-l-blue-500 bg-secondary/50 rounded-r-lg">
              <div className="text-sm">
                <span className="font-medium">New user registration</span> from mobile app
              </div>
              <div className="text-xs text-muted-foreground ml-auto">18 min ago</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Summary