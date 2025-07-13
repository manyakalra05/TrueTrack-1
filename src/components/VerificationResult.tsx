
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertTriangle, MapPin, Calendar, Package, Building2, Flag } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ProductData {
  id: string;
  name: string;
  manufacturer: string;
  batchNumber: string;
  expiryDate: string;
  purchaseLocation: string;
  isAuthentic: boolean;
  scanLocation: string;
}

interface VerificationResultProps {
  qrCode: string;
  onClose: () => void;
  onReportCounterfeit: () => void;
}

const VerificationResult = ({ qrCode, onClose, onReportCounterfeit }: VerificationResultProps) => {
  const [hasReported, setHasReported] = useState(false);
  const { toast } = useToast();

  // Simulate product data based on QR code
  const productData: ProductData = {
    id: qrCode,
    name: "Amoxicillin 500mg Capsules",
    manufacturer: "PharmaCorp Ltd.",
    batchNumber: "AMX-2024-0156",
    expiryDate: "2025-12-31",
    purchaseLocation: "City Pharmacy, 123 Main St, San Francisco, CA",
    isAuthentic: Math.random() > 0.3, // 70% chance of being authentic for demo
    scanLocation: "San Francisco, CA"
  };

  const handleReport = () => {
    setHasReported(true);
    onReportCounterfeit();
    toast({
      title: "Report Submitted",
      description: "Thank you for reporting. We'll investigate this product.",
    });
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-lg bg-slate-800 border-slate-700">
        <CardHeader className="text-center">
          <div className="flex justify-center mb-4">
            {productData.isAuthentic ? (
              <div className="w-16 h-16 bg-green-500/20 rounded-full flex items-center justify-center">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
            ) : (
              <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="w-8 h-8 text-red-500" />
              </div>
            )}
          </div>
          
          <CardTitle className={`text-2xl ${productData.isAuthentic ? 'text-green-400' : 'text-red-400'}`}>
            {productData.isAuthentic ? 'Authentic Product' : 'Counterfeit Detected'}
          </CardTitle>
          
          <CardDescription className="text-gray-300">
            {productData.isAuthentic 
              ? 'This product has been verified as genuine'
              : 'Warning: This product may be counterfeit'
            }
          </CardDescription>
        </CardHeader>
        
        <CardContent className="space-y-6">
          {/* Product Details */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <Package className="w-4 h-4" />
              Product Details
            </h3>
            
            <div className="bg-slate-700/50 rounded-lg p-4 space-y-2">
              <div className="flex justify-between">
                <span className="text-gray-400">Name:</span>
                <span className="text-white font-medium">{productData.name}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Batch:</span>
                <span className="text-white">{productData.batchNumber}</span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Expiry:</span>
                <span className="text-white flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  {productData.expiryDate}
                </span>
              </div>
              
              <div className="flex justify-between">
                <span className="text-gray-400">Manufacturer:</span>
                <span className="text-white flex items-center gap-1">
                  <Building2 className="w-3 h-3" />
                  {productData.manufacturer}
                </span>
              </div>
            </div>
          </div>

          {/* Location Confirmation */}
          <div className="space-y-3">
            <h3 className="text-white font-semibold flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Location Confirmation
            </h3>
            
            <div className="bg-slate-700/50 rounded-lg p-4">
              <p className="text-gray-300 text-sm">
                This product was purchased at:
              </p>
              <p className="text-white font-medium mt-1">
                {productData.purchaseLocation}
              </p>
              
              <Badge className="mt-2 bg-blue-600 text-white">
                Verified Location Match
              </Badge>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            {!productData.isAuthentic || !hasReported ? (
              <Button 
                onClick={handleReport}
                variant="outline" 
                className="flex-1 border-red-500 text-red-400 hover:bg-red-500/10"
                disabled={hasReported}
              >
                <Flag className="w-4 h-4 mr-2" />
                {hasReported ? 'Reported' : 'Report Counterfeit'}
              </Button>
            ) : null}
            
            <Button onClick={onClose} className="flex-1 bg-blue-600 hover:bg-blue-700">
              Close
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default VerificationResult;
