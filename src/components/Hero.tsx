import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Shield, Award, Users, Clock } from "lucide-react";
import heroImage from "@/assets/hero-medical.jpg";

const Hero = () => {
  return (
    <section id="home" className="pt-28 md:pt-32 pb-16 md:pb-20 bg-gradient-to-br from-medical-blue-light via-background to-medical-blue-light">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="space-y-4">
              <Badge variant="secondary" className="bg-medical-blue-light text-medical-blue border-medical-blue/20">
                Serving Since 1997
              </Badge>
             <h1 className="text-center leading-tight">
  <span className="text-7xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
    Modern
  </span>
  <span className="block mt-2 text-3xl md:text-4xl lg:text-6xl font-semibold tracking-wide text-primary uppercase">
    Diagnostic Center
  </span> 
               <span className="text-3xl md:text-4xl lg:text-3xl font-extrabold tracking-tight text-foreground drop-shadow-sm">
    Chowk
  </span>
</h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                Advanced medical diagnostics and radiology services in the heart of Lucknow. 
                Trusted by thousands of patients for accurate and reliable diagnostic solutions.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#services"
                className="inline-flex items-center justify-center border border-medical-blue text-medical-blue hover:bg-medical-blue-light font-medium rounded-md px-6 py-3 text-lg transition-colors"
              >
                View Services
              </a>
            </div>

            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="text-center">
                <div className="bg-medical-blue-light p-2 md:p-3 rounded-lg w-fit mx-auto mb-2">
                  <Shield className="h-4 w-4 md:h-6 md:w-6 text-medical-blue" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">27+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Years Experience</div>
              </div>
              <div className="text-center">
                <div className="bg-medical-blue-light p-2 md:p-3 rounded-lg w-fit mx-auto mb-2">
                  <Users className="h-4 w-4 md:h-6 md:w-6 text-medical-blue" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">700K+</div>
                <div className="text-xs md:text-sm text-muted-foreground">Patients Served</div>
              </div>
              <div className="text-center">
                <div className="bg-medical-blue-light p-2 md:p-3 rounded-lg w-fit mx-auto mb-2">
                  <Award className="h-4 w-4 md:h-6 md:w-6 text-medical-blue" />
                </div>
                <div className="text-xl md:text-2xl font-bold text-foreground">99%</div>
                <div className="text-xs md:text-sm text-muted-foreground">Accuracy Rate</div>
              </div>
            </div>
          </div>

          <div className="relative">
            <div className="relative z-10">
              <img
                src={heroImage}
                alt="Modern Diagnostic Center - Advanced Medical Facility"
                className="rounded-2xl shadow-2xl w-full h-auto"
              />
            </div>
            <div className="absolute -top-4 -right-4 w-full h-full bg-medical-blue/10 rounded-2xl -z-0"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
