
import { Shield, MapPin, Clock, Scan, Lock, Zap } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const Features = () => {
  const features = [
    {
      icon: Shield,
      title: "Cryptographic Security",
      description: "Unbreakable encryption ensures each QR code is unique and tamper-proof with military-grade security.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: MapPin,
      title: "Real-time Location",
      description: "Precise GPS tracking with location verification prevents fraudulent scanning attempts.",
      gradient: "from-green-500 to-emerald-500"
    },
    {
      icon: Clock,
      title: "Timestamp Verification",
      description: "Immutable time-stamping ensures chronological order and prevents backdated entries.",
      gradient: "from-purple-500 to-pink-500"
    },
    {
      icon: Scan,
      title: "Single-Use Technology",
      description: "Each scan invalidates the QR code, preventing duplicate scans and ensuring authenticity.",
      gradient: "from-orange-500 to-red-500"
    },
    {
      icon: Lock,
      title: "Zero Physical Duplication",
      description: "Digital-only QR codes that cannot be physically replicated or counterfeited.",
      gradient: "from-indigo-500 to-purple-500"
    },
    {
      icon: Zap,
      title: "Instant Verification",
      description: "Real-time validation with instant alerts for any suspicious activities or attempts.",
      gradient: "from-teal-500 to-green-500"
    }
  ];

  return (
    <section className="py-20 px-4 relative">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Unmatched Security Features
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Built with cutting-edge cryptography and blockchain-inspired security protocols
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="bg-slate-800/50 border-slate-700 hover:bg-slate-700/50 transition-all duration-300 group hover:scale-105">
              <CardHeader className="pb-4">
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-r ${feature.gradient} p-3 mb-4 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <CardTitle className="text-white text-xl">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-300 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
