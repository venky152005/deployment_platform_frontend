import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Github, CheckCircle2 } from "lucide-react";

const GitHubConnect = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Simulate GitHub connection process
    const connectGitHub = async () => {
      // Placeholder for actual GitHub OAuth callback handling
      // fetch('/auth/github/callback?code=...')
      
      // Simulate connection delay
      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    };

    connectGitHub();
  }, [navigate]);

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

            {/* Status Messages */}
            <div className="space-y-4 w-full text-center">
              <h2 className="text-2xl font-semibold text-foreground">
                Connecting to GitHub
              </h2>
              <p className="text-sm text-muted-foreground">
                Please wait while we connect your GitHub account...
              </p>

              {/* Progress Steps */}
              <div className="space-y-3 pt-4">
                <div className="flex items-center space-x-3 text-sm">
                  <CheckCircle2 className="h-4 w-4 text-success" />
                  <span className="text-foreground">Authenticating with GitHub</span>
                </div>
                <div className="flex items-center space-x-3 text-sm">
                  <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                  <span className="text-foreground">Fetching repositories</span>
                </div>
                <div className="flex items-center space-x-3 text-sm opacity-50">
                  <div className="h-4 w-4 rounded-full border-2 border-muted" />
                  <span className="text-muted-foreground">Setting up webhooks</span>
                </div>
              </div>

              {/* Progress Bar */}
              <Progress value={66} className="w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default GitHubConnect;
