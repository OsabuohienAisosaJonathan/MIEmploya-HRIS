import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { useLocation } from "wouter";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";

export default function Jobs() {
  const [, setLocation] = useLocation();
  const { data: jobs = [], isLoading } = useQuery({
    queryKey: ["/api/jobs"],
    queryFn: () =>
      fetch("/api/jobs")
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
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Job Opportunities</h1>
            <p className="text-lg text-muted-foreground">Find your next opportunity with us</p>
          </div>

          {/* Search Filters */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <Input
              placeholder="Search by job title..."
              value={searchTitle}
              onChange={(e) => setSearchTitle(e.target.value)}
              data-testid="input-job-search-title"
            />
            <Input
              placeholder="Search by location..."
              value={searchLocation}
              onChange={(e) => setSearchLocation(e.target.value)}
              data-testid="input-job-search-location"
            />
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading jobs...</p>
            </div>
          ) : filtered && filtered.length > 0 ? (
            <div className="space-y-4">
              {filtered.map((job: any) => (
                <Card
                  key={job.id}
                  className="p-6 hover-elevate cursor-pointer"
                  onClick={() => setLocation(`/jobs/${job.id}`)}
                  data-testid={`card-job-${job.id}`}
                >
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold">{job.title}</h3>
                      <p className="text-blue-600 font-medium mt-1">{job.company}</p>
                      <p className="text-muted-foreground mt-2">{job.location}</p>
                      <p className="text-sm text-muted-foreground mt-2 line-clamp-2">{job.description}</p>
                      <div className="mt-4 flex gap-2">
                        <span className="inline-block px-3 py-1 text-xs bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
                          {job.category}
                        </span>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" data-testid={`button-view-job-${job.id}`}>
                      View Details
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No jobs available at this time. Check back soon!</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
