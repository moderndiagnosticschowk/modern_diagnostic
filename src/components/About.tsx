import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import doctorImage from "@/assets/doctor-portrait.jpg";
import {
  GraduationCap,
  Award,
  Users,
  Calendar,
  Stethoscope,
  Heart,
} from "lucide-react";

const About = () => {
  const stats = [
    { number: "27+", label: "Years Experience", icon: Calendar },
    { number: "700K+", label: "Patients Served", icon: Users },
    { number: "100%", label: "Dedication", icon: Heart },
    { number: "24/7", label: "Service", icon: Stethoscope },
  ];

  const credentials = [
    { degree: "MBBS", institution: "Medical Excellence" },
    { degree: "MD Radiology", institution: "Diagnostic Specialist" },
  ];

  return (
    <section
      id="about"
      className="relative py-20 overflow-hidden bg-gradient-to-b from-white via-blue-50/30 to-white"
    >
      {/* Decorative background elements */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 -translate-x-1/2 -translate-y-1/2"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20 translate-x-1/2 translate-y-1/2"></div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="bg-blue-600 hover:bg-blue-700 text-white border-0 mb-4 px-4 py-1.5">
            Meet Our Founder
          </Badge>
          <h2 className="text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Dr. Anoop Rastogi
          </h2>
          <div className="flex items-center justify-center gap-3 mb-4">
            {credentials.map((cred, index) => (
              <div key={index} className="flex items-center">
                <Badge
                  variant="outline"
                  className="border-blue-600 text-blue-600 font-semibold"
                >
                  {cred.degree}
                </Badge>
                {index < credentials.length - 1 && (
                  <div className="w-1 h-1 bg-blue-600 rounded-full mx-3"></div>
                )}
              </div>
            ))}
          </div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Pioneering medical diagnostics in Lucknow with unmatched expertise
            and compassion
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-gradient-to-br from-white to-blue-50/50"
            >
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-600 rounded-full mb-4">
                  <stat.icon className="h-6 w-6 text-white" />
                </div>
                <div className="text-3xl font-bold text-gray-900 mb-1">
                  {stat.number}
                </div>
                <div className="text-sm text-gray-600 font-medium">
                  {stat.label}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Main Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Image Side */}
          <div className="relative order-2 lg:order-1">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-600 to-blue-400 rounded-3xl transform rotate-3"></div>
              <div className="relative bg-gradient-to-br from-blue-100 to-blue-50 rounded-3xl overflow-hidden shadow-2xl transform -rotate-1 hover:rotate-0 transition-transform duration-500">
                <div className="aspect-[3/4] flex items-center justify-center p-8">
                  <div className="text-center w-full">
                    <div className="w-40 h-40 bg-white rounded-full shadow-xl flex items-center justify-center mx-auto mb-6 border-4 border-blue-200">
                      <GraduationCap className="h-20 w-20 text-blue-600" />
                    </div>
                    <h4 className="text-2xl font-bold text-gray-800 mb-2">
                      Dr. Anoop Rastogi
                    </h4>
                    <p className="text-base text-gray-600 mb-6">
                      MBBS, MD Radiology
                    </p>
                    <div className="bg-white/80 backdrop-blur rounded-xl p-6 shadow-lg border-2 border-dashed border-blue-400 max-w-xs mx-auto">
                      <div className="text-4xl mb-2">
                        <img
                          src={doctorImage}
                          alt="Dr. Anoop Rastogi - MBBS, MD Radiology, Founder of Modern Diagnostic Center"
                          className="rounded-2xl shadow-2xl w-full h-auto"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-6 -right-6 bg-white rounded-2xl shadow-2xl p-6 border-4 border-blue-600">
                <div className="text-center">
                  <div className="text-4xl font-bold text-blue-600">1997</div>
                  <div className="text-sm text-gray-600 font-semibold">
                    EST.
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Content Side */}
          <div className="space-y-6 order-1 lg:order-2">
            <div className="inline-flex items-center gap-2 bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-semibold">
              <Award className="h-4 w-4" />
              Expert Radiologist & Founder
            </div>

            <h3 className="text-3xl font-bold text-gray-900 leading-tight">
              Transforming Healthcare Through Excellence & Innovation
            </h3>

            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p className="text-lg">
                Since 1997, Dr. Anoop Rastogi has been at the forefront of
                revolutionizing diagnostic medicine in Lucknow. With a profound
                commitment to patient care and diagnostic accuracy, he
                established Modern Diagnostic Center as a beacon of medical
                excellence.
              </p>
              <p className="text-lg">
                His extensive qualifications in MBBS and MD Radiology, combined
                with over two decades of hands-on experience, have positioned
                him as one of the region's most trusted diagnostic specialists.
                Dr. Rastogi's approach combines cutting-edge technology with
                compassionate care, ensuring every patient receives accurate
                diagnoses and personalized attention.
              </p>
              <p className="text-lg">
                Under his visionary leadership, Modern Diagnostic Center has
                served over 700,000 patients, maintaining an unwavering
                commitment to quality, precision, and continuous innovation in
                medical diagnostics.
              </p>
            </div>

            <div className="flex flex-wrap gap-3 pt-4">
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                Advanced Imaging Expert
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                Patient-Centered Care
              </Badge>
              <Badge className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-sm">
                Latest Technology
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
