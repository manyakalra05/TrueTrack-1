
import { useState } from "react";
import { ArrowRight, Shield, MapPin, Clock, Scan, CheckCircle, Zap, Users, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import QRDemo from "@/components/QRDemo";
import Stats from "@/components/Stats";
import Footer from "@/components/Footer";
import CustomerDashboard from "@/components/CustomerDashboard";
import LoginScreen from "@/components/LoginScreen";
import RetailerDashboard from "@/components/RetailerDashboard";
import AdminDashboard from "@/components/AdminDashboard";

type ViewType = 'home' | 'customer' | 'login' | 'retailer' | 'admin';

const Index = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');

  const handleLogin = (userType: 'retailer' | 'admin') => {
    setCurrentView(userType);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'customer':
        return <CustomerDashboard onBack={() => setCurrentView('home')} />;
      case 'login':
        return <LoginScreen onBack={() => setCurrentView('home')} onLogin={handleLogin} />;
      case 'retailer':
        return <RetailerDashboard onBack={() => setCurrentView('home')} />;
      case 'admin':
        return <AdminDashboard onBack={() => setCurrentView('home')} />;
      default:
        return (
          <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
            {/* Navigation */}
            <nav className="absolute top-0 left-0 right-0 z-10 p-6">
              <div className="max-w-6xl mx-auto flex justify-between items-center">
                <div className="text-2xl font-bold text-white">
                  True<span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-green-400">Track</span>
                </div>
                
                <div className="flex gap-4">
                  <Button 
                    onClick={() => setCurrentView('customer')}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    <Scan className="w-4 h-4 mr-2" />
                    Verify Product
                  </Button>
                  <Button 
                    onClick={() => setCurrentView('login')}
                    variant="outline" 
                    className="border-gray-600 text-gray-900 hover:bg-gray-300 flex items-center gap-2"
                  >
                    <Users className="w-4 h-4" />
                    Professional Login
                  </Button>
                </div>
              </div>
            </nav>

            {/* Main Content */}
            <Hero />
            <Stats />
            <Features />
            <HowItWorks />
            <QRDemo />
            <Footer />
          </div>
        );
    }
  };

  return renderCurrentView();
};

export default Index;
