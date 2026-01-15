import { useEffect, useRef } from 'react';
import { IoBookOutline } from 'react-icons/io5';
import { education, experience, skills, techSlugs } from '../data/portfolioData';

const Skills = ({ isActive }) => {
  const cloudRef = useRef(null);
  const iconsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const rotationRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    if (!isActive || !cloudRef.current) return;

    const radius = 160;
    const icons = iconsRef.current;

    // Initialize positions
    techSlugs.forEach((slug, i) => {
      const phi = Math.acos(-1 + (2 * i) / techSlugs.length);
      const theta = Math.sqrt(techSlugs.length * Math.PI) * phi;

      const x = radius * Math.cos(theta) * Math.sin(phi);
      const y = radius * Math.sin(theta) * Math.sin(phi);
      const z = radius * Math.cos(phi);

      if (icons[i]) {
        icons[i].dataset.x = x;
        icons[i].dataset.y = y;
        icons[i].dataset.z = z;
      }
    });

    const handleMouseMove = (e) => {
      const rect = cloudRef.current?.getBoundingClientRect();
      if (!rect) return;
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current.x = (e.clientX - centerX) / 200;
      mouseRef.current.y = (e.clientY - centerY) / 200;
    };

    document.addEventListener('mousemove', handleMouseMove);

    let animationId;
    const rotate = () => {
      rotationRef.current.y += mouseRef.current.x * 0.05;
      rotationRef.current.x += mouseRef.current.y * 0.05;

      const sinX = Math.sin(rotationRef.current.x);
      const cosX = Math.cos(rotationRef.current.x);
      const sinY = Math.sin(rotationRef.current.y);
      const cosY = Math.cos(rotationRef.current.y);

      icons.forEach((icon) => {
        if (!icon) return;
        const x = parseFloat(icon.dataset.x);
        const y = parseFloat(icon.dataset.y);
        const z = parseFloat(icon.dataset.z);

        const x1 = x * cosY - z * sinY;
        const z1 = z * cosY + x * sinY;
        const y1 = y * cosX - z1 * sinX;
        const z2 = z1 * cosX + y * sinX;

        const scale = 0.6 + (z2 + radius) / (2 * radius);
        const left = x1 + (cloudRef.current?.offsetWidth || 0) / 2 - 20;
        const top = y1 + (cloudRef.current?.offsetHeight || 0) / 2 - 20;

        icon.style.transform = `translate(${left}px, ${top}px) scale(${scale})`;
        icon.style.zIndex = Math.floor(scale * 100);
        icon.style.opacity = scale;
      });

      animationId = requestAnimationFrame(rotate);
    };

    rotate();

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationId);
    };
  }, [isActive]);

  if (!isActive) return null;

  return (
    <article className="animate-fade">
      <header>
        <h2 className="text-white-2 text-2xl md:text-[32px] font-semibold capitalize relative pb-2 md:pb-5 mb-6 md:mb-8">
          Skills
          <span className="absolute bottom-0 left-0 w-[30px] md:w-10 h-[3px] md:h-[5px] bg-gradient-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      {/* Education */}
      <TimelineSection title="Education" items={education} type="education" />

      {/* Experience */}
      <TimelineSection title="Experience" items={experience} type="experience" />

      {/* Skills Tags */}
      <section className="text-center mb-8">
        <h3 className="text-white-2 text-lg md:text-2xl font-medium capitalize mb-5">
          Skills
        </h3>
        <div className="flex flex-wrap gap-3 justify-center mt-4">
          {skills.map((skill, index) => (
            <span
              key={index}
              className="bg-transparent text-light-gray px-3 py-1 rounded-[20px] text-sm font-medium shadow-md border border-jet hover:text-orange-yellow hover:border-orange-yellow transition-colors"
            >
              {skill}
            </span>
          ))}
        </div>
      </section>

      {/* Skills Cloud - Desktop Only */}
      <section className="hidden md:block text-center mt-4">
        <div className="w-[400px] h-[400px] mx-auto rounded-[20px] bg-transparent backdrop-blur-sm shadow-[0_0_10px_rgba(255,255,255,0.1)] flex justify-center items-center border border-jet">
          <div ref={cloudRef} className="icon-cloud w-[400px] h-[400px] relative perspective-[1000px]">
            {techSlugs.map((slug, index) => (
              <div
                key={slug}
                ref={(el) => (iconsRef.current[index] = el)}
                className="absolute w-[30px] h-[30px] preserve-3d transition-transform duration-100"
              >
                <img
                  src={`https://cdn.simpleicons.org/${slug}/FFFFFF`}
                  alt={slug}
                  className="w-full h-full object-contain drop-shadow-[0_0_2px_white]"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </article>
  );
};

const TimelineSection = ({ title, items, type }) => (
  <section className="mb-8">
    <div className="flex items-center gap-4 mb-6">
      <div className="relative bg-gradient-to-br from-jet to-transparent w-[30px] h-[30px] md:w-12 md:h-12 rounded-lg md:rounded-xl flex justify-center items-center text-base md:text-lg text-orange-yellow shadow-[var(--shadow-1)] z-[1]">
        <span className="absolute inset-[1px] bg-transparent rounded-inherit -z-[1] rounded-lg md:rounded-xl" />
        <IoBookOutline />
      </div>
      <h3 className="text-white-2 text-lg md:text-2xl font-medium">
        {title}
      </h3>
    </div>

    <ol className="text-sm md:text-[15px] ml-12 md:ml-16">
      {items.map((item, index) => (
        <li
          key={index}
          className={`relative ${index !== items.length - 1 ? 'mb-5' : ''}`}
        >
          {/* Timeline line */}
          {index !== items.length - 1 && (
            <span className="absolute -top-6 -left-8 md:-left-10 w-px h-[calc(100%+50px)] bg-jet" />
          )}
          {/* Timeline dot */}
          <span className="absolute top-1 -left-[33px] md:-left-[43px] h-1.5 w-1.5 md:h-2 md:w-2 bg-gradient-to-r from-orange-yellow to-vegas-gold rounded-full shadow-[0_0_0_4px_var(--color-jet)]" />

          <h4 className="text-white-2 text-sm md:text-[15px] leading-tight mb-2">
            {item.url ? (
              <a href={item.url} target="_blank" rel="noopener noreferrer" className="hover:text-orange-yellow transition-colors">
                {type === 'education' ? item.institution : item.company}
              </a>
            ) : (
              type === 'education' ? item.institution : item.company
            )}
          </h4>
          <span className="text-vegas-gold font-normal leading-relaxed text-[13px]">
            {item.period}
          </span>
          {type === 'experience' && (
            <span className="block text-vegas-gold font-normal leading-relaxed text-[13px]">
              Role: {item.role}
            </span>
          )}
          <p className="text-light-gray font-light leading-relaxed mt-1">
            {type === 'education' ? item.degree : item.description}
          </p>
        </li>
      ))}
    </ol>
  </section>
);

export default Skills;

