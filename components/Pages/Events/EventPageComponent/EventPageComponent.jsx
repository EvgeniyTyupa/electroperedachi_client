import Container from "../../../UI/Container/Container"
import EventAbout from "./EventAbout/EventAbout"
import EventBuyTicket from "./EventBuyTicket/EventBuyTicket"
import classes from "./EventPageComponent.module.css"
import EventTitle from "./EventTitle/EventTitle"
import moment from "moment"
import { useEffect } from "react"
import { useState } from "react"
import { useRef } from "react"

import Aos from "aos"
import "aos/dist/aos.css"
import { isValidYoutubeLink } from "../../../../utils/isValidYoutubeLink"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"
import { ttqAddToCart } from "../../../../utils/tikTokTracker"
import EventFaq from "./EventAbout/EventFaq/EventFaq"
import { Button } from "@mui/material"

const EventPageComponent = (props) => {
    const { event, randomPhotos } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const [isShowBuyButt, setIsShowButt] = useState(false)

    const videoRef = useRef(null)
    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const paymentBlockRef = useRef(null)

    const moreBlockRef = useRef(null)

    const isEnd = event
        ? moment().startOf("day") > moment(event.dates ? event.dates[event.dates.length - 1].date : event.date)
        : true

    const { width } = useWindowDimensions()

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const scrollToMore = () => {
        moreBlockRef.current.scrollIntoView()
    }

    const handleAddToCartClick = () => {
        import("react-facebook-pixel")
            .then((module) => module.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL)
                ReactPixel.track("AddToCart")
            })
        import('tiktok-pixel')
            .then(module => module.default)
            .then(TiktokPixel => {
                TiktokPixel.init(TIKTOK_PIXEL)
                TiktokPixel.track("AddToCart")
            })
    }

    useEffect(() => {
        const now = moment()

        // flatten all price-windows into one array
        if (event.price) {
            const allWindows = event.price.flatMap((t) => t.price)

            const matching = allWindows.filter((el) => now.isBetween(moment(el.start), moment(el.end), null, "[]"))

            if (matching.length > 0) {
                const cheapest = matching.reduce((a, b) => (a.price < b.price ? a : b))
                setPrice(cheapest.price)
                setIsShowBuy(true)
            } else {
                setIsShowBuy(false)
            }
        }

        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
            // Video
            if (videoRef.current) {
                const { y } = videoRef.current.getBoundingClientRect()
                if (y <= (width > 548 ? 0 : 348)) {
                    setIsPlayVideo(true)
                }
            }

            // Payment block
            if (paymentBlockRef.current) {
                const { y } = paymentBlockRef.current.getBoundingClientRect()
                if (y <= 880 || y >= 4900) {
                    setIsShowButt(false)
                    setIsAddToCartEventSend(true)
                } else {
                    setIsShowButt(true)
                }
            }
        }
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [videoRef, paymentBlockRef])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                {isShowBuyButt && (
                    <Button
                        onClick={scrollToPayment}
                        className={classes.buyTicketMob}
                    >
                        Buy Ticket
                    </Button>
                )}
                <EventTitle
                    event={event}
                    isEnd={isEnd}
                    price={price}
                    scrollToPayment={scrollToPayment}
                    isShowBuy={isShowBuy}
                    scrollToMore={scrollToMore}
                />
                {isValidYoutubeLink(event.poster.video) && (
                    <iframe
                        src={`${event.poster.video}?autoplay=${isPlayVideo ? 1 : 0}&mute=1`}
                        ref={videoRef}
                        className={classes.video}
                        data-aos="fade-down"
                        data-aos-duration="2000"
                    />
                )}
            </Container>
            <EventAbout
                event={event}
                scrollToPayment={scrollToPayment}
                randomPhotos={randomPhotos}
                moreBlockRef={moreBlockRef}
            />
            {!isEnd && isShowBuy && (
                <EventBuyTicket
                    event={event}
                    price={price}
                    setPrice={setPrice}
                    paymentBlockRef={paymentBlockRef}
                />
            )}
            {event.faq && event.faq.length > 0 && <EventFaq event={event} />}
        </div>
    )
}

export default EventPageComponent
