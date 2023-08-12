import classes from "./EventHowItWas.module.css"
import Masonry from "@mui/lab/Masonry"
import { useIntl } from "react-intl"
import useWindowDimensions from "../../../../../hooks/useWindowDimension"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import RedirectToAlbum from "./RedirectToAlbum/RedirectToAlbum"
import { isValidYoutubeLink } from "../../../../../utils/isValidYoutubeLink"
import Image from "next/image"

const EventHowItWas = (props) => {
    const { event } = props

    const intl = useIntl()

    const { width } = useWindowDimensions()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main}>
            {(event.how_it_was && isValidYoutubeLink(event.how_it_was.video)) && (
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
            {((event.how_it_was && event.how_it_was.photos.length) > 0 ||
                (event.how_it_was && event.how_it_was.fullAlbumPhotosUrl)) && (
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
                            {event.how_it_was.photos.map(el => (
                                <div key={el}>
                                    <Image
                                        src={el}
                                        alt={`electroperedachi ${event.title} photo`}
                                        layout="responsive"
                                        width={300}
                                        height={200}
                                    />
                                </div>
                            ))}
                        </Masonry>
                    </div>
                    {event.how_it_was.fullAlbumPhotosUrl && (
                        <RedirectToAlbum albumUrl={event.how_it_was.fullAlbumPhotosUrl}/>
                    )}
                </div>
            )}
        </div>
    )
}

export default EventHowItWas
