import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import moment from "moment"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"
import Hozho from "../../components/Pages/Events/Hozho/Hozho"

const HozhoEventPage = (props) => {
    const { event, script, lang } = props

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
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Roboto:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet"></link>
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <Hozho event={event}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const locale = context.locale;

    const { event } = await eventApi.getEvent("hozho")

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

    const lineup = []

    event.lineup.forEach(stage => {
        stage.djs.forEach(dj => {
            lineup.push({
                "@type": "Person",
                "name": dj.name
            })
        })
    })

    const event_json_info = {
        "@context": "https://schema.org",
        "@type": "Event",
        "name": event.title,
        "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
        "eventStatus": "https://schema.org/EventScheduled",
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
        "description": locale === "ua" ? removeHtmlAndMarkdown(event.description) : removeHtmlAndMarkdown(event.description_en),
        "offers": {
            "@type": "Offer",
            "url": `https://electroperedachi.com/events/${event.title_code}`,
            "price": currentPrice,
            "priceCurrency": "UAH",
            "availability": "https://schema.org/InStock",
            "validFrom": event.pricing[0].start
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

export default HozhoEventPage