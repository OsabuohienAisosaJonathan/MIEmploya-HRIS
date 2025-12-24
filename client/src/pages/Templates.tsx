import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";

export default function Templates() {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: () =>
      fetch("/api/templates")
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
  });

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Books & Templates</h1>
            <p className="text-lg text-muted-foreground">
              Download our professional HR books and templates
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading templates...</p>
            </div>
          ) : templates && templates.length > 0 ? (
            <div className="space-y-4">
              {templates.map((template: any) => (
                <Card
                  key={template.id}
                  className="p-6 hover-elevate"
                  data-testid={`card-template-${template.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold">{template.title}</h3>
                      {template.description && (
                        <p className="text-muted-foreground mt-2">{template.description}</p>
                      )}
                      <span className="inline-block mt-3 px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
                        {template.fileType.toUpperCase()}
                      </span>
                    </div>
                    <a href={template.fileUrl} download>
                      <Button variant="default" size="sm" data-testid={`button-download-template-${template.id}`}>
                        <Download className="w-4 h-4 mr-2" />
                        Download
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No templates available yet.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
