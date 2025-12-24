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
  const { data: content, isLoading: contentLoading } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch("/api/content").then((r) => r.json()),
  });

  const { data: candidates, isLoading: candidatesLoading } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  const news = content?.filter((c: any) => c.type === "news" && c.isPublished) || [];
  const videos = content?.filter((c: any) => c.type === "video" && c.isPublished) || [];
  const pdfs = content?.filter((c: any) => c.type === "pdf" && c.isPublished) || [];
  const approvedCandidates = candidates?.filter((c: any) => c.status === "approved") || [];

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

        {/* News Feeds */}
        {news.length > 0 && (
          <section className="py-16 px-4 bg-muted">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Latest News</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {news.slice(0, 4).map((item: any) => (
                  <Card key={item.id} className="overflow-hidden hover-elevate">
                    {item.imageUrl && (
                      <img src={item.imageUrl} alt={item.title} className="w-full h-40 object-cover" />
                    )}
                    <div className="p-4">
                      <p className="font-bold text-lg">{item.title}</p>
                      <p className="text-sm text-muted-foreground mt-2">{item.description}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Videos */}
        {videos.length > 0 && (
          <section className="py-16 px-4">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Training & Announcement Videos</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos.slice(0, 4).map((item: any) => (
                  <Card key={item.id} className="overflow-hidden hover-elevate">
                    <div className="bg-slate-300 dark:bg-slate-700 h-48 flex items-center justify-center">
                      {item.fileUrl || item.url ? (
                        <video
                          width="100%"
                          height="100%"
                          controls
                          className="w-full h-full object-cover"
                        >
                          <source src={item.fileUrl || item.url} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <span className="text-gray-600">Video: {item.title}</span>
                      )}
                    </div>
                    <div className="p-4">
                      <p className="font-bold">{item.title}</p>
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* PDFs */}
        {pdfs.length > 0 && (
          <section className="py-16 px-4 bg-muted">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8">Resources & Materials</h2>
              <div className="space-y-4">
                {pdfs.map((item: any) => (
                  <Card key={item.id} className="p-6 hover-elevate">
                    <div className="flex justify-between items-start">
                      <div>
                        <p className="font-bold text-lg">{item.title}</p>
                        {item.description && <p className="text-muted-foreground mt-2">{item.description}</p>}
                      </div>
                      {item.fileUrl && (
                        <a href={item.fileUrl} download className="text-blue-600 hover:underline">
                          Download PDF
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {/* Top Verified Candidates */}
        {approvedCandidates.length > 0 && (
          <section className="py-16 px-4">
            <div className="container max-w-5xl mx-auto">
              <h2 className="text-3xl font-bold mb-8 text-center">Top Verified Candidates</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedCandidates.slice(0, 6).map((c: any) => (
                  <Card key={c.id} className="p-6 text-center hover-elevate">
                    {c.imageUrl && <img src={c.imageUrl} alt={c.fullName} className="w-20 h-20 rounded-full mx-auto mb-4 object-cover" />}
                    <p className="font-bold text-lg">{c.fullName}</p>
                    <p className="text-sm text-blue-600 font-medium">{c.title}</p>
                    {c.company && <p className="text-sm text-muted-foreground">{c.company}</p>}
                    {c.bio && <p className="text-sm text-foreground mt-2">{c.bio}</p>}
                  </Card>
                ))}
              </div>
              {approvedCandidates.length > 6 && (
                <div className="text-center mt-8">
                  <Link href="/verified">
                    <Button>View All Verified</Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}
      </div>
    </>
  );
}
