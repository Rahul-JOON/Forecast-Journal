import React, { useState, useEffect } from "react";
import { Menu, X, CloudSun, BookOpen, Download, User, LayoutDashboard, Github } from "lucide-react";
import { cn } from "@/lib/utils";

interface NavbarProps {
  className?: string;
  selectedCity?: string;
}

const Navbar: React.FC<NavbarProps> = ({ className, selectedCity = "New York" }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [hasViewedDashboard, setHasViewedDashboard] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
      
      // Check if user has scrolled through the dashboard section
      const trendsSection = document.getElementById('trends');
      if (trendsSection) {
        const trendsSectionBottom = trendsSection.getBoundingClientRect().bottom;
        // Consider dashboard viewed if user has scrolled past 70% of the trends section
        if (trendsSectionBottom < window.innerHeight * 0.3 && !hasViewedDashboard) {
          setHasViewedDashboard(true);
        }
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [hasViewedDashboard]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };
  
  const handleDashboardClick = () => {
    // Scroll to trends section and focus on city selector
    const trendsSection = document.getElementById('trends');
    if (trendsSection) {
      trendsSection.scrollIntoView({ behavior: 'smooth' });
      // After scrolling, focus on the city selector (with a slight delay to ensure DOM is ready)
      setTimeout(() => {
        const citySelector = document.querySelector('[aria-haspopup="listbox"]');
        if (citySelector && citySelector instanceof HTMLElement) {
          citySelector.focus();
          citySelector.click(); // Open the dropdown
        }
        
        // Set hasViewedDashboard to true after user clicks the dashboard button
        setHasViewedDashboard(true);
      }, 800);
    }
  };

  // Define the ML Insights button
  const MLInsightsButton = () => (
    <a
      href="https://github.com/Rahul-JOON/TempCastRNN"
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center justify-center h-9 px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:opacity-90 transition-all duration-300 hover:scale-105 text-sm font-medium group"
    >
      <Github size={16} className="mr-2 group-hover:animate-pulse" />
      <span>ML Model Insights</span>
    </a>
  );

  // Define the Dashboard button
  const DashboardButton = () => (
    <button 
      onClick={handleDashboardClick}
      className="flex items-center justify-center h-9 px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:opacity-90 transition-opacity text-sm font-medium"
    >
      <LayoutDashboard size={16} className="mr-2" />
      {selectedCity} Dashboard
    </button>
  );

  return (
    <header className={cn(
      "fixed top-0 left-0 right-0 z-50 transition-all duration-300 backdrop-blur-xl",
      isScrolled ? "bg-[#121212]/95 shadow-md py-2" : "bg-[#121212] py-4",
      className
    )}>
      <nav className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo and Title */}
          <div className="flex items-center space-x-4">
            <CloudSun size={28} className="text-primary-purple" />
            <div className="text-2xl md:text-3xl font-medium">
              <span className="bg-gradient-to-r from-primary-purple to-primary-blue bg-clip-text text-transparent">Forecast Journal</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex space-x-8 items-center">
            <a 
              href="#theory"
              className="text-gray-300 hover:text-primary-purple transition-colors duration-300 text-sm font-medium flex items-center gap-2"
            >
              <BookOpen size={18} />
              <span>Theory</span>
            </a>
            <a 
              href="#about"
              className="text-gray-300 hover:text-primary-purple transition-colors duration-300 text-sm font-medium flex items-center gap-2"
            >
              <Download size={18} />
              <span>Download</span>
            </a>
            
            {/* Dynamically show Dashboard or ML Insights button */}
            <div className="transition-all duration-300">
              {hasViewedDashboard ? <MLInsightsButton /> : <DashboardButton />}
            </div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button 
              onClick={toggleMobileMenu}
              className="text-gray-300 hover:text-white"
              aria-label="Toggle mobile menu"
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden absolute top-full left-0 right-0 bg-[#121212] border-b border-white/10 shadow-xl z-50 pt-2 pb-4 animate-fade-in ${
            isMobileMenuOpen ? 'block' : 'hidden'
          }`}
        >
          <div className="flex flex-col space-y-4 px-4">
            <a
              href="#theory"
              className="text-gray-300 hover:text-primary-purple py-2 transition-colors duration-300 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <BookOpen size={18} />
              <span>Theory</span>
            </a>
            <a
              href="#about"
              className="text-gray-300 hover:text-primary-purple py-2 transition-colors duration-300 flex items-center gap-2"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <Download size={18} />
              <span>Download</span>
            </a>
            
            {/* Mobile: Dynamically show Dashboard or ML Insights button */}
            {hasViewedDashboard ? (
              <a
                href="https://github.com/Rahul-JOON/TempCastRNN"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center h-9 px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:opacity-90 transition-all text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Github size={16} className="mr-2" />
                <span>ML Model Insights</span>
              </a>
            ) : (
              <button 
                onClick={() => {
                  handleDashboardClick();
                  setIsMobileMenuOpen(false);
                }}
                className="flex items-center justify-center h-9 px-4 py-2 rounded-md bg-gradient-to-r from-primary-purple to-primary-blue text-white hover:opacity-90 transition-opacity text-sm font-medium"
              >
                <LayoutDashboard size={16} className="mr-2" />
                {selectedCity} Dashboard
              </button>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
