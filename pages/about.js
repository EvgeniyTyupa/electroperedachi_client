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
                <title>{intl.formatMessage({ id: "about.title" })} | electroperedachi</title>
                <meta
                    name="description"
                    content={intl.formatMessage({ id: "about.text" })}
                    key="desc"
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