import React from 'react';
import { motion } from 'framer-motion';
import {
  FaNodeJs, FaReact, FaDocker, FaGitAlt, FaHtml5, FaLinux, FaDatabase, FaAws,
  FaExchangeAlt, FaInfinity, FaNetworkWired, FaChartLine, FaProjectDiagram,
  FaSpider, FaShieldAlt, FaRobot, FaClock, FaEnvelope
} from 'react-icons/fa';
import {
  SiExpress, SiPostgresql, SiMongodb, SiTypescript, SiJavascript,
  SiTailwindcss, SiFirebase, SiCplusplus, SiGodotengine, SiNginx,
  SiNextdotjs, SiVite, SiSqlite, SiStripe, SiCloudflare
} from 'react-icons/si';

const skillsData = [
  { name: 'Node.js', icon: <FaNodeJs />, category: 'Backend & Data' },
  { name: 'Express', icon: <SiExpress />, category: 'Backend & Data' },
  { name: 'REST APIs', icon: <FaExchangeAlt />, category: 'Backend & Data' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'Backend & Data' },
  { name: 'MongoDB', icon: <SiMongodb />, category: 'Backend & Data' },
  { name: 'SQLite', icon: <SiSqlite />, category: 'Backend & Data' },
  { name: 'C++', icon: <SiCplusplus />, category: 'Backend & Data' },

  { name: 'React', icon: <FaReact />, category: 'Frontend' },
  { name: 'Next.js', icon: <SiNextdotjs />, category: 'Frontend' },
  { name: 'TypeScript', icon: <SiTypescript />, category: 'Frontend' },
  { name: 'JavaScript', icon: <SiJavascript />, category: 'Frontend' },
  { name: 'TailwindCSS', icon: <SiTailwindcss />, category: 'Frontend' },
  { name: 'Vite', icon: <SiVite />, category: 'Frontend' },
  { name: 'HTML5', icon: <FaHtml5 />, category: 'Frontend' },

  { name: 'Docker', icon: <FaDocker />, category: 'Infrastructure & DevOps' },
  { name: 'Linux / VPS', icon: <FaLinux />, category: 'Infrastructure & DevOps' },
  { name: 'AWS', icon: <FaAws />, category: 'Infrastructure & DevOps' },
  { name: 'Nginx', icon: <SiNginx />, category: 'Infrastructure & DevOps' },
  { name: 'DNS / Route 53', icon: <FaNetworkWired />, category: 'Infrastructure & DevOps' },
  { name: 'CI/CD', icon: <FaInfinity />, category: 'Infrastructure & DevOps' },
  { name: 'Git', icon: <FaGitAlt />, category: 'Infrastructure & DevOps' },
  { name: 'Observability', icon: <FaChartLine />, category: 'Infrastructure & DevOps' },

  { name: 'Data Pipelines / ETL', icon: <FaProjectDiagram />, category: 'Data, AI & Automation' },
  { name: 'Web Scraping', icon: <FaSpider />, category: 'Data, AI & Automation' },
  { name: 'Certificate Transparency', icon: <FaShieldAlt />, category: 'Data, AI & Automation' },
  { name: 'LLM / AI (Groq)', icon: <FaRobot />, category: 'Data, AI & Automation' },
  { name: 'Cron / Automation', icon: <FaClock />, category: 'Data, AI & Automation' },

  { name: 'Stripe', icon: <SiStripe />, category: 'Tools & Ecosystem' },
  { name: 'Firebase', icon: <SiFirebase />, category: 'Tools & Ecosystem' },
  { name: 'Cloudflare', icon: <SiCloudflare />, category: 'Tools & Ecosystem' },
  { name: 'SmartLead / HubSpot', icon: <FaEnvelope />, category: 'Tools & Ecosystem' },
  { name: 'Godot', icon: <SiGodotengine />, category: 'Tools & Ecosystem' },
];

const skillCategories = {
  fr: ['Backend & Data', 'Frontend', 'Infrastructure & DevOps', 'Data, IA & Automatisation', 'Outils & Écosystème'],
  en: ['Backend & Data', 'Frontend', 'Infrastructure & DevOps', 'Data, AI & Automation', 'Tools & Ecosystem'],
};

// Canonical category keys (must match skillsData[].category), aligned by index with skillCategories.
const categoryKeys = ['Backend & Data', 'Frontend', 'Infrastructure & DevOps', 'Data, AI & Automation', 'Tools & Ecosystem'];

const Skills = ({ language }) => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: 'spring', stiffness: 100 }
    }
  };

  return (
    <section id="skills" className="py-20 md:py-32">
      <div className="container mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white">
            {language === 'fr' ? 'Mes Compétences Techniques' : 'My Technical Skills'}
          </h2>
          <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
            {language === 'fr'
              ? "Les technologies et outils que j'utilise pour concevoir, déployer et exploiter des systèmes en production."
              : "The technologies and tools I use to design, deploy and operate systems in production."
            }
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {categoryKeys.map((categoryKey, index) => (
            <div key={categoryKey} className="mb-12">
              <h3 className="text-2xl font-bold text-sky-400 mb-6 text-center md:text-left">
                {skillCategories[language][index]}
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {skillsData
                  .filter(skill => skill.category === categoryKey)
                  .map(skill => (
                    <motion.div
                      key={skill.name}
                      className="group bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-sky-500 hover:bg-slate-800"
                      variants={itemVariants}
                    >
                      <div className="text-5xl text-gray-300 group-hover:text-sky-400 transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300 text-center">
                        {skill.name}
                      </p>
                    </motion.div>
                  ))
                }
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
