import { type ReactNode, useState } from "react";
import { Link, useLocation } from "wouter";
import { motion, AnimatePresence } from "framer-motion";
import {
  LayoutDashboard, UserCircle, Briefcase, Code2,
  MessageSquare, Settings, Menu, X, LogOut, Sun, Moon, GraduationCap
} from "lucide-react";
import { useTheme } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/use-auth";

interface LayoutProps {
  children: ReactNode;
}

interface SidebarContentProps {
  isCollapsed: boolean;
  setIsCollapsed: (v: boolean) => void;
  setIsMobileMenuOpen: (v: boolean) => void;
  toggleTheme: () => void;
  isDark: boolean;
  user: { name?: string; email?: string } | null;
  handleLogout: () => void;
  location: string;
}

const navItems = [
  { name: "Dashboard", href: "/", icon: LayoutDashboard },
  { name: "Profile", href: "/profile", icon: UserCircle },
  { name: "Experience", href: "/experience", icon: GraduationCap },
  { name: "Projects", href: "/projects", icon: Briefcase },
  { name: "Skills", href: "/skills", icon: Code2 },
  { name: "Messages", href: "/messages", icon: MessageSquare, badge: 3 },
  { name: "Settings", href: "/settings", icon: Settings },
];

function SidebarContent({
  isCollapsed,
  setIsCollapsed,
  setIsMobileMenuOpen,
  toggleTheme,
  isDark,
  user,
  handleLogout,
  location,
}: SidebarContentProps) {
  return (
    <div className="flex flex-col h-full bg-sidebar border-r border-sidebar-border relative z-20">
      <div className="p-5 flex items-center justify-between">
        <div className={`flex items-center gap-3 overflow-hidden transition-all duration-300 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
          <div className="w-8 h-8 rounded-lg bg-gradient-to-tr from-amber-400 to-primary flex items-center justify-center shadow-lg shadow-primary/20 shrink-0">
            <span className="font-display font-bold text-primary-foreground text-sm">PR</span>
          </div>
          <span className="font-display font-bold text-lg tracking-tight whitespace-nowrap text-sidebar-foreground">PortfolioAdmin</span>
        </div>
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="hidden md:flex p-1.5 rounded-md hover:bg-sidebar-accent text-sidebar-foreground/50 hover:text-sidebar-foreground transition-colors shrink-0"
        >
          <Menu size={18} />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1">
        {navItems.map((item) => {
          const isActive = location === item.href || (item.href !== "/" && location.startsWith(item.href));
          return (
            <Link key={item.name} href={item.href} className="block" onClick={() => setIsMobileMenuOpen(false)}>
              <div className={`flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group relative ${
                isActive ? "bg-primary/10 text-primary" : "text-sidebar-foreground/70 hover:bg-sidebar-accent hover:text-sidebar-foreground"
              }`}>
                {isActive && (
                  <motion.div
                    layoutId="activeNav"
                    className="absolute inset-0 bg-primary/10 rounded-xl"
                    initial={false}
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
                <item.icon size={20} className={`shrink-0 z-10 ${isActive ? "text-primary" : ""}`} />
                <div className={`flex items-center justify-between flex-1 overflow-hidden transition-all duration-300 z-10 ${isCollapsed ? "w-0 opacity-0" : "w-auto opacity-100"}`}>
                  <span className="font-medium whitespace-nowrap text-sm">{item.name}</span>
                  {item.badge ? (
                    <span className="bg-primary text-primary-foreground text-xs font-mono font-bold px-2 py-0.5 rounded-full shadow-[0_0_10px_rgba(245,158,11,0.5)]">
                      {item.badge}
                    </span>
                  ) : null}
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      <div className="p-4 mt-auto space-y-2 border-t border-sidebar-border">
        <button
          onClick={toggleTheme}
          className="flex items-center gap-3 px-3 py-2.5 rounded-xl w-full transition-all text-sidebar-foreground/60 hover:bg-sidebar-accent hover:text-sidebar-foreground"
        >
          {isDark ? <Sun size={20} className="shrink-0" /> : <Moon size={20} className="shrink-0" />}
          <span className={`text-sm font-medium whitespace-nowrap transition-all duration-300 ${isCollapsed ? "w-0 opacity-0 overflow-hidden" : "opacity-100"}`}>
            {isDark ? "Light Mode" : "Dark Mode"}
          </span>
        </button>

        <div className={`flex items-center gap-3 p-2 rounded-xl transition-all duration-300 ${isCollapsed ? "justify-center" : "bg-sidebar-accent/50 border border-sidebar-border"}`}>
          <div className="w-9 h-9 rounded-lg bg-gradient-to-tr from-amber-400 to-primary flex items-center justify-center ring-2 ring-primary/20 shrink-0">
            <span className="font-bold text-primary-foreground text-sm">
              {user?.name?.charAt(0).toUpperCase() ?? "A"}
            </span>
          </div>
          <div className={`flex flex-col overflow-hidden transition-all duration-300 flex-1 ${isCollapsed ? "w-0 opacity-0 hidden" : "w-auto opacity-100"}`}>
            <span className="text-sm font-semibold whitespace-nowrap text-sidebar-foreground truncate">{user?.name ?? "Admin"}</span>
            <span className="text-xs text-sidebar-foreground/50 whitespace-nowrap truncate">{user?.email ?? ""}</span>
          </div>
          {!isCollapsed && (
            <button
              onClick={handleLogout}
              className="ml-auto p-1.5 text-sidebar-foreground/40 hover:text-destructive transition-colors shrink-0"
              title="Logout"
            >
              <LogOut size={16} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export function Layout({ children }: LayoutProps) {
  const [location, navigate] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const { toggleTheme, isDark } = useTheme();
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const sidebarProps: SidebarContentProps = {
    isCollapsed,
    setIsCollapsed,
    setIsMobileMenuOpen,
    toggleTheme,
    isDark,
    user,
    handleLogout,
    location,
  };

  return (
    <div className="flex h-screen w-full bg-background overflow-hidden relative">
      <div className="absolute top-0 right-0 w-[800px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none -translate-y-1/2 translate-x-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[100px] pointer-events-none translate-y-1/3 -translate-x-1/3" />

      <motion.aside
        initial={false}
        animate={{ width: isCollapsed ? 72 : 260 }}
        className="hidden md:block h-full z-20 shrink-0"
      >
        <SidebarContent {...sidebarProps} />
      </motion.aside>

      <div className="md:hidden absolute top-0 left-0 right-0 h-14 bg-background/80 backdrop-blur-md border-b border-border z-30 flex items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-gradient-to-tr from-amber-400 to-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <span className="font-display font-bold text-primary-foreground text-xs">PR</span>
          </div>
          <span className="font-display font-bold text-base">Admin</span>
        </div>
        <div className="flex items-center gap-1">
          <button onClick={toggleTheme} className="p-2 text-muted-foreground hover:text-foreground transition-colors">
            {isDark ? <Sun size={18} /> : <Moon size={18} />}
          </button>
          <button onClick={() => setIsMobileMenuOpen(true)} className="p-2">
            <Menu size={22} />
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.aside
              initial={{ x: "-100%" }} animate={{ x: 0 }} exit={{ x: "-100%" }}
              transition={{ type: "spring", bounce: 0, duration: 0.4 }}
              className="fixed inset-y-0 left-0 w-[260px] bg-sidebar z-50 md:hidden shadow-2xl"
            >
              <div className="absolute top-3 right-3 z-50">
                <button onClick={() => setIsMobileMenuOpen(false)} className="p-2 text-sidebar-foreground/50 hover:text-sidebar-foreground">
                  <X size={18} />
                </button>
              </div>
              <SidebarContent {...sidebarProps} />
            </motion.aside>
          </>
        )}
      </AnimatePresence>

      <main className="flex-1 h-full overflow-y-auto relative z-10 pt-14 md:pt-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={location}
            initial={{ opacity: 0, y: 10, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
            transition={{ duration: 0.25 }}
            className="h-full p-4 md:p-8 lg:p-10 max-w-[1600px] mx-auto"
          >
            {children}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}