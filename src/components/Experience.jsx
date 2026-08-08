import { motion } from 'framer-motion';
import { experience } from '../data/portfolioData';

const Experience = () => {
  return (
    <motion.article 
      id="experience" 
      className="py-16 md:py-24 border-t border-jet/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <h2 className="text-white-1 text-3xl md:text-4xl lg:text-5xl font-bold capitalize relative pb-4 mb-10 md:mb-12 inline-block drop-shadow-lg">
          Experience
          <span className="absolute bottom-0 left-0 w-7.5 md:w-12 h-[3px] md:h-[5px] bg-gradient-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      <section>
        <ol className="relative border-l border-jet ml-3 md:ml-4">
          {experience.map((item, index) => (
            <motion.li 
              key={index} 
              className="mb-10 ml-6 md:ml-8"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="absolute flex items-center justify-center w-3 h-3 bg-orange-yellow rounded-full -left-[6.5px] ring-4 ring-onyx" />
              <h3 className="flex items-center mb-1 text-lg font-semibold text-white-2">
                {item.role}
              </h3>
              <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3 mb-2">
                <a href={item.url} target="_blank" rel="noreferrer" className="text-vegas-gold hover:text-orange-yellow transition-colors font-medium text-sm md:text-base">
                  {item.company}
                </a>
                <span className="hidden sm:block text-jet">•</span>
                <time className="block text-sm font-normal leading-none text-light-gray-70">
                  {item.period}
                </time>
              </div>
              <p className="mb-4 text-sm md:text-[15px] font-light text-light-gray leading-relaxed">
                {item.description}
              </p>
            </motion.li>
          ))}
        </ol>
      </section>
    </motion.article>
  );
};

export default Experience;
