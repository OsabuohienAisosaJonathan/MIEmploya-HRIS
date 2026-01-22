import { API_BASE_URL } from "@/lib/config";
import { useQuery, useMutation } from "@tanstack/react-query";
import { useParams, useLocation } from "wouter";
import { useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft } from "lucide-react";

export default function JobDetail() {
  const { id } = useParams();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [showForm, setShowForm] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    state: "",
    city: "",
    cv: null as File | null,
    coverNote: "",
  });

  const { data: job, isLoading } = useQuery({
    queryKey: [`/api/jobs/${id}`],
    queryFn: () =>
      fetch(`${API_BASE_URL}/api/jobs/${id}`)
        .then((r) => (r.ok ? r.json() : null))
        .catch(() => null),
  });

  const handleApply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.cv) {
      toast({ title: "Please upload your CV", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("jobId", String(id));
      formDataObj.append("fullName", formData.fullName);
      formDataObj.append("email", formData.email);
      formDataObj.append("phone", formData.phone);
      formDataObj.append("state", formData.state);
      formDataObj.append("city", formData.city);
      formDataObj.append("coverNote", formData.coverNote || "");
      formDataObj.append("cv", formData.cv);

      const response = await fetch(`${API_BASE_URL}/api/jobs/apply`, {
        method: "POST",
        body: formDataObj,
      });

      if (response.ok) {
        toast({ title: "Application submitted successfully!" });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          state: "",
          city: "",
          cv: null,
          coverNote: "",
        });
        setShowForm(false);
      } else {
        toast({ title: "Error submitting application", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-12 px-4">
          <p className="text-center text-muted-foreground">Loading job details...</p>
        </div>
        <Footer />
      </>
    );
  }

  if (!job) {
    return (
      <>
        <Header />
        <div className="min-h-screen py-12 px-4">
          <div className="text-center">
            <p className="text-muted-foreground mb-4">Job not found</p>
            <Button onClick={() => setLocation("/jobs")}>Back to Jobs</Button>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <div className="min-h-screen py-12 px-4">
        <div className="container max-w-4xl mx-auto">
          <Button
            variant="ghost"
            onClick={() => setLocation("/jobs")}
            className="mb-8"
            data-testid="button-back-to-jobs"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Jobs
          </Button>

          <Card className="p-8 mb-8">
            <h1 className="text-4xl font-bold mb-2">{job.title}</h1>
            <p className="text-2xl text-blue-600 font-medium mb-4">{job.company}</p>
            <p className="text-lg text-muted-foreground mb-6">{job.location}</p>

            <div className="flex gap-4 mb-8">
              <span className="inline-block px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded">
                {job.category}
              </span>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-bold mb-4">Job Description</h2>
              <p className="text-foreground whitespace-pre-line">{job.description}</p>
            </div>

            <div>
              <h2 className="text-2xl font-bold mb-4">Requirements</h2>
              <p className="text-foreground whitespace-pre-line">{job.requirements}</p>
            </div>
          </Card>

          {!showForm ? (
            <Card className="p-8 text-center">
              <p className="mb-6 text-muted-foreground">Ready to apply for this position?</p>
              <Button size="lg" onClick={() => setShowForm(true)} data-testid="button-apply-job">
                Apply Now
              </Button>
            </Card>
          ) : (
            <Card className="p-8">
              <h2 className="text-2xl font-bold mb-6">Apply for this Position</h2>
              <form onSubmit={handleApply} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Full Name</label>
                  <Input
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    placeholder="Your full name"
                    required
                    data-testid="input-job-apply-name"
                  />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">Email</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Your email"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">Phone</label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="Your phone number"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">State</label>
                    <Input
                      value={formData.state}
                      onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                      placeholder="Your state"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">City</label>
                    <Input
                      value={formData.city}
                      onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                      placeholder="Your city"
                      required
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">CV (PDF)</label>
                  <input
                    type="file"
                    accept=".pdf"
                    onChange={(e) => setFormData({ ...formData, cv: e.target.files?.[0] || null })}
                    required
                    className="w-full border rounded px-3 py-2"
                    data-testid="input-job-apply-cv"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Cover Note (Optional)</label>
                  <Textarea
                    value={formData.coverNote}
                    onChange={(e) => setFormData({ ...formData, coverNote: e.target.value })}
                    placeholder="Tell us why you're interested in this role..."
                  />
                </div>
                <div className="flex gap-4">
                  <Button type="submit" disabled={submitting} data-testid="button-submit-job-apply">
                    {submitting ? "Submitting..." : "Submit Application"}
                  </Button>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowForm(false)}
                    data-testid="button-cancel-job-apply"
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Card>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}
