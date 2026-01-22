import { useEffect, useState, useMemo } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, CreditCard, FileText, ArrowRight, Loader2, Activity, Zap } from "lucide-react";
import { Link } from "react-router-dom";
import { fetchActiveRates, type RateItem } from "@/lib/data";

const PREVIEW_LIMIT = 3;

const categoryIcons = new Map<string, JSX.Element>([
  ["radiology", <FileText className="h-5 w-5" />],
  ["x-ray", <FileText className="h-5 w-5" />],
  ["cardiac", <Activity className="h-5 w-5" />],
  ["echo", <Activity className="h-5 w-5" />],
  ["blood", <Zap className="h-5 w-5" />],
]);

const categoryColors = {
  radiology: "from-blue-500 to-cyan-500",
  "x-ray": "from-indigo-500 to-blue-500",
  cardiac: "from-rose-500 to-pink-500",
  echo: "from-purple-500 to-rose-500",
  blood: "from-amber-500 to-orange-500",
};

const getCategoryIcon = (category: string) => {
  const key = category.toLowerCase();
  for (const [match, icon] of categoryIcons.entries()) {
    if (key.includes(match)) return icon;
  }
  return <FileText className="h-5 w-5" />;
};

const getCategoryGradient = (category: string) => {
  const key = category.toLowerCase();
  for (const [match, gradient] of Object.entries(categoryColors)) {
    if (key.includes(match)) return gradient;
  }
  return "from-slate-500 to-slate-600";
};

const Rates = () => {
  const [rates, setRates] = useState<RateItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRates();
  }, []);

  const fetchRates = async () => {
    try {
      const data = await fetchActiveRates();
      setRates(data || []);
    } catch (error) {
      console.error("Error fetching rates:", error);
    } finally {
      setLoading(false);
    }
  };

  const groupedRates = useMemo(() => {
    return rates.reduce((acc, rate) => {
      if (!acc[rate.category]) acc[rate.category] = [];
      acc[rate.category].push(rate);
      return acc;
    }, {} as Record<string, RateItem[]>);
  }, [rates]);

  const previewCategories = useMemo(() => Object.entries(groupedRates).slice(0, PREVIEW_LIMIT), [groupedRates]);
  const hasMoreCategories = Object.keys(groupedRates).length > PREVIEW_LIMIT;

  if (loading) {
    return (
      <section id="rates" className="py-20 bg-gradient-to-b from-slate-50 to-white">
        <div className="container mx-auto px-4 text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-blue-600" />
          <p className="text-slate-600 mt-4">Loading rates...</p>
        </div>
      </section>
    );
  }

  return (
    <section id="rates" className="py-20 md:py-28 bg-gradient-to-b from-slate-50 to-white relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16 md:mb-20">
          <Badge variant="outline" className="border-blue-200 bg-blue-50 text-blue-700 mb-4 text-sm font-medium">
            ✓ Transparent Pricing
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-slate-900 to-slate-700 mb-6">
            Affordable Healthcare for Everyone
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            No hidden charges. No surprises. Get quality diagnostic services at prices that work for you.
          </p>
        </div>

        {/* Info Banner */}
        <div className="mb-12 max-w-4xl mx-auto">
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-6 md:p-8">
            <div className="flex gap-4">
              <div className="flex-shrink-0">
                <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white">
                  <CreditCard className="h-6 w-6" />
                </div>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-slate-900 mb-1">Flexible Payment Options</h3>
                <p className="text-slate-700">Rates subject to change. Contact us for package deals and insurance information.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Category Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {previewCategories.map(([category, tests]) => {
            const gradient = getCategoryGradient(category);
            
            return (
              <div key={category} className="group">
                <Card className="h-full border-0 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden bg-white">
                  {/* Gradient Header */}
                  <div className={`bg-gradient-to-br ${gradient} p-6 text-white relative overflow-hidden`}>
                    <div className="absolute inset-0 opacity-10" style={{backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'}}></div>
                    <div className="relative flex items-start justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className="bg-white/20 backdrop-blur-sm p-2 rounded-lg">
                            <div className="text-white">{getCategoryIcon(category)}</div>
                          </div>
                          <h3 className="text-2xl font-bold capitalize">{category}</h3>
                        </div>
                        <p className="text-white/90 text-sm">Starting from ₹{Math.min(...tests.map(t => t.price))}</p>
                      </div>
                    </div>
                  </div>

                  {/* Content */}
                  <CardContent className="p-6">
                    <div className="space-y-4 mb-6">
                      {tests.slice(0, 3).map((test) => (
                        <div key={test.id} className="flex items-start justify-between gap-4 pb-4 last:pb-0 border-b border-slate-100 last:border-0">
                          <div className="flex-1 min-w-0">
                            <p className="font-semibold text-slate-900 text-sm">{test.test_name}</p>
                            <p className="text-xs text-slate-600 mt-1">{test.description}</p>
                          </div>
                          <div className="flex-shrink-0 text-right">
                            <p className="text-lg font-bold text-blue-600">₹{test.price}</p>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Footer */}
                    <div className="pt-4 border-t border-slate-100">
                      <div className="flex items-center justify-between mb-4">
                        <span className="text-sm text-slate-600 font-medium">{tests.length} tests available</span>
                        {tests.length > 3 && (
                          <Badge variant="secondary" className="text-xs">+{tests.length - 3} more</Badge>
                        )}
                      </div>
                      <Button 
                        asChild
                        variant="outline" 
                        size="sm" 
                        className="w-full border-blue-200 hover:bg-blue-50 text-blue-600 font-medium"
                      >
                        <Link to={`/rates?category=${encodeURIComponent(category)}`}>
                          View Details
                          <ArrowRight className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            );
          })}
        </div>

        {/* CTA Section */}
        {hasMoreCategories && (
            <div className="text-center">
          <div className="inline-block">
              <Button
                asChild
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all"
              >
                <Link to="/rates">
                  Browse Complete Rate List
                  <ArrowRight className="ml-3 h-5 w-5" />
                </Link>
              </Button>
            </div>
            <p className="text-slate-600 mt-4 text-sm">
              Explore all {Object.keys(groupedRates).length} categories with detailed pricing and search
            </p>
          </div>
        )}

        {/* Trust Badges */}
        <div className="mt-16 md:mt-20 pt-12 border-t border-slate-200">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { label: "No Hidden Charges", icon: "✓" },
              { label: "Insurance Accepted", icon: "✓" },
              { label: "Certified Labs", icon: "✓" },
              { label: "Quick Results", icon: "✓" },
            ].map((item, idx) => (
              <div key={idx}>
                <div className="text-2xl font-bold text-blue-600 mb-2">{item.icon}</div>
                <p className="text-sm text-slate-600 font-medium">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Rates;
