import { useEffect, useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clock, CreditCard, FileText, Search, ArrowLeft } from "lucide-react";
import { fetchActiveRates, type RateItem } from "@/lib/data";
import { useNavigate, useLocation } from "react-router-dom";

const RatesPage = () => {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [filteredRates, setFilteredRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    fetchRates();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const category = params.get("category");
    if (category) {
      setSearchTerm(category);
    }
  }, [location.search]);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredRates(rates);
    } else {
      const filtered = rates.filter(
        (rate) =>
          rate.test_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rate.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
          rate.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredRates(filtered);
    }
  }, [searchTerm, rates]);

  const fetchRates = async () => {
    try {
      const data = await fetchActiveRates();
      setRates(data || []);
      setFilteredRates(data || []);
    } catch (error) {
      console.error('Error fetching rates:', error);
    } finally {
      setLoading(false);
    }
  };

  // Group rates by category
  const groupedRates = filteredRates.reduce((acc, rate) => {
    if (!acc[rate.category]) {
      acc[rate.category] = [];
    }
    acc[rate.category].push(rate);
    return acc;
  }, {} as Record<string, RateItem[]>);

  const getCategoryIcon = (category: string) => {
    if (category.toLowerCase().includes('radiology') || category.toLowerCase().includes('x-ray')) return FileText;
    if (category.toLowerCase().includes('cardiac') || category.toLowerCase().includes('echo')) return Clock;
    if (category.toLowerCase().includes('blood')) return CreditCard;
    return FileText;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-medical-gray-light">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <p className="text-muted-foreground">Loading rates...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-medical-gray-light to-white">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-medical-blue to-medical-blue/90 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center gap-4 mb-6">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 border-white/20 text-black hover:bg-white/10"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Home
            </Button>
          </div>
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Complete Rate List
            </h1>
            <p className="text-xl text-white/90 animate-fade-in">
              Transparent pricing for all our diagnostic services with no hidden charges
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">

        {/* Search Section */}
        <div className="max-w-2xl mx-auto mb-12">
          <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
            <CardContent className="p-8">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-semibold text-foreground mb-2">Find Your Test</h2>
                <p className="text-muted-foreground">Search through our comprehensive list of diagnostic services</p>
              </div>
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <Input
                  placeholder="Search tests, categories, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-12 h-14 text-lg border-2 border-border focus:border-medical-blue transition-colors"
                />
              </div>
              {searchTerm && (
                <div className="mt-4 p-3 bg-medical-blue-light rounded-lg">
                  <p className="text-sm text-medical-blue font-medium">
                    Found {filteredRates.length} result(s) for "{searchTerm}"
                  </p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Important Notice */}
        <div className="max-w-4xl mx-auto mb-12">
          <Card className="border-medical-blue/20 shadow-lg bg-gradient-to-r from-medical-blue-light to-medical-blue-light/50">
            <CardContent className="p-6">
              <div className="flex items-start gap-4">
                <div className="bg-medical-blue p-3 rounded-full flex-shrink-0">
                  <FileText className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-medical-blue mb-2">
                    Important Information
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    All rates are current as of today and may be subject to change. Please contact us for the most 
                    up-to-date pricing, package deals, and insurance coverage information. We accept most major 
                    insurance plans for applicable tests.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Results */}
        {Object.keys(groupedRates).length === 0 ? (
          <div className="max-w-lg mx-auto">
            <Card className="text-center py-16 border-0 shadow-lg">
              <CardContent>
                <div className="mb-6">
                  <Search className="h-16 w-16 text-muted-foreground mx-auto mb-4 opacity-50" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">No tests found</h3>
                <p className="text-muted-foreground text-lg mb-6">
                  We couldn't find any tests matching your search criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setSearchTerm("")}
                  className="hover-scale"
                >
                  Clear Search & View All Tests
                </Button>
              </CardContent>
            </Card>
          </div>
        ) : (
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
            {Object.entries(groupedRates).map(([categoryName, tests], index) => {
              const IconComponent = getCategoryIcon(categoryName);
              return (
                <Card 
                  key={categoryName} 
                  className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover-scale bg-white/90 backdrop-blur-sm animate-fade-in"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <CardHeader className="bg-gradient-to-r from-medical-blue to-medical-blue/90 text-white">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-4">
                        <div className="bg-white/20 p-3 rounded-xl backdrop-blur-sm">
                          <IconComponent className="h-7 w-7 text-white" />
                        </div>
                        <div>
                          <CardTitle className="text-xl font-bold text-white">
                            {categoryName}
                          </CardTitle>
                          <p className="text-white/80 text-sm">
                            Professional diagnostic services
                          </p>
                        </div>
                      </div>
                      <Badge variant="secondary" className="bg-white/20 text-white border-white/30">
                        {tests.length} test{tests.length !== 1 ? 's' : ''}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent className="p-0">
                    <div className="divide-y divide-border">
                      {tests.map((test, testIndex) => (
                        <div 
                          key={test.id} 
                          className="p-6 hover:bg-medical-gray-light/30 transition-colors duration-200"
                        >
                          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                            <div className="flex-1 space-y-2">
                              <h4 className="font-semibold text-foreground text-lg leading-tight">
                                {test.test_name}
                              </h4>
                              <p className="text-muted-foreground leading-relaxed">
                                {test.description}
                              </p>
                            </div>
                            <div className="flex-shrink-0">
                              <div className="bg-gradient-to-r from-medical-blue to-medical-blue/90 text-white px-4 py-2 rounded-lg">
                                <div className="text-2xl font-bold">₹{test.price}</div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        )}

        {/* Footer Call to Action */}
        <div className="mt-16 text-center">
          <Card className="max-w-2xl mx-auto border-0 shadow-lg bg-gradient-to-r from-medical-blue to-medical-blue/90 text-white">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Need Help Choosing?</h3>
              <p className="text-white/90 mb-6 text-lg">
                Our healthcare professionals are here to help you select the right tests for your needs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  variant="outline" 
                  className="border-white/30 text-black hover:bg-white/10 hover-scale"
                  onClick={() => navigate("/#contact")}
                >
                  Contact Us
                </Button>
                <Button 
                  variant="secondary"
                  className="bg-white text-medical-blue hover:bg-white/90 hover-scale"
                >
                  Call: 0522-4071707
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default RatesPage;
