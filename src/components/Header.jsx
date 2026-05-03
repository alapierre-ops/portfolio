import React, { useEffect, useState } from 'react';

const Header = ({ language, setLanguage, immersiveToggle }) => {
  const [terminalOpen, setTerminalOpen] = useState(false);

  useEffect(() => {
    if (!terminalOpen) return;
    const onKey = (e) => {
      if (e.key === 'Escape') setTerminalOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [terminalOpen]);

  const toggleLanguage = () => {
    setLanguage(language === 'fr' ? 'en' : 'fr');
  };

  const navLinks = {
    fr: {
      projects: 'Projets',
      skills: 'Compétences',
      contact: 'Contact',
      resume: 'Mon LinkedIn',
      terminal: 'Terminal Web',
      terminalTitle: '>_ session',
      terminalBody:
        '> connexion handshake… OK\n> charge utile AES-256… OK\n> portefeuille de projets disponible ci-dessous via navigation.\n> ESC pour fermer.',
    },
    en: {
      projects: 'Projects',
      skills: 'Skills',
      contact: 'Contact',
      resume: 'LinkedIn',
      terminal: 'Web terminal',
      terminalTitle: '>_ session',
      terminalBody:
        '> connection handshake… OK\n> AES payload… OK\n> project payloads reachable from the navbar.\n> press ESC to detach.',
    },
  };

  const t = navLinks[language];

  const classicMounted =
    immersiveToggle == null ||
    immersiveToggle.isClassicMode === true;

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[50] bg-gray-950/85 backdrop-blur-md border-b border-gray-700/85">
        <nav className="container mx-auto px-6 py-4 flex justify-between items-center gap-4">
          <div className="text-xl font-bold text-white tracking-wider shrink-0">
            <a href="/">Axel Lapierre</a>
          </div>

          <div className="flex items-center gap-3 md:gap-6 flex-wrap justify-end">
            {immersiveToggle && (
              <label className="hidden sm:flex items-center gap-2 cursor-pointer select-none">
                <span className="text-[11px] uppercase tracking-[0.12em] text-gray-400 max-w-[6rem] leading-tight text-right">
                  {language === 'fr' ? 'Mode classique' : 'Classic mode'}
                </span>
                <button
                  type="button"
                  role="switch"
                  aria-checked={immersiveToggle.isClassicMode}
                  aria-label={language === 'fr' ? 'Mode classique' : 'Classic mode'}
                  onClick={() => immersiveToggle.setIsClassicMode(!immersiveToggle.isClassicMode)}
                  className={`relative inline-flex h-7 w-[3.25rem] shrink-0 rounded-full border border-gray-600 transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-500 ${
                    immersiveToggle.isClassicMode ? 'bg-sky-950/85' : 'bg-gray-800'
                  }`}
                >
                  <span
                    className={`pointer-events-none absolute top-1/2 h-[1.05rem] w-[1.05rem] -translate-y-1/2 rounded-full bg-[#00a8ff] shadow-[0_0_10px_rgba(0,168,255,0.55)] transition-all duration-300 ${
                      immersiveToggle.isClassicMode ? 'left-[calc(100%-0.92rem)]' : 'left-[0.2rem]'
                    }`}
                  />
                </button>
              </label>
            )}

            {classicMounted ? (
              <div className="hidden md:flex items-center space-x-6 text-gray-300">
                <a href="#projects" className="hover:text-sky-400 transition-colors duration-300">
                  {navLinks[language].projects}
                </a>
                <a href="#skills" className="hover:text-sky-400 transition-colors duration-300">
                  {navLinks[language].skills}
                </a>
                <a href="#contact" className="hover:text-sky-400 transition-colors duration-300">
                  {navLinks[language].contact}
                </a>
              </div>
            ) : null}

            <button
              type="button"
              aria-label={t.terminal}
              onClick={() => setTerminalOpen(true)}
              className="font-mono shrink-0 text-xs md:text-sm text-[#00a8ff] border border-[#00a8ff]/55 rounded-md px-2.5 py-1 hover:bg-[#00a8ff]/10 transition-colors duration-300"
            >
              &gt;_
            </button>

            <button
              onClick={toggleLanguage}
              className="px-3 py-1 border border-gray-600 rounded-md text-sm text-gray-300 hover:bg-gray-700 hover:text-white transition-all duration-300 shrink-0"
            >
              {language === 'fr' ? 'EN' : 'FR'}
            </button>

            <a
              href="https://www.linkedin.com/in/axel-lapierre-519b2a26a/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-sky-500 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-sky-600 transition-colors duration-300 shadow-lg shadow-sky-500/20 shrink-0 whitespace-nowrap"
            >
              {navLinks[language].resume}
            </a>
          </div>
        </nav>
      </header>

      {terminalOpen && (
        <div
          className="fixed inset-0 z-[60] flex items-end justify-center sm:items-center bg-black/60 backdrop-blur-sm p-5"
          role="dialog"
          aria-modal="true"
          aria-labelledby="terminal-title"
          onClick={() => setTerminalOpen(false)}
        >
          <div
            className="w-full max-w-lg rounded-xl border border-sky-500/35 bg-[#050b14]/95 shadow-2xl shadow-cyan-500/15 overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-gray-700/85 px-4 py-3">
              <h2 id="terminal-title" className="font-mono text-sm text-[#00a8ff]">
                {t.terminalTitle}
              </h2>
              <button
                type="button"
                onClick={() => setTerminalOpen(false)}
                className="rounded-md px-2 py-1 text-xs uppercase tracking-wide text-gray-400 hover:bg-gray-800 hover:text-gray-100"
              >
                esc
              </button>
            </div>
            <pre className="max-h-[50vh] overflow-auto p-4 font-mono text-[12px] leading-relaxed text-sky-100/92 whitespace-pre-wrap">
              {t.terminalBody}
            </pre>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
