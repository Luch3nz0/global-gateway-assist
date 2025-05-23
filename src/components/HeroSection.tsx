
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Heart, Shield, Users } from "lucide-react";
import { Link } from "react-router-dom";

export const HeroSection = () => {
  return (
    <section className="relative py-20 lg:py-32 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
              🌍 Serving Brazil & Portugal
            </Badge>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
              Your Journey to a 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-green-600">
                {" "}New Life{" "}
              </span>
              Starts Here
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Navigate immigration, education, banking, and legal processes with confidence. 
              Get personalized guidance every step of the way.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-lg px-8 py-6"
                asChild
              >
                <Link to="/onboarding">
                  Start Your Journey <ArrowRight className="ml-2 w-5 h-5" />
                </Link>
              </Button>
              
              <Button 
                variant="outline" 
                size="lg" 
                className="text-lg px-8 py-6"
                asChild
              >
                <Link to="/demo">
                  See How It Works
                </Link>
              </Button>
            </div>

            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center gap-6 text-sm text-gray-500">
              <div className="flex items-center gap-2">
                <Shield className="w-4 h-4" />
                <span>Secure & Private</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                <span>10,000+ Immigrants Helped</span>
              </div>
              <div className="flex items-center gap-2">
                <Heart className="w-4 h-4" />
                <span>Free Initial Consultation</span>
              </div>
            </div>
          </div>

          {/* Visual */}
          <div className="relative">
            <div className="relative bg-gradient-to-br from-blue-100 to-green-100 rounded-3xl p-8 lg:p-12">
              <div className="space-y-4">
                {/* Mock Interface Elements */}
                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                    <span className="text-sm font-medium">Step 1: Tell us about yourself</span>
                  </div>
                  <div className="bg-gray-100 rounded h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded w-full"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                    <span className="text-sm font-medium">Step 2: Get personalized plan</span>
                  </div>
                  <div className="bg-gray-100 rounded h-2 mb-2">
                    <div className="bg-gradient-to-r from-blue-500 to-green-500 h-2 rounded w-3/4"></div>
                  </div>
                </div>

                <div className="bg-white rounded-lg p-4 shadow-sm">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-3 h-3 bg-gray-300 rounded-full"></div>
                    <span className="text-sm font-medium">Step 3: Connect with partners</span>
                  </div>
                  <div className="bg-gray-100 rounded h-2 mb-2">
                    <div className="bg-gray-300 h-2 rounded w-1/4"></div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-green-500 text-white p-3 rounded-full shadow-lg">
              🎯
            </div>
            <div className="absolute -bottom-4 -left-4 bg-blue-500 text-white p-3 rounded-full shadow-lg">
              ✨
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
