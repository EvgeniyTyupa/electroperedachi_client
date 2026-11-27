import Head from "next/head"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import moment from "moment"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"
import NeedForSpeed from "../../components/Pages/Events/NeedForSpeed/NeedForSpeed"
import { CLARITY_PROJECT_ID } from "../../utils/constants"

const heroImage = "https://electroperedachi.com/images/need_for_speed/hero-crowd-20261119.webp"

const NeedForSpeedPage = (props) => {
    const { event, script, lang } = props

    const { isFallback } = useRouter()

    useEffect(() => {
        if (!CLARITY_PROJECT_ID) return

        let active = true
        import('@microsoft/clarity')
            .then(({ default: Clarity }) => {
                if (active) Clarity.init(CLARITY_PROJECT_ID)
            })
            .catch((error) => {
                console.error('Clarity init failed', error)
            })

        return () => { active = false }
    }, [])

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
                <meta property="og:image" content={heroImage} key="og:image"/>
                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:image" content={heroImage} />
                <link
                    rel="canonical"
                    href={`https://electroperedachi.com/events/${event.title_code}`}
                    key="canonical"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.cdnfonts.com/css/helvetica-neue-55?styles=16016,16008,16020,15986,15996,15999,30133" rel="stylesheet"/>
            </Head>
            <NeedForSpeed event={event}/>
        </>
    )
}

export async function getServerSideProps(context) {
    const locale = context.locale;

    const { event } = await eventApi.getEvent("need-for-speed")

    if (!event) {
        return {
            notFound: true
        }
    }
    
    // Keep the rescheduled landing date consistent with server-provided event data.
    const moveDate = value => typeof value === 'string'
        ? value.replace(/^2026-11-14/, '2026-12-12')
        : value
    if (event.date) event.date = moveDate(event.date)
    if (event.dates) event.dates = event.dates.map(day => ({ ...day, date: moveDate(day.date) }))
    const moveCopy = value => typeof value === 'string'
        ? value.replace(/14 листопада/g, '12 грудня').replace(/14 November/g, '12 December').replace(/14\.11(?:\.2026)?/g, '12.12.2026')
        : value
    event.description = moveCopy(event.description)?.replace(/00:30/g, '23:00')
    event.description_en = moveCopy(event.description_en)?.replace(/00:30/g, '23:00')

    // The event ends at 23:00 Kyiv time on the same day (December is UTC+02:00).
    const eventDay = (event.date || event.dates[event.dates.length - 1].date).slice(0, 10)
    const eventEnd = new Date(`${eventDay}T23:00:00+02:00`);

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
        "eventStatus": "https://schema.org/EventRescheduled",
        "previousStartDate": "2026-11-14",
        "startDate": event.date ? event.date : event.dates[0].date,
        "endDate": eventEnd.toISOString(),
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
        "image": heroImage,
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
        },
    }
}

export default NeedForSpeedPage
