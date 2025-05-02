import classes from "./EventLineUp.module.css"
import EventStageLineUp from "./EventStageLineUp/EventStageLineUp"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { cx } from "../../../../../utils/classnames"
import { isValidYoutubeLink } from "../../../../../utils/isValidYoutubeLink"
import EventDayAndStageLineUp from "./EventDayAndStageLineUp/EventDayAndStageLineUp"
import AboutLines from "../../../../UI/Animation/About/AboutLines"
import Container from "../../../../UI/Container/Container"

const EventLineUp = (props) => {
    const { event, disableMargin = false } = props

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={cx(classes.main)}
            data-aos="fade-down"
            data-aos-duration="2000"
        >
            <Container className={classes.container}>
                <h5>LINE UP</h5>
                <div className={classes.wrapper}>
                    {event.lineup[0]?.djs && (
                        event.lineup.map((el, index) => (
                            <EventStageLineUp
                                lineup={el.djs}
                                key={el.djs[0].name}
                                stageNumber={index + 1}
                            />
                        ))
                    )}
                    {event.lineup[0]?.stages && (
                        <>
                            <div className={classes.newLineUp}>
                                {event.lineup.map((el, index) => (
                                    <EventDayAndStageLineUp
                                        key={index}
                                        day={el}
                                        index={index}
                                        event={event}
                                    />
                                ))}
                            </div>
                        </>
                    )}
                </div>
            </Container>
            <div className={classes.lines}>
                <AboutLines/>
            </div>
            <div className={classes.lines2}>
                <AboutLines/>
            </div>
        </div>
    )
}

export default EventLineUp
