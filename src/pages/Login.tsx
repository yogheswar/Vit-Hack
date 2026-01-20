import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock, ArrowRight, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SolarLogo } from "@/components/SolarLogo";
import solarHeroBg from "@/assets/solar-hero-bg.jpg";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate login - in production, connect to backend
    setTimeout(() => {
      setIsLoading(false);
      navigate("/dashboard");
    }, 1500);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side - Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-12">
        <div className="max-w-md w-full mx-auto">
          <div className="mb-10 animate-fade-in">
            <SolarLogo size="lg" />
          </div>

          <div className="mb-8 animate-fade-in" style={{ animationDelay: "0.1s" }}>
            <h1 className="font-display text-3xl md:text-4xl font-bold mb-3">
              Welcome back
            </h1>
            <p className="text-muted-foreground text-lg">
              Sign in to monitor your solar system performance
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.2s" }}>
              <label className="text-sm font-medium text-foreground">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12"
                  required
                />
              </div>
            </div>

            <div className="space-y-2 animate-fade-in" style={{ animationDelay: "0.3s" }}>
              <label className="text-sm font-medium text-foreground">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 pr-12"
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end animate-fade-in" style={{ animationDelay: "0.4s" }}>
              <Link to="/forgot-password" className="text-sm text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </Link>
            </div>

            <Button
              type="submit"
              variant="solar"
              size="xl"
              className="w-full animate-fade-in"
              style={{ animationDelay: "0.5s" }}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="h-5 w-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full animate-spin" />
              ) : (
                <>
                  Sign In
                  <ArrowRight className="h-5 w-5" />
                </>
              )}
            </Button>
          </form>

          <p className="mt-8 text-center text-muted-foreground animate-fade-in" style={{ animationDelay: "0.6s" }}>
            Don't have an account?{" "}
            <Link to="/signup" className="text-primary hover:text-primary/80 font-medium transition-colors">
              Create account
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Hero Image */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden">
        <div className="absolute inset-0">
          <img
            src={solarHeroBg}
            alt="Solar energy visualization"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative z-10 h-full flex flex-col justify-end p-12">
          <div className="glass rounded-2xl p-8 max-w-md animate-fade-in">
            <div className="flex items-center gap-3 mb-4">
              <div className="h-3 w-3 rounded-full gradient-solar animate-pulse" />
              <span className="text-primary font-medium">Live Monitoring</span>
            </div>
            <h3 className="font-display text-2xl font-bold mb-2">
              Optimize your solar energy
            </h3>
            <p className="text-muted-foreground">
              Track production, savings, and environmental impact in real-time with our intelligent dashboard.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
