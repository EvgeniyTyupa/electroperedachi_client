import { routes } from "../../../../utils/routes"
import ExploreButton from "../../../UI/Buttons/ExploreButton/ExploreButton"
import Header from "../../../UI/Text/Header/Header"
import classes from "./UpcomingEventLink.module.css"
import moment from "moment"
import { useIntl } from "react-intl"
import { useEffect } from "react"

import Aos from "aos"
import "aos/dist/aos.css"

const UpcomingEventLink = (props) => {
    const { event, type = "upcoming" } = props

    const intl = useIntl()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.event}>
            <div
                className={classes.eventInfoContainer}
                data-aos="fade-down"
                data-aos-duration="2000"
            >
                <Header type="h4">
                    {type === "upcoming"
                        ? intl.formatMessage({ id: "title.upcoming.title" })
                        : intl.formatMessage({ id: "notfound.allEvents" })}
                </Header>
                <div className={classes.eventInfo}>
                    {type === "upcoming" ? (
                        <p>
                            {event.title} /{" "}
                            {moment(event.date).format("DD.MM.YYYY")} /{" "}
                            {event.address}
                        </p>
                    ) : (
                        <p>
                            {intl.formatMessage({
                                id: "notfound.viewMoreEvents"
                            })}
                        </p>
                    )}
                </div>
            </div>
            <div data-aos="fade-left" data-aos-duration="2000">
                <ExploreButton
                    href={
                        type === "upcoming"
                            ? `${routes.events}/${event.title_code}`
                            : `${routes.events}`
                    }
                    className={classes.redirectBut}
                />
            </div>
        </div>
    )
}

export default UpcomingEventLink
