import classes from "./EventLineUp.module.css"
import EventStageLineUp from "./EventStageLineUp/EventStageLineUp"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { cx } from "../../../../../utils/classnames"
import { isValidYoutubeLink } from "../../../../../utils/isValidYoutubeLink"

const EventLineUp = (props) => {
    const { event, disableMargin = false } = props

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={cx(
                classes.main,
                isValidYoutubeLink(event.poster.video) ? classes.withVideo : "",
                disableMargin ? classes.disableMargin : ""
            )}
            data-aos="fade-down"
            data-aos-duration="2000"
        >
            <h5>LINE UP</h5>
            <div className={classes.wrapper}>
                {event.lineup.map((el, index) => (
                    <EventStageLineUp
                        lineup={el.djs}
                        key={el.djs[0].name}
                        stageNumber={index + 1}
                    />
                ))}
            </div>
        </div>
    )
}

export default EventLineUp
