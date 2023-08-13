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

const EventTitle = (props) => {
    const { event, isEnd, price, scrollToPayment, isShowBuy } = props

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
            <div
                className={classes.main}
                style={{ backgroundImage: `url(${event.poster.image})` }}
                data-aos="fade"
                data-aos-duration="2000"
            >
                {!isEnd && (
                    <h4 data-aos="fade-down" data-aos-duration="2000">
                        {intl.formatMessage({ id: "event.hook" })}
                    </h4>
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
                                {dayOfWeek},{" "}
                                {moment(event.date).format("DD.MM.YYYY")}
                            </p>
                            {!isEnd && (
                                <span>
                                    {event.start} : {event.end}
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
        </div>
    )
}

export default EventTitle
