import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { useQuery, useMutation } from "@tanstack/react-query";
import { queryClient } from "@/lib/queryClient";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem("admin_token");
    if (saved) setToken(saved);
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("admin_token", data.token);
        setToken(data.token);
        toast({ title: "Login successful!" });
      } else {
        toast({ title: "Invalid password", variant: "destructive" });
      }
    } finally {
      setLoading(false);
    }
  };

  if (!token) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <Card className="w-full max-w-md p-8">
          <div className="text-center mb-8">
            <div className="text-3xl font-bold text-blue-600 mx-auto mb-4">Miemploya</div>
            <h1 className="text-2xl font-bold">Admin Login</h1>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Password</label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter admin password"
                required
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <span className="text-xl font-bold text-blue-600">Miemploya</span>
            <span className="font-bold">Admin</span>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("admin_token");
              setToken("");
              setLocation("/");
            }}
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8 px-4">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="news">News</TabsTrigger>
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="candidates">Verified Candidates</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <ServiceRequestsTab token={token} />
          </TabsContent>

          <TabsContent value="news" className="space-y-4">
            <NewsTab token={token} />
          </TabsContent>

          <TabsContent value="videos" className="space-y-4">
            <VideosTab token={token} />
          </TabsContent>

          <TabsContent value="candidates" className="space-y-4">
            <CandidatesTab token={token} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ServiceRequestsTab({ token }: { token: string }) {
  const { data: requests, refetch, isLoading } = useQuery({
    queryKey: ["/api/requests"],
    queryFn: () =>
      fetch("/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
  });

  const { toast } = useToast();

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/requests/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      refetch();
      toast({ title: "Status updated" });
    } catch {
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Service Requests</h2>
      {requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req: any) => (
            <Card key={req.id} className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{req.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Service</p>
                  <p className="font-medium">{req.service}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className="text-sm font-medium border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{req.email}</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-2">Description:</p>
              <p className="text-sm">{req.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No requests yet.</p>
      )}
    </Card>
  );
}

function NewsTab({ token }: { token: string }) {
  const { data: news, refetch, isLoading } = useQuery({
    queryKey: ["/api/content-news"],
    queryFn: () =>
      fetch("/api/content?type=news", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
  });

  const [formData, setFormData] = useState({ title: "", description: "", imageUrl: "", isPublished: false });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, type: "news" }),
      });

      if (response.ok) {
        toast({ title: "News added successfully" });
        setFormData({ title: "", description: "", imageUrl: "", isPublished: false });
        refetch();
      } else {
        toast({ title: "Error adding news", variant: "destructive" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/content/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch();
      toast({ title: "News deleted" });
    } catch {
      toast({ title: "Error deleting news", variant: "destructive" });
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await fetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      refetch();
      toast({ title: isPublished ? "News unpublished" : "News published" });
    } catch {
      toast({ title: "Error updating news", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add News Feed</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="News title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="News description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image URL</label>
            <Input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            />
            <label htmlFor="publish" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add News"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Published News</h2>
        {news && news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item: any) => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                    >
                      {item.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No news feeds yet.</p>
        )}
      </Card>
    </div>
  );
}

function VideosTab({ token }: { token: string }) {
  const { data: videos, refetch, isLoading } = useQuery({
    queryKey: ["/api/content-videos"],
    queryFn: () =>
      fetch("/api/content?type=video", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
  });

  const [formData, setFormData] = useState({ title: "", url: "", isPublished: false });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/content", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, type: "video" }),
      });

      if (response.ok) {
        toast({ title: "Video added successfully" });
        setFormData({ title: "", url: "", isPublished: false });
        refetch();
      } else {
        toast({ title: "Error adding video", variant: "destructive" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/content/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch();
      toast({ title: "Video deleted" });
    } catch {
      toast({ title: "Error deleting video", variant: "destructive" });
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await fetch(`/api/content/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      refetch();
      toast({ title: isPublished ? "Video unpublished" : "Video published" });
    } catch {
      toast({ title: "Error updating video", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Video</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Video Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Video title"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Video URL</label>
            <Input
              type="url"
              value={formData.url}
              onChange={(e) => setFormData({ ...formData, url: e.target.value })}
              placeholder="https://youtube.com/embed/... or video file URL"
              required
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish-video"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
            />
            <label htmlFor="publish-video" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Video"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Published Videos</h2>
        {videos && videos.length > 0 ? (
          <div className="space-y-4">
            {videos.map((item: any) => (
              <Card key={item.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <span className={`inline-block mt-2 px-2 py-1 text-xs rounded ${item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}`}>
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                    >
                      {item.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No videos yet.</p>
        )}
      </Card>
    </div>
  );
}

function CandidatesTab({ token }: { token: string }) {
  const { data: candidates, refetch, isLoading } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    company: "",
    bio: "",
    imageUrl: "",
    status: "pending",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const response = await fetch("/api/verified-candidates", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ ...formData, service: "Candidate Verification" }),
      });

      if (response.ok) {
        toast({ title: "Candidate added successfully" });
        setFormData({
          fullName: "",
          title: "",
          company: "",
          bio: "",
          imageUrl: "",
          status: "pending",
        });
        refetch();
      } else {
        toast({ title: "Error adding candidate", variant: "destructive" });
      }
    } finally {
      setSubmitting(false);
    }
  };

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/verified-candidates/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status: newStatus }),
      });
      refetch();
      toast({ title: "Candidate status updated" });
    } catch {
      toast({ title: "Error updating status", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Add Verified Candidate</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Full Name</label>
            <Input
              value={formData.fullName}
              onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
              placeholder="Candidate full name"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title / Profession</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., HR Manager, Software Developer"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Company (Optional)</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Current or last company"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Description</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief professional description"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image URL</label>
            <Input
              type="url"
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <Button type="submit" disabled={submitting}>
            {submitting ? "Adding..." : "Add Candidate"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Verified Candidates</h2>
        {candidates && candidates.length > 0 ? (
          <div className="space-y-4">
            {candidates.map((cand: any) => (
              <Card key={cand.id} className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">{cand.fullName}</p>
                    <p className="text-sm text-blue-600">{cand.title}</p>
                    {cand.company && <p className="text-sm text-muted-foreground">{cand.company}</p>}
                  </div>
                  <select
                    value={cand.status}
                    onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No candidates yet.</p>
        )}
      </Card>
    </div>
  );
}
