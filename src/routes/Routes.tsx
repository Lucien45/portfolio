import { BrowserRouter, Routes as RouterRoutes, Route } from "react-router-dom";
import ErrorBoundary from '../components/ErrorBoundary';
import ScrollToTop from '../components/ScrollToTop';
import Homepage from '../pages/homepage';
import NotFound from "../pages/NotFound";
import ThemeProvider from "../context/ThemeContext";
import Contact from "../pages/contact";
import Skills from "../pages/skills";
import Experience from "../pages/experience";

const Routes = () => {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <ErrorBoundary>
          <ScrollToTop />
          <RouterRoutes>
            <Route path="/" element={<Homepage />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/experience" element={<Experience />} />
            <Route path="/skills" element={<Skills />} />
            <Route path="/homepage" element={<Homepage />} />
            <Route path="*" element={<NotFound />} />
          </RouterRoutes>
        </ErrorBoundary>
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default Routes