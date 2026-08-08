import { motion } from 'framer-motion';
import { personaInfo } from '../data/portfolioData';
import { IoLogoGithub, IoLogoLinkedin, IoLogoMedium } from "react-icons/io5";
import { SiLeetcode, SiCodechef, SiCodeforces } from "react-icons/si";

const Hero = () => {
  return (
    <section id="hero" className="flex flex-col justify-center items-center relative w-full pt-24 pb-16">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="text-center z-10 flex flex-col items-center"
      >
        <motion.figure 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="rounded-full p-2 mb-4 md:mb-6"
        >
          <img
            src={personaInfo.avatar}
            alt={personaInfo.name}
            className="w-24 h-24 md:w-32 md:h-32 lg:w-40 lg:h-40 rounded-full object-cover shadow-[0_10px_30px_rgba(0,0,0,0.5)] border-4 border-onyx"
          />
        </motion.figure>
        
        <motion.h1 
          initial={{ opacity: 0, scale: 0.5, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ 
            duration: 0.8, 
            delay: 0.4,
            type: "spring",
            stiffness: 100
          }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white-1 mb-4 drop-shadow-2xl"
          style={{ fontFamily: "'Dancing Script', cursive" }}
        >
          Hi, I'm <span className="text-orange-yellow bg-clip-text">Nitish Patil</span>
        </motion.h1>
        
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.7 }}
          className="text-lg md:text-xl lg:text-2xl text-light-gray font-medium mb-6 drop-shadow-lg max-w-3xl italic"
        >
          "Engineering scalable, intelligent solutions line by line."
        </motion.h2>

        <motion.ul 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="flex justify-center items-center gap-6 mt-4"
        >
          <SocialLink href={personaInfo.social.github} icon={<IoLogoGithub />} />
          <SocialLink href={personaInfo.social.linkedin} icon={<IoLogoLinkedin />} />
          <SocialLink href={personaInfo.social.leetcode} icon={<SiLeetcode />} />
          <SocialLink href={personaInfo.social.codechef} icon={<SiCodechef />} />
          <SocialLink href={personaInfo.social.codeforces} icon={<SiCodeforces />} />
          <SocialLink href={personaInfo.social.medium} icon={<IoLogoMedium />} />
        </motion.ul>
      </motion.div>

      {/* Removed scroll down indicator since about is on same screen */}
    </section>
  );
};

const SocialLink = ({ href, icon }) => {
  if(!href) return null;
  return (
    <li>
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-light-gray text-2xl md:text-3xl hover:text-orange-yellow hover:scale-110 transition-all duration-300 drop-shadow-md inline-block"
      >
        {icon}
      </a>
    </li>
  );
};

export default Hero;
