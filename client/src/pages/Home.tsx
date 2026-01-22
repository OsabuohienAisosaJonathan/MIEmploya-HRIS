import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, Download, Play, CheckCircle, Users, FileText, Briefcase } from "lucide-react";

const SERVICES = [
  "HR Consultancy", "Recruitment", "Training & Development",
  "Onboarding & Offboarding", "Attendance Management", "Payroll Outsourcing",
  "Performance Evaluation", "Audit Support", "Compliance Support",
  "Background & Reference Checks", "MiPayMaster", "OpenClax",
  "MiStock HQ", "Customized Software"
];

export default function Home() {
  const { data: content = [] } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch(`${API_BASE_URL}/api/content`).then((r) => {
      if (!r.ok) return [];
      return r.json();
    }).catch(() => []),
  });

  const { data: candidates = [] } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch(`${API_BASE_URL}/api/verified-candidates`).then((r) => {
      if (!r.ok) return [];
      return r.json();
    }).catch(() => []),
  });

  const news = Array.isArray(content) ? content.filter((c: any) => c.type === "news" && c.isPublished) : [];
  const videos = Array.isArray(content) ? content.filter((c: any) => c.type === "video" && c.isPublished) : [];
  const pdfs = Array.isArray(content) ? content.filter((c: any) => c.type === "pdf" && c.isPublished) : [];
  const approvedCandidates = Array.isArray(candidates) ? candidates.filter((c: any) => c.status === "approved") : [];

  return (
    <>
      <Header />
      <div className="w-full">
        <section className="relative py-24 md:py-32 px-4 gradient-hero text-white overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20" />
          <div className="container max-w-4xl mx-auto text-center relative z-10">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 animate-fade-in">
              Smart HR. Smarter Workforce Solutions.
            </h1>
            <p className="text-lg md:text-xl mb-10 opacity-90 max-w-3xl mx-auto animate-fade-in animate-delay-100 leading-relaxed">
              Miemploya HR delivers structured human resource services, workforce support, and digital solutions that help organizations operate efficiently and responsibly. From recruitment and payroll outsourcing to training, compliance, and talent verification, we support businesses and professionals with systems that work.
            </p>
            <div className="flex flex-wrap justify-center gap-4 animate-fade-in animate-delay-200">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="font-semibold" data-testid="button-request-service">
                  Request a Service
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/jobs">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white backdrop-blur-sm font-semibold" data-testid="button-explore-jobs">
                  Explore Jobs
                </Button>
              </Link>
            </div>
          </div>
        </section>

        <section className="py-6 px-4 bg-white dark:bg-slate-900 border-b">
          <div className="container max-w-5xl mx-auto">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <Users className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">Clients Served</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <Briefcase className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold">1000+</p>
                <p className="text-sm text-muted-foreground">Placements Made</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-2">
                  <CheckCircle className="w-6 h-6 text-primary" />
                </div>
                <p className="text-2xl font-bold">14+</p>
                <p className="text-sm text-muted-foreground">HR Services</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-accent/10 flex items-center justify-center mb-2">
                  <FileText className="w-6 h-6 text-accent" />
                </div>
                <p className="text-2xl font-bold">5+</p>
                <p className="text-sm text-muted-foreground">Years Experience</p>
              </div>
            </div>
          </div>
        </section>

        <section className="py-20 px-4">
          <div className="container max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Our Services</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Comprehensive HR solutions tailored to your organization's unique needs
              </p>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
              {SERVICES.map((service, index) => (
                <Card
                  key={service}
                  className="p-4 card-hover text-center"
                  style={{ animationDelay: `${index * 50}ms` }}
                >
                  <p className="font-medium text-foreground text-sm">{service}</p>
                </Card>
              ))}
            </div>
            <div className="text-center mt-10">
              <Link href="/services">
                <Button variant="outline" size="lg">
                  View All Services
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </section>

        {news.length > 0 && (
          <section className="py-20 px-4 bg-muted/50">
            <div className="container max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Latest News</h2>
                <p className="text-muted-foreground">Stay updated with our latest announcements</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {news
                  .filter((n: any) => n.isFavourite)
                  .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 6)
                  .map((item: any, index: number) => (
                    <Link key={item.id} href={`/news/${item.id}`}>
                      <Card
                        className="overflow-hidden card-hover cursor-pointer h-full group animate-fade-in"
                        style={{ animationDelay: `${index * 50}ms` }}
                        data-testid={`card-news-${item.id}`}
                      >
                        <div className="w-full h-[128px] bg-slate-100 dark:bg-slate-800 overflow-hidden">
                          {item.imageUrl ? (
                            <img
                              src={item.imageUrl}
                              alt={item.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center">
                              <FileText className="w-10 h-10 text-muted-foreground/30" />
                            </div>
                          )}
                        </div>
                        <div className="p-4">
                          <h3 className="font-bold text-sm mb-2 line-clamp-2 group-hover:text-primary transition-colors">{item.title}</h3>
                          <p className="text-xs text-muted-foreground line-clamp-2 mb-3">{item.description}</p>
                          <span className="text-primary font-medium text-xs flex items-center gap-1">
                            Read More
                            <ArrowRight className="w-3 h-3" />
                          </span>
                        </div>
                      </Card>
                    </Link>
                  ))}
              </div>
              <div className="text-center mt-10">
                <Link href="/news">
                  <Button variant="outline" size="lg" data-testid="button-view-all-news">
                    View All News
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </section>
        )}

        {videos.length > 0 && (
          <section className="py-20 px-4">
            <div className="container max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Training & Announcement Videos</h2>
                <p className="text-muted-foreground">Learn from our professional development content</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {videos
                  .filter((v: any) => v.isFavourite)
                  .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
                  .slice(0, 4)
                  .map((item: any) => (
                    <Card key={item.id} className="overflow-hidden card-hover" data-testid={`card-video-home-${item.id}`}>
                      <div className="relative bg-slate-200 dark:bg-slate-800" style={{ aspectRatio: "16/5.4" }}>
                        {item.fileUrl || item.url ? (
                          <video
                            controls
                            className="w-full h-full object-cover"
                          >
                            <source src={item.fileUrl || item.url} type="video/mp4" />
                            Your browser does not support the video tag.
                          </video>
                        ) : (
                          <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-12 h-12 rounded-full bg-primary/90 flex items-center justify-center">
                              <Play className="w-6 h-6 text-white ml-1" />
                            </div>
                          </div>
                        )}
                      </div>
                      <div className="p-4">
                        <h3 className="font-bold text-sm line-clamp-1">{item.title}</h3>
                      </div>
                    </Card>
                  ))}
              </div>
              {videos.length > 0 && (
                <div className="text-center mt-10">
                  <Link href="/videos">
                    <Button variant="outline" size="lg" data-testid="button-view-all-videos">
                      View All Videos
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        {pdfs.length > 0 && (
          <section className="py-20 px-4 bg-muted/50">
            <div className="container max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Resources & Materials</h2>
                <p className="text-muted-foreground">Download helpful guides and documents</p>
              </div>
              <div className="space-y-4">
                {pdfs.map((item: any) => (
                  <Card key={item.id} className="p-6 card-hover">
                    <div className="flex justify-between items-start gap-4">
                      <div className="flex-1">
                        <h3 className="font-bold text-lg">{item.title}</h3>
                        {item.description && <p className="text-muted-foreground mt-2">{item.description}</p>}
                      </div>
                      {item.fileUrl && (
                        <a href={item.fileUrl} download>
                          <Button variant="outline" size="sm">
                            <Download className="w-4 h-4 mr-2" />
                            Download
                          </Button>
                        </a>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}

        {approvedCandidates.length > 0 && (
          <section className="py-20 px-4">
            <div className="container max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-3xl font-bold mb-4">Top Verified Candidates</h2>
                <p className="text-muted-foreground">Professionally verified and ready for placement</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {approvedCandidates.slice(0, 6).map((c: any) => (
                  <Card key={c.id} className="p-6 text-center card-hover">
                    {c.imageUrl && (
                      <img
                        src={c.imageUrl}
                        alt={c.fullName}
                        className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-primary/20"
                      />
                    )}
                    <h3 className="font-bold text-lg">{c.fullName}</h3>
                    <p className="text-sm text-primary font-medium">{c.title}</p>
                    {c.company && <p className="text-sm text-muted-foreground">{c.company}</p>}
                    {c.bio && <p className="text-sm text-foreground mt-3 line-clamp-3">{c.bio}</p>}
                  </Card>
                ))}
              </div>
              {approvedCandidates.length > 6 && (
                <div className="text-center mt-10">
                  <Link href="/verified">
                    <Button variant="outline" size="lg">
                      View All Verified
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="py-20 px-4 gradient-hero text-white">
          <div className="container max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Transform Your Workforce?</h2>
            <p className="text-lg opacity-90 mb-8">
              Let us help you build a smarter, more efficient organization with our professional HR solutions.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" variant="secondary" className="font-semibold">
                  Get Started Today
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
              <Link href="/about">
                <Button size="lg" variant="outline" className="bg-white/10 border-white/30 text-white font-semibold">
                  Learn More
                </Button>
              </Link>
            </div>
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
