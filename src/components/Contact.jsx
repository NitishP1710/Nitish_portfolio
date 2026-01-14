import { useState } from 'react';
import { IoPaperPlane } from 'react-icons/io5';
import { mapEmbedUrl } from '../data/portfolioData';

const Contact = ({ isActive }) => {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    const newFormData = { ...formData, [name]: value };
    setFormData(newFormData);
    
    // Check form validity
    const isValid = newFormData.fullname.trim() !== '' &&
                    newFormData.email.trim() !== '' &&
                    newFormData.email.includes('@') &&
                    newFormData.message.trim() !== '';
    setIsFormValid(isValid);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isFormValid) {
      // Handle form submission
      console.log('Form submitted:', formData);
      alert('Thank you for your message! I will get back to you soon.');
      setFormData({ fullname: '', email: '', message: '' });
      setIsFormValid(false);
    }
  };

  if (!isActive) return null;

  return (
    <article className="animate-fade">
      <header>
        <h2 className="text-white-2 text-2xl md:text-[32px] font-semibold capitalize relative pb-2 md:pb-5 mb-6 md:mb-8">
          Contact
          <span className="absolute bottom-0 left-0 w-[30px] md:w-10 h-[3px] md:h-[5px] bg-gradient-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      {/* Map Section */}
      <section className="relative h-[250px] md:h-[380px] w-full rounded-2xl md:rounded-[18px] mb-8 border border-jet overflow-hidden">
        <figure className="h-full">
          <iframe
            src={mapEmbedUrl}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale invert"
          />
        </figure>
      </section>

      {/* Contact Form */}
      <section className="mb-2.5">
        <h3 className="text-white-2 text-lg md:text-2xl font-medium capitalize mb-5">
          Contact Form
        </h3>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              className="bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow transition-colors placeholder:font-medium"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              className="bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow focus:invalid:border-bittersweet transition-colors placeholder:font-medium"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            className="w-full bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow transition-colors min-h-[100px] h-[120px] max-h-[200px] resize-y mb-6 md:mb-8 placeholder:font-medium"
          />

          <button
            type="submit"
            disabled={!isFormValid}
            className="relative w-full md:w-auto md:ml-auto flex justify-center items-center gap-2.5 bg-[linear-gradient(to_bottom_right,hsl(0,0%,25%)_0%,hsla(0,0%,25%,0)_50%)] text-orange-yellow py-3 md:py-4 px-5 rounded-[14px] text-sm md:text-base capitalize shadow-[var(--shadow-3)] z-[1] transition-all
              disabled:opacity-70 disabled:cursor-not-allowed
              enabled:hover:bg-gradient-yellow-1
              group"
          >
            <span className="absolute inset-[1px] bg-gradient-jet rounded-[inherit] -z-[1] transition-all group-enabled:group-hover:bg-gradient-yellow-2" />
            <IoPaperPlane className="text-base md:text-lg" />
            <span>Send Message</span>
          </button>
        </form>
      </section>
    </article>
  );
};

export default Contact;

