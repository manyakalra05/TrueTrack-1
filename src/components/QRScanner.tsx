import { useEffect, useRef } from "react";
import { BrowserMultiFormatReader } from "@zxing/browser";

interface QRScannerProps {
  onScanResult: (result: string) => void;
  onClose: () => void;
}

const QRScanner = ({ onScanResult, onClose }: QRScannerProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const controlsRef = useRef<any>(null);

  const startCamera = async () => {
    const codeReader = new BrowserMultiFormatReader();

    try {
      controlsRef.current = await codeReader.decodeFromVideoDevice(
        undefined,
        videoRef.current!,
        (result, error, controls) => {
          if (result) {
            onScanResult(result.getText());
            controls.stop(); // ✅ stop scanning
            onClose();       // ✅ close modal
          }
        }
      );
    } catch (err) {
      console.error("Camera Error:", err);
      alert("Unable to access camera.");
    }
  };

  const stopCamera = () => {
    if (controlsRef.current) {
      controlsRef.current.stop(); // ✅ proper stop
      controlsRef.current = null;
    }
  };

  useEffect(() => {
    startCamera();
    return () => {
      stopCamera(); // ✅ stops on unmount
    };
  }, []);

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex justify-center items-center p-4">
      <div className="bg-slate-800 rounded-lg p-4 w-full max-w-md relative">
        {/* ❌ Move X to Top Right */}
        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="absolute top-2 right-2 text-gray-400 hover:text-white"
        >
          ✕
        </button>

        <h2 className="text-white text-xl font-bold mb-2">📷 Scan QR Code</h2>
        <p className="text-sm text-gray-300 mb-4">Point your camera at a QR code</p>

        <video
          ref={videoRef}
          className="w-full h-64 rounded bg-black"
          autoPlay
          playsInline
        ></video>

        <button
          onClick={() => {
            stopCamera();
            onClose();
          }}
          className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded"
        >
          Stop
        </button>
      </div>
    </div>
  );
};

export default QRScanner;
