
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Globe, Menu, X } from "lucide-react";
import { Link } from "react-router-dom";
import { useState } from "react";

export const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-green-600 rounded-lg flex items-center justify-center">
              <Globe className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">GlobalGateway</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex items-center space-x-6">
              <Link to="/onboarding" className="text-gray-600 hover:text-gray-900 transition-colors">
                Get Started
              </Link>
              <Link to="/services" className="text-gray-600 hover:text-gray-900 transition-colors">
                Services
              </Link>
              <Link to="/partners" className="text-gray-600 hover:text-gray-900 transition-colors">
                Partners
              </Link>
              <Link to="/about" className="text-gray-600 hover:text-gray-900 transition-colors">
                About
              </Link>
            </div>
            
            <div className="flex items-center space-x-2">
              <Badge variant="outline" className="text-xs">
                🇧🇷 🇵🇹
              </Badge>
              <Button variant="outline" size="sm" asChild>
                <Link to="/login">Sign In</Link>
              </Button>
              <Button size="sm" className="bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700" asChild>
                <Link to="/dashboard">Dashboard</Link>
              </Button>
            </div>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-4">
              <Link 
                to="/onboarding" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Get Started
              </Link>
              <Link 
                to="/services" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link 
                to="/partners" 
                className="text-gray-600 hover:text-gray-900 transition-colors" 
                onClick={() => setIsMenuOpen(false)}
              >
                Partners
              </Link>
              <Link 
                to="/about" 
                className="text-gray-600 hover:text-gray-900 transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <div className="pt-2 border-t border-gray-200">
                <div className="flex flex-col space-y-2">
                  <Button 
                    variant="outline" 
                    size="sm" 
                    asChild
                  >
                    <Link to="/login" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                  </Button>
                  <Button 
                    size="sm" 
                    className="bg-gradient-to-r from-blue-600 to-green-600" 
                    asChild
                  >
                    <Link to="/dashboard" onClick={() => setIsMenuOpen(false)}>Dashboard</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
