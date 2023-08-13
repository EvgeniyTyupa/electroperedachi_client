import Head from "next/head"
import { useIntl } from "react-intl"
import { eventApi } from "../../api/api"
import EventsPageComponent from "../../components/Pages/Events/EventsPageComponent/EventsPageComponent"
import moment from "moment"

const EventsPage = (props) => {
    const { upcomingEvents, events, script, lang } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "events.title" })}</title>
                <meta property="og:title" content={`${intl.formatMessage({ id: "events.title" })}`} key="title" />
                <meta
                    name="description"
                    content={lang === "ua" ?
                        "Запрошуємо подивитись на наші минулі події та події, які ми готуємо для вас у майбутньюму!" 
                        : "We invite you to take a look at our past events and the events we are preparing for you in the future!"}
                    key="desc" 
                />
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, events`}/>
                <meta property="og:image" content="crowd.webp" />
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/events"
                    key="canonical"
                />
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

    let now = moment()

    const eventsPricing = []
    const eventsLineups = []
    
    events.forEach(event => {
        event.pricing.forEach((el) => {
            if (now >= moment(el.start) && now <= moment(el.end)) {
                eventsPricing.push(el.price)
            }
        })
        let djs = []
        event.lineup.forEach(stage => {
            stage.djs.forEach(dj => {
                djs.push({
                    "@type": "Person",
                    "name": dj.name
                })
            })
        })
        eventsLineups.push(djs)
    })

    const events_json_info = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Events",
        "description": "Browse a collection of events",
        "itemsListElement": events.map((el, index) => (
            {
                "@type": "Event",
                "name": el.title,
                "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
                "eventStatus": "https://schema.org/EventScheduled",
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
                "offers": {
                    "@type": "Offer",
                    "url": `https://electroperedachi.com/events/${el.title_code}`,
                    "price": eventsPricing[index],
                    "priceCurrency": "UAH",
                    "availability": "https://schema.org/InStock",
                    "validFrom": el.pricing[0].start
                },
                "inLanguage": locale,
                "organizer": {
                    "@type": "Organization",
                    "name": "electroperedachi",
                    "url": "https://electroperedachi.com"
                },
                "performer": eventsLineups[index]
            }
        ))
    }

    const script = `${JSON.stringify(events_json_info)}`;

    return {
        props: {
            upcomingEvents,
            events,
            script,
            lang: locale
        },
        revalidate: 10
    }
}

export default EventsPage
