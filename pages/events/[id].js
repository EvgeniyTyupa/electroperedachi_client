import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import EventPageComponent from "../../components/Pages/Events/EventPageComponent/EventPageComponent"
import moment from "moment"

const EventPage = (props) => {
    const { event, script } = props

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
                <meta name="keywords" content={`electroperedachi, ${event.keywords}`}/>
                <meta property="og:image" content={event.poster.image}/>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
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
    const locale = context.locale;

    const { event } = await eventApi.getEvent(context.params.id)

    if (!event) {
        return {
            notFound: true
        }
    }
    
    const nextDay = new Date(event.date);
    nextDay.setDate(nextDay.getDate() + 1);

    let now = moment()

    let currentPrice = 0

    event.pricing.forEach((el) => {
        if (now >= moment(el.start) && now <= moment(el.end)) {
            currentPrice = el.price
        }
    })

    const event_json_info = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "startDate": event.date,
        "endDate": nextDay.toISOString(),
        "location": {
            "@type": "Place",
            "name": event.venue,
            "address": {
                "@type": "PostalAddress",
                "streetAddress": locale === "ua" ? event.address : event.address_en,
                "addressLocality": locale === "ua" ? event.city : event.city_en,
                "addressCountry": "UA"
            }
        },
        "image": event.poster.image,
        "description": locale === "ua" ? event.description : event.description_en,
        "offers": {
            "@type": "Offer",
            "url": `https://electroperedachi.com/events/${event.title_code}`,
            "price": currentPrice,
            "priceCurrency": "UAH",
            "availability": "https://schema.org/InStock",
        },
        "inLanguage": locale
    }

    const script = `${JSON.stringify(event_json_info)}`;

    return {
        props: {
            event: event,
            script
        },
        revalidate: 10
    }
}

export default EventPage
