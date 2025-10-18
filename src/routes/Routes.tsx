import { Routes as RouterRoutes, Route, useLocation } from "react-router-dom";
import ErrorBoundary from '../components/ErrorBoundary';
import ScrollToTop from '../components/ScrollToTop';
import Homepage from '../pages/homepage';
import NotFound from "../pages/NotFound";
import ThemeProvider from "../context/ThemeContext";
import Contact from "../pages/contact";
import Skills from "../pages/skills";
import Experience from "../pages/experience";
import Projects from "../pages/projects";
import About from "../pages/about";
import { useEffect } from "react";

interface RouteProps {
  setLoading: (value: boolean) => void;
}

const Routes = ({ setLoading } : RouteProps) => {

  const location = useLocation();

  useEffect(() => {
    setLoading(true);
    const handleComplete = () => setLoading(false);
    const timeout = setTimeout(handleComplete, 1000);

    return () => clearTimeout(timeout);
  }, [location, setLoading]);
  
  return (
    <ThemeProvider>
      <ErrorBoundary>
        <ScrollToTop />
        <RouterRoutes>
          <Route path="/" element={<Homepage />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/skills" element={<Skills />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/about" element={<About />} />
          <Route path="/homepage" element={<Homepage />} />
          <Route path="*" element={<NotFound />} />
        </RouterRoutes>
      </ErrorBoundary>
    </ThemeProvider>
  )
}

export default Routes