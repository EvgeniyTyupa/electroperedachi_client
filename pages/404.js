import Head from "next/head"
import { useIntl } from "react-intl"
import { eventApi } from "../api/api"
import NotFound from "../components/Pages/NotFound/NotFound"

function NotFoundPage(props) {
    const { upcomingEvent } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "notfound.title" })} | electroperedachi</title>
                <meta
                    name="description"
                    content={intl.formatMessage({ id: "notfound.text1" })}
                    key="desc"
                />
            </Head>
            <NotFound upcomingEvent={upcomingEvent}/>
        </>
    )
}

export async function getStaticProps() {
    const { upcomingEvents } = await eventApi.getUpcomingEvents()

    return {
        props: {
            upcomingEvent: upcomingEvents[0] ? upcomingEvents[0] : null,
        },
        revalidate: 1800
    }
}

export default NotFoundPage
