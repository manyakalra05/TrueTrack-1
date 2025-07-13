
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { QrCode, Shield, MapPin, Clock, AlertTriangle, CheckCircle } from "lucide-react";

const QRDemo = () => {
  const [isScanned, setIsScanned] = useState(false);
  const [scanAttempts, setScanAttempts] = useState(0);

  const handleScan = () => {
    if (!isScanned) {
      setIsScanned(true);
      setScanAttempts(1);
    } else {
      setScanAttempts(prev => prev + 1);
    }
  };

  return (
    <section className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Interactive QR Demo
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Experience our secure QR technology - scan once, verify always
          </p>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* QR Code Display */}
          <div className="text-center">
            <Card className="bg-slate-800/50 border-slate-700 p-8 max-w-md mx-auto">
              <CardHeader>
                <CardTitle className="text-white flex items-center justify-center gap-2">
                  <QrCode className="w-6 h-6" />
                  Secure QR Code
                </CardTitle>
                <CardDescription className="text-gray-300">
                  Product ID: TT-2024-001
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* QR Code Visualization */}
                <div className="relative mb-6">
                  <div className={`w-48 h-48 mx-auto rounded-lg border-4 transition-all duration-500 ${
                    isScanned 
                      ? scanAttempts > 1 
                        ? 'border-red-500 bg-red-500/10' 
                        : 'border-green-500 bg-green-500/10'
                      : 'border-blue-500 bg-blue-500/10'
                  }`}>
                    <div className="w-full h-full bg-gradient-to-br from-white to-gray-200 rounded p-4">
                      <div className="grid grid-cols-8 gap-1 h-full">
                        {Array.from({length: 64}).map((_, i) => (
                          <div 
                            key={i} 
                            className={`rounded-sm ${
                              Math.random() > 0.5 ? 'bg-black' : 'bg-white'
                            } ${isScanned && scanAttempts > 1 ? 'opacity-50' : ''}`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  {isScanned && scanAttempts > 1 && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Badge className="bg-red-600 text-white">
                        <AlertTriangle className="w-4 h-4 mr-1" />
                        INVALID
                      </Badge>
                    </div>
                  )}
                </div>
                
                <Button 
                  onClick={handleScan}
                  className={`w-full text-lg font-semibold transition-all duration-300 ${
                    isScanned 
                      ? scanAttempts > 1
                        ? 'bg-red-600 hover:bg-red-700'
                        : 'bg-green-600 hover:bg-green-700'
                      : 'bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700'
                  }`}
                >
                  {isScanned ? 'Scan Again (Attempt Blocked)' : 'Scan QR Code'}
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Tracking Information */}
          <div className="space-y-6">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Shield className="w-5 h-5 text-blue-400" />
                  Security Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Encryption</span>
                    <Badge className="bg-green-600 text-white">AES-256</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Status</span>
                    <Badge className={isScanned ? 'bg-green-600' : 'bg-blue-600'}>
                      {isScanned ? 'Verified' : 'Ready'}
                    </Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-gray-300">Scan Attempts</span>
                    <Badge className={scanAttempts > 1 ? 'bg-red-600' : 'bg-gray-600'}>
                      {scanAttempts}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <MapPin className="w-5 h-5 text-green-400" />
                  Location Data
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  <p>📍 San Francisco, CA</p>
                  <p>🏢 Warehouse District</p>
                  <p>📊 GPS: 37.7749, -122.4194</p>
                </div>
              </CardContent>
            </Card>
            
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Clock className="w-5 h-5 text-purple-400" />
                  Timestamp
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-gray-300">
                  <p>📅 {new Date().toLocaleDateString()}</p>
                  <p>⏰ {new Date().toLocaleTimeString()}</p>
                  <p>🌍 UTC-8 (PST)</p>
                </div>
              </CardContent>
            </Card>
            
            {scanAttempts > 1 && (
              <Card className="bg-red-900/20 border-red-500/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-red-400">
                    <AlertTriangle className="w-5 h-5" />
                    <span className="font-semibold">Security Alert</span>
                  </div>
                  <p className="text-red-300 text-sm mt-2">
                    Multiple scan attempts detected. QR code has been invalidated for security.
                  </p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default QRDemo;
