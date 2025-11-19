import { ArrowLeft, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { DashboardLayout } from "@/components/layout/DashboardLayout";
import { useNavigate, useParams } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";

const ProjectSettings = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  return (
    <DashboardLayout>
      <div className="container mx-auto p-6 space-y-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => navigate(`/projects/${id}`)}
          >
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Project Settings</h1>
            <p className="text-muted-foreground mt-1">my-nextjs-app</p>
          </div>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>General</CardTitle>
              <CardDescription>Basic project configuration</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="project-name">Project Name</Label>
                <Input
                  id="project-name"
                  defaultValue="my-nextjs-app"
                  className="bg-secondary border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="repo-link">Repository URL</Label>
                <Input
                  id="repo-link"
                  defaultValue="https://github.com/johndoe/my-nextjs-app"
                  className="bg-secondary border-0"
                  readOnly
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Environment Variables</CardTitle>
                  <CardDescription>Manage your project's environment variables</CardDescription>
                </div>
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Variable
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Key</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-mono text-sm">API_KEY</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">••••••••</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">DATABASE_URL</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">••••••••</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-mono text-sm">NEXT_PUBLIC_API_URL</TableCell>
                    <TableCell className="font-mono text-sm text-muted-foreground">••••••••</TableCell>
                    <TableCell>
                      <Button variant="ghost" size="icon">
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Build Settings</CardTitle>
              <CardDescription>Configure your build and deployment settings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="framework">Framework Preset</Label>
                <Input
                  id="framework"
                  defaultValue="Next.js"
                  className="bg-secondary border-0"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="build-command">Build Command</Label>
                <Input
                  id="build-command"
                  defaultValue="npm run build"
                  className="bg-secondary border-0 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="install-command">Install Command</Label>
                <Input
                  id="install-command"
                  defaultValue="npm install"
                  className="bg-secondary border-0 font-mono text-sm"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="output-dir">Output Directory</Label>
                <Input
                  id="output-dir"
                  defaultValue=".next"
                  className="bg-secondary border-0 font-mono text-sm"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Webhooks</CardTitle>
                  <CardDescription>Manage deployment webhooks</CardDescription>
                </div>
                <Button size="sm" variant="outline">
                  <Plus className="mr-2 h-4 w-4" />
                  Add Webhook
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 rounded-lg border border-border">
                  <div>
                    <p className="font-medium">GitHub Push Webhook</p>
                    <p className="text-sm text-muted-foreground mt-1">
                      Triggered on push to main branch
                    </p>
                  </div>
                  <Badge variant="outline" className="bg-success/10 text-success border-success/20">
                    Active
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-destructive">
            <CardHeader>
              <CardTitle className="text-destructive">Danger Zone</CardTitle>
              <CardDescription>Irreversible actions</CardDescription>
            </CardHeader>
            <CardContent>
              <Button variant="destructive">
                Delete Project
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default ProjectSettings;
