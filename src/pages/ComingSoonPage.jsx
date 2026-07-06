import React from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft, FaHourglassHalf } from 'react-icons/fa';

const ComingSoonPage = ({ language = 'fr' }) => {
  const content = {
    fr: {
      title: 'Page introuvable',
      subtitle: "Cette page n'existe pas ou a été déplacée.",
      message: "Revenez à l'accueil pour découvrir mes projets et mon parcours.",
      cta: "Retour à l'accueil",
    },
    en: {
      title: 'Page not found',
      subtitle: "This page doesn't exist or has been moved.",
      message: 'Head back home to explore my projects and journey.',
      cta: 'Back to home',
    },
  };

  const t = content[language] || content.fr;

  return (
    <main className="min-h-screen bg-gray-900 text-white flex items-center justify-center px-6">
      <section className="max-w-2xl w-full text-center bg-slate-800/70 border border-slate-700 rounded-2xl p-10 shadow-2xl shadow-sky-900/30">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-sky-500/20 text-sky-400 mb-6">
          <FaHourglassHalf className="text-2xl" />
        </div>
        <h1 className="text-4xl font-extrabold mb-4">{t.title}</h1>
        <p className="text-gray-300 text-lg mb-3">{t.subtitle}</p>
        <p className="text-sky-300 mb-8">{t.message}</p>
        <Link
          to="/"
          className="inline-flex items-center gap-2 bg-sky-500 hover:bg-sky-600 text-white px-5 py-3 rounded-lg font-semibold transition-colors duration-300"
        >
          <FaArrowLeft />
          {t.cta}
        </Link>
      </section>
    </main>
  );
};

export default ComingSoonPage;
