import classes from "./EventTitle.module.css"

import moment from "moment"
import { useRouter } from "next/router"
import { useIntl } from "react-intl"
import { cx } from "../../../../../utils/classnames"
import { useEffect } from "react"

import Aos from "aos"
import "aos/dist/aos.css"
import Header from "../../../../UI/Text/Header/Header"
import ExploreButton from "../../../../UI/Buttons/ExploreButton/ExploreButton"
import useWindowDimensions from "../../../../../hooks/useWindowDimension"
import { humanizeDates } from "../../../../../utils/humanizeDate"
import Container from "../../../../UI/Container/Container"
import { Button, IconButton } from "@mui/material"
import { RiArrowRightLine } from "react-icons/ri"
import gradient_img from "/public/images/gradient.png"

const EventTitle = (props) => {
    const { event, isEnd, price, scrollToPayment, scrollToMore, isShowBuy } = props

    const { locale } = useRouter()

    const { width } = useWindowDimensions()

    const intl = useIntl()

    const dayOfWeek =
        locale === "ua"
            ? moment(event.date).locale("uk").format("ddd")
            : moment(event.date).locale("en").format("ddd")

    const city = locale === "ua" ? event.city : event.city_en

    useEffect(() => {
        Aos.init({ 
            duration: 1000,
            offset: 200, // Set offset value
            anchorPlacement: 'top-center', // Set anchor placement
        })
    }, [])

    return (
        <div className={classes.body}>
            {/* DESKTOP TMP */}
            <div
                className={classes.main}
                style={{ backgroundImage: `url(${event.poster.image})` }}
            >
                {event.partners && (
                    <div className={classes.partners}>
                        {event.partners.map((el) => (
                            <img key={el.name} src={el.image} alt={`${el.name} partner`} />
                        ))}
                    </div>
                )}
                <div
                    className={classes.title}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <Header type="h2">{event.title}</Header>
                </div>
                <div
                    className={cx(width < 1024 ? classes.removeBlur : classes.info)}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <div className={cx(classes.infoBlock, classes.date, isEnd ? classes.endEvent : undefined)}>
                        <h5 className={classes.miniTitle}>
                            {intl.formatMessage({ id: "event.date" })}
                        </h5>
                        <div className={classes.infoData}>
                            <p className={classes.important}>
                                {humanizeDates(event.dates ? event.dates : event.date)}
                            </p>
                            {!isEnd && (
                                <span>
                                    {event.dates ? event.dates[0].start : event.start} : {event.dates ? event.dates[0].end : event.end}
                                </span>
                            )}
                        </div>
                    </div>
                    <div className={cx(classes.infoBlock, classes.place, isEnd ? classes.endEvent : undefined)}>
                        <h5 className={classes.miniTitle}>
                            {intl.formatMessage({ id: "event.place" })}
                        </h5>
                        <div className={classes.infoData}>
                            <a rel="noopener noreferrer" href={`https://www.google.com/maps/search/${encodeURIComponent(`${event.venue ? (`${event.venue.trim()},`) : ""} ${city}`)}`} target={"_blank"}>
                                <p className={classes.important}>
                                    {event.venue ? (`${event.venue.trim()},`) : ""} {city}
                                </p>
                            </a>
                        </div>
                    </div>
                    {(!isEnd && isShowBuy) && (
                        <div className={classes.infoBlock}>
                            <h5 className={classes.miniTitle}>
                                {intl.formatMessage({ id: "event.price" })}
                            </h5>
                            <div className={classes.infoData}>
                                <p className={classes.important}>
                                    {price} {intl.formatMessage({ id: "event.currency" })}
                                </p>
                            </div>
                        </div>
                    )}
                    {(!isEnd && isShowBuy) && (
                        <div className={cx(classes.infoBlock, classes.buy)}>
                            <div className={classes.buyContainer}>
                                <span>{intl.formatMessage({ id: "event.buyTicket" })}</span>
                                <ExploreButton
                                    text={intl.formatMessage({ id: "event.buyTicket" })}
                                    onClick={scrollToPayment}
                                    className={classes.animatedBut}
                                />
                            </div>
                        </div>
                    )}
                </div>
            </div>

            {/* NEW MOBILE */}
            <div className={classes.mobile}>
                <video
                    className={classes.video}
                    src="/video/title.webm"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <img src={gradient_img.src} alt="gradient" className={classes.gradient}/>
                <Container className={classes.container}>
                    {event.partners && (
                        <div className={classes.partners}>
                            {event.partners.map((el) => (
                                <img key={el.name} src={el.image} alt={`${el.name} partner`} />
                            ))}
                        </div>
                    )}
                    <div className={classes.eventInfo}>
                        <div className={classes.dates}>
                            {event.dates ? event.dates.map((el, index) => (
                                <p>{moment(el.date).format("DD.MM")}{index < event.dates.length - 1 ? "," : ""}&nbsp;</p>
                            )) : <p>{event.date}</p>}
                        </div>
                        <h1>{event.title}</h1>
                        <h3>{event.venue ? (`${event.venue.trim()}`) : ""}</h3>
                    </div>
                    <div className={classes.footer}>
                        <div className={classes.buyTicket}>
                            {/* <p></p> */}
                            <Button
                                className={classes.buyButt}
                                onClick={scrollToPayment}
                            >
                                {intl.formatMessage({ id: "event.buyTicket" })}
                            </Button>
                        </div>
                        <div className={classes.more} onClick={scrollToMore}>
                            <p>{intl.formatMessage({ id: "button.readMore" })}</p>
                            <RiArrowRightLine />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    )
}

export default EventTitle
