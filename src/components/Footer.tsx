import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Phone,
  Mail,
  MapPin,
  Clock,
  Facebook,
  Twitter,
  Instagram,
  Linkedin,
  Heart,
} from "lucide-react";

const Footer = () => {
  const quickLinks = [
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Rate List", href: "#rates" },
    { name: "Contact", href: "#contact" },
  ];

  const services = [
    "X-Ray Imaging",
    "Ultrasound",
    "Echocardiography",
    "ECG/EKG",
  ];

  return (
    <footer className="bg-foreground text-background">
      <div className="container mx-auto px-4 py-12 md:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {/* Company Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-medical-blue rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-lg">M</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    Modern Diagnostic Center
                  </h3>
                  <p className="text-sm text-muted">Since 1997</p>
                </div>
              </div>
              <p className="text-muted leading-relaxed">
                Providing advanced medical diagnostic services in Lucknow with
                expertise, accuracy, and compassionate care for over 27 years.
              </p>
            </div>

            <div className="space-y-3">
              <div className="flex items-center space-x-3 text-sm">
                <MapPin className="h-4 w-4 text-medical-blue" />
                <span>Chowk, Lucknow, Uttar Pradesh</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Phone className="h-4 w-4 text-medical-blue" />
                <span>0522-4071707</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Mail className="h-4 w-4 text-medical-blue" />
                <span>moderndiagnosticschowk@gmail.com</span>
              </div>
              <div className="flex items-center space-x-3 text-sm">
                <Clock className="h-4 w-4 text-medical-blue" />
                <span>Mon-Sat: 8:00 AM - 8:00 PM</span>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
            <div className="space-y-3">
              {quickLinks.map((link, index) => (
                <a
                  key={index}
                  href={link.href}
                  className="block text-muted hover:text-medical-blue transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-lg font-semibold mb-6">Our Services</h4>
            <div className="space-y-3">
              {services.map((service, index) => (
                <div key={index} className="flex items-center space-x-2">
                  <div className="w-1.5 h-1.5 bg-medical-blue rounded-full"></div>
                  <span className="text-muted text-sm">{service}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <Separator className="my-1 bg-muted/20" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
          <div className="text-center md:text-left">
            <p className="text-muted text-sm">
              © 2025 Modern Diagnostic Center. All rights reserved.
            </p>
            <p className="text-muted text-xs mt-1">
              Founded by Dr. Anoop Rastogi (MBBS, MD Radiology) • Established
              1997
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 text-sm">
            <a
              href="#"
              className="text-muted hover:text-medical-blue transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-muted hover:text-medical-blue transition-colors"
            >
              Terms of Service
            </a>
            <div className="flex items-center text-muted">
              <Heart className="h-4 w-4 text-red-500 mx-1" />
              <span>Sangam</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
