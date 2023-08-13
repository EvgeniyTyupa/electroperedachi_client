import Head from "next/head"
import { useIntl } from "react-intl"
import { employeeApi } from "../../api/api"
import ArtistsPageComponent from "../../components/Pages/Artists/ArtistsPageComponent"

function ArtistsPage(props) {
    const { employees } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "artists.title" })}</title>
                <meta name="description" content={intl.formatMessage({ id: "artists.welcome" })}/>
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, artists, residents`}/>
                <meta property="og:image" content="/team.webp" />
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/artists"
                    key="canonical"
                />
            </Head>
            <ArtistsPageComponent employees={employees} />
        </>
    )
}

export async function getStaticProps() {
    const { employees } = await employeeApi.getEmployees(1, 10000)

    return {
        props: {
            employees: employees
        },
        revalidate: 10
    }
}

export default ArtistsPage
