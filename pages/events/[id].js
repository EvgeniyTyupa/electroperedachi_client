import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import EventPageComponent from "../../components/Pages/Events/EventPageComponent/EventPageComponent"
import moment from "moment"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"

const EventPage = (props) => {
    const { event, script, lang, randomPhotos } = props

    const { isFallback } = useRouter()

    if (isFallback) {
        return <Preloader/>
    }

    return (
        <>
            <Head>
                <title>{event.title || "Event"}</title>
                {lang === "ua" ? (
                    <meta name="description" lang="ua" content={removeHtmlAndMarkdown(event.description)}/>
                ) : (
                    <meta name="description" lang="en" content={removeHtmlAndMarkdown(event.description_en)}/>
                )}
                <meta name="keywords" content={`electroperedachi, events, події, вечірка, party, rave, ${event.keywords}`}/>
                <meta property="og:image" content={event.poster.image}/>
                <link
                    rel="canonical"
                    href={`https://electroperedachi.com/events/${event.title_code}`}
                    key="canonical"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <EventPageComponent event={event} randomPhotos={randomPhotos}/>
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
    
    let nextDay

    if (event.date) {
        nextDay = new Date(event.date);
    } else {
        nextDay = new Date(event.dates[event.dates.length - 1].date)
    }
    nextDay.setDate(nextDay.getDate() + 1);

    let now = moment()

    let currentPrice = 0
    let validFrom

    if (event.price) {
        const allWindows = event.price.flatMap(t => t.price);
        
        const matching = allWindows.filter(el =>
            now.isBetween(
                moment(el.start), 
                moment(el.end), 
                null, 
                '[]'
            )
        );
        
        if (matching.length > 0) {
            const cheapest = matching.reduce((a, b) =>
                a.price < b.price ? a : b
            );
            currentPrice = cheapest.price;
            validFrom = cheapest.start
        }
    }

    const lineup = []

    if (event.lineup[0].stages) {
        event.lineup.forEach(day => {
            day?.stages.forEach(stage => {
                stage?.slots.forEach(slot => {
                    slot?.djs.forEach(dj => {
                        lineup.push({
                            "@type": "Person",
                            "name": dj.name
                        })  
                    })
                })
            })
        })
    }

    const event_json_info = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
        "startDate": event.date ? event.date : event.dates[0].date,
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
        "description": locale === "ua" ? removeHtmlAndMarkdown(event.description) : removeHtmlAndMarkdown(event.description_en),
        "offers": {
            "@type": "Offer",
            "url": `https://electroperedachi.com/events/${event.title_code}`,
            "price": currentPrice,
            "priceCurrency": "UAH",
            "availability": "https://schema.org/InStock",
            "validFrom": event.pricing ? event.pricing[0].start : validFrom
        },
        "inLanguage": locale,
        "organizer": {
            "@type": "Organization",
            "name": "electroperedachi",
            "url": "https://electroperedachi.com"
        },
        "performer": lineup
    }

    const script = `${JSON.stringify(event_json_info)}`;

    return {
        props: {
            event: event,
            script,
            lang: locale,
            randomPhotos: []
        },
        revalidate: 10
    }
}

export default EventPage
