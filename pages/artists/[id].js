import Head from "next/head"
import { employeeApi } from "../../api/api"
import ArtistPageComponent from "../../components/Pages/Artists/Artist/ArtistPageComponent"

const ArtistPage = (props) => {
    const { artist } = props

    return (
        <>
            <Head>
                <title>{artist.name} | electroperedachi</title>
                <meta name="description" lang="ua" content={artist.bio}/>
                <meta name="description" lang="en" content={artist.bio_en}/>
                <met name="keywords" content={`electroperedachi, ${artist.keywords}`}/>
                <meta property="og:image" content={artist.photos[0]}/>
            </Head>
            <ArtistPageComponent artist={artist} />
        </>
    )
}

export const getStaticPaths = async ({ locales }) => {
    const { employees } = await employeeApi.getEmployees(1, 10000)

    const paths = []

    employees
        .filter((el) => el.role === "artist")
        .forEach((dj) => {
            for (const locale of locales) {
                paths.push({
                    params: { id: dj.name_code },
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
    const { employee } = await employeeApi.getEmployee(context.params.id)

    if (!employee) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            artist: employee
        },
        revalidate: 10
    }
}

export default ArtistPage
