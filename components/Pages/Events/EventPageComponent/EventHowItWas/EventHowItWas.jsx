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
import gradient_img from "/public/images/gradient.png"
import { useIntl } from "react-intl"

const EventHowItWas = (props) => {
    const { event } = props

    const intl = useIntl()

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
            <img src={gradient_img.src} alt="gradient" className={classes.gradient}/>
            <img src={gradient_img.src} alt="gradient" className={classes.gradient}/>
            <Container className={classes.container}>
                <div className={classes.text}>
                    <Header type="h2">How it was</Header>
                    <p>{intl.formatMessage({ id: "event.howItWasSub" })}</p>
                </div>
            </Container>
            <div className={classes.slider}>
                <HozhoSlider arrows={true} length={event.howItWas?.content?.length} hasPhoto={hasPhoto}>
                    {event.howItWas?.content?.map((el, index) => (
                        <div
                            className={classes.sliderEl}
                            key={index}
                        >
                            {el.photo ? (
                                <div className={classes.photo}>
                                    <Image fill src={el.photo} alt={el.title ? el.title : "How it Was"}/>
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
        </div>
    )
}

export default EventHowItWas
