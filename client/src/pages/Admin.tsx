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
            <img src="/logo.png" alt="Miemploya" className="h-12 mx-auto mb-4" />
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
                data-testid="input-admin-password"
              />
            </div>
            <Button type="submit" disabled={loading} className="w-full" data-testid="button-admin-login">
              {loading ? "Logging in..." : "Login"}
            </Button>
          </form>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-muted">
      <header className="border-b bg-white dark:bg-slate-950 sticky top-0 z-40">
        <div className="container flex items-center justify-between h-16 px-4">
          <div className="flex items-center gap-2">
            <img src="/logo.png" alt="Miemploya" className="h-8" />
            <span className="font-bold">Admin</span>
          </div>
          <Button
            variant="outline"
            onClick={() => {
              localStorage.removeItem("admin_token");
              setToken("");
              setLocation("/");
            }}
            data-testid="button-admin-logout"
          >
            Logout
          </Button>
        </div>
      </header>

      <div className="container py-8 px-4">
        <Tabs defaultValue="requests" className="w-full">
          <TabsList className="flex flex-wrap gap-1 h-auto p-1">
            <TabsTrigger value="requests" data-testid="tab-requests">Service Requests</TabsTrigger>
            <TabsTrigger value="training" data-testid="tab-training">Training Requests</TabsTrigger>
            <TabsTrigger value="news" data-testid="tab-news">News</TabsTrigger>
            <TabsTrigger value="videos" data-testid="tab-videos">Videos</TabsTrigger>
            <TabsTrigger value="candidates" data-testid="tab-candidates">Verified Candidates</TabsTrigger>
            <TabsTrigger value="templates" data-testid="tab-templates">Books & Templates</TabsTrigger>
            <TabsTrigger value="jobs" data-testid="tab-jobs">Jobs</TabsTrigger>
            <TabsTrigger value="applications" data-testid="tab-applications">Job Applications</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <ServiceRequestsTab token={token} />
          </TabsContent>

          <TabsContent value="training" className="space-y-4">
            <TrainingRequestsTab token={token} />
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

          <TabsContent value="templates" className="space-y-4">
            <TemplatesTab token={token} />
          </TabsContent>

          <TabsContent value="jobs" className="space-y-4">
            <JobsTab token={token} />
          </TabsContent>

          <TabsContent value="applications" className="space-y-4">
            <JobApplicationsTab token={token} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}

function ServiceRequestsTab({ token }: { token: string }) {
  const { data: requests, refetch, isLoading } = useQuery({
    queryKey: ["/api/requests", token],
    queryFn: () =>
      fetch("/api/requests", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
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
            <Card key={req.id} className="p-4" data-testid={`card-request-${req.id}`}>
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
                    data-testid={`select-status-${req.id}`}
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
    queryKey: ["/api/content-news", token],
    queryFn: () =>
      fetch("/api/content?type=news", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const [formData, setFormData] = useState({ title: "", description: "", image: null as File | null, isPublished: false });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast({ title: "Please select an image file", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description || "");
      formDataObj.append("type", "news");
      formDataObj.append("isPublished", String(formData.isPublished));
      formDataObj.append("image", formData.image);

      const response = await fetch("/api/content/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });

      if (response.ok) {
        toast({ title: "News added successfully" });
        setFormData({ title: "", description: "", image: null, isPublished: false });
        refetch();
      } else {
        const err = await response.json();
        toast({ title: "Error: " + (err.message || "Unknown error"), variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown error"), variant: "destructive" });
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
              data-testid="input-news-title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="News description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Image File (jpg, png, webp)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              required
              className="w-full border rounded px-3 py-2"
              data-testid="input-news-image"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              data-testid="checkbox-news-publish"
            />
            <label htmlFor="publish" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting} data-testid="button-add-news">
            {submitting ? "Adding..." : "Add News"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Published News</h2>
        {news && news.length > 0 ? (
          <div className="space-y-4">
            {news.map((item: any) => (
              <Card key={item.id} className="p-4" data-testid={`card-news-${item.id}`}>
                <div className="flex gap-4">
                  {item.imageUrl && (
                    <img src={item.imageUrl} alt={item.title} className="w-20 h-20 object-cover rounded" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                      data-testid={`status-news-${item.id}`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                      data-testid={`button-toggle-news-${item.id}`}
                    >
                      {item.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-news-${item.id}`}
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
    queryKey: ["/api/content-videos", token],
    queryFn: () =>
      fetch("/api/content?type=video", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const [formData, setFormData] = useState({ title: "", video: null as File | null, isPublished: false });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.video) {
      toast({ title: "Please select a video file", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("type", "video");
      formDataObj.append("isPublished", String(formData.isPublished));
      formDataObj.append("video", formData.video);

      const response = await fetch("/api/content/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });

      if (response.ok) {
        toast({ title: "Video added successfully" });
        setFormData({ title: "", video: null, isPublished: false });
        refetch();
      } else {
        const err = await response.json();
        toast({ title: "Error: " + (err.message || "Unknown error"), variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown error"), variant: "destructive" });
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
              data-testid="input-video-title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Video File (mp4, webm)</label>
            <input
              type="file"
              accept="video/*"
              onChange={(e) => setFormData({ ...formData, video: e.target.files?.[0] || null })}
              required
              className="w-full border rounded px-3 py-2"
              data-testid="input-video-file"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish-video"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              data-testid="checkbox-video-publish"
            />
            <label htmlFor="publish-video" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting} data-testid="button-add-video">
            {submitting ? "Adding..." : "Add Video"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Published Videos</h2>
        {videos && videos.length > 0 ? (
          <div className="space-y-4">
            {videos.map((item: any) => (
              <Card key={item.id} className="p-4" data-testid={`card-video-${item.id}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    <span
                      className={`inline-block mt-2 px-2 py-1 text-xs rounded ${
                        item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                      }`}
                      data-testid={`status-video-${item.id}`}
                    >
                      {item.isPublished ? "Published" : "Draft"}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                      data-testid={`button-toggle-video-${item.id}`}
                    >
                      {item.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-video-${item.id}`}
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

function TemplatesTab({ token }: { token: string }) {
  const { data: templates, refetch, isLoading } = useQuery({
    queryKey: ["/api/templates", token],
    queryFn: () =>
      fetch("/api/templates/all", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    file: null as File | null,
    fileType: "pdf" as "pdf" | "docx" | "xlsx",
    isPublished: false,
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file) {
      toast({ title: "Please select a template file", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("title", formData.title);
      formDataObj.append("description", formData.description || "");
      formDataObj.append("fileType", formData.fileType);
      formDataObj.append("isPublished", String(formData.isPublished));
      formDataObj.append("file", formData.file);

      const response = await fetch("/api/templates/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });

      if (response.ok) {
        toast({ title: "Template uploaded successfully" });
        setFormData({
          title: "",
          description: "",
          file: null,
          fileType: "pdf",
          isPublished: false,
        });
        refetch();
      } else {
        const err = await response.json();
        toast({ title: "Error: " + (err.message || "Unknown error"), variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown error"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/templates/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch();
      toast({ title: "Template deleted" });
    } catch {
      toast({ title: "Error deleting template", variant: "destructive" });
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await fetch(`/api/templates/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      refetch();
      toast({ title: isPublished ? "Template unpublished" : "Template published" });
    } catch {
      toast({ title: "Error updating template", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Upload Template</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-2">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="Template title"
              required
              data-testid="input-template-title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Template description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">File Type</label>
            <select
              value={formData.fileType}
              onChange={(e) => setFormData({ ...formData, fileType: e.target.value as "pdf" | "docx" | "xlsx" })}
              className="w-full border rounded px-3 py-2"
            >
              <option value="pdf">PDF</option>
              <option value="docx">Word (DOCX)</option>
              <option value="xlsx">Excel (XLSX)</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Template File</label>
            <input
              type="file"
              accept=".pdf,.docx,.xlsx"
              onChange={(e) => setFormData({ ...formData, file: e.target.files?.[0] || null })}
              required
              className="w-full border rounded px-3 py-2"
              data-testid="input-template-file"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish-template"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              data-testid="checkbox-template-publish"
            />
            <label htmlFor="publish-template" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting} data-testid="button-add-template">
            {submitting ? "Uploading..." : "Upload Template"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Templates</h2>
        {templates && templates.length > 0 ? (
          <div className="space-y-4">
            {templates.map((item: any) => (
              <Card key={item.id} className="p-4" data-testid={`card-template-${item.id}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold">{item.title}</p>
                    {item.description && <p className="text-sm text-muted-foreground mt-1">{item.description}</p>}
                    <div className="flex gap-2 mt-2">
                      <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                        {item.fileType.toUpperCase()}
                      </span>
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          item.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                        data-testid={`status-template-${item.id}`}
                      >
                        {item.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(item.id, item.isPublished)}
                      data-testid={`button-toggle-template-${item.id}`}
                    >
                      {item.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(item.id)}
                      data-testid={`button-delete-template-${item.id}`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No templates yet.</p>
        )}
      </Card>
    </div>
  );
}

function JobsTab({ token }: { token: string }) {
  const { data: jobs, refetch, isLoading } = useQuery({
    queryKey: ["/api/admin/jobs", token],
    queryFn: () =>
      fetch("/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const [formData, setFormData] = useState({
    title: "",
    company: "",
    description: "",
    requirements: "",
    location: "",
    state: "",
    city: "",
    category: "",
    isPublished: false,
  });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const resetForm = () => {
    setFormData({
      title: "",
      company: "",
      description: "",
      requirements: "",
      location: "",
      state: "",
      city: "",
      category: "",
      isPublished: false,
    });
    setEditingId(null);
  };

  const handleEdit = (job: any) => {
    setFormData({
      title: job.title,
      company: job.company,
      description: job.description,
      requirements: job.requirements,
      location: job.location,
      state: job.state,
      city: job.city,
      category: job.category || "",
      isPublished: job.isPublished,
    });
    setEditingId(job.id);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const url = editingId ? `/api/admin/jobs/${editingId}` : "/api/admin/jobs";
      const method = editingId ? "PATCH" : "POST";
      
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({ title: editingId ? "Job updated successfully" : "Job posted successfully" });
        resetForm();
        refetch();
      } else {
        const err = await response.json();
        toast({ title: "Error: " + (err.message || "Unknown error"), variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown error"), variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/admin/jobs/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch();
      toast({ title: "Job deleted" });
    } catch {
      toast({ title: "Error deleting job", variant: "destructive" });
    }
  };

  const handleTogglePublish = async (id: number, isPublished: boolean) => {
    try {
      await fetch(`/api/admin/jobs/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ isPublished: !isPublished }),
      });
      refetch();
      toast({ title: isPublished ? "Job unpublished" : "Job published" });
    } catch {
      toast({ title: "Error updating job", variant: "destructive" });
    }
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold">{editingId ? "Edit Job Posting" : "Add Job Posting"}</h2>
          {editingId && (
            <Button variant="outline" size="sm" onClick={resetForm} data-testid="button-cancel-edit-job">
              Cancel Edit
            </Button>
          )}
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">Job Title</label>
              <Input
                value={formData.title}
                onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                placeholder="e.g., Senior HR Manager"
                required
                data-testid="input-job-title"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Company Name</label>
              <Input
                value={formData.company}
                onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                placeholder="Company name"
                required
                data-testid="input-job-company"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">State</label>
              <Input
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                placeholder="State"
                required
                data-testid="input-job-state"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">City</label>
              <Input
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                placeholder="City"
                required
                data-testid="input-job-city"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Input
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                placeholder="e.g., Human Resources"
                data-testid="input-job-category"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Location (Display)</label>
            <Input
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              placeholder="e.g., Lagos, Nigeria"
              required
              data-testid="input-job-location"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Job Description</label>
            <Textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              placeholder="Detailed job description..."
              required
              data-testid="input-job-description"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Requirements</label>
            <Textarea
              value={formData.requirements}
              onChange={(e) => setFormData({ ...formData, requirements: e.target.value })}
              placeholder="Job requirements and qualifications..."
              required
              data-testid="input-job-requirements"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="publish-job"
              checked={formData.isPublished}
              onChange={(e) => setFormData({ ...formData, isPublished: e.target.checked })}
              data-testid="checkbox-job-publish"
            />
            <label htmlFor="publish-job" className="text-sm font-medium cursor-pointer">
              Publish immediately
            </label>
          </div>
          <Button type="submit" disabled={submitting} data-testid="button-add-job">
            {submitting ? (editingId ? "Updating..." : "Posting...") : (editingId ? "Update Job" : "Post Job")}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Job Postings</h2>
        {jobs && jobs.length > 0 ? (
          <div className="space-y-4">
            {jobs.map((job: any) => (
              <Card key={job.id} className="p-4" data-testid={`card-admin-job-${job.id}`}>
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-bold text-lg">{job.title}</p>
                    <p className="text-blue-600">{job.company}</p>
                    <p className="text-sm text-muted-foreground mt-1">{job.location}</p>
                    <div className="flex gap-2 mt-2">
                      {job.category && (
                        <span className="inline-block px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded">
                          {job.category}
                        </span>
                      )}
                      <span
                        className={`inline-block px-2 py-1 text-xs rounded ${
                          job.isPublished ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                        }`}
                        data-testid={`status-job-${job.id}`}
                      >
                        {job.isPublished ? "Published" : "Draft"}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleEdit(job)}
                      data-testid={`button-edit-job-${job.id}`}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleTogglePublish(job.id, job.isPublished)}
                      data-testid={`button-toggle-job-${job.id}`}
                    >
                      {job.isPublished ? "Unpublish" : "Publish"}
                    </Button>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => handleDelete(job.id)}
                      data-testid={`button-delete-job-${job.id}`}
                    >
                      Delete
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">No job postings yet.</p>
        )}
      </Card>
    </div>
  );
}

function JobApplicationsTab({ token }: { token: string }) {
  const { data: applications, isLoading } = useQuery({
    queryKey: ["/api/admin/job-applications", token],
    queryFn: () =>
      fetch("/api/admin/job-applications", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const { data: jobs } = useQuery({
    queryKey: ["/api/admin/jobs", token],
    queryFn: () =>
      fetch("/api/admin/jobs", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const getJobTitle = (jobId: number) => {
    const job = jobs?.find((j: any) => j.id === jobId);
    return job?.title || `Job #${jobId}`;
  };

  if (isLoading) return <div className="text-center py-8">Loading...</div>;

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Job Applications</h2>
      {applications && applications.length > 0 ? (
        <div className="space-y-4">
          {applications.map((app: any) => (
            <Card key={app.id} className="p-4" data-testid={`card-application-${app.id}`}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Applicant</p>
                  <p className="font-medium">{app.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Applied For</p>
                  <p className="font-medium text-blue-600">{getJobTitle(app.jobId)}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{app.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium">{app.phone}</p>
                </div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">State</p>
                  <p className="font-medium">{app.state}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">City</p>
                  <p className="font-medium">{app.city}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">CV</p>
                  <a
                    href={app.cvUrl}
                    download={app.cvFileName}
                    className="text-blue-600 font-medium hover:underline"
                    data-testid={`link-download-cv-${app.id}`}
                  >
                    Download CV
                  </a>
                </div>
              </div>
              {app.coverNote && (
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Cover Note</p>
                  <p className="text-sm">{app.coverNote}</p>
                </div>
              )}
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No job applications yet.</p>
      )}
    </Card>
  );
}

function CandidatesTab({ token }: { token: string }) {
  const { data: candidates, refetch, isLoading } = useQuery({
    queryKey: ["/api/verified-candidates", token],
    queryFn: () => {
      const authHeader = token ? { Authorization: `Bearer ${token}` } : {};
      return fetch("/api/verified-candidates", { headers: authHeader }).then((r) => r.json());
    },
    enabled: !!token,
  });

  const [formData, setFormData] = useState({
    fullName: "",
    title: "",
    company: "",
    bio: "",
    image: null as File | null,
    status: "approved",
  });
  const [submitting, setSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.image) {
      toast({ title: "Please select a profile image", variant: "destructive" });
      return;
    }

    setSubmitting(true);
    try {
      const formDataObj = new FormData();
      formDataObj.append("fullName", formData.fullName);
      formDataObj.append("title", formData.title);
      formDataObj.append("company", formData.company || "");
      formDataObj.append("bio", formData.bio);
      formDataObj.append("image", formData.image);
      formDataObj.append("service", "Candidate Verification");
      formDataObj.append("status", formData.status);

      const response = await fetch("/api/verified-candidates/upload", {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formDataObj,
      });

      if (response.ok) {
        toast({ title: "Candidate added successfully" });
        setFormData({
          fullName: "",
          title: "",
          company: "",
          bio: "",
          image: null,
          status: "approved",
        });
        refetch();
      } else {
        toast({ title: "Error adding candidate", variant: "destructive" });
      }
    } catch (err) {
      toast({ title: "Error: " + (err instanceof Error ? err.message : "Unknown error"), variant: "destructive" });
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
              data-testid="input-candidate-name"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Title / Profession</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              placeholder="e.g., HR Manager, Software Developer"
              required
              data-testid="input-candidate-title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Company (Optional)</label>
            <Input
              value={formData.company}
              onChange={(e) => setFormData({ ...formData, company: e.target.value })}
              placeholder="Current or last company"
              data-testid="input-candidate-company"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Description</label>
            <Textarea
              value={formData.bio}
              onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
              placeholder="Brief professional description"
              required
              data-testid="input-candidate-bio"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Profile Image File (jpg, png, webp)</label>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setFormData({ ...formData, image: e.target.files?.[0] || null })}
              required
              className="w-full border rounded px-3 py-2"
              data-testid="input-candidate-image"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value })}
              className="w-full border rounded px-3 py-2"
              data-testid="select-candidate-status"
            >
              <option value="pending">Pending Review</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>
          <Button type="submit" disabled={submitting} data-testid="button-add-candidate">
            {submitting ? "Adding..." : "Add Candidate"}
          </Button>
        </form>
      </Card>

      <Card className="p-6">
        <h2 className="text-2xl font-bold mb-4">Verified Candidates</h2>
        {candidates && candidates.length > 0 ? (
          <div className="space-y-4">
            {candidates.map((cand: any) => (
              <Card key={cand.id} className="p-4" data-testid={`card-candidate-${cand.id}`}>
                <div className="flex gap-4">
                  {cand.imageUrl && (
                    <img src={cand.imageUrl} alt={cand.fullName} className="w-16 h-16 rounded-full object-cover" />
                  )}
                  <div className="flex-1">
                    <p className="font-bold">{cand.fullName}</p>
                    <p className="text-sm text-blue-600">{cand.title}</p>
                    {cand.company && <p className="text-sm text-muted-foreground">{cand.company}</p>}
                  </div>
                  <select
                    value={cand.status}
                    onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                    className="text-sm border rounded px-2 py-1"
                    data-testid={`select-candidate-status-${cand.id}`}
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

function TrainingRequestsTab({ token }: { token: string }) {
  const { data: requests, refetch, isLoading } = useQuery({
    queryKey: ["/api/admin/training-requests", token],
    queryFn: () =>
      fetch("/api/admin/training-requests", {
        headers: { Authorization: `Bearer ${token}` },
      }).then((r) => r.json()),
    enabled: !!token,
  });

  const { toast } = useToast();

  const handleStatusChange = async (id: number, newStatus: string) => {
    try {
      await fetch(`/api/admin/training-requests/${id}`, {
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
      <h2 className="text-2xl font-bold mb-4">Training Requests</h2>
      <p className="text-muted-foreground mb-6">
        View and manage training registration requests from users.
      </p>
      {requests && requests.length > 0 ? (
        <div className="space-y-4">
          {requests.map((req: any) => (
            <Card key={req.id} className="p-4" data-testid={`card-training-${req.id}`}>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Full Name</p>
                  <p className="font-medium">{req.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Email</p>
                  <p className="font-medium text-sm">{req.email}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Phone</p>
                  <p className="font-medium text-sm">{req.phone}</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Interested Training</p>
                  <p className="font-medium text-primary">{req.interestedTraining}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Preferred Start Date</p>
                  <p className="font-medium">{req.preferredStartDate || "Not specified"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <select
                    value={req.status}
                    onChange={(e) => handleStatusChange(req.id, e.target.value)}
                    className="text-sm font-medium border rounded px-2 py-1"
                    data-testid={`select-training-status-${req.id}`}
                  >
                    <option value="new">New</option>
                    <option value="reviewed">Reviewed</option>
                    <option value="contacted">Contacted</option>
                  </select>
                </div>
              </div>

              {(req.employmentStatus || req.organizationName || req.role) && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4 pt-4 border-t">
                  <div>
                    <p className="text-sm text-muted-foreground">Employment Status</p>
                    <p className="font-medium text-sm">{req.employmentStatus || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Organization</p>
                    <p className="font-medium text-sm">{req.organizationName || "-"}</p>
                  </div>
                  <div>
                    <p className="text-sm text-muted-foreground">Role</p>
                    <p className="font-medium text-sm">{req.role || "-"}</p>
                  </div>
                </div>
              )}

              <div className="flex gap-4 pt-2">
                <span className={`text-xs px-2 py-1 rounded ${req.certificationRequired ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                  Certification: {req.certificationRequired ? "Yes" : "No"}
                </span>
                <span className={`text-xs px-2 py-1 rounded ${req.verifiedShortlist ? "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400" : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"}`}>
                  Verified Shortlist: {req.verifiedShortlist ? "Yes" : "No"}
                </span>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No training requests yet.</p>
      )}
    </Card>
  );
}
