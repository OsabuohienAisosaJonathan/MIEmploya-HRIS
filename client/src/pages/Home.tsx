import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

const SERVICES = [
  "HR Consultancy", "Recruitment", "Training & Development",
  "Onboarding & Offboarding", "Attendance Management", "Payroll Outsourcing",
  "Performance Evaluation", "Audit Support", "Compliance Support",
  "Background & Reference Checks", "MiPayMaster", "OpenClax",
  "MiStock HQ", "Customized Software", "Candidate Verification"
];

export default function Home() {
  const { data: content } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch("/api/content").then((r) => r.json()),
  });

  const { data: candidates } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  const videos = content?.filter((c: any) => c.type === "video") || [];
  const pdfs = content?.filter((c: any) => c.type === "pdf") || [];
  const events = content?.filter((c: any) => c.type === "event") || [];

  return (
    <>
      <Header />
      <div className="w-full">
        {/* Hero */}
        <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white">
          <div className="container max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-4">Welcome to Miemploya HR</h1>
            <p className="text-xl mb-8 opacity-90">
              Professional HR services and talent verification solutions
            </p>
            <Link href="/contact">
              <Button variant="secondary" size="lg">
                Request a Service
              </Button>
            </Link>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 px-4">
          <div className="container max-w-5xl mx-auto">
            <h2 className="text-3xl font-bold mb-12 text-center">Our Services</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {SERVICES.map((service) => (
                <Card key={service} className="p-4 hover-elevate">
                  <p className="font-medium text-foreground">{service}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* Videos */}
        {videos.length > 0 && (
          <section className="py-16 px-4 bg-muted">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Latest Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.map((v: any) => (
                  <Card key={v.id} className="overflow-hidden">
                    <div className="bg-slate-300 h-48 flex items-center justify-center">
                      <span className="text-gray-600">Video: {v.title}</span>
                    </div>
                    <div className="p-4">
                      <p className="font-medium">{v.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">{v.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Events */}
        {events.length > 0 && (
          <section className="py-16 px-4">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Upcoming Events</h2>
              <div className="space-y-4">
                {events.map((e: any) => (
                  <Card key={e.id} className="p-6 hover-elevate">
                    <h3 className="font-bold text-lg">{e.title}</h3>
                    <p className="text-muted-foreground mt-2">{e.description}</p>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Top Verified */}
        {candidates && candidates.length > 0 && (
          <section className="py-16 px-4 bg-muted">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Top Verified Candidates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {candidates.slice(0, 6).map((c: any) => (
                  <Card key={c.id} className="p-6 text-center hover-elevate">
                    {c.imageUrl && <img src={c.imageUrl} alt={c.fullName} className="w-20 h-20 rounded-full mx-auto mb-4" />}
                    <p className="font-bold text-lg">{c.fullName}</p>
                    <p className="text-sm text-blue-600">{c.title}</p>
                    {c.company && <p className="text-sm text-muted-foreground">{c.company}</p>}
                  </Card>
                ))}
              </div>
              <div className="text-center mt-8">
                <Link href="/verified">
                  <Button>View All Verified</Button>
                </Link>
              </div>
            </div>
          </section>
        )}
      </div>
    </>
  );
}
