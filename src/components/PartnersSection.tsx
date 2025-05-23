
import { Badge } from "@/components/ui/badge";

export const PartnersSection = () => {
  const partners = [
    { name: "Brazilian Consulate", type: "Government" },
    { name: "Portuguese Embassy", type: "Government" },
    { name: "University of São Paulo", type: "Education" },
    { name: "University of Porto", type: "Education" },
    { name: "Banco do Brasil", type: "Banking" },
    { name: "Millennium BCP", type: "Banking" },
    { name: "Immigration Law Firm", type: "Legal" },
    { name: "Global Legal Partners", type: "Legal" }
  ];

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-blue-100 text-blue-800 border-blue-200">
            Trusted Partners
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
            Working with Leading Organizations
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            We've partnered with consulates, universities, banks, and legal firms 
            to provide you with verified, reliable services.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {partners.map((partner, index) => (
            <div key={index} className="bg-white rounded-lg p-6 text-center shadow-sm hover:shadow-md transition-shadow">
              <div className="w-16 h-16 bg-gray-100 rounded-lg mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">
                  {partner.type === 'Government' && '🏛️'}
                  {partner.type === 'Education' && '🎓'}
                  {partner.type === 'Banking' && '🏦'}
                  {partner.type === 'Legal' && '⚖️'}
                </span>
              </div>
              <h3 className="font-semibold text-gray-900 mb-1">{partner.name}</h3>
              <Badge variant="outline" className="text-xs">
                {partner.type}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
