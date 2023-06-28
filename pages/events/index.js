import Head from "next/head"
import { useIntl } from "react-intl"
import { eventApi } from "../../api/api"
import EventsPageComponent from "../../components/Pages/Events/EventsPageComponent/EventsPageComponent"

const EventsPage = (props) => {
    const { upcomingEvents, events, script } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "events.title" })} | electroperedachi</title>
                <meta name="description" content={"events"} key="desc" />
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, events`}/>
                <meta property="og:image" content="/poster.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <EventsPageComponent
                events={events}
                upcomingEvents={upcomingEvents}
            />
        </>
    )
}

export async function getStaticProps(context) {
    const locale = context.locale;

    const { upcomingEvents } = await eventApi.getUpcomingEvents()
    const { events } = await eventApi.getEvents(1, 10000)

    const events_json_info = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Events",
        "description": "Browse a collection of events",
        "itemsListElement": events.map(el => (
            {
                "@type": "Event",
                "name": el.title,
                "startDate": el.date,
                "endDate": el.date,
                "location": {
                    "@type": "Place",
                    "name": el.venue,
                    "address": {
                        "@type": "PostalAddress",
                        "streetAddress": locale === "ua" ? el.address : el.address_en,
                        "addressLocality": locale === "ua" ? el.city : el.city_en,
                        "addressCountry": "UA"
                    }
                },
                "image": el.poster.image,
                "description": locale === "ua" ? el.description : el.description_en,
                "inLanguage": locale
            }
        ))
    }

    const script = `${JSON.stringify(events_json_info)}`;

    return {
        props: {
            upcomingEvents,
            events,
            script
        },
        revalidate: 10
    }
}

export default EventsPage
