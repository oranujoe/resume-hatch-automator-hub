
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { CardKPI } from "@/components/cards/card-kpi";
import { CardEmptyState } from "@/components/cards/card-empty-state";
import { CardJob } from "@/components/cards/card-job";
import { ChipFilterGroup } from "@/components/chip-filter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { 
  Briefcase, 
  ChevronRight, 
  FileInput, 
  FileUp, 
  BookOpen,
  BarChart3,
  X,
  ChartPie,
  Users,
  PenTool,
} from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

// Mock data
const kpiData = [
  { 
    title: "Applications Sent", 
    value: 24, 
    icon: Briefcase,
    trend: 12,
    trendLabel: "vs. last month"
  },
  { 
    title: "Success Rate", 
    value: "18%", 
    icon: ChartPie,
    trend: -3,
    trendLabel: "vs. last month" 
  },
  { 
    title: "Interviews", 
    value: 4, 
    icon: Users,
    trend: 50,
    trendLabel: "vs. last month"
  },
  { 
    title: "Offers", 
    value: 1, 
    icon: PenTool,
    trend: 100,
    trendLabel: "vs. last month"
  },
];

export function HomePage() {
  const [showAnnouncement, setShowAnnouncement] = useState(true);
  
  return (
    <div className="space-y-6">
      {showAnnouncement && (
        <Alert className="bg-accent/20 border-accent">
          <AlertTitle className="flex items-center justify-between">
            <span>Welcome to ResumeHatch! 👋</span>
            <Button 
              variant="ghost" 
              size="icon" 
              className="h-6 w-6"
              onClick={() => setShowAnnouncement(false)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </Button>
          </AlertTitle>
          <AlertDescription>
            Get started by parsing your first job listing or uploading your resume. Need help? Check out our <a href="#" className="text-primary font-medium underline">quick start guide</a>.
          </AlertDescription>
        </Alert>
      )}
      
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {kpiData.map((kpi) => (
          <CardKPI
            key={kpi.title}
            title={kpi.title}
            value={kpi.value}
            icon={kpi.icon}
            trend={kpi.trend}
            trendLabel={kpi.trendLabel}
          />
        ))}
      </div>
      
      <Card className="glass-card overflow-hidden">
        <CardHeader className="pb-2">
          <div className="flex items-center justify-between">
            <CardTitle>Application Funnel</CardTitle>
            <Button variant="outline" size="sm">
              <BarChart3 className="mr-2 h-4 w-4" />
              View Details
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="h-[200px] flex items-center justify-center text-muted-foreground">
            {/* This is where the chart would go */}
            <span>Chart placeholder - Applications funnel visualization</span>
            {/* TODO: Replace with actual chart implementation */}
          </div>
        </CardContent>
      </Card>

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 md:grid-cols-3">
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Parse Job URL</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <FileInput className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Paste a job listing URL to generate matching resume & cover letter
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="default">
                Parse Job URL
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Upload Resume</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="rounded-full bg-accent/10 p-3">
                  <FileUp className="h-6 w-6 text-accent" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Upload an existing resume to start your profile
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Upload File
              </Button>
            </CardFooter>
          </Card>
          
          <Card className="glass-card">
            <CardHeader>
              <CardTitle className="text-base">Knowledge Base</CardTitle>
            </CardHeader>
            <CardContent className="pb-0">
              <div className="flex flex-col items-center justify-center space-y-3">
                <div className="rounded-full bg-primary/10 p-3">
                  <BookOpen className="h-6 w-6 text-primary" />
                </div>
                <p className="text-sm text-center text-muted-foreground">
                  Fill your profile to improve job matching
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full" variant="outline">
                Open Knowledge Base
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
      
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold">Recent Jobs</h2>
          <Button variant="ghost" size="sm" asChild>
            <a href="/job-feed">
              View All
              <ChevronRight className="ml-1 h-4 w-4" />
            </a>
          </Button>
        </div>
        
        <div className="space-y-4">
          <ChipFilterGroup 
            filters={[
              { id: "all", label: "All Jobs" },
              { id: "remote", label: "Remote" },
              { id: "fulltime", label: "Full-time" },
              { id: "contract", label: "Contract" },
            ]}
            className="mb-4"
          />
          
          <div className="grid gap-4 md:grid-cols-2">
            <CardJob
              title="Senior Frontend Developer"
              company="Acme Inc."
              location="Remote"
              type="Full-time"
              postedDate="2 days ago"
              salaryRange="$100,000 - $130,000"
              skills={["React", "TypeScript", "Tailwind"]}
            />
            
            <CardJob
              title="UI/UX Designer"
              company="Design Co."
              location="San Francisco, CA"
              type="Full-time"
              postedDate="4 days ago"
              salaryRange="$90,000 - $115,000"
              skills={["Figma", "UI Design", "User Research"]}
            />
          </div>
          
          <div className="flex justify-center">
            <Button variant="outline">Load more jobs</Button>
          </div>
        </div>
      </div>
      
      <div className="text-center text-xs text-muted-foreground mt-8">
        <p>ResumeHatch v1.0 - Made with ❤️</p>
        <p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <span className="cursor-help"><!-- TODO-v1.1: activate Analytics tab, Templates Gallery, Drop-zone, Notifications, Live Chat. --></span>
              </TooltipTrigger>
              <TooltipContent>
                <p>Coming soon in next version</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </p>
      </div>
    </div>
  );
}
