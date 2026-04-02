import { Switch, Route, Router as WouterRouter, Redirect } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { ThemeProvider } from "@/contexts/theme-context";
import { useAuth } from "@/contexts/use-auth";
import { AuthProvider } from "@/contexts/auth-provider";
import { Layout } from "./components/layout";
import Dashboard from "./pages/dashboard";
import Profile from "./pages/profile";
import Experience from "./pages/experience";
import Projects from "./pages/projects";
import Skills from "./pages/skills";
import Messages from "./pages/messages";
import Settings from "./pages/settings";
import Login from "./pages/login";
import NotFound from "./pages/not-found";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { retry: 1, refetchOnWindowFocus: false },
  },
});

function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated } = useAuth();
  if (!isAuthenticated) return <Redirect to="/login" />;
  return <>{children}</>;
}

function Router() {
  const { isAuthenticated } = useAuth();
  return (
    <Switch>
      <Route path="/login">
        {isAuthenticated ? <Redirect to="/" /> : <Login />}
      </Route>
      <Route path="/">
        <ProtectedRoute><Layout><Dashboard /></Layout></ProtectedRoute>
      </Route>
      <Route path="/profile">
        <ProtectedRoute><Layout><Profile /></Layout></ProtectedRoute>
      </Route>
      <Route path="/experience">
        <ProtectedRoute><Layout><Experience /></Layout></ProtectedRoute>
      </Route>
      <Route path="/projects">
        <ProtectedRoute><Layout><Projects /></Layout></ProtectedRoute>
      </Route>
      <Route path="/skills">
        <ProtectedRoute><Layout><Skills /></Layout></ProtectedRoute>
      </Route>
      <Route path="/messages">
        <ProtectedRoute><Layout><Messages /></Layout></ProtectedRoute>
      </Route>
      <Route path="/settings">
        <ProtectedRoute><Layout><Settings /></Layout></ProtectedRoute>
      </Route>
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <AuthProvider>
          <TooltipProvider>
            <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, "")}>
              <Router />
            </WouterRouter>
            <Toaster />
          </TooltipProvider>
        </AuthProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;