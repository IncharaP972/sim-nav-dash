import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Search, Plus, MapPin, Clock, Phone, User } from "lucide-react"

const LostAndFound = () => {
  const lostItems = [
    {
      id: 1,
      title: "Black Leather Wallet",
      description: "Black leather wallet with credit cards and driver's license",
      location: "Highway 101, Rest Area Mile 23",
      reportedBy: "John Smith",
      contact: "(555) 123-4567",
      timeReported: "2 hours ago",
      status: "Active"
    },
    {
      id: 2,
      title: "Blue Samsung Phone",
      description: "Samsung Galaxy S21 in blue case, cracked screen",
      location: "Downtown Parking Garage Level 2",
      reportedBy: "Sarah Johnson",
      contact: "(555) 987-6543",
      timeReported: "5 hours ago",
      status: "Active"
    },
    {
      id: 3,
      title: "Red Backpack",
      description: "Red hiking backpack with laptop and documents",
      location: "Main Street Bus Stop",
      reportedBy: "Mike Wilson",
      contact: "(555) 456-7890",
      timeReported: "1 day ago",
      status: "Found"
    },
    {
      id: 4,
      title: "Car Keys with Blue Keychain",
      description: "Toyota car keys with blue keychain and building access card",
      location: "Shopping Center Parking Lot",
      reportedBy: "Lisa Brown",
      contact: "(555) 234-5678",
      timeReported: "3 days ago",
      status: "Claimed"
    }
  ]

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return "default"
      case "found":
        return "destructive"
      case "claimed":
        return "secondary"
      default:
        return "secondary"
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status.toLowerCase()) {
      case "active":
        return <Badge variant="default">Active</Badge>
      case "found":
        return <Badge className="bg-green-500 text-green-50">Found</Badge>
      case "claimed":
        return <Badge variant="secondary">Claimed</Badge>
      default:
        return <Badge variant="secondary">Unknown</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold text-foreground">Lost & Found</h1>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Report Item
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-primary/10 rounded-lg">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <div>
                <div className="text-2xl font-bold">24</div>
                <div className="text-sm text-muted-foreground">Active Reports</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-green-500/10 rounded-lg">
                <Search className="h-6 w-6 text-green-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">18</div>
                <div className="text-sm text-muted-foreground">Items Found</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <User className="h-6 w-6 text-blue-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">12</div>
                <div className="text-sm text-muted-foreground">Items Claimed</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg">
                <Clock className="h-6 w-6 text-yellow-500" />
              </div>
              <div>
                <div className="text-2xl font-bold">6</div>
                <div className="text-sm text-muted-foreground">Pending Pickup</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Search Lost Items</CardTitle>
              <CardDescription>Find reported lost items in the system</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-4">
                <Input placeholder="Search by item name, location, or description..." className="flex-1" />
                <Button>
                  <Search className="h-4 w-4 mr-2" />
                  Search
                </Button>
              </div>
              
              <div className="space-y-4">
                {lostItems.map((item) => (
                  <div key={item.id} className="p-4 border rounded-lg hover:bg-accent transition-colors">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-2">
                        <div className="flex items-center gap-3">
                          <h3 className="font-semibold">{item.title}</h3>
                          {getStatusBadge(item.status)}
                        </div>
                        <p className="text-sm text-muted-foreground">{item.description}</p>
                        
                        <div className="flex items-center gap-4 text-xs text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <MapPin className="h-3 w-3" />
                            <span>{item.location}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            <span>{item.timeReported}</span>
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-4 text-xs">
                          <div className="flex items-center gap-1">
                            <User className="h-3 w-3" />
                            <span>Reported by: {item.reportedBy}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <Phone className="h-3 w-3" />
                            <span>{item.contact}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          Contact
                        </Button>
                        <Button size="sm">
                          Details
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Report Lost Item</CardTitle>
              <CardDescription>Submit a new lost item report</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Item Name</label>
                <Input placeholder="e.g., Black Wallet" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Description</label>
                <Textarea 
                  placeholder="Detailed description of the item..."
                  className="min-h-[80px]"
                />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Last Known Location</label>
                <Input placeholder="Where did you last see it?" />
              </div>
              
              <div className="space-y-2">
                <label className="text-sm font-medium">Your Contact</label>
                <Input placeholder="Phone number or email" />
              </div>
              
              <Button className="w-full">
                Submit Report
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Found an Item?</CardTitle>
              <CardDescription>Report items you've found</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-sm text-muted-foreground">
                If you've found a lost item, please report it here to help reunite it with its owner.
              </p>
              
              <Button variant="outline" className="w-full">
                <Plus className="h-4 w-4 mr-2" />
                Report Found Item
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Latest lost & found updates</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="p-3 bg-green-500/5 border border-green-500/20 rounded-lg">
                <div className="font-medium text-sm">Item Found</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Blue backpack found at Transit Station
                </div>
                <div className="text-xs text-muted-foreground">2 min ago</div>
              </div>
              
              <div className="p-3 bg-primary/5 border border-primary/20 rounded-lg">
                <div className="font-medium text-sm">New Report</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Lost car keys reported at Mall parking
                </div>
                <div className="text-xs text-muted-foreground">15 min ago</div>
              </div>
              
              <div className="p-3 bg-blue-500/5 border border-blue-500/20 rounded-lg">
                <div className="font-medium text-sm">Item Claimed</div>
                <div className="text-xs text-muted-foreground mt-1">
                  Smartphone successfully returned to owner
                </div>
                <div className="text-xs text-muted-foreground">1 hour ago</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}

export default LostAndFound