import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { useToast } from "@/hooks/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useQuery } from "@tanstack/react-query";

export default function Admin() {
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  const [password, setPassword] = useState("");
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  // Check auth on mount
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
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="requests">Service Requests</TabsTrigger>
            <TabsTrigger value="content">Content Management</TabsTrigger>
            <TabsTrigger value="candidates">Verified Candidates</TabsTrigger>
          </TabsList>

          <TabsContent value="requests" className="space-y-4">
            <ServiceRequestsTab token={token} />
          </TabsContent>

          <TabsContent value="content" className="space-y-4">
            <ContentTab token={token} />
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
  const { data: requests, refetch } = useQuery({
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
              <p className="text-sm text-muted-foreground line-clamp-2">{req.description}</p>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No requests yet.</p>
      )}
    </Card>
  );
}

function ContentTab({ token }: { token: string }) {
  const { data: content, refetch } = useQuery({
    queryKey: ["/api/content"],
    queryFn: () => fetch("/api/content").then((r) => r.json()),
  });

  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await fetch(`/api/content/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      refetch();
      toast({ title: "Content deleted" });
    } catch {
      toast({ title: "Error deleting content", variant: "destructive" });
    }
  };

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Published Content</h2>
      {content && content.length > 0 ? (
        <div className="space-y-4">
          {content.map((item: any) => (
            <Card key={item.id} className="p-4 flex justify-between items-center">
              <div>
                <span className="inline-block px-2 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 text-xs rounded mr-3">
                  {item.type}
                </span>
                <span className="font-medium">{item.title}</span>
              </div>
              <Button variant="destructive" size="sm" onClick={() => handleDelete(item.id)}>
                Delete
              </Button>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No content published.</p>
      )}
    </Card>
  );
}

function CandidatesTab({ token }: { token: string }) {
  const { data: candidates, refetch } = useQuery({
    queryKey: ["/api/verified-candidates"],
    queryFn: () => fetch("/api/verified-candidates").then((r) => r.json()),
  });

  const { toast } = useToast();

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

  return (
    <Card className="p-6">
      <h2 className="text-2xl font-bold mb-4">Verified Candidates</h2>
      {candidates && candidates.length > 0 ? (
        <div className="space-y-4">
          {candidates.map((cand: any) => (
            <Card key={cand.id} className="p-4">
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                <div>
                  <p className="text-sm text-muted-foreground">Name</p>
                  <p className="font-medium">{cand.fullName}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Title</p>
                  <p className="font-medium">{cand.title}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Status</p>
                  <select
                    value={cand.status}
                    onChange={(e) => handleStatusChange(cand.id, e.target.value)}
                    className="text-sm font-medium border rounded px-2 py-1"
                  >
                    <option value="pending">Pending</option>
                    <option value="approved">Approved</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            </Card>
          ))}
        </div>
      ) : (
        <p className="text-muted-foreground">No candidates yet.</p>
      )}
    </Card>
  );
}
