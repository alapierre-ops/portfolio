import React from 'react';
import { projectsData } from '../assets/data/projectsData';
import ProjectCard from './ProjectCard';

const Projects = ({ language }) => {
  const content = {
    fr: {
      title: "Mes Projets",
      subtitle: "Voici une sélection de projets qui démontrent mes compétences et mon expérience.",
    },
    en: {
      title: "My Projects",
      subtitle: "Here is a selection of projects that showcase my skills and experience.",
    },
  };

  return (
    <section id="projects" className="container mx-auto px-6 py-20 md:py-24 bg-gray-900 h-screen">
      <div className="text-center mb-12">
        <h2 className="text-4xl font-extrabold text-white">
          {content[language].title}
        </h2>
        <p className="text-lg text-gray-400 mt-4 max-w-2xl mx-auto">
          {content[language].subtitle}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projectsData.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            language={language} 
          />
        ))}
      </div>
    </section>
  );
};

export default Projects;