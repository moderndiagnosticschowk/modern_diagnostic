import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Brain, 
  Heart, 
  Bone, 
  Eye, 
  Stethoscope, 
  Activity,
  Microscope,
  Scan,
  TestTube,
  Zap
} from "lucide-react";
import medicalEquipmentImage from "@/assets/medical-equipment.jpg";

const Services = () => {
  const services = [
    {
      icon: Bone,
      title: "X-Ray Imaging",
      description: "Digital radiography for bone, chest, and general diagnostic imaging",
      features: ["Digital X-Ray", "Bone Density Scans", "Chest Imaging"]
    },
    {
      icon: Heart,
      title: "Echocardiography",
      description: "Ultrasound imaging of the heart to assess cardiac function and structure",
      features: ["2D Echo", "Doppler Studies", "Stress Echo"]
    },
    {
      icon: Eye,
      title: "Ultrasound",
      description: "Non-invasive imaging using sound waves for organ and tissue examination",
      features: ["Abdominal USG", "Pelvic Imaging", "Pregnancy Scans"]
    },
    {
      icon: Activity,
      title: "ECG/EKG",
      description: "Electrocardiogram testing for heart rhythm and electrical activity monitoring",
      features: ["12-Lead ECG", "Holter Monitoring", "Stress Testing"]
    }
  ];

  return (
    <section id="services" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="bg-medical-blue-light text-medical-blue border-medical-blue/20 mb-4">
            Our Services
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Comprehensive Diagnostic Services
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            State-of-the-art medical diagnostic equipment and expert analysis for accurate health assessment
          </p>
        </div>

        {/* Featured Equipment Image */}
        <div className="mb-16">
          <div className="relative rounded-2xl overflow-hidden shadow-2xl">
            <img
              src={medicalEquipmentImage}
              alt="Modern Medical Diagnostic Equipment and Technology"
              className="w-full h-64 lg:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-medical-blue/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <Zap className="h-16 w-16 mx-auto mb-4" />
                <h3 className="text-2xl font-bold">Advanced Medical Technology</h3>
                <p className="text-lg opacity-90">Latest diagnostic equipment for precise results</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          {services.map((service, index) => (
            <Card key={index} className="border-medical-blue/20 shadow-card hover:shadow-medical transition-all duration-300 hover:-translate-y-1">
              <CardHeader className="pb-4">
                <div className="bg-medical-blue-light p-3 rounded-lg w-fit mb-4">
                  <service.icon className="h-8 w-8 text-medical-blue" />
                </div>
                <CardTitle className="text-xl text-foreground">
                  {service.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {service.description}
                </p>
                <div className="space-y-2">
                  {service.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-center text-sm">
                      <div className="w-2 h-2 bg-medical-blue rounded-full mr-2"></div>
                      {feature}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Card className="bg-medical-blue-light border-medical-blue/20 shadow-medical">
            <CardContent className="p-8">
              <Stethoscope className="h-12 w-12 text-medical-blue mx-auto mb-4" />
              <h3 className="text-2xl font-bold text-foreground mb-4">
                Expert Medical Analysis
              </h3>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                All diagnostic tests are analyzed by Dr. Anoop Rastogi and our team of qualified medical professionals, 
                ensuring accurate interpretation and reliable results for your health assessment.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default Services;