import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

const SERVICES = [
  { name: "HR Consultancy", desc: "Strategic HR consulting and guidance" },
  { name: "Recruitment", desc: "Talent acquisition and hiring services" },
  { name: "Training & Development", desc: "Professional development programs" },
  { name: "Onboarding & Offboarding Services", desc: "Employee transition management" },
  { name: "Attendance Management", desc: "Attendance tracking and reporting" },
  { name: "Payroll Outsourcing Services", desc: "Payroll processing and compliance" },
  { name: "Performance Evaluation", desc: "Performance assessment and management" },
  { name: "Audit Support", desc: "HR audit and compliance support" },
  { name: "Compliance Support", desc: "Regulatory compliance assistance" },
  { name: "Background & Reference Checks", desc: "Candidate verification services" },
  { name: "MiPayMaster Application", desc: "Advanced payroll application" },
  { name: "OpenClax Application", desc: "HR management system" },
  { name: "MiStock HQ Application", desc: "Inventory management solution" },
  { name: "Customized Software Development", desc: "Bespoke software solutions" },
  { name: "Candidate Verification", desc: "Verification for top talent" },
];

export default function Services() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive HR solutions tailored to your organization's needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <Card key={service.name} className="p-6 hover-elevate">
                <h3 className="text-xl font-bold mb-2">{service.name}</h3>
                <p className="text-muted-foreground mb-4">{service.desc}</p>
                <Link href="/contact">
                  <Button variant="outline" size="sm">
                    Request Service
                  </Button>
                </Link>
              </Card>
            ))}
          </div>

          <div className="mt-12 p-8 bg-blue-50 dark:bg-blue-950 rounded-lg text-center">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 text-muted-foreground">
              Contact us today to request any of our professional HR services.
            </p>
            <Link href="/contact">
              <Button size="lg">Request a Service</Button>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
