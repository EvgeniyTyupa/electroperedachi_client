import classes from "./EventHowItWas.module.css"
import useWindowDimensions from "../../../../../hooks/useWindowDimension"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { isValidYoutubeLink } from "../../../../../utils/isValidYoutubeLink"
import Image from "next/image"
import Header from "../../../../UI/Text/Header/Header"
import HozhoSlider from "../../Hozho/Slider/HozhoSlider"
import YoutubeCard from "../../../../Common/YoutubeCard/YoutubeCard"
import Container from "../../../../UI/Container/Container"

const EventHowItWas = (props) => {
    const { event } = props

    const { width } = useWindowDimensions()

    const hasPhoto = Boolean(
        event.howItWas?.content?.find(el => el.photo)
    );

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={classes.main}
            style={{
                backgroundImage: `url(${event.howItWas.backgroundImg})`
            }}
        >
            <Container className={classes.container}>
                <Header type="h2">How it was</Header>
            </Container>
            <HozhoSlider length={event.howItWas?.content?.length} hasPhoto={hasPhoto}>
                {event.howItWas?.content?.map((el, index) => (
                    <div
                        className={classes.sliderEl}
                        key={index}
                    >
                        {el.photo ? (
                            <div className={classes.photo}>
                                <Image fill src={el.photo} alt={el.title ?? "How it Was"}/>
                            </div>
                        ) : (
                            <YoutubeCard
                                src={el.youtubeUrl}
                                title={el.title}
                            />
                        )}
                    </div>
                ))}
            </HozhoSlider>
        </div>
    )
}

export default EventHowItWas
