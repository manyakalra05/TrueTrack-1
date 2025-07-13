
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Camera, Scan, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QRScannerProps {
  onScanResult: (result: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanResult, onClose }: QRScannerProps) => {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);
  const { toast } = useToast();

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (error) {
      toast({
        title: "Camera Error",
        description: "Unable to access camera. Please check permissions.",
        variant: "destructive"
      });
    }
  };

  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
    }
    setIsScanning(false);
  };

  const simulateScan = () => {
    // Simulate QR scan for demo purposes
    const mockResult = `TT-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    onScanResult(mockResult);
    stopCamera();
  };

  useEffect(() => {
    return () => {
      stopCamera();
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md bg-slate-800 border-slate-700">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-white flex items-center gap-2">
              <Scan className="w-5 h-5" />
              Scan QR Code
            </CardTitle>
            <CardDescription className="text-gray-300">
              Point your camera at the QR code
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="text-gray-400 hover:text-white"
          >
            <X className="w-5 h-5" />
          </Button>
        </CardHeader>
        
        <CardContent className="space-y-4">
          <div className="relative">
            {isScanning ? (
              <div className="relative">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover rounded-lg bg-gray-900"
                />
                <div className="absolute inset-0 border-2 border-green-500 rounded-lg">
                  <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-green-500"></div>
                  <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-green-500"></div>
                  <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-green-500"></div>
                  <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-green-500"></div>
                </div>
              </div>
            ) : (
              <div className="w-full h-64 bg-gray-900 rounded-lg flex items-center justify-center">
                <Camera className="w-12 h-12 text-gray-500" />
              </div>
            )}
          </div>
          
          <div className="flex gap-2">
            {!isScanning ? (
              <Button onClick={startCamera} className="flex-1 bg-green-600 hover:bg-green-700">
                <Camera className="w-4 h-4 mr-2" />
                Start Camera
              </Button>
            ) : (
              <>
                <Button onClick={simulateScan} className="flex-1 bg-blue-600 hover:bg-blue-700">
                  Simulate Scan
                </Button>
                <Button onClick={stopCamera} variant="outline" className="border-gray-600">
                  Stop
                </Button>
              </>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default QRScanner;
