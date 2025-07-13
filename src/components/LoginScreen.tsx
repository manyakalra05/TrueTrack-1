
import { useState } from "react";
import { ArrowLeft, Lock, User, Building } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

interface LoginScreenProps {
  onBack: () => void;
  onLogin: (userType: 'retailer' | 'admin') => void;
}

const LoginScreen = ({ onBack, onLogin }: LoginScreenProps) => {
  const [loginType, setLoginType] = useState<'retailer' | 'admin'>('retailer');
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const { toast } = useToast();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!credentials.email || !credentials.password) {
      toast({
        title: "Login Failed",
        description: "Please enter both email and password",
        variant: "destructive"
      });
      return;
    }

    // Simulate authentication
    toast({
      title: "Login Successful",
      description: `Welcome to ${loginType} dashboard`,
    });
    
    onLogin(loginType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="space-y-4">
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
                <CardTitle className="text-2xl text-white">Login to TrueTrack</CardTitle>
                <CardDescription className="text-gray-300">
                  Access your professional dashboard
                </CardDescription>
              </div>
            </div>

            {/* Login Type Selection */}
            <div className="flex gap-2">
              <Button
                type="button"
                variant={loginType === 'retailer' ? 'default' : 'outline'}
                onClick={() => setLoginType('retailer')}
                className="flex-1 flex items-center gap-2"
              >
                <Building className="w-4 h-4" />
                Retailer
              </Button>
              <Button
                type="button"
                variant={loginType === 'admin' ? 'default' : 'outline'}
                onClick={() => setLoginType('admin')}
                className="flex-1 flex items-center gap-2"
              >
                <Lock className="w-4 h-4" />
                Admin
              </Button>
            </div>
          </CardHeader>

          <CardContent>
            <form onSubmit={handleLogin} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-gray-300">Email</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="Enter your email"
                    value={credentials.email}
                    onChange={(e) => setCredentials(prev => ({ ...prev, email: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-300">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    value={credentials.password}
                    onChange={(e) => setCredentials(prev => ({ ...prev, password: e.target.value }))}
                    className="pl-10 bg-slate-700 border-slate-600 text-white placeholder-gray-400"
                  />
                </div>
              </div>

              <Button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700"
                size="lg"
              >
                Login as {loginType === 'retailer' ? 'Retailer' : 'Administrator'}
              </Button>

              <div className="text-center">
                <p className="text-sm text-gray-400">
                  Demo credentials: any email/password combination
                </p>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginScreen;
