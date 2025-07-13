
import { useState } from "react";
import { ArrowLeft, Scan, Package, AlertTriangle, History, Bell, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import QRScanner from "./QRScanner";
import { useToast } from "@/hooks/use-toast";

interface RetailerDashboardProps {
  onBack: () => void;
}

const RetailerDashboard = ({ onBack }: RetailerDashboardProps) => {
  const [activeTab, setActiveTab] = useState("scan");
  const [showScanner, setShowScanner] = useState(false);
  const [alerts, setAlerts] = useState([
    { id: 1, type: "suspicious", message: "Duplicate QR code detected", time: "10:30 AM", product: "Paracetamol 500mg" },
    { id: 2, type: "counterfeit", message: "Counterfeit product scanned", time: "09:15 AM", product: "Insulin Pen" }
  ]);
  const [inventory, setInventory] = useState([
    { id: "TT-001", product: "Paracetamol 500mg", batch: "B2024001", status: "authentic", scannedAt: "2024-01-15 14:30", location: "Store A" },
    { id: "TT-002", product: "Insulin Pen", batch: "B2024002", status: "counterfeit", scannedAt: "2024-01-15 14:25", location: "Store A" },
    { id: "TT-003", product: "Vitamin D3", batch: "B2024003", status: "authentic", scannedAt: "2024-01-15 14:20", location: "Store A" }
  ]);
  const { toast } = useToast();

  const handleScanResult = (result: string) => {
    const newEntry = {
      id: result,
      product: "Medicine Sample",
      batch: `B${Date.now()}`,
      status: Math.random() > 0.3 ? "authentic" : "counterfeit",
      scannedAt: new Date().toLocaleString(),
      location: "Current Store"
    };
    
    setInventory(prev => [newEntry, ...prev]);
    setShowScanner(false);
    
    if (newEntry.status === "counterfeit") {
      const newAlert = {
        id: Date.now(),
        type: "counterfeit",
        message: "Counterfeit product detected in scan",
        time: new Date().toLocaleTimeString(),
        product: newEntry.product
      };
      setAlerts(prev => [newAlert, ...prev]);
    }
    
    toast({
      title: newEntry.status === "authentic" ? "Product Verified" : "Counterfeit Detected",
      description: `${newEntry.product} has been ${newEntry.status === "authentic" ? "verified and added to" : "flagged in"} inventory`,
      variant: newEntry.status === "authentic" ? "default" : "destructive"
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {showScanner && (
        <QRScanner 
          onScanResult={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}
      
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
            <h1 className="text-2xl font-bold">Retailer Dashboard</h1>
            <p className="text-gray-400">Manage inventory and verify products</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="flex gap-2 mb-6">
          <Button 
            variant={activeTab === "scan" ? "default" : "outline"}
            onClick={() => setActiveTab("scan")}
            className="flex items-center gap-2 bg-green-700"
          >
            <Scan className="w-4 h-4" />
            Scan & Activate
          </Button>
          <Button 
            variant={activeTab === "inventory" ? "default" : "outline"}
            onClick={() => setActiveTab("inventory")}
            className="flex items-center gap-2 bg-green-700"
          >
            <Package className="w-4 h-4" />
            Inventory History
          </Button>
          <Button 
            variant={activeTab === "alerts" ? "default" : "outline"}
            onClick={() => setActiveTab("alerts")}
            className="flex items-center gap-2 bg-green-700"
          >
            <AlertTriangle className="w-4 h-4" />
            Alerts ({alerts.length})
          </Button>
        </div>

        {/* Content */}
        {activeTab === "scan" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Scan className="w-5 h-5" />
                  Scan Incoming Products
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Scan QR codes on incoming products to verify authenticity and update inventory
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Button 
                  onClick={() => setShowScanner(true)}
                  className="bg-green-600 hover:bg-green-700"
                  size="lg"
                >
                  <Scan className="w-5 h-5 mr-2" />
                  Start Scanning
                </Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-400">234</div>
                  <div className="text-gray-400">Products Verified Today</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-red-400">12</div>
                  <div className="text-gray-400">Counterfeits Detected</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-400">98.7%</div>
                  <div className="text-gray-400">Authenticity Rate</div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {activeTab === "inventory" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <History className="w-5 h-5" />
                Inventory Verification History
              </CardTitle>
              <CardDescription className="text-gray-300">
                Complete log of all scanned products with verification status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Product ID</TableHead>
                    <TableHead className="text-gray-300">Product Name</TableHead>
                    <TableHead className="text-gray-300">Batch</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                    <TableHead className="text-gray-300">Scanned At</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {inventory.map((item) => (
                    <TableRow key={item.id} className="border-slate-700">
                      <TableCell className="text-white">{item.id}</TableCell>
                      <TableCell className="text-white">{item.product}</TableCell>
                      <TableCell className="text-white">{item.batch}</TableCell>
                      <TableCell>
                        <Badge 
                          variant={item.status === "authentic" ? "default" : "destructive"}
                          className="flex items-center gap-1 w-fit"
                        >
                          {item.status === "authentic" ? 
                            <CheckCircle className="w-3 h-3" /> : 
                            <XCircle className="w-3 h-3" />
                          }
                          {item.status}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-white">{item.scannedAt}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {activeTab === "alerts" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Bell className="w-5 h-5" />
                Security Alerts
              </CardTitle>
              <CardDescription className="text-gray-300">
                Instant notifications for suspicious scanning activity
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {alerts.map((alert) => (
                <div key={alert.id} className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="destructive" className="flex items-center gap-1">
                      <AlertTriangle className="w-3 h-3" />
                      {alert.type}
                    </Badge>
                    <span className="text-sm text-gray-400">{alert.time}</span>
                  </div>
                  <p className="text-white font-medium">{alert.message}</p>
                  <p className="text-gray-400 text-sm">Product: {alert.product}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default RetailerDashboard;
