import Image from "next/image"
import { useIntl } from "react-intl"
import Container from "../../UI/Container/Container"
import Header from "../../UI/Text/Header/Header"
import classes from "./AboutPageComponent.module.css"

import team_all from "/public/images/team_all.webp"
import EmployeeList from "./EmployeeList/EmployeeList"

import team from "/public/images/team.webp"
import ExploreButton from "../../UI/Buttons/ExploreButton/ExploreButton"

import Aos from "aos"
import "aos/dist/aos.css"
import { useEffect } from "react"
import { routes } from "../../../utils/routes"
import { cx } from "../../../utils/classnames"
import AboutLines from "../../UI/Animation/About/AboutLines"

const AboutPageComponent = (props) => {
    const { employees } = props

    const intl = useIntl()

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main}>
            <div className={classes.whiteGradient} />
            <Container className={classes.ourTeam}>
                <div data-aos="fade-down" data-aos-duration="2000">
                    <Header type="h2">
                        {intl.formatMessage({ id: "about.title" })}
                    </Header>
                </div>
                <div className={classes.ourTeamInfoBlock}>
                    <div
                        className={classes.ourTeamInfo}
                        data-aos="fade-up"
                        data-aos-duration="2000"
                    >
                        <h3>
                            {intl.formatMessage({ id: "about.subtitle" })}{" "}
                            <strong>electroperedachi</strong>?
                        </h3>
                        <p>{intl.formatMessage({ id: "about.text" })}</p>
                        <div className={classes.about}>
                            <p>
                                <strong>
                                    {intl.formatMessage({
                                        id: "about.goal.title"
                                    })}{" "}
                                </strong>
                                {intl.formatMessage({ id: "about.goal.text" })}
                            </p>
                            <p>
                                <strong>
                                    {intl.formatMessage({
                                        id: "about.mission.title"
                                    })}{" "}
                                </strong>
                                {intl.formatMessage({
                                    id: "about.mission.text"
                                })}
                            </p>
                            <p>
                                <strong>
                                    {intl.formatMessage({
                                        id: "about.model.title"
                                    })}{" "}
                                </strong>
                                {intl.formatMessage({ id: "about.model.text" })}
                            </p>
                        </div>
                    </div>
                    <div
                        className={cx(
                            classes.ourTeamInfo,
                            classes.aboutUsContainerImage
                        )}
                        data-aos="fade-left"
                        data-aos-duration="2000"
                    >
                        <Image src={team_all.src} alt="Team" fill />
                    </div>
                </div>
            </Container>
            <AboutLines />
            <Container className={classes.employees}>
                <EmployeeList employees={employees.filter(el => el.role !== "invited")}/>
                <div className={classes.getDjsBetterContainer}>
                    <Header type="h2">
                        {intl.formatMessage({ id: "about.getDjsBetter" })}
                    </Header>
                    <div className={classes.getDjsBetter}>
                        <img src={team.src} alt="team" />
                        <ExploreButton
                            text={intl.formatMessage({
                                id: "button.showArtists"
                            })}
                            href={`${routes.artists}`}
                            className={classes.showArtistsBut}
                        />
                    </div>
                </div>
            </Container>
        </div>
    )
}

export default AboutPageComponent
