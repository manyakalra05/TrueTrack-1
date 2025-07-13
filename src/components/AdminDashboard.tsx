
import { useState } from "react";
import { ArrowLeft, BarChart3, QrCode, Activity, AlertTriangle, Map, Download, Plus, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/hooks/use-toast";

interface AdminDashboardProps {
  onBack: () => void;
}

const AdminDashboard = ({ onBack }: AdminDashboardProps) => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const [qrCodes, setQrCodes] = useState([
    { id: "QR-001", batch: "B2024001", product: "Paracetamol 500mg", quantity: 1000, generated: "2024-01-15", status: "active" },
    { id: "QR-002", batch: "B2024002", product: "Insulin Pen", quantity: 500, generated: "2024-01-14", status: "active" }
  ]);
  const [scanLogs, setScanLogs] = useState([
    { id: 1, productId: "TT-001", location: "Mumbai, India", timestamp: "2024-01-15 14:30", status: "verified", retailer: "HealthPlus Pharmacy" },
    { id: 2, productId: "TT-002", location: "Delhi, India", timestamp: "2024-01-15 14:25", status: "counterfeit", retailer: "MediCare Store" },
    { id: 3, productId: "TT-003", location: "Bangalore, India", timestamp: "2024-01-15 14:20", status: "verified", retailer: "Apollo Pharmacy" }
  ]);
  const [anomalies, setAnomalies] = useState([
    { id: 1, type: "duplicate_scan", description: "Same QR code scanned multiple times", location: "Mumbai", severity: "high", count: 15 },
    { id: 2, type: "location_mismatch", description: "Product scanned far from expected location", location: "Kolkata", severity: "medium", count: 3 },
    { id: 3, type: "time_anomaly", description: "Scanning pattern indicates automated activity", location: "Chennai", severity: "high", count: 8 }
  ]);
  const { toast } = useToast();

  const handleGenerateQR = () => {
    const newQR = {
      id: `QR-${String(qrCodes.length + 1).padStart(3, '0')}`,
      batch: `B2024${String(qrCodes.length + 1).padStart(3, '0')}`,
      product: "New Medicine Batch",
      quantity: 1000,
      generated: new Date().toISOString().split('T')[0],
      status: "active"
    };
    setQrCodes(prev => [newQR, ...prev]);
    toast({
      title: "QR Codes Generated",
      description: `Generated 1000 secure QR codes for batch ${newQR.batch}`,
    });
  };

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
            <h1 className="text-2xl font-bold">Admin Dashboard</h1>
            <p className="text-gray-400">Manufacturer & System Administration</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="p-6">
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button 
            variant={activeTab === "dashboard" ? "default" : "outline"}
            onClick={() => setActiveTab("dashboard")}
            className="flex items-center gap-2 bg-green-700"
          >
            <BarChart3 className="w-4 h-4" />
            Dashboard
          </Button>
          <Button 
            variant={activeTab === "generate" ? "default" : "outline"}
            onClick={() => setActiveTab("generate")}
            className="flex items-center gap-2 bg-green-700"
          >
            <QrCode className="w-4 h-4" />
            Generate QR
          </Button>
          <Button 
            variant={activeTab === "tracking" ? "default" : "outline"}
            onClick={() => setActiveTab("tracking")}
            className="flex items-center gap-2 bg-green-700"
          >
            <Activity className="w-4 h-4" />
            Track Scans
          </Button>
          <Button 
            variant={activeTab === "anomalies" ? "default" : "outline"}
            onClick={() => setActiveTab("anomalies")}
            className="flex items-center gap-2 bg-green-700"
          >
            <AlertTriangle className="w-4 h-4" />
            Anomalies
          </Button>
        </div>

        {/* Dashboard */}
        {activeTab === "dashboard" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-blue-400">125,430</div>
                  <div className="text-gray-400">Total Products</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-green-400">124,987</div>
                  <div className="text-gray-400">Active QR Codes</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-red-400">443</div>
                  <div className="text-gray-400">Flagged Counterfeits</div>
                </CardContent>
              </Card>
              <Card className="bg-slate-800 border-slate-700">
                <CardContent className="p-6">
                  <div className="text-2xl font-bold text-yellow-400">26</div>
                  <div className="text-gray-400">Anomaly Alerts</div>
                </CardContent>
              </Card>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white">Recent Activity</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {scanLogs.slice(0, 5).map((log) => (
                    <div key={log.id} className="flex items-center justify-between p-3 bg-slate-700 rounded-lg">
                      <div>
                        <p className="text-white font-medium">{log.productId}</p>
                        <p className="text-gray-400 text-sm">{log.location} - {log.retailer}</p>
                      </div>
                      <Badge variant={log.status === "verified" ? "default" : "destructive"}>
                        {log.status}
                      </Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              <Card className="bg-slate-800 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-white flex items-center gap-2">
                    <Map className="w-5 h-5" />
                    Global Activity Map
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-48 bg-slate-700 rounded-lg flex items-center justify-center">
                    <p className="text-gray-400">Interactive map showing scan locations</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* Generate QR */}
        {activeTab === "generate" && (
          <div className="space-y-6">
            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <QrCode className="w-5 h-5" />
                  Generate Secure QR Codes
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Create cryptographically signed QR codes for new product batches
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleGenerateQR}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="lg"
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Generate New Batch
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-slate-800 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white">Generated QR Batches</CardTitle>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow className="border-slate-700">
                      <TableHead className="text-gray-300">Batch ID</TableHead>
                      <TableHead className="text-gray-300">Product</TableHead>
                      <TableHead className="text-gray-300">Quantity</TableHead>
                      <TableHead className="text-gray-300">Generated</TableHead>
                      <TableHead className="text-gray-300">Status</TableHead>
                      <TableHead className="text-gray-300">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {qrCodes.map((qr) => (
                      <TableRow key={qr.id} className="border-slate-700">
                        <TableCell className="text-white">{qr.batch}</TableCell>
                        <TableCell className="text-white">{qr.product}</TableCell>
                        <TableCell className="text-white">{qr.quantity}</TableCell>
                        <TableCell className="text-white">{qr.generated}</TableCell>
                        <TableCell>
                          <Badge variant="default">{qr.status}</Badge>
                        </TableCell>
                        <TableCell>
                          <Button variant="ghost" size="sm">
                            <Download className="w-4 h-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Track Scans */}
        {activeTab === "tracking" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <Eye className="w-5 h-5" />
                Real-time Scan Tracking
              </CardTitle>
              <CardDescription className="text-gray-300">
                Monitor all product scans across geographies in real-time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow className="border-slate-700">
                    <TableHead className="text-gray-300">Product ID</TableHead>
                    <TableHead className="text-gray-300">Location</TableHead>
                    <TableHead className="text-gray-300">Retailer</TableHead>
                    <TableHead className="text-gray-300">Timestamp</TableHead>
                    <TableHead className="text-gray-300">Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {scanLogs.map((log) => (
                    <TableRow key={log.id} className="border-slate-700">
                      <TableCell className="text-white">{log.productId}</TableCell>
                      <TableCell className="text-white">{log.location}</TableCell>
                      <TableCell className="text-white">{log.retailer}</TableCell>
                      <TableCell className="text-white">{log.timestamp}</TableCell>
                      <TableCell>
                        <Badge variant={log.status === "verified" ? "default" : "destructive"}>
                          {log.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Anomalies */}
        {activeTab === "anomalies" && (
          <Card className="bg-slate-800 border-slate-700">
            <CardHeader>
              <CardTitle className="text-white flex items-center gap-2">
                <AlertTriangle className="w-5 h-5" />
                Anomaly Detection
              </CardTitle>
              <CardDescription className="text-gray-300">
                Unusual scanning patterns and potential security threats
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {anomalies.map((anomaly) => (
                <div key={anomaly.id} className="p-4 bg-red-900/20 border border-red-500/30 rounded-lg">
                  <div className="flex items-center justify-between mb-2">
                    <Badge 
                      variant={anomaly.severity === "high" ? "destructive" : "secondary"}
                      className="flex items-center gap-1"
                    >
                      <AlertTriangle className="w-3 h-3" />
                      {anomaly.severity} priority
                    </Badge>
                    <span className="text-sm text-gray-400">Count: {anomaly.count}</span>
                  </div>
                  <p className="text-white font-medium">{anomaly.description}</p>
                  <p className="text-gray-400 text-sm">Location: {anomaly.location}</p>
                </div>
              ))}
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
