import { personaInfo } from "../data/portfolioData";
import { useTheme } from "../context/ThemeContext";
import { IoMoonOutline, IoSunnyOutline } from "react-icons/io5";

const Navbar = ({ activePage, setActivePage }) => {
  const { theme, toggleTheme } = useTheme();
  const navItems = ["About", "Skills", "Projects", "Contact"];
  
  return (
    <nav
      className="fixed bottom-0 left-0 w-full bg-onyx/75 backdrop-blur-[10px] border border-jet rounded-t-xl md:rounded-t-[20px] shadow-(--shadow-2) z-5
      lg:absolute lg:bottom-auto lg:top-0 lg:left-auto lg:right-0 lg:w-max lg:rounded-none lg:rounded-br-[20px] lg:px-5 lg:shadow-none"
    >
      <ul className="flex flex-wrap justify-center items-center px-2.5 lg:gap-8 lg:px-5">
        {navItems.map((item) => (
          <li key={item} className="navbar-item">
            <button
              onClick={() => setActivePage(item.toLowerCase())}
              className={`text-[11px] md:text-[14px] lg:text-[15px] py-5 px-2 md:px-3 transition-colors lg:font-medium
                ${activePage === item.toLowerCase()
                  ? "text-orange-yellow"
                  : "text-light-gray hover:text-light-gray-70"
                }`}
            >
              {item}
            </button>
          </li>
        ))}
        <li>
          <button
            onClick={toggleTheme}
            className="text-light-gray hover:text-orange-yellow transition-colors p-2 flex items-center justify-center"
            title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? (
              <IoSunnyOutline className="text-xl md:text-2xl" />
            ) : (
              <IoMoonOutline className="text-xl md:text-2xl" />
            )}
          </button>
        </li>
        <li id="resume">
          <a
            href={personaInfo.resumeURL}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-orange-yellow text-smoky-black h-10 px-4 rounded-[20px] font-bold text-sm flex items-center justify-center hover:bg-vegas-gold transition-colors"
          >
            Resume
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
