import React from 'react';
import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

import photo from '../assets/images/photo.png'; 

const Hero = ({ language }) => {
  const content = {
    fr: {
        headline: "Développeur Full-Stack, Spécialiste Backend & Architecture.",
        subheadline: "En dernière année d'école d'ingénieur, je conçois et développe des solutions back-end robustes et scalables, tout en collaborant efficacement avec les équipes front-end pour livrer des applications complètes et performantes.",
        ctaPrimary: "Voir mes projets",
        ctaSecondary: "Me contacter",
      },
      en: {
        headline: "Full-Stack Developer, Backend & Architecture Specialist.",
        subheadline: "With 4 years of experience, I design and build robust, scalable backend solutions, while collaborating effectively with front-end teams to deliver complete and high-performance applications.",
        ctaPrimary: "View my work",
        ctaSecondary: "Get in touch",
      },
  };

  return (
    <section id="hero" className="container mx-auto px-6 py-20 md:py-24 h-screen">
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
                    className="max-w-xl text-lg text-gray-500 mb-10 mx-auto md:mx-0"
                    initial={{ opacity: 0, x: -50 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    {content[language].subheadline}
                </motion.p>

                <motion.div 
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 justify-center md:justify-start mb-10"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                </motion.div>

                <motion.div 
                    className="flex space-x-6 justify-center md:justify-start text-gray-400"
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                </motion.div>
                <motion.div 
                    className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-6 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                <a href="#projects" className="bg-sky-500 text-white px-8 py-3 rounded-md text-lg font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg shadow-sky-500/30">
                {content[language].ctaPrimary}
                </a>
                <a href="#contact" className="border-2 border-gray-600 text-gray-500 px-8 py-3 rounded-md text-lg font-semibold hover:bg-gray-800 hover:border-gray-500 hover:text-gray-300 transition-colors duration-300">
                {content[language].ctaSecondary}
                </a>
                </motion.div>

                <motion.div 
                    className="flex space-x-6 text-gray-500"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a href="https://github.com/alapierre-ops" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors duration-300">
                    <FaGithub size={32} />
                    </a>
                    <a href="https://www.linkedin.com/in/axel-lapierre-519b2a26a/" target="_blank" rel="noopener noreferrer" className="hover:text-sky-500 transition-colors duration-300">
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
                className="rounded-full overflow-hidden shadow-2xl shadow-sky-900/40"
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
        <a href="#projects" class="absolute bottom-5 left-1/2 -translate-x-1/2 text-gray-500 hover:text-sky-500 transition-colors duration-300 text-4xl animate-bounce">
            <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 448 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M413.1 222.5l22.2 22.2c9.4 9.4 9.4 24.6 0 33.9L241 473c-9.4 9.4-24.6 9.4-33.9 0L12.7 278.6c-9.4-9.4-9.4-24.6 0-33.9l22.2-22.2c9.5-9.5 25-9.3 34.3.4L184 343.4V56c0-13.3 10.7-24 24-24h32c13.3 0 24 10.7 24 24v287.4l114.8-120.5c9.3-9.8 24.8-10 34.3-.4z"></path></svg>
        </a>
    </section>
  );
};

export default Hero;