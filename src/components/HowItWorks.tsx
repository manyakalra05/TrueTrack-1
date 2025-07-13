
import { ArrowRight, Package, QrCode, Scan, CheckCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const HowItWorks = () => {
  const steps = [
    {
      icon: Package,
      title: "Product Registration",
      description: "Register your product with unique identifiers and metadata",
      color: "blue"
    },
    {
      icon: QrCode,
      title: "QR Generation",
      description: "Cryptographic QR code is generated with timestamp and location data",
      color: "green"
    },
    {
      icon: Scan,
      title: "Secure Scanning",
      description: "Each scan validates authenticity and updates tracking status",
      color: "purple"
    },
    {
      icon: CheckCircle,
      title: "Verification Complete",
      description: "Real-time status updates with tamper-proof audit trail",
      color: "orange"
    }
  ];

  const colorMap = {
    blue: "from-blue-500 to-cyan-500",
    green: "from-green-500 to-emerald-500",
    purple: "from-purple-500 to-pink-500",
    orange: "from-orange-500 to-red-500"
  };

  return (
    <section className="py-20 px-4 bg-slate-800/30">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            How TrueTrack Works
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Simple process, maximum security - track your products with confidence
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <Card className="bg-slate-700/50 border-slate-600 hover:bg-slate-600/50 transition-all duration-300 h-full">
                <CardContent className="p-6 text-center">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-to-r ${colorMap[step.color]} p-4 hover:scale-110 transition-transform`}>
                    <step.icon className="w-8 h-8 text-white" />
                  </div>
                  <div className="text-sm text-gray-400 mb-2">Step {index + 1}</div>
                  <h3 className="text-white font-semibold text-lg mb-3">{step.title}</h3>
                  <p className="text-gray-300 text-sm leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 -right-3 transform -translate-y-1/2 z-10">
                  <ArrowRight className="w-6 h-6 text-gray-500" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
