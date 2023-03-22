import Image from "next/image"
import { useIntl } from "react-intl"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from './HomePartners.module.css'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import useWindowDimensions from "../../../../hooks/useWindowDimension"

const HomePartners = (props) => {
    const { partners } = props

    const intl = useIntl()

    const { width } = useWindowDimensions()

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <Container className={classes.main}>
            <div data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                <Header type="h2">{intl.formatMessage({ id: "partners.title" })}</Header>
            </div>
            <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                {partners.map(el => (
                    <a key={el.url} href={el.url} target="_blank" rel="noopener noreferrer">
                        <img src={el.image} alt={`${el.name} partner`}/>
                    </a>
                ))}
            </div>
        </Container>
    )
}

export default HomePartners