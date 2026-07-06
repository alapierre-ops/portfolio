import domainradarImg from '/src/assets/images/DomainRadar.png';
import prospectscopeImg from '/src/assets/images/ProspectScope.png';
import inhImg from '/src/assets/images/INH.png';
import inhSemrushImg from '/src/assets/images/INH-semrush.png';
import larcheImg from '/src/assets/images/Larche.svg';
import iazurImg from '/src/assets/images/Iazur.svg';
import eisenhowerImg from '/src/assets/images/Eisenhower.png';
import outboundStatsImg from '/src/assets/images/Outbound-stats.png';
import archDomainradar from '/src/assets/images/arch-domainradar.svg';
import archProspectscope from '/src/assets/images/arch-prospectscope.svg';
import propulseImg from '/src/assets/images/ProPulse.png';
import culinariumImg from '/src/assets/images/Culinarium.png';
import ynotImg from '/src/assets/images/YNot.png';
import portfolioDb from './portfolioDb.json';

const imageBySlug = {
  'domainradar': domainradarImg,
  'prospectscope': prospectscopeImg,
  'inh': inhImg,
  'larche': larcheImg,
  'iazur': iazurImg,
  'eisenhower': eisenhowerImg,
  'invoicing-app': propulseImg,
  'twitter-clone': ynotImg,
  'restaurant-culinarium': culinariumImg,
};

// Extra screenshots shown in the project detail gallery (main image excluded).
const galleryBySlug = {
  'inh': [inhSemrushImg],
  'domainradar': [outboundStatsImg],
  'prospectscope': [outboundStatsImg],
};

// Architecture diagrams for the case-study projects.
const archImageBySlug = {
  'domainradar': archDomainradar,
  'prospectscope': archProspectscope,
};

export const projectsData = portfolioDb.projects.map((p) => {
  const details = {
    ...p.details,
    gallery: galleryBySlug[p.slug] || p.details.gallery || [],
  };
  // Inject the architecture image into the case study when present.
  if (details.caseStudy && archImageBySlug[p.slug]) {
    details.caseStudy = {
      ...details.caseStudy,
      architecture: {
        ...details.caseStudy.architecture,
        image: archImageBySlug[p.slug],
      },
    };
  }
  return { ...p, image: imageBySlug[p.slug], details };
});
