import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { IoChevronDown, IoLogoGithub, IoOpenOutline, IoCloseOutline } from 'react-icons/io5';
import { projects, projectCategories } from '../data/portfolioData';

const Projects = ({ isActive }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects = activeFilter === 'all'
    ? projects
    : projects.filter(p => p.category === activeFilter);

  const handleFilterClick = (category) => {
    setActiveFilter(category.toLowerCase());
    setIsSelectOpen(false);
  };

  const openModal = (project) => {
    setSelectedProject(project);
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    setSelectedProject(null);
    document.body.style.overflow = 'unset';
  };

  // Close modal on escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') closeModal();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

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
                className={`text-[15px] transition-colors ${activeFilter === category.toLowerCase()
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
            <ProjectCard key={index} project={project} onOpenModal={openModal} />
          ))}
        </ul>
      </section>

      {/* Project Modal - rendered via portal */}
      {selectedProject && createPortal(
        <ProjectModal project={selectedProject} onClose={closeModal} />,
        document.body
      )}
    </article>
  );
};

const ProjectCard = ({ project, onOpenModal }) => {
  const { title, category, image, github, liveUrl, description, techStack } = project;

  const handleCardClick = (e) => {
    // If clicking on a button, don't trigger card click
    if (e.target.closest('button')) return;
    onOpenModal(project);
  };

  return (
    <li className="animate-scaleUp">
      <div
        onClick={handleCardClick}
        className="block w-full group cursor-pointer"
      >
        <figure className="relative w-full h-50 md:h-auto md:aspect-4/3 rounded-2xl overflow-hidden mb-4">
          {/* Image */}
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />

          {/* Hover Overlay with Description and Tech Stack */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/80 to-black/60 opacity-0 group-hover:opacity-100 transition-all duration-300 z-10 flex flex-col justify-end p-4">
            {/* Description */}
            <p className="text-white-2 text-xs md:text-sm leading-relaxed mb-3 line-clamp-3">
              {description}
            </p>

            {/* Tech Stack */}
            <div className="flex flex-wrap gap-1.5 mb-3">
              {techStack?.slice(0, 5).map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-0.5 bg-orange-yellow/20 text-orange-yellow text-[10px] md:text-xs rounded-full border border-orange-yellow/30"
                >
                  {tech}
                </span>
              ))}
              {techStack?.length > 5 && (
                <span className="px-2 py-0.5 bg-jet/50 text-light-gray text-[10px] md:text-xs rounded-full">
                  +{techStack.length - 5}
                </span>
              )}
            </div>

            {/* Click to view more hint */}
            <p className="text-light-gray-70 text-xs text-center">Click to view details</p>
          </div>
        </figure>

        <h3 className="text-white-2 text-[15px] font-normal capitalize leading-tight ml-2.5">
          {title}
        </h3>
        <p className="text-light-gray-70 text-sm font-light ml-2.5 capitalize">
          {category}
        </p>
      </div>
    </li>
  );
};

// Project Modal Component
const ProjectModal = ({ project, onClose }) => {
  const { title, category, image, github, liveUrl, description, techStack } = project;

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-[9999] flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fadeIn overflow-hidden"
      onClick={handleBackdropClick}
    >
      <div className="relative w-full max-w-md max-h-[80vh] overflow-y-auto bg-eerie-black-1 rounded-2xl border border-jet shadow-2xl animate-modalPop">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-10 p-1.5 bg-jet/90 hover:bg-jet text-white-2 rounded-full transition-colors"
        >
          <IoCloseOutline className="text-lg" />
        </button>

        {/* Project Image - smaller */}
        <div className="relative w-full h-40 overflow-hidden rounded-t-2xl">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-eerie-black-1 via-transparent to-transparent" />
        </div>

        {/* Content - more compact */}
        <div className="p-5 -mt-6 relative">
          {/* Category Badge */}
          <span className="inline-block px-2.5 py-0.5 bg-orange-yellow/20 text-orange-yellow text-[11px] rounded-full border border-orange-yellow/30 mb-2 capitalize">
            {category}
          </span>

          {/* Title */}
          <h3 className="text-white-2 text-xl font-semibold mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="text-light-gray text-sm leading-relaxed mb-4">
            {description}
          </p>

          {/* Tech Stack */}
          <div className="mb-4">
            <h4 className="text-white-2 text-xs font-medium mb-2">Tech Stack</h4>
            <div className="flex flex-wrap gap-1.5">
              {techStack?.map((tech, idx) => (
                <span
                  key={idx}
                  className="px-2 py-1 bg-jet text-orange-yellow text-xs rounded-md border border-orange-yellow/20"
                >
                  {tech}
                </span>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2">
            {github && (
              <a
                href={github}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-jet hover:bg-onyx text-white-2 text-sm rounded-lg transition-colors"
              >
                <IoLogoGithub className="text-base" />
                GitHub
              </a>
            )}
            {liveUrl && (
              <a
                href={liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-4 py-2 bg-orange-yellow hover:bg-vegas-gold text-smoky-black text-sm font-medium rounded-lg transition-colors"
              >
                <IoOpenOutline className="text-base" />
                Live Demo
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Projects;

