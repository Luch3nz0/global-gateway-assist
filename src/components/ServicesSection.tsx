
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, Building2, FileText, Users, Globe, Heart } from "lucide-react";

const services = [
  {
    icon: FileText,
    title: "Immigration Services",
    description: "Visa applications, document preparation, and legal guidance for your immigration journey.",
    color: "bg-blue-500",
    features: ["Visa Applications", "Document Review", "Legal Consultation"]
  },
  {
    icon: GraduationCap,
    title: "Study Abroad",
    description: "University applications, student visas, and academic pathway planning.",
    color: "bg-green-500",
    features: ["University Applications", "Student Visas", "Academic Planning"]
  },
  {
    icon: Building2,
    title: "Banking & Finance",
    description: "Open bank accounts, understand credit systems, and manage your finances abroad.",
    color: "bg-purple-500",
    features: ["Bank Account Setup", "Credit Building", "Financial Planning"]
  },
  {
    icon: Users,
    title: "Legal Support",
    description: "Legal assistance for employment, housing, family reunification, and more.",
    color: "bg-orange-500",
    features: ["Employment Law", "Housing Rights", "Family Reunification"]
  }
];

export const ServicesSection = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-green-100 text-green-800 border-green-200">
            Our Services
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need in One Place
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            From visa applications to finding your first job, we provide comprehensive support 
            for every aspect of your immigration journey.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 border-0 shadow-lg hover:scale-105">
              <CardContent className="p-6">
                <div className={`${service.color} w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <service.icon className="w-6 h-6 text-white" />
                </div>
                
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {service.title}
                </h3>
                
                <p className="text-gray-600 mb-4 leading-relaxed">
                  {service.description}
                </p>

                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm text-gray-500">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
