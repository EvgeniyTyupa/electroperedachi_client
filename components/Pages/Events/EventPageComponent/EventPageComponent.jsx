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
import { FB_PIXEL } from "../../../../utils/constants"
import { ttqAddToCart } from "../../../../utils/tikTokTracker"
import EventFaq from "./EventAbout/EventFaq/EventFaq"

const EventPageComponent = (props) => {
    const { event, randomPhotos } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const videoRef = useRef(null)
    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const paymentBlockRef = useRef(null)

    const isEnd = event ? moment().startOf("day") > moment(event.dates ? event.dates[event.dates.length - 1].date : event.date) : true

    const { width } = useWindowDimensions()

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const handleAddToCartClick = () => {
        import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
            ReactPixel.init(FB_PIXEL)
            ReactPixel.track("AddToCart")
        })
        ttqAddToCart()
    };

    useEffect(() => {
        const now = moment();

        // flatten all price-windows into one array
        if (event.price) {
            const allWindows = event.price.flatMap(t => t.price);
    
            const matching = allWindows.filter(el =>
                now.isBetween(
                    moment(el.start), 
                    moment(el.end), 
                    null, 
                    '[]'
                )
            );
            
            if (matching.length > 0) {
                const cheapest = matching.reduce((a, b) =>
                  a.price < b.price ? a : b
                );
                setPrice(cheapest.price);
                setIsShowBuy(true);
            } else {
                setIsShowBuy(false);
            }
        }

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

                if(paymentBlockRef && paymentBlockRef.current) {
                    if (paymentBlockRef.current.getBoundingClientRect().top <= 150) {
                        if (!isAddToCartEventSend) {
                            setIsAddToCartEventSend(true)
                        }
                    }
                }
            }
    
            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [videoRef, paymentBlockRef])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

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
                
            </Container>
            <EventAbout
                event={event}
                scrollToPayment={scrollToPayment}
                randomPhotos={randomPhotos}
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
