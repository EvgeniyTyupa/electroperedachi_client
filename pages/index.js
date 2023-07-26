import { eventApi, newsApi, partnersApi } from "../api/api"
import HomePageComponent from "../components/Pages/Home/HomePageComponent"
import Head from "next/head"
import SoundCloud from "soundcloud-scraper"

function HomePage(props) {
    const { upcomingEvent, news, events, partners, listeningsCount, script } = props

    return (
        <>
            <Head>
                <title>electroperedachi</title>
                <meta
                    name="description"
                    content="Ukranian Techno Movement | Music Label | Freedom. Equality. Techno. | Join us raver!"
                    key="desc"
                />
                <meta
                    name="keywords"
                    content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label`}
                />
                <meta property="og:image" content="/poster.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
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
    const organization = {
        "@context": "https://schema.org",
        "@type": "Organization",
        name: "electroperedachi",
        description: "electroperedachi - is a Ukrainian techno movement. Our activity includes several processes, including the organisation of unique events in unforgettable locations and the creation of a corresponding atmosphere. Although we have our own residents, we invite other artists, so we will gladly consider your proposals to join future events or book electroperedachi residents. Regarding various collaborations and partnerships, especially promoter proposals, B2B advertising, or placing a cultural product in the art space, contact us.",
        url: "http://electroperedachi.com",
        logo: "/poster.jpg",
        sameAs: [
            "https://www.facebook.com/electroperedachi",
            "https://www.instagram.com/electroperedachi",
            "https://soundcloud.com/electroperedachi",
            "https://www.youtube.com/@electroperedachi",
            "https://t.me/electroperedachi_team"
        ]
    }

    const script = `${JSON.stringify(organization)}`;

    const { upcomingEvents } = await eventApi.getUpcomingEvents()
    const { events } = await eventApi.getEvents(1, 3)
    const { news } = await newsApi.getNews(1, 3, "desc")
    const { partners } = await partnersApi.getPartners(1, 1000)

    const client = new SoundCloud.Client()

    const playlist = await client.getPlaylist(
        "https://soundcloud.com/electroperedachi/sets/electroperedachi-podcasts"
    )

    let listeningsCount = 0

    playlist.tracks.forEach((el) => {
        listeningsCount += Number(el.playCount)
    })

    return {
        props: {
            upcomingEvent: upcomingEvents[0] ? upcomingEvents[0] : null,
            news: news,
            events: events,
            partners: partners,
            listeningsCount: listeningsCount,
            script: script
        },
        revalidate: 10
    }
}

export default HomePage
