
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Building2, MapPin, Calendar, Briefcase } from "lucide-react";

interface CardJobProps {
  title: string;
  company: string;
  location: string;
  type: string;
  postedDate: string;
  logo?: string;
  salaryRange?: string;
  skills?: string[];
  className?: string;
  onClick?: () => void;
}

export function CardJob({
  title,
  company,
  location,
  type,
  postedDate,
  logo,
  salaryRange,
  skills,
  className,
  onClick
}: CardJobProps) {
  return (
    <Card className={cn("overflow-hidden glass-card", className)} onClick={onClick}>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <div className="flex items-center gap-4">
            {logo ? (
              <div className="h-10 w-10 overflow-hidden rounded-md">
                <img src={logo} alt={company} className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-muted">
                <Building2 className="h-5 w-5" />
              </div>
            )}
            <div>
              <CardTitle className="text-base">{title}</CardTitle>
              <p className="text-sm text-muted-foreground">{company}</p>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="grid gap-2">
          <div className="flex items-center text-sm text-muted-foreground">
            <MapPin className="mr-1 h-3.5 w-3.5" />
            <span>{location}</span>
            <span className="mx-1">•</span>
            <Briefcase className="mr-1 h-3.5 w-3.5" />
            <span>{type}</span>
          </div>
          
          {salaryRange && (
            <div className="text-sm font-medium">{salaryRange}</div>
          )}
          
          {skills && skills.length > 0 && (
            <div className="flex flex-wrap gap-1 mt-2">
              {skills.slice(0, 3).map((skill) => (
                <Badge key={skill} variant="outline" className="bg-accent/10">
                  {skill}
                </Badge>
              ))}
              {skills.length > 3 && (
                <Badge variant="outline" className="bg-accent/10">
                  +{skills.length - 3}
                </Badge>
              )}
            </div>
          )}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-2">
        <div className="flex items-center text-xs text-muted-foreground">
          <Calendar className="mr-1 h-3.5 w-3.5" />
          <span>Posted {postedDate}</span>
        </div>
        <Button variant="outline" size="sm">View Job</Button>
      </CardFooter>
    </Card>
  );
}
