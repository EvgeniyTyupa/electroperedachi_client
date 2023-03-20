import { useEffect } from "react"
import { useRef } from "react"
import { useIntl } from "react-intl"
import classes from "./UpcomingEventHome.module.css"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import UpcomingEventLink from "../../../Common/Events/UpcomingEventLink/UpcomingEventLink"

import Aos from "aos"
import "aos/dist/aos.css"

import home_back_img from "/public/images/home_back.jpg"
import useWindowDimensions from "../../../../hooks/useWindowDimension"

const UpcomingEventHome = (props) => {
    const { event } = props

    const viewerRef = useRef(null)
    const sceneRef = useRef(null)

    const { width } = useWindowDimensions()

    const intl = useIntl()

    function randomIntFromInterval(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        let halfViewer = viewerRef.current.offsetWidth / 2
        function getCoOrdinates() {
            let x = null
            if (width > 458) {
                x =
                window.screen.width -
                randomIntFromInterval(1, 7) * 200 -
                halfViewer
            } else {
                x =
                window.screen.width -
                randomIntFromInterval(0, 2) * 200 -
                halfViewer
            }

            var y =
                window.screen.height -
                80 -
                randomIntFromInterval(1, 4) * 200 -
                halfViewer
            viewerRef.current.style.transform =
                "translate(" + x + "px," + y + "px)"
            viewerRef.current.style.backgroundPosition =
                -x + "px" + " " + -y + "px"
        }

        const interval = setInterval(() => {
            getCoOrdinates()
        }, 2200)
        return () => clearInterval(interval)
    }, [viewerRef, viewerRef.current, sceneRef, sceneRef.current])

    return (
        <div className={classes.main}>
            <div class={classes.wrap}>
                <div
                    className={classes.scene}
                    ref={sceneRef}
                    style={{
                        background: `url(${home_back_img.src})`
                    }}
                ></div>
                <div
                    className={classes.viewer}
                    ref={viewerRef}
                    style={{
                        background: `url(${home_back_img.src})`
                    }}
                ></div>
            </div>
            <div className={classes.info}>
                <Container className={classes.infoContainer}>
                    <div
                        className={classes.slogan}
                        data-aos="fade-down"
                        data-aos-duration="2000"
                    >
                        <Header
                            type="h1"
                            color="black"
                            className={classes.title}
                        >
                            {intl.formatMessage({ id: "title.freedom" })}.<br />
                            {intl.formatMessage({ id: "title.equality" })}.
                            <br />
                            {intl.formatMessage({ id: "title.techno" })}
                        </Header>
                    </div>
                    {event && <UpcomingEventLink event={event} />}
                </Container>
            </div>
        </div>
    )
}

export default UpcomingEventHome
