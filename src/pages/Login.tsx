import React from "react";
import { Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const navigate = useNavigate();

  const handleGithubLogin = async () => {
    console.log("Initiating GitHub OAuth.....");
    navigate("/auth/github/callback");
  };

  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const API_URL = import.meta.env.VITE_API_URL;

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log("API:",API_URL);
    console.log("Email login...");
    try {
      const response = await axios.post(`${API_URL}/api/login`, {
        email,
        password,
      });
      if(response.status === 200){
          console.log('token:',response.data.token);
          localStorage.setItem('token',response.data.token)
          console.log("Login successful");
          navigate("/dashboard");
      }
    } catch (error) {
      console.error("Login failed", error);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-background p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <CardTitle className="text-2xl font-bold text-center">Welcome Back</CardTitle>
          <CardDescription className="text-center">
            Sign in to your DeployHub account
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <Button 
            variant="outline" 
            className="w-full" 
            onClick={handleGithubLogin}
          >
            <Github className="mr-2 h-4 w-4" />
            Continue with GitHub
          </Button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-background px-2 text-muted-foreground">
                Or continue with
              </span>
            </div>
          </div>

          <form onSubmit={handleEmailLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                onChange={(e) => setPassword(e.target.value)}
                className="bg-secondary border-0"
              />
            </div>

            <Button type="submit" className="w-full" onSubmit={handleEmailLogin}>
              Sign In
            </Button>
          </form>
        </CardContent>

        <CardFooter className="flex justify-center">
          <p className="text-sm text-muted-foreground">
            Don't have an account?{" "}
            <button
              onClick={() => navigate("/signup")}
              className="text-accent hover:underline"
            >
              Sign up
            </button>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
};

export default Login;
