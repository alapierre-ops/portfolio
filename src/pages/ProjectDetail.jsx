import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { projectsData } from '../assets/data/projectsData';
import { FaGithub, FaExternalLinkAlt, FaArrowLeft, FaPlayCircle } from 'react-icons/fa';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, A11y, EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/effect-coverflow';


const ProjectDetail = ({ language }) => {
  const { slug } = useParams();
  const project = projectsData.find(p => p.slug === slug);

  if (!project) {
    return (
        <div className="container mx-auto px-6 py-20 text-center">
            <h1 className="text-4xl font-bold text-white mb-4">Projet non trouvé</h1>
            <p className="text-gray-400 mb-8">Désolé, nous n'avons pas pu trouver le projet que vous cherchez.</p>
            <Link
                to="/"
                className="text-sky-400 hover:text-sky-300 transition-colors duration-300 flex items-center justify-center gap-2"
            >
                <FaArrowLeft />
                Retour à l'accueil
            </Link>
        </div>
    );
  }

  const { title, image, tags, githubUrl, liveUrl, videoUrl, role, details } = project;

  return (
    <main className="py-12 md:py-20 min-h-screen bg-gray-900">
      <div className="container mx-auto px-6">
        
        <div className="max-w-7xl mx-auto">
            <Link 
              to="/#projects" 
              className="text-gray-300 hover:text-sky-400 transition-colors duration-300 flex items-center gap-2 mb-8"
            >
              <FaArrowLeft />
              {language === 'fr' ? 'Retour aux projets' : 'Back to projects'}
            </Link>

            <h1 className="text-4xl lg:text-5xl font-extrabold text-white mb-4">{title[language]}</h1>
            <div className="flex flex-wrap gap-2 mb-8">
              {tags.map(tag => (
                <span key={tag} className="bg-sky-700 text-gray-300 text-sm font-semibold px-3 py-1 rounded-full">
                  {tag}
                </span>
              ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12 mt-12">
                <div className="lg:col-span-2">
                    <div className="mb-12 rounded-lg overflow-hidden shadow-2xl shadow-sky-900/50">
                        {videoUrl ? (
                            <div className="aspect-video">
                                <iframe 
                                    className="w-full h-full"
                                    src={videoUrl} 
                                    title={`Vidéo de présentation pour ${title[language]}`}
                                    frameBorder="0" 
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                                    allowFullScreen
                                ></iframe>
                            </div>
                        ) : (
                            <img src={image} alt={`Aperçu du projet ${title[language]}`} className="w-full h-auto object-cover"/>
                        )}
                    </div>
                    
                    <div className="prose prose-invert prose-lg max-w-none">
                        <h2 className="text-3xl font-bold text-white !mb-4">{language === 'fr' ? 'Le Problème' : 'The Problem'}</h2>
                        <p className="text-gray-300">{details.problem[language]}</p>
                        
                        <h2 className="text-3xl font-bold text-white !mb-4 mt-12">{language === 'fr' ? 'Ma Solution' : 'My Solution'}</h2>
                        <p className="text-gray-300">{details.solution[language]}</p>
                    </div>
                </div>

                <div className="lg:col-span-1">
                    <div className="sticky top-24 bg-slate-800/80 backdrop-blur-sm rounded-xl p-6 border border-slate-700">
                        <h3 className="text-xl font-bold text-white mb-4">{language === 'fr' ? 'Mon Rôle' : 'My Role'}</h3>
                        <p className="text-sky-300 font-semibold mb-6">{role[language]}</p>

                        <h3 className="text-xl font-bold text-white mb-4">{language === 'fr' ? 'Actions' : 'Actions'}</h3>
                        <div className="flex flex-col space-y-3">
                            {liveUrl && (
                                <a href={liveUrl} target="_blank" rel="noopener noreferrer" className="bg-sky-500 text-white w-full text-center px-4 py-2 rounded-md font-semibold hover:bg-sky-600 transition-colors duration-300 flex items-center justify-center gap-2">
                                    <FaExternalLinkAlt /> {language === 'fr' ? 'Voir le site' : 'Live Demo'}
                                </a>
                            )}
                            {videoUrl && !liveUrl && (
                                <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="bg-red-500 text-white w-full text-center px-4 py-2 rounded-md font-semibold hover:bg-red-600 transition-colors duration-300 flex items-center justify-center gap-2">
                                    <FaPlayCircle /> {language === 'fr' ? 'Voir la vidéo' : 'Watch Video'}
                                </a>
                            )}
                             {githubUrl && (
                                <a href={githubUrl} target="_blank" rel="noopener noreferrer" className="bg-gray-700 text-gray-200 w-full text-center px-4 py-2 rounded-md font-semibold hover:bg-gray-600 transition-colors duration-300 flex items-center justify-center gap-2">
                                    <FaGithub /> {language === 'fr' ? 'Voir le code' : 'View Code'}
                                </a>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            {details.gallery && details.gallery.length > 0 && (
                <div className="mt-20">
                    <h2 className="text-3xl font-bold text-white text-center mb-8">{language === 'fr' ? 'Galerie' : 'Gallery'}</h2>
                    <Swiper
                        modules={[Navigation, Pagination, A11y, EffectCoverflow]}
                        effect="coverflow"
                        grabCursor={true}
                        centeredSlides={true}
                        slidesPerView={'auto'}
                        coverflowEffect={{
                            rotate: 50,
                            stretch: 0,
                            depth: 100,
                            modifier: 1,
                            slideShadows: true,
                        }}
                        navigation
                        pagination={{ clickable: true }}
                        className="w-full h-full"
                    >
                        {details.gallery.map((imgSrc, index) => (
                            <SwiperSlide key={index} style={{ width: 'auto', maxWidth: '80%' }}>
                                <img src={imgSrc} alt={`Galerie ${index + 1}`} className="rounded-lg shadow-md" />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            )}
        </div>
      </div>
    </main>
  );
};

export default ProjectDetail;