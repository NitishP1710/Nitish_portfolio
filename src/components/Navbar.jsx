import { useState, useEffect } from "react";
import { personaInfo } from "../data/portfolioData";
import { motion } from "framer-motion";

const Navbar = () => {
  const navItems = ["Home", "About", "Skills", "Experience", "Projects", "Achievements", "Contact"];
  const [activeSection, setActiveSection] = useState("hero");
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -80% 0px", 
      threshold: 0
    };

    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);

    const sections = navItems.map(item => {
      const id = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase();
      return document.getElementById(id);
    }).filter(Boolean);

    sections.forEach(section => observer.observe(section));

    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  const scrollToSection = (item) => {
    const id = item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase();
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -80;
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: 'smooth' });
    }
  };

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-onyx/80 backdrop-blur-md shadow-lg py-3" 
          : "bg-transparent py-5"
      }`}
    >
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-center items-center">
        <ul className="flex flex-wrap justify-center items-center gap-2 md:gap-6 w-full md:w-auto px-2 md:px-0">
          {navItems.map((item) => {
            const isActive = activeSection === (item.toLowerCase() === 'home' ? 'hero' : item.toLowerCase());
            return (
              <li key={item} className="relative">
                <button
                  onClick={() => scrollToSection(item)}
                  className={`text-[12px] md:text-[14px] lg:text-[15px] py-2 px-1.5 md:px-2 transition-colors lg:font-medium
                    ${isActive
                      ? "text-orange-yellow"
                      : "text-light-gray hover:text-white-2"
                    }`}
                >
                  {item}
                </button>
                {isActive && (
                  <motion.div
                    layoutId="activeNavIndicator"
                    className="absolute -bottom-1 left-0 right-0 h-0.5 bg-orange-yellow rounded-full"
                    initial={false}
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </li>
            );
          })}
          <li className="ml-1 md:ml-4">
            <a
              href={personaInfo.resumeURL}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-orange-yellow text-smoky-black h-8 md:h-10 px-3 md:px-4 rounded-[20px] font-bold text-[11px] md:text-sm flex items-center justify-center hover:bg-vegas-gold transition-colors"
            >
              Resume
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
