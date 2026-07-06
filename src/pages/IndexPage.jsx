import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Experience from '../components/Experience'
import { PortfolioChatSection } from '../components/PortfolioChat'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

function IndexPage({ language, setLanguage }) {
    return (
        <div className="bg-gray-900">
            <Header language={language} setLanguage={setLanguage} />
            <Hero language={language} />
            <Experience language={language} />
            <PortfolioChatSection language={language} />
            <Projects language={language} />
            <Skills language={language} />
            <Contact language={language} />
        </div>
    )
}

export default IndexPage
