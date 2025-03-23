import { useEffect } from "react"
import { useState } from "react"
import { useIntl } from "react-intl"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import EventsList from "./EventsList/EventsList"
import classes from "./EventsPageComponent.module.css"
import EventsViewModeControls from "./EventsViewModeControls/EventsViewModeControls"
import UpcomingEventsSlider from "./UpcomingEventsSlider/UpcomingEventsSlider"

const EventsPageComponent = (props) => {
    const { events, upcomingEvents } = props

    const intl = useIntl()

    const [filterYear, setFilterYear] = useState("all")

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <Header type="h2">
                    {intl.formatMessage({ id: "events.title" })}
                </Header>
                {upcomingEvents.filter(el => el.title_code !== "spectrum").length > 0 && (
                    <UpcomingEventsSlider events={upcomingEvents.filter(el => el.title_code !== "spectrum")} />
                )}
                <EventsViewModeControls
                    filterYear={filterYear}
                    setFilterYear={setFilterYear}
                />
                
                <EventsList events={events.filter(el => el.title_code !== "spectrum")} filterYear={filterYear} />
            </Container>
        </div>
    )
}

export default EventsPageComponent
