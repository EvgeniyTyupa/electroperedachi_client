import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useIntl } from "react-intl"
import Header from "../../../../UI/Text/Header/Header"
import classes from "./EventAbout.module.css"
import ExploreButton from "../../../../UI/Buttons/ExploreButton/ExploreButton"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect, useState } from "react"
import EventFaq from "./EventFaq/EventFaq"
import { cx } from "../../../../../utils/classnames"
import PhotosFromPastEvents from "../PhotosFromPastEvents/PhotosFromPastEvents"
import HomePartners from "../../../Home/HomePartners/HomePartners"
import EventLineUp from "../EventLineUp/EventLineUp"
import AboutLines from "../../../../UI/Animation/About/AboutLines"
import Container from "../../../../UI/Container/Container"
import HozhoSlider from "../../Hozho/Slider/HozhoSlider"
import YoutubeCard from "../../../../Common/YoutubeCard/YoutubeCard"
import EventHowItWas from "../EventHowItWas/EventHowItWas"
import Image from "next/image"
import PhotoModal from "../../../../Common/PhotoModal/PhotoModal"

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const EventAbout = (props) => {
    const { event, scrollToPayment, randomPhotos } = props

    const [featuredMedia, setFeaturedMedia] = useState([])
    const [currentPhoto, setCurrentPhoto] = useState(null)
    const [modalMedia, setModalMedia] = useState([])

    const { locale } = useRouter()
    const intl = useIntl()

    const description = locale === "ua" ? event.description : event.description_en

    const main_keys = locale === "ua" ? event.main_keys : event.main_keys_en

    const handleClickPhoto = (index, photos) => {
        setModalMedia(photos)
        setCurrentPhoto(index)
    }

    const onClose = () => {
        setModalMedia([])
        setCurrentPhoto(null)
    }

    useEffect(() => {
        const newFeaturedMedia = []

        if (event.lineup[0].stages) {
            event.lineup.forEach((day) => {
                day?.stages.forEach((stage) => {
                    stage?.slots.forEach((slot) => {
                        slot?.djs.forEach((dj) => {
                            if (dj.embed_link) {
                                newFeaturedMedia.push({
                                    url: dj.embed_link,
                                    title: dj.embed_title
                                })
                            }
                        })
                    })
                })
            })
        }

        setFeaturedMedia(newFeaturedMedia)

        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div
            className={classes.main}
            data-aos="fade-down"
            data-aos-duration="2000"
        >
            <EventLineUp
                event={event}
                disableMargin={true}
            />
            {featuredMedia.length > 0 && (
                <div className={classes.featured}>
                    <Container className={classes.container}>
                        <h5>ARTISTS MEDIA</h5>
                    </Container>
                    <HozhoSlider arrows={true} length={featuredMedia.length}>
                        {featuredMedia.map((el, index) => (
                            <div
                                className={classes.sliderEl}
                                key={index}
                            >
                                {el.url?.includes("<iframe") ? (
                                    <div className={classes.spoty} dangerouslySetInnerHTML={{ __html: el.url }}/>
                                ) : (
                                    <YoutubeCard
                                        src={el.url}
                                        title={el.title}
                                    />
                                )}
                            </div>
                        ))}
                    </HozhoSlider>
                </div>
            )}
            <Container className={classes.container}>
                <Header type="h2">{intl.formatMessage({ id: "event.about" })}</Header>
                <div className={classes.textBlock}>
                    <EditerMarkdown
                        source={description}
                        className={cx(classes.markdown, !main_keys ? classes.full : "")}
                        style={{
                            background: "transparent",
                            color: "white",
                            fontFamily: "Helvetica",
                            whiteSpace: "pre-wrap"
                        }}
                    />
                    {main_keys && (
                        <EditerMarkdown
                            source={main_keys}
                            className={classes.markdown}
                            style={{
                                background: "transparent",
                                color: "white",
                                fontFamily: "Helvetica",
                                whiteSpace: "pre-wrap"
                            }}
                        />
                    )}
                </div>
                <div
                    className={classes.buyTicket}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <Header type="h4">{intl.formatMessage({ id: "event.readyBuy" })}</Header>
                    <ExploreButton
                        onClick={scrollToPayment}
                        className={classes.redirectBut}
                        text={intl.formatMessage({
                            id: "button.buyTicket"
                        })}
                    />
                </div>
            </Container>
            {(event.location_scheme && event.location_scheme.length > 0) && (
                <div className={classes.locationScheme}>
                    <Container>
                        <h5>LOCATION SCHEME</h5>
                    </Container>
                    <HozhoSlider arrows={true}>
                        {event.location_scheme.map((el, index) => (
                            <div className={classes.sliderEl}>
                                <div className={classes.locSchemeEl} onClick={() => handleClickPhoto(index, event.location_scheme)}>
                                    <Image src={el} fill/>
                                </div>
                            </div>
                        ))}
                    </HozhoSlider>
                </div>
            )}
            {event.howItWas && (
                <EventHowItWas event={event} />
            )}
        </div>
    )
}

export default EventAbout
