import { motion } from 'framer-motion';
import { achievements } from '../data/portfolioData';

const Achievements = () => {
  return (
    <motion.article 
      id="achievements"
      className="py-16 md:py-24 border-t border-jet/50"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5 }}
    >
      <header>
        <h2 className="text-white-1 text-3xl md:text-4xl lg:text-5xl font-bold capitalize relative pb-4 mb-10 md:mb-12 inline-block drop-shadow-lg">
          Achievements
          <span className="absolute bottom-0 left-0 w-7.5 md:w-12 h-[3px] md:h-[5px] bg-gradient-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      <section>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-5 lg:gap-6">
          {achievements.map((achievement, index) => (
            <motion.li 
              key={index}
              className="relative bg-gradient-to-br from-jet to-transparent backdrop-blur-sm p-5 md:p-6 rounded-[14px] shadow-(--shadow-2) z-1 flex items-start gap-4"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ duration: 0.4, delay: index * 0.1 }}
            >
              <span className="absolute inset-px bg-transparent rounded-[inherit] -z-1" />
              <div className="flex-shrink-0 mt-1">
                 <div className="w-10 h-10 bg-onyx rounded-lg flex items-center justify-center border border-jet shadow-sm">
                   <img src={achievement.icon} alt={achievement.title} className="w-5 h-5 brightness-125 saturate-150" style={{filter: 'hue-rotate(150deg)'}} />
                 </div>
              </div>
              <div>
                <h4 className="text-white-2 text-base md:text-lg font-medium mb-1.5">
                  {achievement.title}
                </h4>
                <p className="text-light-gray text-sm font-light leading-relaxed">
                  {achievement.description}
                </p>
              </div>
            </motion.li>
          ))}
        </ul>
      </section>
    </motion.article>
  );
};

export default Achievements;
