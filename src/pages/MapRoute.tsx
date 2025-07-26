import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { MapPin, Navigation, Route, Clock } from "lucide-react"

const MapRoute = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Route Mapping</h1>
        <Button variant="outline" size="sm">
          <Navigation className="h-4 w-4 mr-2" />
          Live Traffic
        </Button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card className="h-[600px]">
            <CardHeader>
              <CardTitle>Interactive Map</CardTitle>
              <CardDescription>Real-time route visualization</CardDescription>
            </CardHeader>
            <CardContent className="h-full">
              <div className="w-full h-full bg-secondary rounded-lg flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-12 w-12 mx-auto mb-4 text-primary" />
                  <p className="text-lg font-medium">Map Interface</p>
                  <p className="text-sm text-muted-foreground">Interactive route mapping will be displayed here</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Route Planning</CardTitle>
              <CardDescription>Set origin and destination</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">From</label>
                <Input placeholder="Enter starting location" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium">To</label>
                <Input placeholder="Enter destination" />
              </div>
              <Button className="w-full">
                <Route className="h-4 w-4 mr-2" />
                Calculate Route
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Route Information</CardTitle>
              <CardDescription>Current route details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Clock className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Estimated Time</div>
                  <div className="text-sm text-muted-foreground">25 minutes</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Route className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Distance</div>
                  <div className="text-sm text-muted-foreground">18.5 km</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Navigation className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <div className="font-medium">Traffic Status</div>
                  <div className="text-sm text-muted-foreground">Moderate congestion</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Alternative Routes</CardTitle>
              <CardDescription>Available route options</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-medium">Route A (Fastest)</span>
                  <span className="text-sm text-primary">23 min</span>
                </div>
                <div className="text-sm text-muted-foreground">Via Highway 101</div>
              </div>
              <div className="p-3 border rounded-lg hover:bg-accent cursor-pointer">
                <div className="flex justify-between">
                  <span className="font-medium">Route B (Shortest)</span>
                  <span className="text-sm">27 min</span>
                </div>
                <div className="text-sm text-muted-foreground">Via Main Street</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default MapRoute