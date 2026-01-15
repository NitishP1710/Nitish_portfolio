import { aboutText, services } from "../data/portfolioData";

const About = ({ isActive }) => {
  if (!isActive) return null;
  return (
    <article className="animate-fade">
      <header>
        <h2 className="text-white-2 text-2xl md:text-[32px] font-semibold capitalize relative pb-2 md:pb-4 mb-4 md:mb-5">
          About me
          <span className="absolute bottom-0 left-0 w-7.5 md:w-10 h-0.75 md:h-1.25 bg-linear-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      <section className="text-light-gray text-sm md:text-[15px] font-light leading-relaxed mb-8 md:mb-10">
        {aboutText.map((text, index) => (
          <p
            key={index}
            className="mb-4"
            dangerouslySetInnerHTML={{ __html: text.replace(/<strong>/g, '<strong class="font-semibold text-white-2">') }}
          />
        ))}
      </section>

      {/* Services Section */}
      <section className="mb-8">
        <h3 className="text-white-2 text-lg md:text-2xl font-medium capitalize mb-5">
          What I'm doing
        </h3>

        <ul className="grid grid-cols-1 lg:grid-cols-2 gap-5 lg:gap-6">
          {services.map((service, index) => (
            <ServiceCard key={index} {...service} />
          ))}
        </ul>
      </section>
    </article>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <li className="relative bg-[linear-gradient(to_bottom_right,hsla(0,0%,25%,0.5)_0%,hsla(0,0%,25%,0)_50%)] backdrop-blur-sm p-5 md:p-8 rounded-[14px] shadow-(--shadow-2) z-1 flex flex-col md:flex-row items-start gap-4 md:gap-5">
    <span className="absolute inset-px bg-gradient-jet backdrop-blur-sm rounded-[inherit] -z-1" />
    <div className="mx-auto md:mx-0 md:mt-1">
      <img src={icon} alt={title} className="w-10" />
    </div>
    <div className="text-center md:text-left">
      <h4 className="text-white-2 text-base md:text-lg font-medium capitalize mb-2">
        {title}
      </h4>
      <p className="text-light-gray text-sm md:text-[15px] font-light leading-relaxed">
        {description}
      </p>
    </div>
  </li>
);

export default About;