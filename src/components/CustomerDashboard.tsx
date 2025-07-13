
import { useState } from "react";
import { ArrowLeft, Scan, Shield, CheckCircle, XCircle, AlertTriangle, MapPin, History, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import QRScanner from "./QRScanner";
import VerificationResult from "./VerificationResult";
import ProductJourney from "./ProductJourney";
import { useToast } from "@/hooks/use-toast";

interface CustomerDashboardProps {
  onBack: () => void;
}

const CustomerDashboard = ({ onBack }: CustomerDashboardProps) => {
  const [showScanner, setShowScanner] = useState(false);
  const [verificationResult, setVerificationResult] = useState<string | null>(null);
  const [showJourney, setShowJourney] = useState(false);
  const [selectedProductId, setSelectedProductId] = useState<string>("");
  const { toast } = useToast();

  const handleScanResult = (result: string) => {
    setVerificationResult(result);
    setShowScanner(false);
  };

  const handleReportCounterfeit = () => {
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting. We'll investigate this product.",
    });
  };

  const handleCloseVerification = () => {
    setVerificationResult(null);
  };

  const handleViewJourney = (productId: string) => {
    setSelectedProductId(productId);
    setShowJourney(true);
  };

  if (showJourney) {
    return (
      <ProductJourney 
        productId={selectedProductId}
        onBack={() => setShowJourney(false)}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white">
      {showScanner && (
        <QRScanner 
          onScanResult={handleScanResult}
          onClose={() => setShowScanner(false)}
        />
      )}

      {verificationResult && (
        <VerificationResult 
          qrCode={verificationResult}
          onClose={handleCloseVerification}
          onReportCounterfeit={handleReportCounterfeit}
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
            <h1 className="text-2xl font-bold">Customer Dashboard</h1>
            <p className="text-gray-400">Verify product authenticity</p>
          </div>
        </div>
      </div>

      <div className="p-6 space-y-6">
        {/* Main Scan Card */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <Shield className="w-5 h-5" />
              Verify Product Authenticity
            </CardTitle>
            <CardDescription className="text-gray-300">
              Scan the QR code to verify the product is genuine
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={() => setShowScanner(true)}
              className="bg-blue-600 hover:bg-blue-700"
              size="lg"
            >
              <Scan className="w-5 h-5 mr-2" />
              Start Scanning
            </Button>
          </CardContent>
        </Card>

        {/* Recent Scans */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader>
            <CardTitle className="text-white flex items-center gap-2">
              <History className="w-5 h-5" />
              Recent Verifications
            </CardTitle>
            <CardDescription className="text-gray-300">
              Your recent product authenticity checks
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { id: "TT-12345", product: "Paracetamol 500mg", status: "authentic", date: "Today, 2:30 PM", location: "Apollo Pharmacy" },
              { id: "TT-12346", product: "Vitamin D3", status: "authentic", date: "Yesterday, 4:15 PM", location: "MedPlus" },
              { id: "TT-12347", product: "Insulin Pen", status: "counterfeit", date: "2 days ago, 10:20 AM", location: "Local Store" }
            ].map((scan) => (
              <div key={scan.id} className="flex items-center justify-between p-4 bg-slate-700 rounded-lg">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="text-white font-medium">{scan.product}</h3>
                    <Badge 
                      variant={scan.status === "authentic" ? "default" : "destructive"}
                      className="flex items-center gap-1"
                    >
                      {scan.status === "authentic" ? 
                        <CheckCircle className="w-3 h-3" /> : 
                        <XCircle className="w-3 h-3" />
                      }
                      {scan.status}
                    </Badge>
                  </div>
                  <p className="text-gray-400 text-sm">{scan.date} • {scan.location}</p>
                </div>
                
                {scan.status === "authentic" && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleViewJourney(scan.id)}
                    className="border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white"
                  >
                    <MapPin className="w-4 h-4 mr-1" />
                    View Journey
                  </Button>
                )}
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-green-400">98.5%</div>
              <div className="text-gray-400">Authenticity Rate</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-blue-400">4,567</div>
              <div className="text-gray-400">Products Verified</div>
            </CardContent>
          </Card>
          <Card className="bg-slate-800 border-slate-700">
            <CardContent className="p-6">
              <div className="text-2xl font-bold text-red-400">23</div>
              <div className="text-gray-400">Counterfeits Reported</div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CustomerDashboard;
