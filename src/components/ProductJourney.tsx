
import { useState } from "react";
import { ArrowLeft, MapPin, Truck, Package, Store, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

interface ProductJourneyProps {
  productId: string;
  onBack: () => void;
}

const ProductJourney = ({ productId, onBack }: ProductJourneyProps) => {
  const journeySteps = [
    {
      id: 1,
      title: "Manufacturing",
      location: "Pharma Corp Ltd, Mumbai",
      date: "2024-01-10",
      time: "09:00 AM",
      status: "completed",
      icon: Package,
      description: "Product manufactured and quality tested"
    },
    {
      id: 2,
      title: "Distribution Center",
      location: "Central Warehouse, Delhi",
      date: "2024-01-12",
      time: "02:30 PM",
      status: "completed",
      icon: Truck,
      description: "Received at distribution center, inventory updated"
    },
    {
      id: 3,
      title: "Regional Hub",
      location: "South Regional Hub, Bangalore",
      date: "2024-01-13",
      time: "11:15 AM",
      status: "completed",
      icon: MapPin,
      description: "Transferred to regional distribution hub"
    },
    {
      id: 4,
      title: "Retail Store",
      location: "HealthPlus Pharmacy, Bangalore",
      date: "2024-01-14",
      time: "04:20 PM",
      status: "completed",
      icon: Store,
      description: "Delivered to retail pharmacy, ready for sale"
    },
    {
      id: 5,
      title: "Customer Purchase",
      location: "HealthPlus Pharmacy, Bangalore",
      date: "2024-01-15",
      time: "02:30 PM",
      status: "current",
      icon: CheckCircle,
      description: "Product verified and purchased by customer"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {/* Header */}
      <div className="p-6 border-b border-slate-700">
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            size="icon"
            onClick={onBack}
            className="text-gray-400 hover:text-white"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div>
            <h1 className="text-2xl font-bold">Product Journey</h1>
            <p className="text-gray-400">Supply chain tracking for {productId}</p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <Card className="bg-slate-800 border-slate-700 mb-6">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Supply Chain Path
            </CardTitle>
            <CardDescription className="text-gray-300">
              Complete journey from manufacturer to customer
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* Visual Map Placeholder */}
            <div className="h-64 bg-slate-700 rounded-lg mb-6 flex items-center justify-center">
              <p className="text-gray-400">Interactive supply chain map visualization</p>
            </div>

            {/* Journey Timeline */}
            <div className="space-y-6">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                const isLast = index === journeySteps.length - 1;
                
                return (
                  <div key={step.id} className="relative">
                    {/* Connection Line */}
                    {!isLast && (
                      <div className="absolute left-6 top-12 w-0.5 h-16 bg-slate-600"></div>
                    )}
                    
                    <div className="flex items-start gap-4">
                      {/* Icon */}
                      <div className={`
                        w-12 h-12 rounded-full flex items-center justify-center
                        ${step.status === 'completed' ? 'bg-green-600' : 
                          step.status === 'current' ? 'bg-blue-600' : 'bg-slate-600'}
                      `}>
                        <Icon className="w-6 h-6 text-white" />
                      </div>

                      {/* Content */}
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="text-lg font-semibold text-white">{step.title}</h3>
                          <Badge 
                            variant={step.status === 'completed' ? 'default' : 'secondary'}
                            className={
                              step.status === 'completed' ? 'bg-green-600' :
                              step.status === 'current' ? 'bg-blue-600' : 'bg-slate-600'
                            }
                          >
                            {step.status === 'completed' ? 'Completed' : 
                             step.status === 'current' ? 'Current' : 'Pending'}
                          </Badge>
                        </div>
                        
                        <p className="text-gray-300 mb-1">{step.location}</p>
                        <p className="text-gray-400 text-sm mb-2">{step.date} at {step.time}</p>
                        <p className="text-gray-300 text-sm">{step.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Additional Details */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">5 days</div>
              <div className="text-gray-400">Total Transit Time</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">1,247 km</div>
              <div className="text-gray-400">Distance Traveled</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-yellow-400">4</div>
              <div className="text-gray-400">Checkpoints Verified</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ProductJourney;
