import Head from "next/head"
import { useIntl } from "react-intl"
import { employeeApi } from "../api/api"
import AboutPageComponent from "../components/Pages/About/AboutPageComponent"

function AboutPage(props) {
    const { employees } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "about.title" })}</title>
                <meta
                    name="description"
                    content={intl.formatMessage({ id: "about.text" })}
                    key="desc"
                />
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, team, about us`}/>
                <meta property="og:image" content="/team_all.webp" />
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/about"
                    key="canonical"
                />
            </Head>
            <AboutPageComponent employees={employees}/>
        </>
    )
}

export async function getStaticProps() {
    const { employees } = await employeeApi.getEmployees(1, 10000)
    
    return {
        props: {
            employees: employees,
        },
        revalidate: 1800
    }
}

export default AboutPage