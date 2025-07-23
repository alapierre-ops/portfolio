import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaEnvelope, FaLinkedin, FaGithub, FaPhone } from 'react-icons/fa';

const Contact = ({ language }) => {
  const [showPhone, setShowPhone] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText('+33 6 40 66 16 55');
    setShowPhone('copied');
    setTimeout(() => setShowPhone(false), 1500);
  };

  const content = {
    fr: {
      title: "Me Contacter",
      subtitle: "Une question, une opportunité ? Je suis actuellement à la recherche d'une alternance en développement Full-Stack où je pourrai mettre à profit mes compétences. N'hésitez pas à me contacter.",
      buttonText: "Envoyez-moi un email"
    },
    en: {
      title: "Get In Touch",
      subtitle: "Have a question or an opportunity? I am currently looking for a Full-Stack developer apprenticeship where I can leverage my skills. Feel free to reach out.",
      buttonText: "Send me an email"
    }
  };

  const userEmail = "lapierre.axel30@gmail.com";
  const userPhone = "+33 6 40 66 16 55";

  return (
    <section id="contact" className="container py-20 md:py-32 bg-gray-950 mx-auto px-6 rounded-2xl">
      <div className="container mx-auto px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-4xl font-extrabold text-white mb-4">
            {content[language].title}
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto mb-10">
            {content[language].subtitle}
          </p>

          <a
            href={`mailto:${userEmail}`}
            className="inline-block bg-sky-500 text-white px-8 py-4 rounded-lg text-lg font-semibold hover:bg-sky-600 transition-all duration-300 transform hover:scale-105 shadow-lg shadow-sky-500/20"
          >
            {content[language].buttonText}
          </a>

          <div className="flex flex-col md:flex-row justify-center gap-6 mt-12">
            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg w-64">
              <FaEnvelope size={32} className="text-sky-400 mb-2" />
              <span className="text-white font-semibold mb-1">Email</span>
              <a href={`mailto:${userEmail}`} className="text-gray-300 hover:text-sky-400 break-all">{userEmail}</a>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg w-64 relative">
              <FaPhone size={32} className="text-sky-400 mb-2" />
              <span className="text-white font-semibold mb-1">Téléphone</span>
              <a href={`tel:${userPhone}`} className="text-gray-300 hover:text-sky-400 break-all">{userPhone}</a>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg w-64">
              <FaLinkedin size={32} className="text-sky-400 mb-2" />
              <span className="text-white font-semibold mb-1">LinkedIn</span>
              <a href="https://www.linkedin.com/in/axel-lapierre-519b2a26a/" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sky-400">axel-lapierre-519b2a26a</a>
            </div>

            <div className="bg-gray-800 rounded-lg p-6 flex flex-col items-center shadow-lg w-64">
              <FaGithub size={32} className="text-sky-400 mb-2" />
              <span className="text-white font-semibold mb-1">GitHub</span>
              <a href="https://github.com/alapierre-ops" target="_blank" rel="noopener noreferrer" className="text-gray-300 hover:text-sky-400">alapierre-ops</a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Contact;