import { useState } from 'react';
import { IoEyeOutline, IoChevronDown } from 'react-icons/io5';
import { projects, projectCategories } from '../data/portfolioData';

const Projects = ({ isActive }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSelectOpen, setIsSelectOpen] = useState(false);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleFilterClick = (category) => {
    setActiveFilter(category.toLowerCase());
    setIsSelectOpen(false);
  };

  if (!isActive) return null;

  return (
    <article className="animate-fade">
      <header>
        <h2 className="text-white-2 text-2xl md:text-[32px] font-semibold capitalize relative pb-2 md:pb-5 mb-6 md:mb-8">
          Projects
          <span className="absolute bottom-0 left-0 w-7.5 md:w-10 h-0.75 md:h-1.25 bg-linear-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
        
      </header>

      <section>
        {/* Desktop Filter Buttons */}
        <ul className="hidden md:flex justify-start items-center gap-6 pl-1 mb-8">
          {projectCategories.map((category) => (
            <li key={category}>
              <button
                onClick={() => handleFilterClick(category)}
                className={`text-[15px] transition-colors ${
                  activeFilter === category.toLowerCase()
                    ? 'text-orange-yellow'
                    : 'text-light-gray hover:text-light-gray-70'
                }`}
              >
                {category}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile Filter Dropdown */}
        <div className="relative mb-6 md:hidden">
          <button
            onClick={() => setIsSelectOpen(!isSelectOpen)}
            className="bg-transparent backdrop-blur-sm text-light-gray flex justify-between items-center w-full p-3 px-4 border border-jet rounded-[14px] text-sm font-light"
          >
            <span className="capitalize">
              {activeFilter === 'all' ? 'Select category' : activeFilter}
            </span>
            <IoChevronDown className={`transition-transform duration-300 ${isSelectOpen ? 'rotate-180' : ''}`} />
          </button>

          {isSelectOpen && (
            <ul className="absolute top-[calc(100%+6px)] w-full bg-transparent backdrop-blur-md border border-jet rounded-[14px] p-1.5 z-2">
              {projectCategories.map((category) => (
                <li key={category}>
                  <button
                    onClick={() => handleFilterClick(category)}
                    className="bg-transparent text-light-gray text-sm font-light capitalize w-full py-2 px-2.5 rounded-lg text-left hover:bg-[hsla(240,2%,20%,0.8)] transition-colors"
                  >
                    {category}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Project Grid */}
        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-2.5">
          {filteredProjects.map((project, index) => (
            <ProjectCard key={index} {...project} />
          ))}
        </ul>
      </section>
    </article>
  );
};

const ProjectCard = ({ title, category, image, url, description }) => (
  <li className="animate-scaleUp">
    <a href={url} target="_blank" rel="noopener noreferrer" className="block w-full group">
      <figure className="relative w-full h-50 md:h-auto md:aspect-4/3 rounded-2xl overflow-hidden mb-4">
        {/* Overlay */}
        <div className="absolute inset-0 bg-transparent group-hover:bg-black/50 transition-colors z-1" />
        
        {/* Eye Icon */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-jet text-orange-yellow p-4 rounded-xl opacity-0 scale-[0.8] group-hover:opacity-100 group-hover:scale-100 transition-all z-1">
          <IoEyeOutline className="text-xl" />
        </div>

        <img
          src={image}
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
        />
      </figure>

      <h3 className="text-white-2 text-[15px] font-normal capitalize leading-tight ml-2.5">
        {title}
      </h3>
      <p className="text-light-gray-70 text-sm font-light ml-2.5">
        {description}
      </p>
    </a>
  </li>
);

export default Projects;

