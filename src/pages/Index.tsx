
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Globe, GraduationCap, Building2, FileText, Users, Shield, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { ServicesSection } from "@/components/ServicesSection";
import { PartnersSection } from "@/components/PartnersSection";
import { StatsSection } from "@/components/StatsSection";
import { Footer } from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <Navbar />
      <main>
        <HeroSection />
        <StatsSection />
        <ServicesSection />
        <PartnersSection />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
