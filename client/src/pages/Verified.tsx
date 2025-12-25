import { useQuery } from "@tanstack/react-query";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { ShieldCheck, Award, User } from "lucide-react";

export default function Verified() {
  const { data: candidates, isLoading } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4 bg-gradient-to-b from-muted via-background to-muted">
        <div className="container max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-green-500/20 to-teal-500/20 mb-6">
              <ShieldCheck className="w-8 h-8 text-green-600 dark:text-green-400" />
            </div>
            <h1 className="text-4xl font-bold mb-4">Top Verified Candidates</h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Meet our roster of verified and trusted professionals ready to elevate your organization
            </p>
          </div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <Card key={i} className="p-6 animate-pulse">
                  <div className="flex flex-col items-center">
                    <div className="w-24 h-24 bg-muted rounded-full mb-4" />
                    <div className="h-5 bg-muted rounded w-32 mb-2" />
                    <div className="h-4 bg-muted rounded w-24 mb-4" />
                    <div className="h-4 bg-muted rounded w-full" />
                  </div>
                </Card>
              ))}
            </div>
          ) : candidates && candidates.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {candidates.map((candidate: any, index: number) => (
                <Card 
                  key={candidate.id} 
                  className="group relative overflow-visible p-6 text-center transition-all duration-300 border-2 border-transparent hover:border-green-500/30 hover:shadow-xl hover:shadow-green-500/5 dark:hover:shadow-green-500/10 hover:-translate-y-1"
                  style={{ animationDelay: `${index * 100}ms` }}
                  data-testid={`card-candidate-${candidate.id}`}
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-transparent to-teal-500/5 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg pointer-events-none" />
                  
                  <div className="absolute -top-3 -right-3 w-8 h-8 bg-gradient-to-br from-green-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform scale-0 group-hover:scale-100">
                    <Award className="w-4 h-4 text-white" />
                  </div>
                  
                  <div className="relative">
                    <div className="relative inline-block mb-4">
                      <div className="absolute inset-0 bg-gradient-to-br from-green-500 to-teal-500 rounded-full blur-md opacity-0 group-hover:opacity-30 transition-opacity" />
                      {candidate.imageUrl ? (
                        <img
                          src={candidate.imageUrl}
                          alt={candidate.fullName}
                          className="relative w-28 h-28 rounded-full object-cover border-4 border-background shadow-xl group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="relative w-28 h-28 rounded-full bg-gradient-to-br from-primary/20 to-teal-500/20 flex items-center justify-center border-4 border-background shadow-xl">
                          <User className="w-12 h-12 text-muted-foreground" />
                        </div>
                      )}
                      <div className="absolute -bottom-1 -right-1 w-7 h-7 bg-green-500 rounded-full flex items-center justify-center border-2 border-background">
                        <ShieldCheck className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    
                    <h3 className="text-xl font-bold mb-1 group-hover:text-primary transition-colors">
                      {candidate.fullName}
                    </h3>
                    <p className="text-primary font-medium mb-1">{candidate.title}</p>
                    {candidate.company && (
                      <p className="text-sm text-muted-foreground">{candidate.company}</p>
                    )}
                    
                    {candidate.bio && (
                      <p className="text-sm text-foreground/80 mt-4 leading-relaxed line-clamp-3">
                        {candidate.bio}
                      </p>
                    )}
                    
                    <div className="mt-5 pt-4 border-t">
                      <span className="inline-flex items-center gap-1.5 px-4 py-1.5 bg-gradient-to-r from-green-500/10 to-teal-500/10 text-green-700 dark:text-green-400 text-xs font-semibold rounded-full border border-green-500/20">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Verified Professional
                      </span>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-muted flex items-center justify-center">
                <ShieldCheck className="w-10 h-10 text-muted-foreground" />
              </div>
              <h3 className="text-xl font-semibold mb-2">No Verified Candidates Yet</h3>
              <p className="text-muted-foreground">Check back soon for our roster of trusted professionals.</p>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
