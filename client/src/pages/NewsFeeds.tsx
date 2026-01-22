import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";
import { ArrowRight, FileText, Calendar } from "lucide-react";
import { format } from "date-fns";

export default function NewsFeeds() {
  const { data: content = [], isLoading } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch(`${API_BASE_URL}/api/content`).then((r) => {
      if (!r.ok) return [];
      return r.json();
    }).catch(() => []),
  });

  const news = Array.isArray(content)
    ? content
      .filter((c: any) => c.type === "news" && c.isPublished)
      .sort((a: any, b: any) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    : [];

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <section className="py-16 px-4 gradient-hero text-white">
          <div className="container max-w-5xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">News Feeds</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto animate-fade-in animate-delay-100">
              Stay updated with the latest news and announcements from Miemploya HR
            </p>
          </div>
        </section>

        <section className="py-16 px-4">
          <div className="container max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="animate-pulse">
                    <div className="h-48 bg-muted" />
                    <div className="p-5 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/2" />
                      <div className="h-3 bg-muted rounded w-full" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : news.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {news.map((item: any, index: number) => (
                  <Link key={item.id} href={`/news/${item.id}`}>
                    <Card
                      className="overflow-hidden card-hover cursor-pointer h-full group animate-fade-in"
                      style={{ animationDelay: `${index * 50}ms` }}
                      data-testid={`card-news-feed-${item.id}`}
                    >
                      <div className="relative w-full h-48 bg-slate-100 dark:bg-slate-800 overflow-hidden">
                        {item.imageUrl ? (
                          <img
                            src={item.imageUrl}
                            alt={item.title}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <FileText className="w-12 h-12 text-muted-foreground/30" />
                          </div>
                        )}
                      </div>
                      <div className="p-5">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                          <Calendar className="w-3 h-3" />
                          <span>{item.createdAt ? format(new Date(item.createdAt), "MMM dd, yyyy") : "Recent"}</span>
                        </div>
                        <h3 className="font-bold text-lg mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                          {item.title}
                        </h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
                          {item.description}
                        </p>
                        <span className="text-primary font-medium text-sm flex items-center gap-1 group-hover:gap-2 transition-all">
                          Read More
                          <ArrowRight className="w-4 h-4" />
                        </span>
                      </div>
                    </Card>
                  </Link>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No News Yet</h3>
                <p className="text-muted-foreground">Check back soon for the latest updates</p>
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
