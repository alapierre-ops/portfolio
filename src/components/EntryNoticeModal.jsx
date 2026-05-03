import React, { useEffect } from 'react';

const EntryNoticeModal = ({ onClose }) => {
  useEffect(() => {
    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 px-6">
      <div className="w-full max-w-2xl rounded-2xl border border-slate-700 bg-slate-900 p-8 shadow-2xl shadow-sky-900/30">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white mb-4">
          Petit message important
        </h2>
        <p className="text-gray-200 leading-relaxed mb-4">
          Ce site a été fait il y a quelques années et n&apos;a jamais été
          vraiment terminé. Il ne reflète pas mes vraies compétences.
        </p>
        <p className="text-gray-200 leading-relaxed mb-8">
          Si vous voulez voir un exemple plus représentatif, jetez un oeil à{' '}
          <a
            href="https://majoli.io"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sky-400 font-semibold hover:text-sky-300 underline underline-offset-4"
          >
            majoli.io
          </a>
          .
        </p>
        <div className="flex justify-end">
          <button
            type="button"
            onClick={onClose}
            className="rounded-lg bg-sky-500 px-5 py-2.5 font-semibold text-white transition-colors duration-300 hover:bg-sky-600"
          >
            Continuer
          </button>
        </div>
      </div>
    </div>
  );
};

export default EntryNoticeModal;
