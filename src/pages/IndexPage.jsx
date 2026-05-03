import React from 'react'
import { useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import EntryNoticeModal from '../components/EntryNoticeModal'

function IndexPage({ language, setLanguage }) {
    const [isNoticeOpen, setIsNoticeOpen] = useState(false)

    useEffect(() => {
        const alreadySeenNotice = localStorage.getItem('entry-notice-seen')
        if (!alreadySeenNotice) {
            setIsNoticeOpen(true)
        }
    }, [])

    const closeNotice = () => {
        localStorage.setItem('entry-notice-seen', 'true')
        setIsNoticeOpen(false)
    }

    return (
        <div className="bg-gray-900">
            {isNoticeOpen && <EntryNoticeModal onClose={closeNotice} />}
            <Header language={language} setLanguage={setLanguage} />
            <Hero language={language} />
            <Projects language={language} />
            <Skills language={language} />
            <Contact language={language} />
        </div>
    )
}

export default IndexPage