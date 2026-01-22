import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Download, FileText, FileSpreadsheet, File, BookOpen } from "lucide-react";

function getFileIcon(fileType: string) {
  const type = fileType?.toLowerCase() || "";
  if (type === "pdf") return <FileText className="w-8 h-8 text-red-500" />;
  if (type === "docx" || type === "doc") return <File className="w-8 h-8 text-blue-500" />;
  if (type === "xlsx" || type === "xls") return <FileSpreadsheet className="w-8 h-8 text-green-500" />;
  return <BookOpen className="w-8 h-8 text-primary" />;
}

function getFileTypeBadgeStyles(fileType: string) {
  const type = fileType?.toLowerCase() || "";
  if (type === "pdf") return "bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 border border-red-200 dark:border-red-800";
  if (type === "docx" || type === "doc") return "bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800";
  if (type === "xlsx" || type === "xls") return "bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-800";
  return "bg-primary/10 text-primary border border-primary/20";
}

export default function Templates() {
  const { data: templates = [], isLoading } = useQuery({
    queryKey: ["/api/templates"],
    queryFn: () =>
      fetch(`${API_BASE_URL}/api/templates`)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
  });

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-teal-500/20 mb-6">
              <BookOpen className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Books & Templates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Download our professional HR books and templates to streamline your workforce management
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {[1, 2, 3, 4].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-muted rounded-lg" />
                    <div className="flex-1 space-y-3">
                      <div className="h-5 bg-muted rounded w-3/4" />
                      <div className="h-4 bg-muted rounded w-full" />
                      <div className="h-6 bg-muted rounded w-16" />
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : templates && templates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {templates.map((template: any, index: number) => (
                <Card
                  key={template.id}
                  className="group relative overflow-visible p-6 transition-all duration-300 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:-translate-y-1 border-2 border-transparent hover:border-primary/20"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-template-${template.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />

                  <div className="relative flex items-start gap-4">
                    <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-muted flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                      {getFileIcon(template.fileType)}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold mb-2 group-hover:text-primary transition-colors line-clamp-2">
                        {template.title}
                      </h3>
                      {template.description && (
                        <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                          {template.description}
                        </p>
                      )}
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`inline-block px-2.5 py-1 text-xs font-semibold rounded-md ${getFileTypeBadgeStyles(template.fileType)}`}>
                          {template.fileType?.toUpperCase() || "FILE"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-4 pt-4 border-t flex justify-end">
                    <a href={template.fileUrl} download>
                      <Button
                        variant="default"
                        size="sm"
                        className="group/btn bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 shadow-lg shadow-primary/20"
                        data-testid={`button-download-template-${template.id}`}
                      >
                        <Download className="w-4 h-4 mr-2 group-hover/btn:animate-bounce" />
                        Download
                      </Button>
                    </a>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <BookOpen className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Templates Available</h3>
              <p className="text-muted-foreground">Check back soon for professional HR resources.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
