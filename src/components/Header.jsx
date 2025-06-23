import React from 'react';

const Header = ({ language, setLanguage }) => {
  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navLinks = {
    fr: {
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
      resume: 'Mon CV',
    },
    en: {
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      resume: 'Resume',
    },
  };

  return (
    <header className="bg-gray-900/80 sticky top-0 z-50 backdrop-blur-sm border-b border-gray-700">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-bold text-white tracking-wider">
          <a href="#">Axel Lapierre</a>
        </div>

        <div className="flex items-center space-x-6">
          <div className="hidden md:flex items-center space-x-6 text-gray-300">
            <a href="#projects" className="hover:text-sky-400 transition-colors duration-300">{navLinks[language].projects}</a>
            <a href="#skills" className="hover:text-sky-400 transition-colors duration-300">{navLinks[language].skills}</a>
            <a href="#contact" className="hover:text-sky-400 transition-colors duration-300">{navLinks[language].contact}</a>
          </div>
          
          <button 
            onClick={toggleLanguage} 
            className="px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300"
          >
            {language === 'fr' ? 'EN' : 'FR'}
          </button>
          
          <a 
            href="/src/assets/cv.pdf" 
            target="_blank" 
            rel="noopener noreferrer"
            className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg shadow-sky-500/20"
          >
            {navLinks[language].resume}
          </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;