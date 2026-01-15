import {
  IoMailOutline,
  IoPhonePortraitOutline,
  IoCalendarOutline,
  IoLocationOutline,
  IoChevronDown,
  IoLogoGithub,
  IoLogoLinkedin,
  IoLogoInstagram,
  IoLogoMedium,
  IoLogoCodepen,
} from "react-icons/io5";
import { useState } from "react";
import { personaInfo } from "../data/portfolioData";

const Sidebar = () => {
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <aside
        className={`relative bg-transparent backdrop-blur-sm rounded-[20px] p-4 shadow-[var(--shadow-1)] z-[1] mb-4 transition-all duration-500 overflow-hidden before:absolute before:inset-0 before:rounded-[20px] before:p-px before:bg-gradient-to-br before:from-jet before:to-transparent before:-z-1 before:content-['']
          ${isExpanded ? "max-h-[600px]" : "max-h-[112px]"}
           md:max-h-[180px] md:mb-8 md:p-8
           lg:sticky lg:top-[60px] lg:max-h-max lg:h-fit lg:pt-[60px] lg:min-w-[300px]`}
      >
        {/* Basic Info */}
        <div className="relative flex items-center gap-4 md:gap-6 lg:flex-col">
          <figure className="bg-gradient-onyx rounded-[20px] md:rounded-[30px]">
            <img
              src={personaInfo.avatar}
              alt={personaInfo.name}
              className="w-20 md:w-[120px] lg:w-[150px]"
            />
          </figure>

          <div className="text-center lg:text-center">
            <h1 className="text-white-2 text-[17px] md:text-[26px] font-medium tracking-tight mb-2 md:mb-4 whitespace-nowrap">
              {personaInfo.name}
            </h1>
            <p className="text-white-1 bg-onyx text-[11px] md:text-[12px] font-light w-max px-3 py-1 rounded-lg mx-auto lg:mx-auto">
              {personaInfo.title}
            </p>
          </div>

          {/* Toggle Button - Mobile/Tablet */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="absolute -top-4 -right-4 md:-top-8 md:-right-8 rounded-tl-none rounded-br-none rounded-tr-[15px] rounded-bl-[15px] text-[13px] text-orange-yellow border-gradient-onyx p-2.5 md:py-2.5 md:px-4 shadow-[var(--shadow-2)] transition-all duration-300 z-[1] bg-gradient-jet hover:bg-gradient-yellow-1 lg:hidden"
          >
            <span className="hidden md:block text-[12px] text-orange-yellow">
              Show Contacts
            </span>
            <IoChevronDown
              className={`md:hidden text-orange-yellow transition-transform duration-300 ${isExpanded ? "rotate-180" : ""
                }`}
            />
          </button>
        </div>

        {/* Extended Info */}
        <div
          className={`transition-all duration-500 ${isExpanded ? "opacity-100 visible" : "opacity-0 invisible"
            } lg:opacity-100 lg:visible`}
        >
          <div className="w-full h-px bg-jet my-4 md:my-8" />

          {/* Contact List */}
          <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 md:gap-5">
            <ContactItem
              icon={<IoMailOutline />}
              title="Email"
              content={
                <a
                  href={`mailto:${personaInfo.email}`}
                  className="text-white-2 text-[13px] md:text-[14px] hover:text-orange-yellow transition-colors truncate"
                >
                  {personaInfo.email}
                </a>
              }
            />
            <ContactItem
              icon={<IoPhonePortraitOutline />}
              title="Phone"
              content={
                <a
                  href={`tel:${personaInfo.phone}`}
                  className="text-white-2 text-[13px] md:text-[14px] hover:text-orange-yellow transition-colors"
                >
                  {personaInfo.phone}
                </a>
              }
            />
            <ContactItem
              icon={<IoCalendarOutline />}
              title="Birthday"
              content={
                <time className="text-white-2 text-[13px] md:text-[14px]">
                  {personaInfo.birthday}
                </time>
              }
            />
            <ContactItem
              icon={<IoLocationOutline />}
              title="Location"
              content={
                <address className="text-white-2 text-[13px] md:text-[14px] not-italic">
                  {personaInfo.location}
                </address>
              }
            />
          </ul>

          <div className="w-full h-px bg-jet my-4 md:my-8 lg:opacity-0" />

          {/* Social Links */}
          <ul className="flex justify-start lg:justify-center items-center gap-4 pl-2 pb-1">
            <SocialLink
              href={personaInfo.social.github}
              icon={<IoLogoGithub />}
            />
            <SocialLink
              href={personaInfo.social.linkedin}
              icon={<IoLogoLinkedin />}
            />
            <SocialLink
              href={personaInfo.social.instagram}
              icon={<IoLogoInstagram />}
            />
            <SocialLink
              href={personaInfo.social.medium}
              icon={<IoLogoMedium />}
            />
            <SocialLink
              href={personaInfo.social.leetcode}
              icon=""
            />
          </ul>
        </div>
      </aside>
    </>
  );
};

const ContactItem = ({ icon, title, content }) => (
  <li className="flex items-center gap-4">
    <div className="relative bg-gradient-to-br from-jet to-transparent p-2 rounded-lg shadow-(--shadow-2) z-1 text-orange-yellow text-lg">
      <span className="absolute inset-px bg-transparent rounded-[inherit] -z-1" />
      {icon}
    </div>
    <div className="min-w-0">
      <p className="text-light-gray-70 text-[11px] uppercase mb-0.5">{title}</p>
      {content}
    </div>
  </li>
);

const SocialLink = ({ href, icon }) => (
  <li>
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-light-gray-70 text-lg hover:text-orange-yellow transition-colors"
    >
      {icon}
    </a>
  </li>
);

export default Sidebar;
