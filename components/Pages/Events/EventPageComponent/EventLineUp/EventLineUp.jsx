import classes from "./EventLineUp.module.css"
import EventStageLineUp from "./EventStageLineUp/EventStageLineUp"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const EventLineUp = (props) => {
    const { lineup } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main} data-aos="fade-down" data-aos-duration="2000">
            <h5>LINE UP</h5>
            <div className={classes.wrapper}>
                {lineup.map((el, index) => (
                    <EventStageLineUp
                        lineup={el.djs}
                        key={el.djs[index].name}
                        stageNumber={index + 1}
                    />
                ))}
            </div>
        </div>
    )
}

export default EventLineUp
