import { eventApi, newsApi, partnersApi } from "../api/api"
import HomePageComponent from "../components/Pages/Home/HomePageComponent"
import Head from "next/head"
import SoundCloud from "soundcloud-scraper"

function HomePage(props) {
    const { upcomingEvent, news, events, partners, listeningsCount } = props

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
                listeningsCount={listeningsCount}
            />
        </>
    )
}

export async function getStaticProps() {
    const { upcomingEvents } = await eventApi.getUpcomingEvents()
    const { events } = await eventApi.getEvents(1, 3)
    const { news } = await newsApi.getNews(1, 3)
    const { partners } = await partnersApi.getPartners(1, 1000)

    const client = new SoundCloud.Client();

    const playlist = await client.getPlaylist("https://soundcloud.com/electroperedachi/sets/electroperedachi-podcasts")

    let listeningsCount = 0

    playlist.tracks.forEach(el => {
        listeningsCount += Number(el.playCount)
    })

    return {
        props: {
            upcomingEvent: upcomingEvents[0] ? upcomingEvents[0] : null,
            news: news,
            events: events,
            partners: partners,
            listeningsCount: listeningsCount
        },
        revalidate: 10,
    }
}

export default HomePage
