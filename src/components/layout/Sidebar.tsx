
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { 
  Calendar, 
  ChevronLeft, 
  ChevronRight, 
  Menu as MenuIcon, 
  Users, 
  Video, 
} from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

interface SidebarProps {
  className?: string;
}

export function Sidebar({ className }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();

  // Ajuster automatiquement la sidebar en fonction de la taille de l'écran
  useEffect(() => {
    const handleResize = () => {
      setCollapsed(window.innerWidth < 1024);
    };
    
    // Initialisation
    handleResize();
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const navItems = [
    {
      title: "Webinaires",
      icon: Video,
      href: "/",
    },
    {
      title: "Calendrier",
      icon: Calendar,
      href: "/calendrier",
    },
    {
      title: "Stagiaires",
      icon: Users,
      href: "/stagiaires",
    },
  ];

  const SidebarContent = () => (
    <>
      <div className="flex items-center justify-between p-4 h-16 border-b border-sidebar-border">
        <div className={cn("flex items-center gap-3", collapsed ? "justify-center w-full" : "")}>
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center shadow-inner">
            <img src="f64815e6-3df2-40f5-90df-32208f468511.jpeg" alt="Logo talentup" />
          </div>
          {!collapsed && (
            <span className="text-xl font-semibold text-sidebar-foreground">TalentUp</span>
          )}
        </div>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setCollapsed(!collapsed)}
          className={cn("text-sidebar-foreground hidden md:flex", collapsed && "absolute right-0")}
        >
          {collapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
        </Button>
      </div>

      <div className="flex-1 p-2 space-y-1 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.title}
              to={item.href}
              className={cn(
                "flex items-center rounded-md px-3 py-2.5 text-sm font-medium transition-all",
                "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                isActive ? "bg-sidebar-accent text-sidebar-accent-foreground font-medium shadow-sm" : "",
                collapsed ? "justify-center" : "justify-start"
              )}
              onClick={() => setMobileOpen(false)}
            >
              <item.icon className={cn(
                "h-5 w-5",
                collapsed ? "mx-auto" : "mr-3",
                isActive ? "text-primary" : ""
              )} />
              {!collapsed && <span className="truncate">{item.title}</span>}
            </Link>
          );
        })}
      </div>
    </>
  );

  return (
    <>
      {/* Version mobile avec Sheet */}
      <div className="block md:hidden">
        <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="ml-2">
              <MenuIcon className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="p-0 bg-sidebar border-sidebar-border w-64">
            <SidebarContent />
          </SheetContent>
        </Sheet>
      </div>

      {/* Version desktop */}
      <div
        className={cn(
          "hidden md:flex flex-col bg-sidebar border-r border-sidebar-border h-screen",
          collapsed ? "w-20" : "w-64",
          "transition-all duration-300 ease-in-out",
          className
        )}
      >
        <SidebarContent />
      </div>
    </>
  );
}
