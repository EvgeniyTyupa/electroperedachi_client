import { useEffect } from "react"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import Header from "../../components/UI/Text/Header/Header"
import classes from '../../styles/Contacts.module.css'

import Aos from 'aos';
import 'aos/dist/aos.css';
import ContactDna from "../../components/UI/Animation/Contact/ContactDna"
import Head from "next/head"
import HomePartnership from "../../components/Pages/Home/HomePartnership/HomePartnership"
import { useRef } from "react"

const ContactPage = (props) => {
    const { script } = props

    const intl = useIntl()

    const partnershipRef = useRef(null)

    const onParnterMoreClick = () => {
        partnershipRef.current.scrollIntoView()
    }

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])
    
    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "contacts.title" })}</title>
                <meta name="description" content={`${intl.formatMessage({ id: "contacts.text1" })} ${intl.formatMessage({ id: "contacts.text2" })} ${intl.formatMessage({ id: "contacts.text3" })}`}/>
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, contacts`}/>
                <meta property="og:image" content="/poster.jpg" />
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/contacts"
                    key="canonical"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <div className={classes.main}>
                <Container className={classes.container}>
                    <div data-aos="fade-down" data-aos-duration="2000">
                        <Header type="h2">{intl.formatMessage({ id: "contacts.title" })}</Header>
                    </div>
                    <div className={classes.textBlock} data-aos="fade-left" data-aos-duration="2000">
                        <p>{intl.formatMessage({ id: "contacts.text1" })}</p>
                        <p>{intl.formatMessage({ id: "contacts.text2" })}</p>
                        <p>{intl.formatMessage({ id: "contacts.text3" })}</p>
                        <a href="mailto:electroperedachi@gmail.com">electroperedachi@gmail.com</a>
                        <p>{intl.formatMessage({ id: "contacts.text4" })} <span onClick={onParnterMoreClick} className={classes.anchorButt}>{intl.formatMessage({ id: "contacts.text5" })}</span></p>
                    </div>
                </Container>
                <div className={classes.lines}>
                    <ContactDna/>
                </div>
            </div>
            <div ref={partnershipRef}>
                <HomePartnership/>
            </div>
        </>
    )
}

export default ContactPage

export async function getStaticProps(context) {
    const locale = context.locale;

    const schema = {
        "@context": "https://schema.org",
        "@type": "ContactPage",
        "name": "electroperedachi",
        "description": locale === "ua" ? "Контакти" : "Contacts",
        "address": {
          "@type": "PostalAddress",
          "addressCountry": "UA"
        },
        "email": "electroperedachi@gmail.com",
        "url": "https://electroperedachi.com",
        sameAs: [
            "https://www.facebook.com/electroperedachi",
            "https://www.instagram.com/electroperedachi",
            "https://soundcloud.com/electroperedachi",
            "https://www.youtube.com/@electroperedachi",
            "https://t.me/electroperedachi_team"
        ]
    }

    const script = `${JSON.stringify(schema)}`

    return {
        props: {
          script
        }
    }
}