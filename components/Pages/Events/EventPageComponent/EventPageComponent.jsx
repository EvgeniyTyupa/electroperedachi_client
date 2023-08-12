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

import Aos from "aos"
import "aos/dist/aos.css"
import { isValidYoutubeLink } from "../../../../utils/isValidYoutubeLink"
import useWindowDimensions from "../../../../hooks/useWindowDimension"

const EventPageComponent = (props) => {
    const { event, randomPhotos } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const videoRef = useRef(null)
    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const paymentBlockRef = useRef(null)

    const isEnd = event ? moment().startOf("day") > moment(event.date) : true

    const { width } = useWindowDimensions()

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    useEffect(() => {
        let now = moment()

        event.pricing.forEach((el) => {
            if (now >= moment(el.start) && now <= moment(el.end)) {
                setPrice(el.price)
                setIsShowBuy(true)
            }
        })

        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        if (videoRef && videoRef.current) {
            const handleScroll = () => {
                const triggerElement = videoRef.current
                const triggerPosition = triggerElement.getBoundingClientRect()

                if (triggerPosition.y <= width > 548 ? 0 : 348) {
                    setIsPlayVideo(true)
                }
            }
    
            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [videoRef])

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <EventTitle
                    event={event}
                    isEnd={isEnd}
                    price={price}
                    scrollToPayment={scrollToPayment}
                    isShowBuy={isShowBuy}
                />
                {isValidYoutubeLink(event.poster.video) && (
                    <iframe
                        src={`${event.poster.video}?autoplay=${
                            isPlayVideo ? 1 : 0
                        }&mute=1`}
                        ref={videoRef}
                        className={classes.video}
                        data-aos="fade-down"
                        data-aos-duration="2000"
                    />
                )}
                {!isEnd && (
                    <EventAbout
                        event={event}
                        scrollToPayment={scrollToPayment}
                        randomPhotos={randomPhotos}
                    />
                )}
                
                {isEnd && (
                    <>
                        <EventLineUp event={event}/>
                        <EventHowItWas event={event} />
                    </>
                )}
            </Container>
            {!isEnd && isShowBuy && (
                <EventBuyTicket
                    event={event}
                    price={price}
                    setPrice={setPrice}
                    paymentBlockRef={paymentBlockRef}
                />
            )}
        </div>
    )
}

export default EventPageComponent
