
import Container from "../../../UI/Container/Container"
import EventAbout from "./EventAbout/EventAbout"
import EventBuyTicket from "./EventBuyTicket/EventBuyTicket"
import EventLineUp from "./EventLineUp/EventLineUp"
import classes from "./EventPageComponent.module.css"
import EventTitle from "./EventTitle/EventTitle"
import moment from "moment"
import EventHowItWas from "./EventHowItWas/EventHowItWas"

const EventPageComponent = (props) => {
    const { event } = props

    const isEnd = event ? moment() > moment(event.date) : true

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <EventTitle event={event} isEnd={isEnd}/>
                <EventLineUp lineup={event.lineup}/>
                {!isEnd && <EventAbout event={event}/>}
                {isEnd && <EventHowItWas event={event}/>}
            </Container>
            {!isEnd && <EventBuyTicket event={event}/>}
        </div>
    )
}

export default EventPageComponent