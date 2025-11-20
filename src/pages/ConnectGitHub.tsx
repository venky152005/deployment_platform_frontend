import { Github, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ConnectGitHub = () => {
  const navigate = useNavigate();
  const API_URL = import.meta.env.VITE_API_URL;
  const token = localStorage.getItem('token');

  const handleConnectGitHub = async() => {
    // Placeholder for GitHub OAuth initiation
    console.log("Initiating GitHub OAuth...");
    console.log("token:",token);
    try {
      const response = await axios.get(`${API_URL}/api/connect`,{
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

       window.location.href = response.data.url;
    } catch (error) {
      console.error("Github OAuth failed", error);
    }
  };

  const permissions = [
    "Read access to your repositories",
    "Write access to webhooks",
    "Read your user profile information",
    "Access to deployment statuses",
  ];

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center space-y-2">
          <div className="mx-auto w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Github className="h-8 w-8 text-foreground" />
          </div>
          <CardTitle className="text-2xl font-bold">Connect GitHub Account</CardTitle>
          <CardDescription>
            Connect your GitHub account to import and deploy your repositories
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Permissions List */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">
              DeployHub will be able to:
            </h3>
            <div className="space-y-3">
              {permissions.map((permission, index) => (
                <div key={index} className="flex items-start gap-3">
                  <div className="mt-0.5 rounded-full bg-success/10 p-1">
                    <Check className="h-3 w-3 text-success" />
                  </div>
                  <span className="text-sm text-muted-foreground">
                    {permission}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Info Box */}
          <div className="rounded-lg bg-secondary/50 p-4 border border-border">
            <p className="text-xs text-muted-foreground leading-relaxed">
              You can revoke access at any time from your GitHub settings. We only access
              repositories you explicitly grant permission to.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col gap-3">
            <Button 
              onClick={handleConnectGitHub}
              className="w-full"
              size="lg"
            >
              <Github className="mr-2 h-5 w-5" />
              Connect with GitHub
            </Button>
            <Button
              variant="ghost"
              onClick={() => navigate("/auth/github/callback")}
              className="w-full"
            >
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConnectGitHub;
