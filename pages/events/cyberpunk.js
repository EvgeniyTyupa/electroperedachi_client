import Head from "next/head"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import Preloader from "../../components/Common/Preloader/Preloader"
import moment from "moment"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"
import Cyberpunk from "../../components/Pages/Events/Cyberpunk/Cyberpunk"

const CyberpunkEventPage = (props) => {
    const { isFallback } = useRouter()

    if (isFallback) {
        return <Preloader/>
    }

    return (
        <>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com"/>
                <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin/>
                <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;500;600;700;800&display=swap" rel="stylesheet"/>
                <link href="https://fonts.googleapis.com/css2?family=Oswald:wght@700&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Audiowide&display=swap" rel="stylesheet"></link>
                <link href="https://fonts.googleapis.com/css2?family=Audiowide&family=Sarpanch&display=swap" rel="stylesheet"></link>
            </Head>
            <Cyberpunk/>
        </>
    )
}

export default CyberpunkEventPage