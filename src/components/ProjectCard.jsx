import React from 'react';
import { motion } from 'framer-motion';

const ProjectCard = ({ project, language }) => {
  return (
    <motion.a 
      href={project.link}
      className="group block rounded-xl overflow-hidden bg-gray-800/50 shadow-lg hover:shadow-sky-400/20 transition-all duration-300"
      whileHover={{ y: -8 }}
      transition={{ type: 'spring', stiffness: 300 }}
    >
      <div className="overflow-hidden">
        <img 
          src={project.image} 
          alt={`Image du projet ${project.title[language]}`}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
      </div>

      <div className="p-6">
        <h3 className="text-xl font-bold text-white mb-2">
          {project.title[language]}
        </h3>
        <p className="text-gray-400 text-sm mb-4">
          {project.description[language]}
        </p>

        <div className="flex flex-wrap gap-2">
          {project.tags.map((tag) => (
            <span key={tag} className="bg-sky-900/70 text-sky-300 text-xs font-semibold px-2.5 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </motion.a>
  );
};

export default ProjectCard;