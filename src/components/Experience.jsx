import React from 'react';
import { motion } from 'framer-motion';

const content = {
  fr: {
    title: 'Mon Parcours',
    subtitle:
      "Trois ans d'alternance chez Majoli, une agence web marseillaise. J'ai grandi avec l'entreprise : d'exécutant no-code à référent technique de sa prospection B2B.",
    metrics: [
      { value: '~387k', label: 'domaines traités / jour', sub: 'pipeline temps réel (DomainRadar)' },
      { value: '100k+', label: 'emails / mois', sub: '>3,5 % de taux de réponse' },
      { value: '345', label: 'boîtes email', sub: 'sur 115 domaines (SPF/DKIM/DMARC)' },
      { value: '~30', label: 'sites mis en ligne', sub: 'fonctionnalités cœur ou déploiement' },
    ],
    timeline: [
      {
        year: '2023',
        heading: 'No-code & premiers clients',
        body: "Arrivée chez Majoli (< 1 an d'existence, que des alternants). Développement de sites clients en no-code (Bubble). Premier à sortir du rôle d'intégrateur : déploiements, DNS, petites infras.",
      },
      {
        year: '2024',
        heading: 'Passage au code & gestion de projet',
        body: "Je convaincs le dirigeant de migrer vers du code (MERN) et de recruter. Je rédige les offres, mène les entretiens techniques et encadre les projets. Sites clients complets : Stripe, SEO, 3D, e-commerce.",
      },
      {
        year: '2025',
        heading: 'Prospection industrialisée',
        body: "Après un test 100 % SaaS, je bascule vers le build : ProspectScope automatise la collecte, l'enrichissement et l'envoi. Le manuel laisse place à des pipelines fiables et reproductibles.",
      },
      {
        year: '2026',
        heading: 'Temps réel & référent technique',
        body: "DomainRadar écoute le flux Certificate Transparency et traite ~387 000 domaines/jour. Je suis le seul référent : conception, VPS, observabilité. Le système alimente l'essentiel des nouveaux leads de l'agence.",
      },
    ],
  },
  en: {
    title: 'My Journey',
    subtitle:
      "Three years of work-study at Majoli, a web agency in Marseille. I grew with the company: from a no-code executant to the technical lead on its B2B prospection.",
    metrics: [
      { value: '~387k', label: 'domains processed / day', sub: 'real-time pipeline (DomainRadar)' },
      { value: '100k+', label: 'emails / month', sub: '>3.5% reply rate' },
      { value: '345', label: 'email mailboxes', sub: 'across 115 domains (SPF/DKIM/DMARC)' },
      { value: '~30', label: 'sites shipped', sub: 'core features or deployment' },
    ],
    timeline: [
      {
        year: '2023',
        heading: 'No-code & first clients',
        body: 'Joined Majoli (< 1 year old, only work-study students). Built client sites in no-code (Bubble). First to move beyond integration: deployments, DNS, small infra.',
      },
      {
        year: '2024',
        heading: 'Moving to code & project management',
        body: 'I convinced the founder to migrate to real code (MERN) and to hire. I wrote job posts, ran technical interviews and led projects. Full client sites: Stripe, SEO, 3D, e-commerce.',
      },
      {
        year: '2025',
        heading: 'Industrialized prospection',
        body: 'After a fully-SaaS test, I switched to build: ProspectScope automates collection, enrichment and sending. Manual work gave way to reliable, reproducible pipelines.',
      },
      {
        year: '2026',
        heading: 'Real-time & technical lead',
        body: 'DomainRadar listens to the Certificate Transparency stream and processes ~387,000 domains/day. I am the sole owner: design, VPS, observability. The system feeds most of the agency’s new leads.',
      },
    ],
  },
};

const Experience = ({ language }) => {
  const c = content[language];

  return (
    <section id="experience" className="container mx-auto px-6 py-20 md:py-28">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">{c.title}</h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">{c.subtitle}</p>
      </div>

      {/* Headline metrics */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 max-w-5xl mx-auto mb-16">
        {c.metrics.map((m, i) => (
          <motion.div
            key={m.label}
            className="bg-slate-800/50 border border-slate-700 rounded-xl p-5 text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.5, delay: i * 0.1 }}
          >
            <div className="text-3xl md:text-4xl font-extrabold bg-gradient-to-r from-sky-400 to-cyan-300 bg-clip-text text-transparent">
              {m.value}
            </div>
            <div className="text-sm font-semibold text-gray-200 mt-2">{m.label}</div>
            <div className="text-xs text-gray-500 mt-1">{m.sub}</div>
          </motion.div>
        ))}
      </div>

      {/* Timeline */}
      <div className="max-w-3xl mx-auto relative">
        <div className="absolute left-3 md:left-4 top-2 bottom-2 w-px bg-slate-700" aria-hidden="true" />
        <div className="space-y-8">
          {c.timeline.map((item, i) => (
            <motion.div
              key={item.year}
              className="relative pl-12 md:pl-16"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <div className="absolute left-0 top-1 flex items-center justify-center w-6 h-6 md:w-8 md:h-8 rounded-full bg-sky-500 shadow-lg shadow-sky-500/40 ring-4 ring-gray-900" aria-hidden="true">
                <span className="w-2 h-2 rounded-full bg-white" />
              </div>
              <div className="text-sky-400 font-bold text-lg">{item.year}</div>
              <h3 className="text-xl font-bold text-white mt-1">{item.heading}</h3>
              <p className="text-gray-400 mt-2 leading-relaxed">{item.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
