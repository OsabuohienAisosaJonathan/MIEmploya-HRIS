import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Link } from "wouter";
import { useState } from "react";
import { ChevronRight, CheckCircle } from "lucide-react";

interface ServiceData {
  id: string;
  name: string;
  shortDesc: string;
  description: string;
  purpose: string;
  benefits: string[];
}

const SERVICES: ServiceData[] = [
  {
    id: "hr-consultancy",
    name: "HR Consultancy",
    shortDesc: "Professional HR advisory services to help organizations structure, manage, and improve their workforce systems.",
    description: "Miemploya HR provides professional HR consultancy services to help organizations design, implement, and manage effective human resource systems.",
    purpose: "To support organizations in building structured HR frameworks that promote compliance, efficiency, and workforce stability.",
    benefits: ["Improved HR structure and clarity", "Better employee relations", "Compliance-focused HR practices"]
  },
  {
    id: "recruitment",
    name: "Recruitment",
    shortDesc: "End-to-end recruitment support to help organizations attract, assess, and hire suitable candidates.",
    description: "Our recruitment service supports organizations in sourcing, screening, and selecting qualified candidates across various roles.",
    purpose: "To reduce hiring risks and ensure organizations engage competent and suitable employees.",
    benefits: ["Access to qualified candidates", "Reduced recruitment errors", "Time-efficient hiring process"]
  },
  {
    id: "training-development",
    name: "Training & Development",
    shortDesc: "Workforce training solutions designed to improve employee skills, performance, and professional growth.",
    description: "We provide training programs designed to enhance employee knowledge, skills, and workplace effectiveness.",
    purpose: "To improve workforce performance and support continuous professional development.",
    benefits: ["Skilled and productive employees", "Improved job performance", "Professional growth opportunities"]
  },
  {
    id: "onboarding-offboarding",
    name: "Onboarding & Offboarding Services",
    shortDesc: "Structured processes to manage employee entry and exit professionally and compliantly.",
    description: "Structured onboarding and offboarding services that manage employee entry and exit professionally.",
    purpose: "To ensure smooth employee transitions while protecting organizational interests.",
    benefits: ["Organized onboarding process", "Proper exit documentation", "Reduced compliance risks"]
  },
  {
    id: "attendance-management",
    name: "Attendance Management",
    shortDesc: "Systems and processes to monitor employee attendance, work hours, and workforce discipline.",
    description: "Attendance management solutions to monitor employee punctuality, work hours, and attendance records.",
    purpose: "To promote discipline and accurate workforce tracking.",
    benefits: ["Improved attendance accountability", "Reliable attendance records", "Better workforce planning"]
  },
  {
    id: "payroll-outsourcing",
    name: "Payroll Outsourcing Services",
    shortDesc: "Complete payroll processing and salary administration handled accurately and confidentially.",
    description: "We manage payroll processing, salary computation, and related administrative tasks on behalf of organizations.",
    purpose: "To ensure accurate and timely salary administration while reducing internal workload.",
    benefits: ["Accurate payroll processing", "Confidential handling of salaries", "Reduced administrative burden"]
  },
  {
    id: "performance-evaluation",
    name: "Performance Evaluation",
    shortDesc: "Structured performance assessment tools to measure productivity, competence, and growth.",
    description: "Performance evaluation services that assess employee productivity, competence, and contribution.",
    purpose: "To support fair appraisal, growth planning, and workforce improvement.",
    benefits: ["Objective performance assessment", "Improved employee motivation", "Better management decisions"]
  },
  {
    id: "audit-support",
    name: "Audit Support",
    shortDesc: "HR and payroll audit support services to assist organizations during internal or statutory reviews.",
    description: "HR and payroll audit support services that assist organizations during review and compliance exercises.",
    purpose: "To ensure HR records and payroll processes meet audit requirements.",
    benefits: ["Organized documentation", "Audit readiness", "Reduced audit risks"]
  },
  {
    id: "compliance-support",
    name: "Compliance Support",
    shortDesc: "Guidance and support to help organizations align HR practices with applicable regulations.",
    description: "Compliance support services that guide organizations on HR-related regulatory obligations.",
    purpose: "To help organizations align HR practices with applicable laws and standards.",
    benefits: ["Reduced compliance risks", "Proper documentation", "Professional guidance"]
  },
  {
    id: "background-reference-checks",
    name: "Background & Reference Checks",
    shortDesc: "Verification services to confirm candidate credentials, employment history, and references.",
    description: "Verification services to confirm candidate credentials, employment history, and references.",
    purpose: "To support informed hiring decisions and reduce employment risks.",
    benefits: ["Verified candidate information", "Reduced hiring fraud", "Improved recruitment confidence"]
  },
  {
    id: "mipaymaster",
    name: "MiPayMaster Application",
    shortDesc: "A payroll and salary management application designed to simplify employee payment processes.",
    description: "MiPayMaster is a payroll application that supports salary processing and workforce payment management.",
    purpose: "To simplify payroll administration through digital solutions.",
    benefits: ["Efficient salary processing", "Improved payroll accuracy", "Centralized payroll management"]
  },
  {
    id: "openclax",
    name: "OpenClax Application",
    shortDesc: "A learning, training, and assessment platform supporting workforce development and certification.",
    description: "OpenClax is a learning and assessment platform supporting training, certification, and knowledge development.",
    purpose: "To promote continuous learning and workforce capacity building.",
    benefits: ["Accessible training resources", "Structured assessments", "Professional certification support"]
  },
  {
    id: "mistock-hq",
    name: "MiStock HQ Application",
    shortDesc: "An inventory and asset management solution for improved operational control and accountability.",
    description: "MiStock HQ provides inventory and asset management tools for operational efficiency.",
    purpose: "To support proper tracking and control of organizational resources.",
    benefits: ["Improved inventory control", "Reduced losses", "Better operational visibility"]
  },
  {
    id: "customized-software",
    name: "Customized Software",
    shortDesc: "Tailored software solutions developed to meet specific organizational and operational needs.",
    description: "We develop customized software solutions tailored to specific organizational needs.",
    purpose: "To address unique operational challenges through technology.",
    benefits: ["Tailored functionality", "Improved efficiency", "Scalable solutions"]
  }
];

function ServiceDetailDialog({ service }: { service: ServiceData }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Card 
          className="p-6 hover-elevate cursor-pointer group" 
          data-testid={`card-service-${service.id}`}
        >
          <h3 className="text-xl font-bold mb-2">{service.name}</h3>
          <p className="text-muted-foreground mb-4">{service.shortDesc}</p>
          <div className="flex items-center gap-1 text-blue-600 font-medium">
            <span>View Details</span>
            <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </div>
        </Card>
      </DialogTrigger>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{service.name}</DialogTitle>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div>
            <h4 className="font-bold text-lg mb-2">Description</h4>
            <p className="text-foreground">{service.description}</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Purpose</h4>
            <p className="text-foreground">{service.purpose}</p>
          </div>
          <div>
            <h4 className="font-bold text-lg mb-2">Benefits</h4>
            <ul className="space-y-2">
              {service.benefits.map((benefit, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" />
                  <span className="text-foreground">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="pt-4 border-t">
            <Link href={`/contact?service=${encodeURIComponent(service.name)}`}>
              <Button 
                className="w-full" 
                size="lg"
                data-testid={`button-request-${service.id}`}
                onClick={() => setOpen(false)}
              >
                Request This Service
              </Button>
            </Link>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

export default function Services() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Our Services</h1>
            <p className="text-lg text-muted-foreground">
              Comprehensive HR solutions tailored to your organization's needs. Click on any service to learn more.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {SERVICES.map((service) => (
              <ServiceDetailDialog key={service.id} service={service} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
