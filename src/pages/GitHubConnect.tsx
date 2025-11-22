import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Github, CheckCircle2 } from "lucide-react";
import axios from "axios";
import { toast } from "@/components/ui/use-toast";

const GitHubConnect = () => {
  const navigate = useNavigate();

  type Repo = {
    id?: number | string;
    name: string;
    description?: string | null;
    private?: boolean;
    html_url?: string;
  };

  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [creatingHookRepo, setCreatingHookRepo] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  useEffect(() => {
    const fetchRepos = async () => {
      setLoading(true);
      setError(null);
      try {
        const res = await axios.get(`${API_URL}/api/repo/list`,{
          headers:{ 
            Authorization: `Bearer ${token}`
          }
        });
        if (res.status === 200) {
          const payload = res.data;
          const list = Array.isArray(payload?.data) ? payload.data : [];
          setRepos(list);
        } else {
          throw new Error(`Failed to fetch repos: ${res.status}`);
        }
      } catch (err) {
        setError("Could not load repositories. Showing sample data.");
        console.error(err);
        setRepos([
          { id: 1, name: "example-repo-1", description: "Example repository 1" },
          { id: 2, name: "example-repo-2", description: "Example repository 2" },
          { id: 3, name: "example-repo-3", description: "Example repository 3" },
          { id: 4, name: "example-repo-4", description: "Example repository 4" },
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6 pb-8">
          <div className="flex flex-col items-center space-y-6">
            {/* GitHub Icon with Animation */}
            <div className="relative">
              <div className="absolute inset-0 animate-ping rounded-full bg-primary/20" />
              <div className="relative rounded-full bg-primary/10 p-6">
                <Github className="h-12 w-12 text-foreground" />
              </div>
            </div>

            {/* Status / Repo List */}
            <div className="space-y-4 w-full text-center">
              <h2 className="text-2xl font-semibold text-foreground">Connected Repositories</h2>
              <p className="text-sm text-muted-foreground">
                Select a repository to continue.
              </p>

              {loading ? (
                <div className="pt-4">
                  <div className="text-sm">Loading repositories...</div>
                  <Progress value={40} className="w-full mt-2" />
                </div>
              ) : (
                <>
                  {error && <div className="text-xs text-amber-600">{error}</div>}

                  <div className={`mt-4 w-full space-y-2 ${repos.length > 3 ? "max-h-60 overflow-y-auto" : ""}`}>
                    {repos.length === 0 ? (
                      <div className="text-sm text-muted-foreground">No repositories found.</div>
                    ) : (
                      repos.map((r) => (
                        <div
                          key={r.id ?? r.name}
                          className="flex items-start justify-between rounded-md border p-3 text-left"
                        >
                          <div className="flex flex-col text-sm">
                            <span className="font-medium text-foreground">{r.name}</span>
                            <span className="text-muted-foreground text-xs">{r.description ?? "No description"}</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <a
                              href={r.html_url ?? '#'}
                              target="_blank"
                              rel="noreferrer"
                              className="text-sm text-primary underline"
                            >
                              View
                            </a>
                            <button
                              className="rounded bg-primary px-3 py-1 text-sm text-white disabled:opacity-60"
                              disabled={creatingHookRepo === r.name}
                              onClick={async () => {
                                try {
                                  setCreatingHookRepo(r.name);
                                  const repoIdentifier = (r as any).full_name ?? r.name;
                                  const payload = { repoFullName: repoIdentifier };
                                  const resp = await axios.post(`${API_URL}/api/create/webhook`, payload, {
                                    headers: { Authorization: `Bearer ${token}` },
                                  });

                                  if (resp.status === 200 || resp.status === 201) {
                                    toast({ title: "Webhook created", description: `Webhook created for ${repoIdentifier}` });
                                    navigate(`/dashboard?repo=${encodeURIComponent(repoIdentifier)}`);
                                  } else {
                                    toast({ title: "Failed", description: `Failed to create webhook (${resp.status})` });
                                  }
                                } catch (err: any) {
                                  console.error(err);
                                  const msg = err?.response?.data?.message ?? err.message ?? "Unknown error";
                                  toast({ title: "Error", description: `Could not create webhook: ${msg}` });
                                } finally {
                                  setCreatingHookRepo(null);
                                }
                              }}
                            >
                              {creatingHookRepo === r.name ? "Creating..." : "Select"}
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubConnect;
