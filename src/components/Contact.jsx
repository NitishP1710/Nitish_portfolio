import { useState, useRef } from 'react';
import { IoPaperPlane, IoCheckmarkCircle, IoAlertCircle } from 'react-icons/io5';
import emailjs from '@emailjs/browser';
import { mapEmbedUrl } from '../data/portfolioData';

// EmailJS Configuration - Replace these with your actual IDs from emailjs.com
const EMAILJS_SERVICE_ID = 'service_bjmta1t';     // e.g., 'service_xxxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_3k1afmn';   // e.g., 'template_xxxxxxx'
const EMAILJS_PUBLIC_KEY = 'Ar3kaPxIn0ttN2qP6';     // e.g., 'xxxxxxxxxxxxxxx'

const Contact = ({ isActive }) => {
  const formRef = useRef();
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    message: ''
  });
  const [isFormValid, setIsFormValid] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isLoading, setIsLoading] = useState(false);

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

    // Clear status when user starts typing again
    if (status.message) setStatus({ type: '', message: '' });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid || isLoading) return;

    setIsLoading(true);
    setStatus({ type: '', message: '' });

    try {
      await emailjs.sendForm(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        formRef.current,
        EMAILJS_PUBLIC_KEY
      );

      setStatus({
        type: 'success',
        message: 'Message sent successfully! I will get back to you soon.'
      });
      setFormData({ fullname: '', email: '', message: '' });
      setIsFormValid(false);
    } catch (error) {
      console.error('EmailJS Error:', error);
      setStatus({
        type: 'error',
        message: 'Failed to send message. Please try again or email me directly.'
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (!isActive) return null;

  return (
    <article className="animate-fade">
      <header>
        <h2 className="text-white-2 text-2xl md:text-[32px] font-semibold capitalize relative pb-2 md:pb-5 mb-6 md:mb-8">
          Contact
          <span className="absolute bottom-0 left-0 w-7.5 md:w-10 h-0.75 md:h-1.25 bg-linear-to-r from-orange-yellow to-vegas-gold rounded-full" />
        </h2>
      </header>

      {/* Map Section */}
      <section className="relative h-62.5 md:h-95 w-full rounded-2xl md:rounded-[18px] mb-8 border border-jet overflow-hidden">
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

        <form ref={formRef} onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 mb-6 md:mb-8">
            <input
              type="text"
              name="fullname"
              value={formData.fullname}
              onChange={handleInputChange}
              placeholder="Full name"
              required
              disabled={isLoading}
              className="bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow transition-colors placeholder:font-medium disabled:opacity-50"
            />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email address"
              required
              disabled={isLoading}
              className="bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow focus:invalid:border-bittersweet transition-colors placeholder:font-medium disabled:opacity-50"
            />
          </div>

          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            placeholder="Your Message"
            required
            disabled={isLoading}
            className="w-full bg-transparent text-white-2 text-sm md:text-[15px] font-normal py-3 md:py-4 px-5 border border-jet rounded-[14px] outline-none focus:border-orange-yellow transition-colors min-h-25 h-30 max-h-50 resize-y mb-6 md:mb-8 placeholder:font-medium disabled:opacity-50"
          />

          {/* Status Message */}
          {status.message && (
            <div className={`flex items-center gap-2 mb-4 p-3 rounded-lg ${status.type === 'success'
                ? 'bg-green-500/10 text-green-400 border border-green-500/20'
                : 'bg-red-500/10 text-red-400 border border-red-500/20'
              }`}>
              {status.type === 'success'
                ? <IoCheckmarkCircle className="text-lg flex-shrink-0" />
                : <IoAlertCircle className="text-lg flex-shrink-0" />
              }
              <span className="text-sm">{status.message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={!isFormValid || isLoading}
            className="relative w-full md:w-auto md:ml-auto flex justify-center items-center gap-2.5 bg-gradient-to-br from-jet to-transparent backdrop-blur-sm text-orange-yellow py-3 md:py-4 px-5 rounded-[14px] text-sm md:text-base capitalize shadow-(--shadow-3) z-1 transition-all
              disabled:opacity-70 disabled:cursor-not-allowed
              enabled:hover:bg-gradient-yellow-1
              group"
          >
            <span className="absolute inset-px bg-transparent rounded-[inherit] -z-1 transition-all group-enabled:group-hover:bg-gradient-yellow-2" />
            {isLoading ? (
              <>
                <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                <span>Sending...</span>
              </>
            ) : (
              <>
                <IoPaperPlane className="text-base md:text-lg" />
                <span>Send Message</span>
              </>
            )}
          </button>
        </form>
      </section>
    </article>
  );
};

export default Contact;

