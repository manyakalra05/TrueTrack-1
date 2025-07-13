
import { ArrowRight, Shield, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface HeroProps {
  onStartTracking?: () => void;
}

const Hero = ({ onStartTracking }: HeroProps) => {
  return (
    <div className="relative min-h-screen flex items-center justify-center px-4 overflow-hidden">
      {/* Animated background gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-purple-900/20 to-green-900/20 animate-pulse"></div>
      
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPGcgaWQ9ImdyaWQiIG9wYWNpdHk9IjAuMDUiPgo8cGF0aCBkPSJNIDQwIDAgTCAwIDAgMCA0MCIgc3Ryb2tlPSJ3aGl0ZSIgc3Ryb2tlLXdpZHRoPSIxIi8+CjwvZz4KPHN2Zz4K')] opacity-30"></div>
      
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <Badge className="mb-6 bg-blue-500/20 text-blue-300 border-blue-500/30 px-4 py-2 text-sm animate-fade-in">
          <Zap className="w-4 h-4 mr-2" />
          Revolutionary Tracking Technology
        </Badge>
        
        <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight animate-fade-in">
          True<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Track</span>
        </h1>
        
        <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed animate-fade-in">
          Secure product tracking with unbreakable cryptographic QR codes. 
          Real-time location, timestamp verification, and zero-duplication technology.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 animate-fade-in">
          <Button 
            size="lg" 
            onClick={onStartTracking}
            className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white px-8 py-4 text-lg font-semibold group"
          >
            Start Tracking
            <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
          </Button>
          
          <Button 
            variant="outline" 
            size="lg" 
            className="border-gray-600 text-gray-900 hover:bg-gray-300 px-8 py-4 text-lg"
          >
            <Shield className="w-5 h-5 mr-2" />
            View Demo
          </Button>
        </div>
        
        {/* Floating QR code animation */}
        
      </div>
    </div>
  );
};

export default Hero;
