import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Navigation,
  Calendar,
  MessageCircle,
  Ambulance,
} from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: Phone,
      title: "Phone Numbers",
      details: [{ label: "Main Line", value: "0522-4071707" }],
    },
    {
      icon: MapPin,
      title: "Address",
      details: [
        { label: "Location", value: "Modern Diagnostic Center" },
        { label: "Area", value: "Chowk, Lucknow" },
        { label: "State", value: "Uttar Pradesh, India" },
      ],
    },
    {
      icon: Mail,
      title: "Email Contact",
      details: [
        { label: "General Info", value: "moderndiagnosticschowk@gmail.com" },
      ],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: [
        { label: "Monday - Saturday", value: "8:00 AM - 8:00 PM" },
        { label: "Sunday", value: "8:00 AM - 2:00 PM" },
      ],
    },
  ];

  return (
    <section id="contact" className="py-16 md:py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge
            variant="secondary"
            className="bg-medical-blue-light text-medical-blue border-medical-blue/20 mb-4"
          >
            Contact Us
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            Get in Touch
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Easy access to quality healthcare. Contact us for inquiries.
          </p>
        </div>

        {/* Contact Information Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mb-8 md:mb-12">
          {contactInfo.map((info, index) => (
            <Card key={index} className="border-medical-blue/20 shadow-card">
              <CardHeader className="pb-4">
                <div className="bg-medical-blue-light p-3 rounded-lg w-fit mb-2">
                  <info.icon className="h-6 w-6 text-medical-blue" />
                </div>
                <CardTitle className="text-lg text-foreground">
                  {info.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {info.details.map((detail, detailIndex) => (
                    <div key={detailIndex}>
                      <div className="text-sm text-muted-foreground">
                        {detail.label}
                      </div>
                      <div className="font-medium text-foreground">
                        {detail.value}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Location Map Placeholder */}
        <Card className="border-medical-blue/20 shadow-card">
          <CardHeader>
            <CardTitle className="text-xl text-foreground flex items-center">
              <MapPin className="h-6 w-6 text-medical-blue mr-2" />
              Our Location
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg overflow-hidden h-64">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3559.651855187496!2d80.923133!3d26.857424!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x399be2b9d98d59e3%3A0xf90c705c86e65e52!2sModern%20Diagnostic%20Center!5e0!3m2!1sen!2sin!4v1695190400000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
            <div className="text-center mt-4">
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Modern Diagnostic Center
              </h3>
              <p className="text-muted-foreground">
                Chowk, Lucknow, Uttar Pradesh
              </p>
              <Button
                variant="outline"
                className="border-medical-blue text-medical-blue hover:bg-medical-blue-light mt-4"
                asChild
              >
                <a
                  href="https://maps.app.goo.gl/B6qagSUQwccCukip7"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Navigation className="h-4 w-4 mr-2" />
                  Get Directions
                </a>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Contact;
