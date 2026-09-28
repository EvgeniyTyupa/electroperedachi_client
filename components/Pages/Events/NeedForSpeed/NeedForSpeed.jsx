import { useRef } from "react"
import Head from "next/head"
import classes from "./NeedForSpeed.module.css"
import { NeedForSpeedProvider } from "./NeedForSpeedContext"
import { useIsDesktop } from "./lib/useMedia"
import { Hero } from "./sections/Hero"
import { HeroDesktop } from "./sections/desktop/HeroDesktop"
import { Partners } from "./sections/Partners"
import { What } from "./sections/What"
import { WhatDesktop } from "./sections/desktop/WhatDesktop"
import { Location } from "./sections/Location"
import { Ten } from "./sections/Ten"
import { TenDesktop } from "./sections/desktop/TenDesktop"
import { Lineup } from "./sections/Lineup"
import NeedForSpeedForm from "./NeedForSpeedForm/NeedForSpeedForm"
import { RunningLine } from "./sections/RunningLine"
import { FinalCta } from "./sections/FinalCta"
import { FinalDesktop } from "./sections/desktop/FinalDesktop"
import { FaqSection } from "./sections/FaqSection"
import { Footer } from "./sections/Footer"
import { StickyBar } from "./sections/StickyBar"

const NeedForSpeed = ({ event, sales }) => {
    const desktop = useIsDesktop()
    const paymentBlockRef = useRef(null)
    // A component for the existing Pages Router project, just like TechnoFashion.
    if (!event) return null
    const scrollToAnchor = e => {
        const link = e.target.closest('a[href^="#"]')
        if (!link) return
        const target = e.currentTarget.querySelector(link.getAttribute('href'))
        if (!target) return
        e.preventDefault()
        target.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })
    }
    return (
        <NeedForSpeedProvider event={event} sales={sales}>
            <div className={`${classes.main} ${desktop ? classes.desk : ''}`} data-theme="night" onClick={scrollToAnchor}>
                <Head>
                    <link rel="preconnect" href="https://fonts.googleapis.com" />
                    <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
                    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Geologica:slnt,wght,CRSV,SHRP@-12..0,100..900,0..1,0..100&display=swap" />
                </Head>
                <main data-theme="night">
                    {desktop ? <HeroDesktop /> : <Hero />}
                    <Partners desktop={desktop} />
                    {desktop ? <WhatDesktop /> : <What />}
                    {!desktop && <Location />}
                    {desktop ? <TenDesktop /> : <Ten />}
                    {/* {!desktop && <Lineup />} */}
                    <NeedForSpeedForm event={event} desktop={desktop} paymentBlockRef={paymentBlockRef} />
                    {!desktop && <RunningLine variant="a" />}
                    {desktop && <FaqSection />}
                    {desktop ? <FinalDesktop /> : <FinalCta />}
                    {!desktop && <FaqSection />}
                    <RunningLine variant="b" />
                </main>
                {!desktop && <Footer />}
                <StickyBar desktop={desktop} />
            </div>
        </NeedForSpeedProvider>
    )
}
export default NeedForSpeed
