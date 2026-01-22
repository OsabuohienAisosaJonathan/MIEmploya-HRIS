import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Film } from "lucide-react";
import { useState, useEffect } from "react";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "news", label: "News" },
  { value: "training", label: "Training" },
  { value: "vacancy", label: "Vacancy" },
  { value: "announcement", label: "Announcement" },
  { value: "education", label: "Education" },
];

export default function Videos() {
  const [selectedCategory, setSelectedCategory] = useState("all");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const { data: content = [], isLoading } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch(`${API_BASE_URL}/api/content`).then((r) => {
      if (!r.ok) return [];
      return r.json();
    }).catch(() => []),
  });

  const videos = Array.isArray(content)
    ? content.filter((c: any) => c.type === "video" && c.isPublished)
    : [];

  const filteredVideos = selectedCategory === "all"
    ? videos
    : videos.filter((v: any) => v.category === selectedCategory);

  return (
    <>
      <Header />
      <div className="min-h-screen bg-background">
        <section className="py-12 px-4 gradient-hero text-white">
          <div className="container max-w-5xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Training & Announcement Videos</h1>
            <p className="text-lg opacity-90 max-w-2xl mx-auto">
              Explore our professional development content and stay updated with announcements
            </p>
          </div>
        </section>

        <section className="py-8 px-4 border-b bg-background">
          <div className="container max-w-5xl mx-auto">
            <div className="flex flex-wrap justify-center gap-2">
              {CATEGORIES.map((cat) => (
                <Button
                  key={cat.value}
                  variant={selectedCategory === cat.value ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedCategory(cat.value)}
                  data-testid={`filter-category-${cat.value}`}
                >
                  {cat.label}
                </Button>
              ))}
            </div>
          </div>
        </section>

        <section className="py-12 px-4">
          <div className="container max-w-6xl mx-auto">
            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <Card key={i} className="overflow-hidden animate-pulse">
                    <div className="aspect-video bg-muted" />
                    <div className="p-4 space-y-3">
                      <div className="h-4 bg-muted rounded w-3/4" />
                      <div className="h-3 bg-muted rounded w-1/4" />
                    </div>
                  </Card>
                ))}
              </div>
            ) : filteredVideos.length === 0 ? (
              <div className="text-center py-20">
                <Film className="w-16 h-16 mx-auto text-muted-foreground/30 mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Videos Found</h3>
                <p className="text-muted-foreground">
                  {selectedCategory === "all"
                    ? "No videos have been published yet."
                    : `No videos in the "${selectedCategory}" category.`}
                </p>
                {selectedCategory !== "all" && (
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => setSelectedCategory("all")}
                  >
                    View All Videos
                  </Button>
                )}
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredVideos.map((item: any) => (
                  <Card
                    key={item.id}
                    className="overflow-hidden group transition-all duration-300 hover:shadow-lg hover:-translate-y-1"
                    data-testid={`card-video-${item.id}`}
                  >
                    <div className="relative bg-slate-200 dark:bg-slate-800 aspect-video">
                      {item.fileUrl || item.url ? (
                        <video
                          controls
                          className="w-full h-full object-cover"
                          poster={item.imageUrl || undefined}
                          controlsList="nodownload"
                          onContextMenu={(e) => e.preventDefault()}
                        >
                          <source src={item.fileUrl?.startsWith("http") ? item.fileUrl : `${API_BASE_URL}${item.fileUrl || item.url}`} type="video/mp4" />
                          Your browser does not support the video tag.
                        </video>
                      ) : (
                        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-primary/20 to-primary/40">
                          <div className="w-16 h-16 rounded-full bg-primary/90 flex items-center justify-center group-hover:scale-110 transition-transform">
                            <Play className="w-8 h-8 text-white ml-1" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h3 className="font-bold text-lg mb-2 line-clamp-2">{item.title}</h3>
                      {item.category && (
                        <Badge variant="secondary" className="capitalize">
                          {item.category}
                        </Badge>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </section>
      </div>
      <Footer />
    </>
  );
}
