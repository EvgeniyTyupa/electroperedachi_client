import Head from "next/head"
import { useIntl } from "react-intl"
import { eventApi } from "../../api/api"
import EventsPageComponent from "../../components/Pages/Events/EventsPageComponent/EventsPageComponent"

const EventsPage = (props) => {
    const { upcomingEvents, events } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "events.title" })} | electroperedachi</title>
                {/* <meta name="description" content={intl.formatMessage({ id: "news.description" })} key="desc" /> */}
            </Head>
            <EventsPageComponent
                events={events}
                upcomingEvents={upcomingEvents}
            />
        </>
    )
}

export async function getStaticProps() {
    const { upcomingEvents } = await eventApi.getUpcomingEvents()
    const { events } = await eventApi.getEvents(1, 10000)

    return {
        props: {
            upcomingEvents,
            events
        }
    }
}

export default EventsPage
