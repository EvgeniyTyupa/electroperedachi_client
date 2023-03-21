import { useEffect } from "react"
import { useIntl } from "react-intl"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from "./HomeBookArtist.module.css"

import team from "/public/images/team.webp"

import Aos from "aos"
import "aos/dist/aos.css"
import ExploreButton from "../../../UI/Buttons/ExploreButton/ExploreButton"
import { routes } from "../../../../utils/routes"

const HomeBookArtist = (props) => {
    const intl = useIntl()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <Container className={classes.main}>
            <div data-aos="fade-down" data-aos-duration="2000">
                <Header type="h2">
                    {intl.formatMessage({ id: "bookYourArtist" })}
                </Header>
            </div>
            {/* <div className={classes.whiteGradient} /> */}
            <div className={classes.book}>
                <img
                    className={classes.teamImage}
                    src={team.src}
                    alt="team"
                    data-aos="zoom-out"
                    data-aos-duration="2000"
                />
                <div
                    className={classes.butContainer}
                    data-aos="zoom-in"
                    data-aos-duration="2000"
                >
                    <ExploreButton
                        href={`${routes.artists}`}
                        className={classes.redirectBut}
                        text={intl.formatMessage({
                            id: "bookYourArtist.showArtists"
                        })}
                    />
                </div>
            </div>
        </Container>
    )
}

export default HomeBookArtist
