import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { Play, Pause, RotateCcw, Settings } from "lucide-react"

const Simulation = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Simulation Control</h1>
        <Button variant="outline" size="sm">
          <Settings className="h-4 w-4 mr-2" />
          Settings
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Play className="h-5 w-5" />
              Simulation Status
            </CardTitle>
            <CardDescription>Current simulation state and controls</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex gap-2">
              <Button size="sm" className="flex-1">
                <Play className="h-4 w-4 mr-2" />
                Start
              </Button>
              <Button variant="outline" size="sm" className="flex-1">
                <Pause className="h-4 w-4 mr-2" />
                Pause
              </Button>
              <Button variant="outline" size="sm">
                <RotateCcw className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Progress</span>
                <span>72%</span>
              </div>
              <Progress value={72} className="h-2" />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Active Vehicles</CardTitle>
            <CardDescription>Currently simulated vehicles</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">1,247</div>
            <p className="text-sm text-muted-foreground">+12% from last run</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Simulation Time</CardTitle>
            <CardDescription>Virtual time elapsed</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-primary">2:34:18</div>
            <p className="text-sm text-muted-foreground">Speed: 10x real-time</p>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Real-time Metrics</CardTitle>
          <CardDescription>Live simulation performance data</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-lg font-semibold">Average Speed</div>
              <div className="text-2xl font-bold text-primary">45.2 km/h</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-lg font-semibold">Traffic Density</div>
              <div className="text-2xl font-bold text-primary">68%</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-lg font-semibold">Incidents</div>
              <div className="text-2xl font-bold text-destructive">3</div>
            </div>
            <div className="text-center p-4 bg-secondary rounded-lg">
              <div className="text-lg font-semibold">Efficiency</div>
              <div className="text-2xl font-bold text-primary">82%</div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default Simulation