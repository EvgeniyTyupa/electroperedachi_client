import Masonry from "@mui/lab/Masonry"
import Image from "next/image"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import useWindowDimensions from "../../../../../hooks/useWindowDimension"
import classes from "./PhotosFromPastEvents.module.css"

import Aos from 'aos';
import 'aos/dist/aos.css';

const PhotosFromPastEvents = (props) => {
    const { photos } = props

    const intl = useIntl()

    const { width } = useWindowDimensions()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={classes.photosSection}
            data-aos="fade-down"
            data-aos-duration="2000"
        >
            <h5>{intl.formatMessage({ id: "event.how_it_was.photos" })}</h5>
            <div className={classes.photos}>
                <Masonry columns={width > 568 ? 3 : 2} spacing={2}>
                    {photos.map((el) => (
                        <div key={el}>
                            <Image
                                src={el}
                                alt={`photo from past`}
                                layout="responsive"
                                width={300}
                                height={200}
                            />
                        </div>
                    ))}
                </Masonry>
            </div>
        </div>
    )
}

export default PhotosFromPastEvents
