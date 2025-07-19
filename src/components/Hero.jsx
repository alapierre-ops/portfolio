import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin, FaEnvelope, FaPhone } from 'react-icons/fa';

import photo from '../assets/images/photo.png'; 

const Hero = ({ language }) => {
  const [showPhone, setShowPhone] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText('+33 6 40 66 16 55');
    setShowPhone('copied');
    setTimeout(() => setShowPhone(false), 1500);
  };
  const content = {
    fr: {
        headline: "Développeur Full-Stack, Spécialiste Backend & Architecture.",
        subheadline: "En dernière année d'école d'ingénieur, je conçois et développe des solutions back-end robustes et scalables, tout en collaborant efficacement avec les équipes front-end pour livrer des applications complètes et performantes.",
        ctaPrimary: "Voir mes projets",
        ctaSecondary: "Me contacter",
      },
      en: {
        headline: "Full-Stack Developer, Backend & Architecture Specialist.",
        subheadline: "As a final-year engineering student, I design and build robust, scalable backend solutions, while collaborating effectively with front-end teams to deliver complete and high-performance applications.",
        ctaPrimary: "View my work",
        ctaSecondary: "Get in touch",
      },
  };

  return (
    <section id="hero" className="h-screen flex items-center justify-center">
        <div className="container mx-auto px-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
                <div className="text-center md:text-left">
                    <motion.h1 
                        className="text-4xl lg:text-5xl font-extrabold tracking-tight text-white mb-6"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                    >
                        <span className="bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
                        {content[language].headline}
                        </span>
                    </motion.h1>
                    
                    <motion.p 
                        className="max-w-xl text-lg text-gray-300 mb-10 mx-auto md:mx-0"
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                    >
                        {content[language].subheadline}
                    </motion.p>

                    <motion.div 
                        className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-10"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    >
                    <a href="#projects" className="bg-sky-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg shadow-sky-500/30">
                    {content[language].ctaPrimary}
                    </a>
                    <a href="#contact" className="border-2 border-gray-600 text-gray-300 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 hover:border-gray-500 hover:text-gray-300 transition-colors duration-300">
                    {content[language].ctaSecondary}
                    </a>
                    </motion.div>

                    <motion.div 
                        className="flex space-x-6 text-gray-300 relative"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                    >
                        <a href="mailto:lapierre.axel30@gmail.com" className="hover:text-sky-500 transition-colors duration-300" aria-label="Email">
                            <FaEnvelope size={32} />
                        </a>
                        <button type="button" onClick={() => setShowPhone(!showPhone)} className="hover:text-sky-500 transition-colors duration-300 focus:outline-none cursor-pointer" aria-label="Téléphone">
                            <FaPhone size={32} />
                        </button>
                        {showPhone && (
                            <div className="absolute left-1/2 -translate-x-1/2 top-10 bg-gray-800 text-white px-4 py-2 rounded shadow-lg flex flex-col items-center z-50">
                                <span className="mb-2">+33 6 40 66 16 55</span>
                                <div className="flex gap-2">
                                    <button
                                        onClick={handleCopy}
                                        className="bg-sky-500 px-2 py-1 rounded text-sm hover:bg-sky-600 transition cursor-pointer"
                                    >
                                        {showPhone === 'copied'
                                            ? (language === 'fr' ? 'Copié !' : 'Copied!')
                                            : (language === 'fr' ? 'Copier' : 'Copy')}
                                    </button>
                                    <a
                                        href="tel:+33640661655"
                                        className="bg-purple-500 px-2 py-1 rounded text-sm hover:bg-purple-600 transition text-white"
                                    >
                                        {language === 'fr' ? 'Appeler' : 'Call'}
                                    </a>
                                </div>
                            </div>
                        )}
                        <a href="https://github.com/alapierre-ops" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors duration-300" aria-label="GitHub">
                            <FaGithub size={32} />
                        </a>
                        <a href="https://www.linkedin.com/in/axel-lapierre-519b2a26a/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors duration-300" aria-label="LinkedIn">
                            <FaLinkedin size={32} />
                        </a>
                    </motion.div>
                </div>

                <motion.div 
                    className="relative w-1/2 max-w-sm mx-auto md:max-w-none"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                <motion.div
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="rounded-full overflow-hidden shadow-2xl shadow-sky-900"
                    style={{
                        rotateX: 0, rotateY: 0
                    }}
                    whileInView={{
                        rotate: [0, -3, 3, -3, 0],
                        transition: { duration: 10, repeat: Infinity, ease: "linear" }
                    }}
                >
                    <img 
                    src={photo} 
                    alt="Portrait de Axel Lapierre"
                    className="w-full h-full object-cover"
                    />
                </motion.div>
                </motion.div>
            </div>
            <a href="#projects" className="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-300 hover:text-sky-500 transition-colors duration-300 text-4xl animate-bounce">
                <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
            </a>
        </div>
    </section>
  );
};

export default Hero;