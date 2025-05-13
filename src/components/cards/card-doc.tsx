
import { cn } from "@/lib/utils";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { FileText, MoreVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface CardDocProps {
  title: string;
  type: "resume" | "cover-letter" | "certificate" | "transcript" | "other";
  lastModified: string;
  preview?: string;
  className?: string;
}

export function CardDoc({
  title,
  type,
  lastModified,
  preview,
  className,
}: CardDocProps) {
  return (
    <Card className={cn("overflow-hidden glass-card h-full flex flex-col", className)}>
      <CardHeader className="pb-0 pt-4 px-4 flex flex-row justify-between">
        <div className="flex items-start gap-2">
          <FileText className="h-5 w-5 text-primary" />
          <div className="space-y-1">
            <h3 className="font-medium leading-none">{title}</h3>
            <p className="text-xs text-muted-foreground">Modified {lastModified}</p>
          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <MoreVertical className="h-4 w-4" />
              <span className="sr-only">Menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-40">
            <DropdownMenuItem>Download</DropdownMenuItem>
            <DropdownMenuItem>Duplicate</DropdownMenuItem>
            <DropdownMenuItem className="text-red-500">Delete</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>
      <CardContent className="flex-1 p-4">
        {preview ? (
          <div 
            className="w-full h-32 bg-gray-50 dark:bg-gray-900 rounded-md border overflow-hidden"
            style={{ backgroundImage: `url(${preview})`, backgroundSize: 'cover', backgroundPosition: 'top' }}
          />
        ) : (
          <div className="w-full h-32 bg-gray-50 dark:bg-gray-900 rounded-md border flex items-center justify-center text-muted-foreground">
            <FileText className="h-10 w-10" />
          </div>
        )}
      </CardContent>
      <CardFooter className="px-4 pb-4 pt-0">
        <Button variant="default" className="w-full">
          {type === "resume" || type === "cover-letter" ? "Edit" : "View"}
        </Button>
      </CardFooter>
    </Card>
  );
}
