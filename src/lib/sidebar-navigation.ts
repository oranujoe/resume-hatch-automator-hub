
import { LucideIcon, 
  Home, 
  FileSearch, 
  Briefcase, 
  FileText, 
  BookOpen, 
  LayoutDashboard, 
  CalendarClock, 
  Users, 
  Settings, 
  User, 
  HelpCircle, 
  Laptop,
  Clock,
  BarChart,
  GanttChartSquare,
  ImageUp,
  Newspaper,
  FileBox,
  Bell,
  Shield,
  CreditCard,
  Wrench,
  MessageCircle,
  FileQuestion
} from "lucide-react";

export interface SidebarItem {
  icon: LucideIcon;
  label: string;
  href?: string;
  subItems?: SidebarSubItem[];
}

export interface SidebarSubItem {
  icon: LucideIcon;
  label: string;
  href: string;
}

export const sidebarNavigation: SidebarItem[] = [
  { 
    icon: Home, 
    label: "Home", 
    href: "/dashboard"
  },
  { 
    icon: FileSearch, 
    label: "Job Parser", 
    subItems: [
      { icon: FileSearch, label: "Parse & Apply", href: "/job-parser" },
      { icon: Laptop, label: "Drop-zone (Chrome)", href: "/job-parser/dropzone" },
      { icon: Clock, label: "Bulk Queue", href: "/job-parser/bulk-queue" }
    ]
  },
  { 
    icon: Briefcase, 
    label: "Applications", 
    subItems: [
      { icon: Briefcase, label: "My Applications", href: "/applications" },
      { icon: BarChart, label: "Analytics", href: "/applications/analytics" },
      { icon: GanttChartSquare, label: "Funnel View", href: "/applications/funnel" }
    ]
  },
  { 
    icon: FileText, 
    label: "Documents", 
    subItems: [
      { icon: FileText, label: "Résumés", href: "/documents/resumes" },
      { icon: Newspaper, label: "Cover Letters", href: "/documents/cover-letters" },
      { icon: ImageUp, label: "Templates Gallery", href: "/documents/templates" },
      { icon: FileBox, label: "Document Locker", href: "/documents/locker" }
    ]
  },
  { 
    icon: BookOpen, 
    label: "Knowledge Base", 
    subItems: [
      { icon: User, label: "Profile Data", href: "/knowledge-base" },
      { icon: BookOpen, label: "Skills Gap", href: "/knowledge-base/skills-gap" }
    ]
  },
  { 
    icon: LayoutDashboard, 
    label: "Job Feed", 
    href: "/job-feed" 
  },
  { 
    icon: CalendarClock, 
    label: "Interview Prep",
    subItems: [
      { icon: MessageCircle, label: "AI Coach", href: "/interview-prep" },
      { icon: CalendarClock, label: "Scheduler", href: "/interview-prep/scheduler" },
      { icon: Bell, label: "Follow-Ups", href: "/interview-prep/follow-ups" }
    ] 
  },
  { 
    icon: Users, 
    label: "Referrals", 
    href: "/referrals" 
  },
  { 
    icon: Settings, 
    label: "Settings", 
    subItems: [
      { icon: Shield, label: "Account Security", href: "/settings" },
      { icon: CreditCard, label: "Wallet & Billing", href: "/settings/wallet" },
      { icon: Bell, label: "Notifications", href: "/settings/notifications" },
      { icon: Wrench, label: "Integrations", href: "/settings/integrations" }
    ]
  },
  { 
    icon: User, 
    label: "Profile", 
    href: "/profile" 
  },
  { 
    icon: HelpCircle, 
    label: "Help",
    subItems: [
      { icon: FileQuestion, label: "Docs / FAQ", href: "/help" },
      { icon: MessageCircle, label: "Live Chat", href: "/help/chat" }
    ] 
  },
];
