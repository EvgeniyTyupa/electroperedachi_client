import Container from "../../../UI/Container/Container"
import EventAbout from "./EventAbout/EventAbout"
import EventBuyTicket from "./EventBuyTicket/EventBuyTicket"
import EventLineUp from "./EventLineUp/EventLineUp"
import classes from "./EventPageComponent.module.css"
import EventTitle from "./EventTitle/EventTitle"
import moment from "moment"
import EventHowItWas from "./EventHowItWas/EventHowItWas"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { isValidYoutubeLink } from "../../../../utils/isValidYoutubeLink"

const EventPageComponent = (props) => {
    const { event } = props

    const [price, setPrice] = useState(0)

    const paymentBlockRef = useRef(null)

    const isEnd = event ? moment() > moment(event.date) : true

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    useEffect(() => {
        let now = moment()

        event.pricing.forEach((el) => {
            if (now >= moment(el.start) && now <= moment(el.end)) {
                setPrice(el.price)
            }
        })

        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <EventTitle
                    event={event}
                    isEnd={isEnd}
                    price={price}
                    scrollToPayment={scrollToPayment}
                />
                {isValidYoutubeLink(event.poster.video) && (
                    <iframe src={event.poster.video} className={classes.video} data-aos="fade-down" data-aos-duration="2000"/>
                )}
                <EventLineUp event={event} />
                {!isEnd && <EventAbout event={event} scrollToPayment={scrollToPayment}/>}
                {isEnd && <EventHowItWas event={event} />}
            </Container>
            {!isEnd && (
                <EventBuyTicket
                    event={event}
                    price={price}
                    paymentBlockRef={paymentBlockRef}
                />
            )}
        </div>
    )
}

export default EventPageComponent
