import { eventApi } from "../api/api"
import NotFound from "../components/Pages/NotFound/NotFound"

function NotFoundPage(props) {
    const { upcomingEvent } = props

    return <NotFound upcomingEvent={upcomingEvent}/>
}

export async function getStaticProps() {
    const { upcomingEvents } = await eventApi.getUpcomingEvents()

    return {
        props: {
            upcomingEvent: upcomingEvents[0] ? upcomingEvents[0] : null,
        },
        revalidate: 1800
    }
}

export default NotFoundPage
