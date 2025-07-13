
import { Shield, Zap, Globe, Users } from "lucide-react";

const Stats = () => {
  const stats = [
    {
      icon: Shield,
      value: "99.9%",
      label: "Security Accuracy",
      description: "Unbreakable encryption"
    },
    {
      icon: Zap,
      value: "<100ms",
      label: "Verification Speed",
      description: "Real-time processing"
    },
    {
      icon: Globe,
      value: "150+",
      label: "Countries Supported",
      description: "Global tracking network"
    },
    {
      icon: Users,
      value: "10K+",
      label: "Products Tracked",
      description: "Across all industries"
    }
  ];

  return (
    <section className="py-16 px-4 bg-slate-800/20">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center group">
              <div className="bg-gradient-to-r from-blue-500/20 to-green-500/20 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center group-hover:scale-110 transition-transform">
                <stat.icon className="w-8 h-8 text-blue-400" />
              </div>
              <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.value}</div>
              <div className="text-gray-300 font-semibold mb-1">{stat.label}</div>
              <div className="text-sm text-gray-400">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
