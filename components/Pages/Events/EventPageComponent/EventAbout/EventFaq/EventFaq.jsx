import AboutLines from "../../../../../UI/Animation/About/AboutLines"
import Header from "../../../../../UI/Text/Header/Header"
import classes from "./EventFaq.module.css"
import FaqItem from "./FaqItem/FaqItem"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import Container from "../../../../../UI/Container/Container"

const EventFaq = (props) => {
    const { event } = props

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={classes.main}
            data-aos="fade-down"
            data-aos-duration="2000"
        >
            {/* <div className={classes.dna_img}>
                <AboutLines />
            </div> */}
            <Container className={classes.container}>
                <Header type="h2">FAQ</Header>
                <div className={classes.wrapper}>
                    {event.faq.map((el) => (
                        <FaqItem key={el.title_en} item={el} />
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default EventFaq
