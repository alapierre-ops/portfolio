import React from 'react'
import { useCallback, useEffect, useState } from 'react'
import Header from '../components/Header'
import Hero from '../components/Hero'
import Projects from '../components/Projects'
import Skills from '../components/Skills'
import Contact from '../components/Contact'
import EntryNoticeModal from '../components/EntryNoticeModal'
import { ServerNarrativeCanvas } from '../scene/ServerNarrativeCanvas'

function IndexPage({ language, setLanguage, isClassicMode, setIsClassicMode }) {
    const [isNoticeOpen, setIsNoticeOpen] = useState(false)

    useEffect(() => {
        const alreadySeenNotice = localStorage.getItem('entry-notice-seen')
        if (!alreadySeenNotice) {
            setIsNoticeOpen(true)
        }
    }, [])

    useEffect(() => {
        if (!isClassicMode) {
            document.body.style.overflow = 'hidden'
        } else {
            document.body.style.overflow = ''
        }
        return () => {
            document.body.style.overflow = ''
        }
    }, [isClassicMode])

    const closeNotice = () => {
        localStorage.setItem('entry-notice-seen', 'true')
        setIsNoticeOpen(false)
    }

    const openClassicPortfolio = useCallback((hash) => {
        setIsClassicMode(true)
        if (typeof hash !== 'string' || !hash) return
        requestAnimationFrame(() => {
            document.querySelector(hash)?.scrollIntoView({ behavior: 'smooth' })
        })
    }, [setIsClassicMode])

    return (
        <div className="min-h-dvh bg-gray-900 relative">
            {isNoticeOpen && <EntryNoticeModal onClose={closeNotice} />}
            <Header
                language={language}
                setLanguage={setLanguage}
                immersiveToggle={{
                    isClassicMode,
                    setIsClassicMode,
                }}
            />
            {!isClassicMode ? (
                <div className="fixed inset-0 z-0 h-dvh w-screen">
                    <ServerNarrativeCanvas language={language} openClassicPortfolio={openClassicPortfolio} />
                </div>
            ) : (
                <main className="relative z-10 pt-[5.25rem]">
                    <Hero language={language} />
                    <Projects language={language} />
                    <Skills language={language} />
                    <Contact language={language} />
                </main>
            )}
        </div>
    )
}

export default IndexPage
