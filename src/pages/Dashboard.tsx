import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { RepoCard } from "@/components/deployment/RepoCard";
import { DashboardLayout } from "@/components/layout/DashboardLayout";

// Mock data
const mockRepos = [
  {
    id: "1",
    name: "my-nextjs-app",
    owner: "johndoe",
    framework: "Next.js",
    branch: "main",
    lastDeployment: {
      status: "success" as const,
      time: "2 hours ago",
      url: "https://my-nextjs-app.vercel.app",
    },
  },
  {
    id: "2",
    name: "react-dashboard",
    owner: "johndoe",
    framework: "React",
    branch: "main",
    lastDeployment: {
      status: "building" as const,
      time: "5 minutes ago",
    },
  },
  {
    id: "3",
    name: "api-service",
    owner: "johndoe",
    framework: "Node.js",
    branch: "develop",
    lastDeployment: {
      status: "failed" as const,
      time: "1 day ago",
    },
  },
  {
    id: "4",
    name: "landing-page",
    owner: "johndoe",
    framework: "Vue.js",
    branch: "main",
    lastDeployment: {
      status: "success" as const,
      time: "3 days ago",
      url: "https://landing-page.vercel.app",
    },
  },
];

const Dashboard = () => {
  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold">Projects</h1>
            <p className="text-muted-foreground mt-1">
              Manage and deploy your repositories
            </p>
          </div>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Project
          </Button>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {mockRepos.map((repo) => (
            <RepoCard key={repo.id} {...repo} />
          ))}
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
