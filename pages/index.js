import { eventApi, newsApi, partnersApi } from "../api/api"
import HomePageComponent from "../components/Pages/Home/HomePageComponent"
import Head from "next/head"

function HomePage(props) {
    const { upcomingEvent, news, events, partners } = props

    return (
        <>
            <Head>
                <title>electroperedachi</title>
                <meta
                    name="description"
                    content={"Ukrainian electronic music label"}
                    key="desc"
                />
            </Head>
            <HomePageComponent
                upcomingEvent={upcomingEvent}
                news={news}
                events={events}
                partners={partners}
            />
        </>
    )
}

export async function getStaticProps() {
    const { upcomingEvents } = await eventApi.getUpcomingEvents()
    const { events } = await eventApi.getEvents(1, 3)
    const { news } = await newsApi.getNews(1, 3)
    const { partners } = await partnersApi.getPartners(1, 1000)

    return {
        props: {
            upcomingEvent: upcomingEvents[0] ? upcomingEvents[0] : null,
            news: news,
            events: events,
            partners: partners
        },
        revalidate: 10,
    }
}

export default HomePage
