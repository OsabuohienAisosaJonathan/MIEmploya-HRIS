import { API_BASE_URL } from "@/lib/config";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Briefcase, MapPin, Building2, Search, ArrowRight } from "lucide-react";

export default function Jobs() {
  const [, setLocation] = useLocation();
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["/api/jobs"],
    queryFn: () =>
      fetch(`${API_BASE_URL}/api/jobs`)
        .then((r) => (r.ok ? r.json() : []))
        .catch(() => []),
  });

  const [searchTitle, setSearchTitle] = useState("");
  const [searchLocation, setSearchLocation] = useState("");

  const filtered = jobs.filter((j: any) =>
    j.title.toLowerCase().includes(searchTitle.toLowerCase()) &&
    (searchLocation === "" || j.location.toLowerCase().includes(searchLocation.toLowerCase()))
  );

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-background via-muted/30 to-background">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary/20 to-teal-500/20 mb-6">
              <Briefcase className="w-8 h-8 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Discover your next career opportunity with verified employers
            </p>
          </div>

          <Card className="p-4 mb-8 shadow-lg border-2">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by job title..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="pl-10"
                  data-testid="input-job-search-title"
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search by location..."
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10"
                  data-testid="input-job-search-location"
                />
              </div>
            </div>
          </Card>

          {isLoading ? (
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="space-y-3">
                    <div className="h-6 bg-muted rounded w-2/3" />
                    <div className="h-4 bg-muted rounded w-1/3" />
                    <div className="h-4 bg-muted rounded w-1/4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((job: any, index: number) => (
                <Card
                  key={job.id}
                  className="group relative overflow-visible p-6 transition-all duration-300 cursor-pointer border-2 border-transparent hover:border-primary/30 hover:shadow-xl hover:shadow-primary/5 dark:hover:shadow-primary/10 hover:-translate-y-0.5"
                  onClick={() => setLocation(`/jobs/${job.id}`)}
                  style={{ animationDelay: `${index * 50}ms` }}
                  data-testid={`card-job-${job.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-teal-500 rounded-l-lg opacity-0 group-hover:opacity-100 transition-opacity" />

                  <div className="relative flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                        {job.title}
                      </h3>
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground mb-3">
                        <div className="flex items-center gap-1.5">
                          <Building2 className="w-4 h-4 text-primary/70" />
                          <span className="font-medium text-foreground">{job.company}</span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          <MapPin className="w-4 h-4 text-primary/70" />
                          <span>{job.location}</span>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">{job.description}</p>
                      <div className="flex flex-wrap gap-2">
                        <span className="inline-block px-3 py-1 text-xs font-medium bg-primary/10 text-primary rounded-full border border-primary/20">
                          {job.category}
                        </span>
                        {job.salary && (
                          <span className="inline-block px-3 py-1 text-xs font-medium bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 rounded-full border border-green-200 dark:border-green-800">
                            {job.salary}
                          </span>
                        )}
                      </div>
                    </div>
                    <Button
                      variant="default"
                      size="sm"
                      className="group/btn bg-gradient-to-r from-primary to-teal-600 hover:from-primary/90 hover:to-teal-600/90 shadow-lg shadow-primary/20 whitespace-nowrap"
                      data-testid={`button-view-job-${job.id}`}
                    >
                      View Details
                      <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <Briefcase className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Jobs Available</h3>
              <p className="text-muted-foreground">
                {searchTitle || searchLocation
                  ? "No jobs match your search criteria. Try adjusting your filters."
                  : "Check back soon for new opportunities!"}
              </p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
