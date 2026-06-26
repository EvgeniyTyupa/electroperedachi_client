import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import moment from "moment"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"
import ViceCity2026 from "../../components/Pages/Events/ViceCity2026/ViceCity2026"

const ViceCity2026Page = (props) => {
    const { event, script, lang } = props

    const { isFallback } = useRouter()

    if (isFallback) {
        return <Preloader/>
    }

    console.log(event.poster.image)

    return (
        <>
            <Head>
                <title>{event.title || "Event"}</title>
                <meta property="og:title" content={event.title || "Event"}/>
                <meta property="og:type" content="website"/>
                <meta property="og:url" content={`https://electroperedachi.com/events/${event.title_code}`}/>
                <meta property="og:image" content={event.poster.image}/>
                <meta property="og:image:width" content="1200"/>
                <meta property="og:image:height" content="630"/>
                <meta property="og:description" content={
                    lang === "ua" 
                        ? removeHtmlAndMarkdown(event.description) 
                        : removeHtmlAndMarkdown(event.description_en)
                }/>
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
            <ViceCity2026 event={event}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const locale = context.locale;

    const { event } = await eventApi.getEvent("vice-city-2026")

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
        }
    }
}

export default ViceCity2026Page
