import { ArrowLeft, ExternalLink, GitBranch, Play, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { DeploymentBadge } from "@/components/deployment/DeploymentBadge";
import { useNavigate, useParams } from "react-router-dom";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

const mockDeployments = [
  {
    id: "d1",
    status: "success" as const,
    commit: "feat: add new dashboard layout",
    commitId: "a3f5b2c",
    branch: "main",
    time: "2 hours ago",
    buildTime: "45s",
    url: "https://my-app-d1.vercel.app",
  },
  {
    id: "d2",
    status: "failed" as const,
    commit: "fix: update dependencies",
    commitId: "9e8d1a4",
    branch: "main",
    time: "5 hours ago",
    buildTime: "32s",
  },
  {
    id: "d3",
    status: "success" as const,
    commit: "chore: update README",
    commitId: "2b7c9f1",
    branch: "main",
    time: "1 day ago",
    buildTime: "41s",
    url: "https://my-app-d3.vercel.app",
  },
];

const ProjectDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const handleDeploy = () => {
    console.log("Triggering deployment...");
  };

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate("/dashboard")}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div className="flex-1">
            <h1 className="text-3xl font-bold">my-nextjs-app</h1>
            <p className="text-muted-foreground mt-1">johndoe/my-nextjs-app</p>
          </div>
          <Button onClick={handleDeploy}>
            <Play className="mr-2 h-4 w-4" />
            Deploy Now
          </Button>
          <Button variant="outline" onClick={() => navigate(`/projects/${id}/settings`)}>
            <Settings className="mr-2 h-4 w-4" />
            Settings
          </Button>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Deployments</CardTitle>
                <CardDescription>
                  View deployment history and status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {mockDeployments.map((deployment) => (
                    <div key={deployment.id} className="flex items-center gap-4 p-4 rounded-lg border border-border hover:bg-secondary/50 transition-colors">
                      <DeploymentBadge status={deployment.status} />
                      
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{deployment.commit}</p>
                        <div className="flex items-center gap-2 mt-1 text-xs text-muted-foreground">
                          <Badge variant="outline" className="font-mono text-xs">
                            {deployment.commitId}
                          </Badge>
                          <span>•</span>
                          <GitBranch className="h-3 w-3" />
                          <span>{deployment.branch}</span>
                          <span>•</span>
                          <span>{deployment.time}</span>
                          <span>•</span>
                          <span>{deployment.buildTime}</span>
                        </div>
                      </div>

                      {deployment.url && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => window.open(deployment.url, "_blank")}
                        >
                          <ExternalLink className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Build Logs</CardTitle>
                <CardDescription>Most recent deployment logs</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="bg-primary text-primary-foreground rounded-lg p-4 font-mono text-xs space-y-1 max-h-64 overflow-auto">
                  <div>[00:00] Cloning repository...</div>
                  <div>[00:02] Installing dependencies...</div>
                  <div>[00:15] Building application...</div>
                  <div>[00:35] Optimizing assets...</div>
                  <div>[00:42] Deploying to production...</div>
                  <div className="text-success-foreground">[00:45] ✓ Deployment successful!</div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Project Info</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <p className="text-sm text-muted-foreground">Framework</p>
                  <p className="font-medium">Next.js</p>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Branch</p>
                  <div className="flex items-center gap-2 mt-1">
                    <GitBranch className="h-3 w-3" />
                    <p className="font-medium">main</p>
                  </div>
                </div>
                <Separator />
                <div>
                  <p className="text-sm text-muted-foreground">Latest Deployment</p>
                  <p className="font-medium">2 hours ago</p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Environment Variables</CardTitle>
                <CardDescription>3 variables configured</CardDescription>
              </CardHeader>
              <CardContent>
                <Button variant="outline" className="w-full">
                  Manage Variables
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectDetail;
