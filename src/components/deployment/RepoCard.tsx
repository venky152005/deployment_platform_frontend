import { FolderGit2, ExternalLink, GitBranch } from "lucide-react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { DeploymentBadge } from "./DeploymentBadge";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

interface RepoCardProps {
  id: string;
  name: string;
  owner: string;
  framework: string;
  lastDeployment: {
    status: "success" | "failed" | "building" | "pending";
    time: string;
    url?: string;
  };
  branch: string;
}

export const RepoCard = ({ id, name, owner, framework, lastDeployment, branch }: RepoCardProps) => {
  const navigate = useNavigate();

  return (
    <Card className="hover:shadow-md transition-shadow cursor-pointer" onClick={() => navigate(`/projects/${id}`)}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <FolderGit2 className="h-5 w-5 text-muted-foreground" />
            <div>
              <h3 className="font-semibold text-foreground">{name}</h3>
              <p className="text-xs text-muted-foreground">{owner}/{name}</p>
            </div>
          </div>
          <DeploymentBadge status={lastDeployment.status} />
        </div>
      </CardHeader>

      <CardContent className="pb-3">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <GitBranch className="h-3 w-3" />
            <span>{branch}</span>
          </div>
          <span>•</span>
          <span>{framework}</span>
          <span>•</span>
          <span>{lastDeployment.time}</span>
        </div>
      </CardContent>

      {lastDeployment.url && (
        <CardFooter className="pt-0">
          <Button
            variant="ghost"
            size="sm"
            className="h-8 px-2 text-xs text-accent hover:text-accent-foreground"
            onClick={(e) => {
              e.stopPropagation();
              window.open(lastDeployment.url, "_blank");
            }}
          >
            <ExternalLink className="mr-1 h-3 w-3" />
            Visit Deployment
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};
