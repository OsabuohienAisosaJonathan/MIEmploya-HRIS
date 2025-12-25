import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, Calendar, FileText } from "lucide-react";

export default function NewsDetail() {
  const params = useParams<{ id: string }>();
  const newsId = params.id;

  const { data: content = [], isLoading } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch("/api/content").then((r) => {
      if (!r.ok) return [];
      return r.json();
    }).catch(() => []),
  });

  const newsItem = Array.isArray(content) 
    ? content.find((c: any) => c.id === Number(newsId) && c.type === "news") 
    : null;

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen flex items-center justify-center">
          <div className="animate-pulse text-muted-foreground">Loading...</div>
        </div>
        <Footer />
      </>
    );
  }

  if (!newsItem) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-20 px-4">
          <div className="container max-w-3xl mx-auto text-center">
            <FileText className="w-16 h-16 text-muted-foreground/30 mx-auto mb-6" />
            <h1 className="text-2xl font-bold mb-4">News Not Found</h1>
            <p className="text-muted-foreground mb-8">
              The news article you're looking for doesn't exist or has been removed.
            </p>
            <Link href="/">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  const formattedDate = newsItem.createdAt 
    ? new Date(newsItem.createdAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : null;

  return (
    <>
      <Header />
      <div className="min-h-screen">
        <div className="w-full h-[250px] md:h-[400px] lg:h-[500px] bg-slate-100 dark:bg-slate-800 relative">
          {newsItem.imageUrl ? (
            <img 
              src={newsItem.imageUrl} 
              alt={newsItem.title} 
              className="w-full h-full object-cover object-center"
              data-testid="img-news-featured"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <FileText className="w-24 h-24 text-muted-foreground/20" />
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
        </div>

        <div className="container max-w-3xl mx-auto px-4 py-12">
          <Link href="/">
            <Button variant="ghost" size="sm" className="mb-6" data-testid="button-back-home">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Home
            </Button>
          </Link>

          <article>
            <h1 className="text-3xl md:text-4xl font-bold mb-4 leading-tight" data-testid="text-news-title">
              {newsItem.title}
            </h1>

            {formattedDate && (
              <div className="flex items-center gap-2 text-muted-foreground mb-8">
                <Calendar className="w-4 h-4" />
                <span className="text-sm" data-testid="text-news-date">{formattedDate}</span>
              </div>
            )}

            <Card className="p-6 md:p-8">
              <div 
                className="prose prose-slate dark:prose-invert max-w-none text-foreground leading-relaxed"
                data-testid="text-news-content"
              >
                {newsItem.description?.split('\n').map((paragraph: string, index: number) => (
                  paragraph.trim() ? (
                    <p key={index} className="mb-4 last:mb-0">
                      {paragraph}
                    </p>
                  ) : null
                ))}
              </div>
            </Card>
          </article>

          <div className="mt-12 pt-8 border-t">
            <h3 className="font-semibold text-lg mb-4">Share this article</h3>
            <div className="flex flex-wrap gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  const url = window.location.href;
                  const text = `Check out this article: ${newsItem.title}`;
                  window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
                }}
                data-testid="button-share-whatsapp"
              >
                Share on WhatsApp
              </Button>
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                }}
                data-testid="button-copy-link"
              >
                Copy Link
              </Button>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}
