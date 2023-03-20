import { useEffect } from "react"
import { useIntl } from "react-intl"
import UpcomingEventLink from "../../Common/Events/UpcomingEventLink/UpcomingEventLink"
import Container from "../../UI/Container/Container"
import Header from "../../UI/Text/Header/Header"
import classes from "./NotFound.module.css"

import Aos from "aos"
import "aos/dist/aos.css"

import not_found_lines from "/public/images/not_found_lines.svg"
import not_found_title from "/public/images/not_found_title.svg"

const NotFound = (props) => {
    const { upcomingEvent } = props

    const intl = useIntl()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main} data-aos="fade" data-aos-duration="2000">
            <img
                src={not_found_lines.src}
                alt="decor"
                className={classes.lines}
            />
            <Container className={classes.container}>
                <div className={classes.content}>
                    <img
                        src={not_found_title.src}
                        alt="Page Not Found"
                        className={classes.titleImg}
                    />
                    <div className={classes.info}>
                        <p>CLOSED PARTY</p>
                        <p>
                            DATE - <strong>TBA</strong>
                        </p>
                        <p>
                            PLACE - <strong>SECRET</strong>
                        </p>
                        <p>
                            PRICE - <strong>100$</strong>
                        </p>
                    </div>
                    <div className={classes.textBlock}>
                        <p>{intl.formatMessage({ id: "notfound.text1" })}</p>
                        <p>{intl.formatMessage({ id: "notfound.text2" })}</p>
                    </div>
                    <div className={classes.events}>
                        <div data-aos="fade-down" data-aos-duration="2000">
                            <Header type="h2">
                                {intl.formatMessage({ id: "events.title" })}
                            </Header>
                        </div>
                        <div className={classes.eventsWrapper}>
                            <UpcomingEventLink event={upcomingEvent} />
                            <UpcomingEventLink type="all" />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default NotFound
