import propulseImg from '/src/assets/images/ProPulse.png';
import culinariumImg from '/src/assets/images/Culinarium.png';
import ynotImg from '/src/assets/images/YNot.png';

export const projectsData = [
    {
      id: 1,
      slug: 'invoicing-app',
      title: {
        fr: "Application de Facturation Complète",
        en: "Complete Invoicing Application",
      },
      description: {
        fr: "Une application SaaS pour créer et gérer clients, devis et factures, avec authentification et tableau de bord.",
        en: "A SaaS application to create and manage clients, quotes, and invoices, with authentication and a dashboard.",
      },
      image: propulseImg,
      tags: ["React", "Node.js", "Express", "PostgreSQL", "TailwindCSS"],
      link: "/project/invoicing-app",
      githubUrl: "https://github.com/alapierre-ops/facturation",
      liveUrl: null,
      videoUrl: 'https://www.youtube.com/',
      role: {
        fr: "Développeur Full-Stack (Projet Solo)",
        en: "Full-Stack Developer (Solo Project)"
      },
      details: {
        about: {
          fr: "ProPulse est une application SaaS (Software as a Service) que j'ai développée de A à Z pour simplifier la gestion de la facturation pour les freelances et les petites entreprises. L'objectif était de créer un outil intuitif permettant de suivre les clients, de générer des devis professionnels et de les convertir en factures en un seul clic.",
          en: "ProPulse is a SaaS (Software as a a Service) application I developed from scratch to simplify invoice management for freelancers and small businesses. The goal was to create an intuitive tool for tracking clients, generating professional quotes, and converting them into invoices with a single click."
        },
        features: {
          fr: [
            "Authentification sécurisée des utilisateurs avec tokens JWT.",
            "CRUD complet pour les clients, devis et factures.",
            "Tableau de bord avec statistiques clés (chiffre d'affaires, factures en attente).",
            "Conception d'un schéma de base de données relationnelle robuste avec PostgreSQL."
          ],
          en: [
            "Secure user authentication using JWT tokens.",
            "Full CRUD functionality for clients, quotes, and invoices.",
            "Dashboard with key metrics (revenue, pending invoices).",
            "Designed a robust relational database schema with PostgreSQL."
          ]
        },
        problem: {
          fr: "La gestion de la facturation pour les freelances est souvent manuelle, répétitive et source d'erreurs. Perdre du temps sur l'administratif au lieu de se concentrer sur son cœur de métier est un problème majeur.",
          en: "Invoice management for freelancers is often manual, repetitive, and prone to errors. Wasting time on administrative tasks instead of focusing on core business is a major problem."
        },
        solution: {
          fr: "J'ai construit ProPulse, une application SaaS complète, pour automatiser ce processus. La solution offre un CRUD complet pour les clients et les devis, la conversion de devis en factures en un clic, et un tableau de bord pour suivre les finances. L'architecture backend robuste avec Node.js et PostgreSQL assure la sécurité et l'intégrité des données, tandis que l'interface en React offre une expérience utilisateur fluide.",
          en: "I built ProPulse, a complete SaaS application, to automate this process. The solution provides full CRUD for clients and quotes, one-click conversion of quotes to invoices, and a dashboard to track finances. The robust backend architecture with Node.js and PostgreSQL ensures data security and integrity, while the React interface provides a smooth user experience."
        },
        gallery: []
      }
    },
    {
      id: 2,
      slug: "restaurant-culinarium",
      title: {
        fr: "Backend & Archi. d'un Site de Restaurant",
        en: "Backend & Arch. for a Restaurant Website",
      },
      description: {
        fr: "Architecture et développement de toute l'API REST, gestion des réservations, BDD et déploiement.",
        en: "Architecture and development of the entire REST API, reservation management, database, and deployment.",
      },
      image: culinariumImg,
      tags: ["Node.js", "MongoDB", "Docker", "CI/CD", "API REST"],
      link: "/project/restaurant-culinarium",
      githubUrl: null,
      liveUrl: "https://culinarium.majoli.io",
      videoUrl: null,
      role: {
        fr: "Architecte & Développeur Backend Principal",
        en: "Lead Backend Developer & Architect"
      },
      details: {
        about: {
          fr: "Dans le cadre de mon alternance, j'ai été chargé de l'entièreté de l'infrastructure backend pour le site vitrine et de réservation du restaurant 'Culinarium'. L'équipe front-end avait besoin d'une API rapide, fiable et sécurisée pour gérer les réservations en ligne, les menus et le contenu du site.",
          en: "As part of my internship, I was responsible for the entire backend infrastructure for the 'Culinarium' restaurant's showcase and booking website. The front-end team needed a fast, reliable, and secure API to handle online reservations, menus, and site content."
        },
        features: {
          fr: [
            "Conception et développement d'une API REST complète avec Node.js et Express.",
            "Mise en place d'un système de réservation en temps réel.",
            "Conteneurisation de l'application avec Docker pour un déploiement cohérent.",
            "Création d'un pipeline CI/CD pour automatiser les tests et les déploiements."
          ],
          en: [
            "Designed and developed a complete REST API with Node.js and Express.",
            "Implemented a real-time reservation management system.",
            "Containerized the application with Docker for consistent deployment.",
            "Created a CI/CD pipeline to automate testing and deployments."
          ]       
        },
        problem: {
          fr: "Le restaurant 'Culinarium' avait besoin d'une présence en ligne moderne avec un système de réservation fiable et autonome, pour éviter les commissions des plateformes tierces et gérer son flux de clients efficacement.",
          en: "The 'Culinarium' restaurant needed a modern online presence with a reliable and autonomous reservation system to avoid third-party platform fees and manage its customer flow efficiently."
        },
        solution: {
          fr: "J'ai conçu et développé l'intégralité de l'API REST et de l'infrastructure backend. J'ai mis en place un système de réservation en temps réel avec Node.js et MongoDB. Pour garantir la stabilité et faciliter les mises à jour, j'ai conteneurisé l'application avec Docker et mis en place un pipeline CI/CD complet, permettant à l'équipe front-end de travailler en toute confiance.",
          en: "I designed and developed the entire REST API and backend infrastructure. I implemented a real-time reservation system using Node.js and MongoDB. To ensure stability and facilitate updates, I containerized the application with Docker and set up a full CI/CD pipeline, allowing the front-end team to work with confidence."
        },
        gallery: []
      }
    },
    {
      id: 3,
      slug: "twitter-clone",
      title: {
        fr: "Clone de Twitter en 1 Semaine",
        en: "Twitter Clone in 1 Week",
      },
      description: {
        fr: "Défi personnel pour répliquer les fonctionnalités principales de Twitter, incluant les tweets, follows et un fil d'actualité.",
        en: "A personal challenge to replicate Twitter's core features, including tweets, follows, and a news feed.",
      },
      image: ynotImg,
      tags: ["React", "Firebase", "TypeScript", "Chakra UI"],
      link: "/project/twitter-clone",
      githubUrl: "https://github.com/alapierre-ops/twitterClone",
      liveUrl: null,
      videoUrl: 'https://www.youtube.com/',
      role: {
        fr: "Développeur Full-Stack (Défi Personnel)",
        en: "Full-Stack Developer (Personal Challenge)"
      },
      details: {
        about: {
          fr: "YNot est un clone de Twitter développé en une semaine pour tester mes compétences en React, Firebase et TypeScript. L'application permet de publier des tweets, de suivre d'autres utilisateurs et de voir un fil d'actualité en temps réel.",
          en: "YNot is a Twitter clone built in one week to challenge my skills in React, Firebase, and TypeScript. The app allows posting tweets, following other users, and viewing a real-time news feed.",
        },
        features: {
          fr: [
            "Authentification avec Firebase (Google, Email).",
            "Publication, suppression et affichage de tweets en temps réel.",
            "Système de follow/unfollow entre utilisateurs.",
            "Fil d'actualité personnalisé selon les abonnements.",
            "Interface responsive avec Chakra UI.",
          ],
          en: [
            "Authentication with Firebase (Google, Email).",
            "Real-time posting, deleting, and displaying of tweets.",
            "Follow/unfollow system between users.",
            "Personalized news feed based on follows.",
            "Responsive UI with Chakra UI.",
          ],
        },
        problem: {
          fr: "Comment construire une application web complexe et temps-réel de A à Z en un temps record ? Je me suis lancé le défi de cloner les fonctionnalités principales de Twitter en une semaine pour pousser mes compétences en développement rapide, en React et en intégration de services Backend (BaaS) comme Firebase.",
          en: "How to build a complex, real-time web application from scratch in record time? I challenged myself to clone Twitter's core features in one week to push my skills in rapid development, React, and integrating Backend-as-a-Service (BaaS) like Firebase."
        },
        solution: {
          fr: "Le résultat est une application fonctionnelle avec authentification, un fil d'actualité temps-réel, la possibilité de tweeter, suivre et ne plus suivre des utilisateurs. L'utilisation de TypeScript a garanti un code plus robuste et maintenable, et Firebase a permis de gérer la base de données et l'authentification de manière efficace et scalable.",
          en: "The result is a functional application with authentication, a real-time news feed, and the ability to tweet, follow, and unfollow users. Using TypeScript ensured more robust and maintainable code, and Firebase allowed for efficient and scalable database and authentication management."
        },
        gallery: []
      }
    }
  ];