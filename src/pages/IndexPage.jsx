import React, { useState } from 'react'
import Header from '../components/header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'

function IndexPage() {
    const [language, setLanguage] = useState('fr');
    return (
        <>
            <Header language={language} setLanguage={setLanguage} />
            <Hero language={language} />
            <Projects language={language} />
        </>
    )
}

export default IndexPage