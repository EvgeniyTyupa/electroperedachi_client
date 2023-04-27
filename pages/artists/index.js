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
                <title>{intl.formatMessage({ id: "artists.title" })} | electroperedachi</title>
                <meta name="description" content={intl.formatMessage({ id: "artists.welcome" })}/>
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
