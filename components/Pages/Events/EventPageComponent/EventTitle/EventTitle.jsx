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

const EventTitle = (props) => {
    const { event, isEnd, price, scrollToPayment } = props

    const { locale } = useRouter()

    const intl = useIntl()

    const dayOfWeek =
        locale === "ua"
            ? moment(event.date).locale("uk").format("ddd")
            : moment(event.date).locale("en").format("ddd")

    const city = locale === "ua" ? event.city : event.city_en

    useEffect(() => {
        Aos.init({ duration: 1000 })
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
                        {intl.formatMessage({ id: "event.upcoming" })}
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
                    className={classes.info}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <div className={cx(classes.infoBlock, classes.date)}>
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
                    <div className={cx(classes.infoBlock, classes.place)}>
                        <h5 className={classes.miniTitle}>
                            {intl.formatMessage({ id: "event.place" })}
                        </h5>
                        <div className={classes.infoData}>
                            <p className={classes.important}>
                                {event.venue}, {city}
                            </p>
                        </div>
                    </div>
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
                    <div className={cx(classes.infoBlock, classes.buy)}>
                        <div className={classes.buyContainer}>
                            <span>{intl.formatMessage({ id: "event.buyTicket" })}</span>
                            <ExploreButton text={intl.formatMessage({ id: "event.buyTicket" })} onClick={scrollToPayment}/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EventTitle
