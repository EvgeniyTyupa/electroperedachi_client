import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import EventPageComponent from "../../components/Pages/Events/EventPageComponent/EventPageComponent"

const EventPage = (props) => {
    const { event } = props

    const { isFallback } = useRouter()

    if (isFallback) {
        return <Preloader/>
    }

    return (
        <>
            <Head>
                <title>{event.title} | electroperedachi</title>
                <meta name="description" lang="ua" content={event.description}/>
                <meta name="description" lang="en" content={event.description_en}/>
                <met name="keywords" content={`electroperedachi, ${event.keywords}`}/>
                <meta property="og:image" content={event.poster.image}/>
            </Head>
            <EventPageComponent event={event} />
        </>
    )
}

export const getStaticPaths = async ({ locales }) => {
    const { events } = await eventApi.getEvents(1, 1000)

    const paths = []

    events.forEach((event) => {
        for (const locale of locales) {
            paths.push({
                params: { id: event.title_code },
                locale
            })
        }
    })

    return {
        paths: paths,
        fallback: "blocking"
    }
}

export async function getStaticProps(context) {
    const { event } = await eventApi.getEvent(context.params.id)

    if (!event) {
        return {
            notFound: true
        }
    }
    
    return {
        props: {
            event: event
        },
        revalidate: 10
    }
}

export default EventPage
