import { useEffect } from "react"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from "./HomeEventsSection.module.css"
import { useIntl } from "react-intl"
import Aos from 'aos';
import 'aos/dist/aos.css';
import EventsCardItem from "../../../Common/Events/EventsCardItem/EventsCardItem"
import NavigateButton from "../../../UI/Buttons/NavigateButton/NavigateButton"
import { routes } from "../../../../utils/routes"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import ActionButton from "../../../UI/Buttons/ActionButton/ActionButton"
import { useRouter } from "next/router"

const HomeEventsSection = (props) => {
    const { events } = props

    const intl = useIntl()

    const router = useRouter()

    const { width } = useWindowDimensions()

    const viewCardCount = width > 1024 ? 0 : ((width <= 1024 && width > 568) ? 2 : 3)

    const cutEvents = events.slice(-viewCardCount, 3).map(el => (
        <EventsCardItem key={el._id} item={el} className={classes.card}/>
    ))

    const onViewMoreClick = () => {
        router.push(routes.events)
    }

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <Container className={classes.main}>
            <div className={classes.header} data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                <Header type="h2">{intl.formatMessage({ id: "events.title" })}</Header>
                <NavigateButton text={intl.formatMessage({ id: "events.viewMore" })} href={routes.events}/>
            </div>
            <div className={classes.eventsWrapper} data-aos="fade-up" data-aos-duration="2000">
                {cutEvents}
            </div>
            <ActionButton className={classes.navigateBut} onClick={onViewMoreClick}>{intl.formatMessage({ id: "events.viewMore" })}</ActionButton>
        </Container>
    )
}

export default HomeEventsSection