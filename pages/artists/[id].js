import Head from "next/head"
import { employeeApi } from "../../api/api"
import ArtistPageComponent from "../../components/Pages/Artists/Artist/ArtistPageComponent"
import { removeHtmlAndMarkdown } from "../../utils/removeHtmlAdnMarkdown"

const ArtistPage = (props) => {
    const { artist, script, lang } = props

    return (
        <>
            <Head>
                <title>{artist.name}</title>
                {lang === "ua" ? (
                    <meta name="description" lang="ua" content={removeHtmlAndMarkdown(artist.bio)} />
                ) : (
                    <meta name="description" lang="en" content={removeHtmlAndMarkdown(artist.bio_en)} />
                )}
                <meta
                    name="keywords"
                    content={`electroperedachi, ${artist.keywords}`}
                />
                <meta property="og:image" content={artist.photos[0]} />
                <link
                    rel="canonical"
                    href={`https://electroperedachi.com/artists/${artist.name_code}`}
                    key="canonical"
                />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
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
    const locale = context.locale

    const { employee } = await employeeApi.getEmployee(context.params.id)

    if (!employee) {
        return {
            notFound: true
        }
    }

    const bio = locale === "ua" ? employee.bio : employee.bio_en

    const formattedBio = removeHtmlAndMarkdown(bio)

    const artistSchema = {
        "@context": "https://schema.org",
        "@type": "Person",
        name: employee.name,
        description: formattedBio,
        url: `https://electroperedachi.com/artists/${employee.name_code}`,
        sameAs: [
            employee.links.facebook,
            employee.links.insta,
            employee.links.soundcloud,
        ],
        image: {
            "@type": "ImageObject",
            url: employee.photos[0]
        },
        genre: ["Electronic", "Techno", "House", "Drum and Bass"],
        memberOf: {
            "@type": "Organization",
            name: "electroperedachi",
            url: "https://electroperedachi.com"
        },
        worksFor: {
            "@type": "Organization",
            name: "electroperedachi",
            url: "https://electroperedachi.com"
        }
    }

    const script = `${JSON.stringify(artistSchema)}`;

    return {
        props: {
            artist: employee,
            script,
            lang: locale
        },
        revalidate: 10
    }
}

export default ArtistPage
