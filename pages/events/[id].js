import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import EventPageComponent from "../../components/Pages/Events/EventPageComponent/EventPageComponent"

const EventPage = (props) => {
    const { event } = props

    const { locale, isFallback } = useRouter()

    if (isFallback) {
        return <Preloader/>
    }

    const description =
        locale === "ua" ? event.description : event.description_en

    return (
        <>
            <Head>
                <title>{event.title} | electroperedachi</title>
                <meta name="description" content={description}/>
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
        }
    }
}

export default EventPage
