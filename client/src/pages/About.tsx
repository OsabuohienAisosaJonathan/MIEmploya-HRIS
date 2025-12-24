import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";

export default function About() {
  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-4xl mx-auto space-y-8">
          <div>
            <h1 className="text-4xl font-bold mb-4">About Miemploya HR</h1>
            <p className="text-lg text-muted-foreground">
              Miemploya HR is a professional human resources services company dedicated to supporting organizations and individuals with comprehensive HR solutions.
            </p>
          </div>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-foreground">
              To deliver professional, reliable, and innovative HR services that help organizations optimize their human capital and support individuals in achieving their career goals.
            </p>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="space-y-3 text-foreground">
              <li>
                <span className="font-semibold">Professionalism:</span> We maintain the highest standards in all our services.
              </li>
              <li>
                <span className="font-semibold">Integrity:</span> We operate with transparency and honesty.
              </li>
              <li>
                <span className="font-semibold">Excellence:</span> We strive for quality in everything we do.
              </li>
              <li>
                <span className="font-semibold">Innovation:</span> We embrace new approaches and technologies.
              </li>
            </ul>
          </Card>

          <Card className="p-8">
            <h2 className="text-2xl font-bold mb-4">Why Choose Us?</h2>
            <ul className="space-y-3 text-foreground list-disc pl-6">
              <li>Experienced and certified HR professionals</li>
              <li>Customized solutions tailored to your needs</li>
              <li>Commitment to client satisfaction</li>
              <li>Comprehensive range of services</li>
              <li>Competitive pricing and flexible terms</li>
            </ul>
          </Card>
        </div>
      </div>
      <Footer />
    </>
  );
}
