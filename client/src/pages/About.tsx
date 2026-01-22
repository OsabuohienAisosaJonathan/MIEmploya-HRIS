import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Briefcase, BookOpen, Package, Code } from "lucide-react";
import teamMeetingImg from "@assets/Document_from_Miemploya_(19)-min_1766649102432.png";
import officeStaffImg from "@assets/about-office-staff.png";
import professionalImg from "@assets/about-professional.png";

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen">
        {/* Section 1: About Miemploya HR */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div className="order-2 md:order-1">
                <h1 className="text-4xl font-bold mb-6">About Miemploya HR</h1>
                <p className="text-foreground mb-4">
                  Miemploya HR is a human resource management and workforce support brand operating under Empleo System Limited, a registered business solutions company focused on delivering structured, technology-driven, and compliant services to organizations across Nigeria.
                </p>
                <p className="text-foreground mb-4">
                  We exist to help businesses manage people effectively, responsibly, and efficiently. Our services cover the full spectrum of human resource needs—from recruitment and onboarding to payroll outsourcing, performance management, compliance support, and workforce advisory.
                </p>
                <p className="text-foreground">
                  At Miemploya HR, we understand that people are the most critical asset of any organization. That is why our approach combines professional HR practices with modern digital tools, ensuring that employers can focus on growth while we support the systems that manage their workforce.
                </p>
              </div>
              <div className="order-1 md:order-2">
                <img
                  src={teamMeetingImg}
                  alt="Miemploya HR professional team meeting"
                  className="w-full h-[240px] md:h-[360px] object-cover rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 2: What We Do */}
        <section className="py-16 px-4 bg-muted">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <img
                  src={officeStaffImg}
                  alt="Miemploya HR office operations"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
              <div>
                <h2 className="text-3xl font-bold mb-6">What We Do</h2>
                <p className="text-foreground mb-4">
                  Miemploya HR provides tailored HR solutions designed to meet the operational realities of small, medium, and growing organizations. Our services are structured to support compliance, transparency, accountability, and sustainable workforce management.
                </p>
                <p className="text-foreground">
                  Beyond traditional HR services, we also deliver digital platforms and applications that enhance learning, payroll administration, inventory control, and performance evaluation. Through these platforms, we connect employers, employees, and professionals within a secure and well-governed ecosystem.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3: Our Digital Ecosystem */}
        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold mb-4 text-center">Our Digital Ecosystem</h2>
            <p className="text-center text-muted-foreground mb-12 max-w-3xl mx-auto">
              As part of Empleo System Limited, Miemploya HR operates and manages several technology-enabled solutions:
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="p-6 text-center hover-elevate">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Briefcase className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">MiPayMaster</h3>
                <p className="text-sm text-muted-foreground">
                  A payroll and salary management application designed to simplify salary processing and workforce payment structures.
                </p>
              </Card>
              <Card className="p-6 text-center hover-elevate">
                <div className="w-12 h-12 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <BookOpen className="w-6 h-6 text-green-600 dark:text-green-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">OpenClax</h3>
                <p className="text-sm text-muted-foreground">
                  A learning, training, and assessment platform supporting professional development and certification.
                </p>
              </Card>
              <Card className="p-6 text-center hover-elevate">
                <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">MiStock HQ</h3>
                <p className="text-sm text-muted-foreground">
                  An inventory and asset management solution for organizations seeking operational control and accountability.
                </p>
              </Card>
              <Card className="p-6 text-center hover-elevate">
                <div className="w-12 h-12 bg-orange-100 dark:bg-orange-900 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Code className="w-6 h-6 text-orange-600 dark:text-orange-400" />
                </div>
                <h3 className="font-bold text-lg mb-2">Custom Software</h3>
                <p className="text-sm text-muted-foreground">
                  Tailored systems developed to meet specific organizational needs and requirements.
                </p>
              </Card>
            </div>
            <p className="text-center text-foreground mt-8 max-w-3xl mx-auto">
              These solutions allow Miemploya HR to go beyond advisory services and provide practical tools that support daily business operations.
            </p>
          </div>
        </section>

        {/* Section 4: Our Approach */}
        <section className="py-16 px-4 bg-muted">
          <div className="container max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
              <div>
                <h2 className="text-3xl font-bold mb-6">Our Approach</h2>
                <p className="text-foreground mb-4">
                  We are driven by professionalism, integrity, and clarity. Every service request, verification process, or engagement is carefully reviewed to ensure accuracy, fairness, and compliance with applicable standards.
                </p>
                <p className="text-foreground">
                  Our processes are designed to protect both organizations and individuals, while maintaining transparency and ethical responsibility. We do not promote shortcuts or informal practices; instead, we support structured systems that stand the test of growth and regulation.
                </p>
              </div>
              <div>
                <img
                  src={professionalImg}
                  alt="Miemploya HR professional approach"
                  className="w-full rounded-lg shadow-lg"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Section 5: Mission, Vision & Commitment */}
        <section className="py-16 px-4">
          <div className="container max-w-4xl mx-auto">
            <div className="space-y-12">
              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Our Mission</h2>
                <p className="text-lg text-foreground">
                  To provide reliable, compliant, and technology-enabled HR and workforce solutions that support organizational growth, workforce quality, and long-term sustainability.
                </p>
              </div>

              <div className="text-center">
                <h2 className="text-3xl font-bold mb-4">Our Vision</h2>
                <p className="text-lg text-foreground">
                  To become a trusted HR and workforce solutions partner for businesses across Nigeria, recognized for professionalism, innovation, and responsible people management.
                </p>
              </div>

              <div>
                <h2 className="text-3xl font-bold mb-6 text-center">Our Commitment</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Card className="p-6">
                    <p className="text-foreground">Supporting organizations with structured HR systems</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-foreground">Promoting accountability and workforce quality</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-foreground">Leveraging technology to simplify HR operations</p>
                  </Card>
                  <Card className="p-6">
                    <p className="text-foreground">Delivering services with professionalism and discretion</p>
                  </Card>
                </div>
                <p className="text-center text-muted-foreground mt-8">
                  As a brand of Empleo System Limited, Miemploya HR continues to evolve, innovate, and expand its offerings to meet the changing needs of modern organizations.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
