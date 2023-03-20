import { useEffect } from "react"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import Header from "../../components/UI/Text/Header/Header"
import classes from '../../styles/Contacts.module.css'
import { motion } from "framer-motion"

import Aos from 'aos';
import 'aos/dist/aos.css';
import ContactDna from "../../components/UI/Animation/Contact/ContactDna"
import Head from "next/head"

const ContactPage = () => {
    const intl = useIntl()

    const variants = {
        in: {
            opacity: 0,
            transition: {
              duration: 2,
              ease: 'easeInOut'
            }
        },
        inactive: {
            opacity: 1,
            transition: {
              duration: 2,
              ease: 'easeInOut'
            },
        },
        out: {
            opacity: 0,
            transition: {
              duration: 0.5,
              ease: 'easeInOut'
            }
        }
    }

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])
    

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "contacts.title" })} | electroperedachi</title>
                <meta name="description" content={`${intl.formatMessage({ id: "contacts.text1" })} ${intl.formatMessage({ id: "contacts.text2" })} ${intl.formatMessage({ id: "contacts.text3" })}`}/>
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
                    </div>
                </Container>
                <div className={classes.lines}>
                    <ContactDna/>
                </div>
            </div>
        </>
    )
}

export default ContactPage