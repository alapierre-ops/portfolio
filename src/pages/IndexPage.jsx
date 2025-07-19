import React from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'

function IndexPage({ language, setLanguage }) {
    return (
        <div className="bg-indigo-950/30">
            <Header language={language} setLanguage={setLanguage} />
            <Hero language={language} />
            <Projects language={language} />
            <Skills language={language} />
            <Contact language={language} />
        </div>
    )
}

export default IndexPage