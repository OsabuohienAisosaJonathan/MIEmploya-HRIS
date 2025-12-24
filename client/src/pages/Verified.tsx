import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Card } from "@/components/ui/card";

export default function Verified() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 bg-muted">
        <div className="container max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold mb-4">Top Verified Candidates</h1>
            <p className="text-lg text-muted-foreground">
              Meet our roster of verified and approved professionals
            </p>
          </div>

          {isLoading ? (
            <div className="text-center py-12">
              <p className="text-muted-foreground">Loading candidates...</p>
            </div>
          ) : candidates && candidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate: any) => (
                <Card key={candidate.id} className="p-6 text-center hover-elevate overflow-hidden">
                  {candidate.imageUrl && (
                    <img
                      src={candidate.imageUrl}
                      alt={candidate.fullName}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                  )}
                  <h3 className="text-xl font-bold">{candidate.fullName}</h3>
                  <p className="text-blue-600 font-medium">{candidate.title}</p>
                  {candidate.company && (
                    <p className="text-sm text-muted-foreground mt-1">{candidate.company}</p>
                  )}
                  {candidate.bio && (
                    <p className="text-sm text-foreground mt-4">{candidate.bio}</p>
                  )}
                  <div className="mt-4 pt-4 border-t">
                    <span className="inline-block px-3 py-1 bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100 text-xs font-semibold rounded-full">
                      Verified
                    </span>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No verified candidates yet.</p>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
