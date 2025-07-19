import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaNodeJs, FaReact, FaDocker, FaGitAlt, FaHtml5, FaCss3Alt, FaLinux, FaDatabase
} from 'react-icons/fa';
import { 
  SiExpress, SiPostgresql, SiMongodb, SiTypescript, SiJavascript, 
  SiTailwindcss, SiFirebase, SiCplusplus, SiGodotengine, SiNginx 
} from 'react-icons/si';

const skillsData = [
  { name: 'Node.js', icon: <FaNodeJs />, category: 'Backend' },
  { name: 'Express', icon: <SiExpress />, category: 'Backend' },
  { name: 'PostgreSQL', icon: <SiPostgresql />, category: 'Backend' },
  { name: 'MongoDB', icon: <SiMongodb />, category: 'Backend' },
  { name: 'C++', icon: <SiCplusplus />, category: 'Backend' },
    
  { name: 'React', icon: <FaReact />, category: 'Frontend' },
  { name: 'TypeScript', icon: <SiTypescript />, category: 'Frontend' },
  { name: 'JavaScript', icon: <SiJavascript />, category: 'Frontend' },
  { name: 'TailwindCSS', icon: <FaCss3Alt />, category: 'Frontend' },
  { name: 'HTML5', icon: <FaHtml5 />, category: 'Frontend' },

  { name: 'Docker', icon: <FaDocker />, category: 'Architecture & DevOps' },
  { name: 'CI/CD', icon: <FaDatabase />, category: 'Architecture & DevOps' },
  { name: 'REST APIs', icon: <FaDatabase />, category: 'Architecture & DevOps' },
  { name: 'Git', icon: <FaGitAlt />, category: 'Architecture & DevOps' },
  { name: 'Nginx', icon: <SiNginx />, category: 'Architecture & DevOps' },
  { name: 'Linux', icon: <FaLinux />, category: 'Architecture & DevOps' },
    
  { name: 'Firebase', icon: <SiFirebase />, category: 'Outils & Autres' },
  { name: 'Godot', icon: <SiGodotengine />, category: 'Outils & Autres' },
];

const skillCategories = {
  fr: ['Backend', 'Frontend', 'Architecture & DevOps', 'Outils & Autres'],
  en: ['Backend', 'Frontend', 'Architecture & DevOps', 'Tools & Others']
};

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
              ? "Voici les technologies et outils que je maîtrise et que j'utilise fréquemment."
              : "Here are the technologies and tools I master and use frequently."
            }
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          {skillCategories[language].map((category, index) => (
            <div key={category} className="mb-12">
              <h3 className="text-2xl font-bold text-sky-400 mb-6 text-center md:text-left">
                {category}
              </h3>
              <motion.div
                className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6"
                variants={containerVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                {skillsData
                  .filter(skill => skill.category === skillCategories.en[index])
                  .map(skill => (
                    <motion.div
                      key={skill.name}
                      className="group bg-slate-800/50 border border-slate-700 rounded-xl p-4 flex flex-col items-center justify-center gap-3 transition-all duration-300 hover:border-sky-500 hover:bg-slate-800"
                      variants={itemVariants}
                    >
                      <div className="text-5xl text-gray-300 group-hover:text-sky-400 transition-colors duration-300">
                        {skill.icon}
                      </div>
                      <p className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors duration-300">
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