
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  FileDown,
  Link as LinkIcon,
  Upload,
  Chrome,
  FileCheck,
  ChevronRight,
  RefreshCw,
} from "lucide-react";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Separator } from "@/components/ui/separator";

export function JobParserPage() {
  const [jobUrl, setJobUrl] = useState("");
  const [formalTone, setFormalTone] = useState(true);
  const [isProcessing, setIsProcessing] = useState(false);
  
  const handleParseJob = () => {
    if (!jobUrl) return;
    setIsProcessing(true);
    
    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      // TODO: Handle actual job parsing
    }, 2000);
  };
  
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Job Parser</h1>
      </div>
      
      <Tabs defaultValue="parse" className="space-y-4">
        <TabsList>
          <TabsTrigger value="parse">Parse & Apply</TabsTrigger>
          <TabsTrigger value="dropzone">Drop-zone (Chrome)</TabsTrigger>
          <TabsTrigger value="queue">Bulk Queue</TabsTrigger>
        </TabsList>
        
        <TabsContent value="parse" className="space-y-4">
          <div className="grid gap-6 lg:grid-cols-5">
            {/* Left panel - 40% */}
            <div className="lg:col-span-2 space-y-6">
              <Card className="glass-card">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="job-url">Job Listing URL</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="job-url"
                          placeholder="https://company.com/careers/job-title"
                          value={jobUrl}
                          onChange={(e) => setJobUrl(e.target.value)}
                        />
                        <Button 
                          variant="default" 
                          size="icon"
                          disabled={isProcessing}
                          onClick={handleParseJob}
                        >
                          {isProcessing ? (
                            <RefreshCw className="h-5 w-5 animate-spin" />
                          ) : (
                            <ChevronRight className="h-5 w-5" />
                          )}
                        </Button>
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      <p>Or drop a job description file</p>
                    </div>
                    <div className="border-2 border-dashed rounded-lg p-8 text-center">
                      <Upload className="h-8 w-8 mx-auto text-muted-foreground" />
                      <p className="mt-2 text-sm text-muted-foreground">
                        Drag and drop a job description or <span className="text-primary font-medium">browse files</span>
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        PDF, DOCX, or TXT up to 5MB
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="glass-card">
                <CardContent className="p-6 flex items-center gap-4">
                  <Chrome className="h-12 w-12 text-primary" />
                  <div>
                    <h3 className="font-medium">Chrome Extension</h3>
                    <p className="text-sm text-muted-foreground">
                      Parse jobs directly from LinkedIn, Indeed, and other job sites
                    </p>
                    <Button variant="outline" size="sm" className="mt-2">
                      Get Extension
                    </Button>
                  </div>
                </CardContent>
              </Card>
              
              <div className="flex items-center gap-4">
                <Switch
                  id="tone-toggle"
                  checked={formalTone}
                  onCheckedChange={setFormalTone}
                />
                <Label htmlFor="tone-toggle" className="cursor-pointer">
                  {formalTone ? "Formal Tone" : "Conversational Tone"}
                </Label>
              </div>
            </div>
            
            {/* Right panel - 60% */}
            <div className="lg:col-span-3 space-y-6">
              <Tabs defaultValue="resume">
                <div className="flex items-center justify-between">
                  <TabsList>
                    <TabsTrigger value="resume">Resume</TabsTrigger>
                    <TabsTrigger value="cover">Cover Letter</TabsTrigger>
                  </TabsList>
                  
                  <div>
                    <Button variant="outline" size="sm" className="mr-2">
                      <FileDown className="mr-2 h-4 w-4" />
                      Download
                    </Button>
                  </div>
                </div>
                
                <TabsContent value="resume" className="mt-4">
                  <Card className="glass-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="h-[500px] overflow-y-auto px-2">
                        <div className="text-center mb-6">
                          <h2 className="text-2xl font-bold">John Doe</h2>
                          <p className="text-muted-foreground">Senior Frontend Developer</p>
                          <div className="flex items-center justify-center gap-2 text-sm mt-1">
                            <span>email@example.com</span>
                            <span className="text-muted-foreground">•</span>
                            <span>(123) 456-7890</span>
                            <span className="text-muted-foreground">•</span>
                            <span>San Francisco, CA</span>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-medium border-b pb-1 mb-2">Summary</h3>
                          <p className="text-sm">
                            Experienced Frontend Developer with 5+ years of expertise in React, TypeScript, and responsive design. Passionate about creating intuitive user experiences and optimizing application performance.
                          </p>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-medium border-b pb-1 mb-2">Experience</h3>
                          <div className="space-y-4">
                            <div>
                              <div className="flex justify-between">
                                <h4 className="font-medium">Senior Frontend Developer</h4>
                                <span className="text-sm text-muted-foreground">2020 - Present</span>
                              </div>
                              <p className="text-sm font-medium text-muted-foreground">Acme Inc., San Francisco</p>
                              <ul className="list-disc list-inside text-sm mt-1 space-y-1 ml-2">
                                <li>Led the redesign of the company's main SaaS product using React and TypeScript</li>
                                <li>Improved application performance by 40% through code optimization and lazy loading</li>
                                <li>Mentored junior developers and conducted code reviews for team of 5 engineers</li>
                              </ul>
                            </div>
                            
                            <div>
                              <div className="flex justify-between">
                                <h4 className="font-medium">Frontend Developer</h4>
                                <span className="text-sm text-muted-foreground">2018 - 2020</span>
                              </div>
                              <p className="text-sm font-medium text-muted-foreground">Tech Startup, San Francisco</p>
                              <ul className="list-disc list-inside text-sm mt-1 space-y-1 ml-2">
                                <li>Developed responsive UI components using React and Styled Components</li>
                                <li>Implemented state management with Redux and Redux Toolkit</li>
                                <li>Collaborated with designers to implement pixel-perfect UI from Figma designs</li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        
                        <div className="mb-4">
                          <h3 className="text-lg font-medium border-b pb-1 mb-2">Skills</h3>
                          <div className="flex flex-wrap gap-2">
                            <Badge variant="outline" className="bg-primary/5">React</Badge>
                            <Badge variant="outline" className="bg-primary/5">TypeScript</Badge>
                            <Badge variant="outline" className="bg-primary/5">JavaScript</Badge>
                            <Badge variant="outline" className="bg-primary/5">HTML5</Badge>
                            <Badge variant="outline" className="bg-primary/5">CSS3</Badge>
                            <Badge variant="outline" className="bg-primary/5">Tailwind CSS</Badge>
                            <Badge variant="outline" className="bg-primary/5">Redux</Badge>
                            <Badge variant="outline" className="bg-primary/5">Jest</Badge>
                            <Badge variant="outline" className="bg-primary/5">Webpack</Badge>
                            <Badge variant="outline" className="bg-primary/5">Git</Badge>
                          </div>
                        </div>
                        
                        <div>
                          <h3 className="text-lg font-medium border-b pb-1 mb-2">Education</h3>
                          <div>
                            <div className="flex justify-between">
                              <h4 className="font-medium">B.S. Computer Science</h4>
                              <span className="text-sm text-muted-foreground">2014 - 2018</span>
                            </div>
                            <p className="text-sm text-muted-foreground">University of California, Berkeley</p>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
                
                <TabsContent value="cover" className="mt-4">
                  <Card className="glass-card border-primary/20">
                    <CardContent className="p-6">
                      <div className="h-[500px] overflow-y-auto px-2">
                        <div className="mb-6">
                          <div className="text-right mb-8">
                            <p>John Doe</p>
                            <p>123 Main Street</p>
                            <p>San Francisco, CA 94105</p>
                            <p>email@example.com</p>
                            <p>(123) 456-7890</p>
                          </div>
                          
                          <p>May 13, 2025</p>
                          <p className="mt-4">Hiring Manager</p>
                          <p>Acme Inc.</p>
                          <p>456 Business Ave</p>
                          <p>San Francisco, CA 94107</p>
                        </div>
                        
                        <p className="mb-4">Dear Hiring Manager,</p>
                        
                        <p className="mb-2">
                          I am writing to express my interest in the Senior Frontend Developer position at Acme Inc., as advertised on your company website. With over 5 years of experience in frontend development and a strong focus on React and TypeScript, I believe I am well-suited for this role.
                        </p>
                        
                        <p className="mb-2">
                          Currently, as a Senior Frontend Developer at Tech Company, I have led the redesign of our main SaaS product, resulting in a 40% performance improvement and significantly enhanced user experience. My experience aligns perfectly with your requirement for someone who can build scalable, responsive web applications and collaborate effectively with cross-functional teams.
                        </p>
                        
                        <p className="mb-2">
                          I am particularly drawn to Acme Inc.'s commitment to innovation and your focus on creating user-friendly products that solve real problems. I believe my skills in React, TypeScript, and modern frontend architecture would allow me to contribute meaningfully to your team.
                        </p>
                        
                        <p className="mb-2">
                          I would welcome the opportunity to discuss how my background, skills, and achievements could benefit Acme Inc. Thank you for considering my application, and I look forward to the possibility of working with your team.
                        </p>
                        
                        <p className="mt-6">Sincerely,</p>
                        <p className="mt-4">John Doe</p>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
          
          <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4 flex justify-center gap-4 md:justify-end md:px-12">
            <Button variant="default" size="lg" className="bg-primary hover:bg-primary/90 w-full md:w-auto">
              <FileCheck className="mr-2 h-5 w-5" />
              Generate Documents
            </Button>
            <Button variant="outline" size="lg" className="w-full md:w-auto">
              <LinkIcon className="mr-2 h-5 w-5" />
              One-Click Apply
            </Button>
          </div>
        </TabsContent>
        
        <TabsContent value="dropzone">
          <Card className="glass-card border-dashed">
            <CardContent className="p-6 text-center">
              <Chrome className="h-16 w-16 mx-auto text-primary mb-4" />
              <h3 className="font-semibold text-xl mb-2">Install Chrome Extension</h3>
              <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                The ResumeHatch Chrome extension allows you to parse job listings directly from LinkedIn, Indeed, and other job sites with one click.
              </p>
              <Button>Install Extension</Button>
              
              <Separator className="my-8" />
              
              <h4 className="font-medium mb-2">How to use the Chrome extension</h4>
              <ol className="text-left list-decimal list-inside space-y-2 max-w-md mx-auto text-sm">
                <li>Install the ResumeHatch extension from the Chrome Web Store</li>
                <li>Navigate to a job listing on any supported job site</li>
                <li>Click the ResumeHatch icon in your browser toolbar</li>
                <li>Review the parsed job details and click "Generate Documents"</li>
                <li>Your tailored resume and cover letter will be ready in seconds!</li>
              </ol>
              
              <div className="mt-6 text-sm text-muted-foreground">
                {/* TODO-v1.1: activate Drop-zone functionality */}
                Currently supported sites: LinkedIn, Indeed, Glassdoor, ZipRecruiter
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="queue">
          <Card className="glass-card border-dashed">
            <CardContent className="p-6 text-center">
              <div className="py-12">
                <h3 className="font-semibold text-xl mb-2">Bulk Queue Coming Soon</h3>
                <p className="text-muted-foreground mb-6 max-w-md mx-auto">
                  This feature will allow you to queue multiple job applications and process them in batch.
                </p>
                <Badge variant="outline">Coming in version 1.3</Badge>
                {/* TODO-v1.3: Bulk Queue feature */}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
