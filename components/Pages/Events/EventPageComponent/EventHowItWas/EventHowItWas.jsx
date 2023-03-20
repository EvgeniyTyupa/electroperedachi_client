import classes from "./EventHowItWas.module.css"
import Masonry from "@mui/lab/Masonry"
import { useIntl } from "react-intl"
import useWindowDimensions from "../../../../../hooks/useWindowDimension"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"

const EventHowItWas = (props) => {
    const { event } = props

    const intl = useIntl()

    const { width } = useWindowDimensions()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main}>
            {event.how_it_was.video && (
                <div
                    className={classes.videoSection}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h5>
                        {intl.formatMessage({ id: "event.how_it_was.video" })}
                    </h5>
                    <div className={classes.video}>
                        <iframe src={event.how_it_was.video} />
                    </div>
                </div>
            )}
            {event.how_it_was.photos && (
                <div
                    className={classes.photosSection}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h5>
                        {intl.formatMessage({ id: "event.how_it_was.photos" })}
                    </h5>
                    <div className={classes.photos}>
                        <Masonry columns={width > 568 ? 3 : 2} spacing={2}>
                            {event.how_it_was.photos.map((el) => (
                                <img
                                    src={el}
                                    alt={`electroperedachi ${event.title} photo`}
                                />
                            ))}
                        </Masonry>
                    </div>
                </div>
            )}
        </div>
    )
}

export default EventHowItWas
