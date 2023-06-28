import { newsApi } from "../../api/api"
import Head from "next/head"
import PostPageComponent from "../../components/Pages/News/PostPageComponent/PostPageComponent"
import { useRouter } from "next/router"

const PostPage = (props) => {
    const { post, script } = props

    const { locale } = useRouter()

    let title = locale === "ua" ? post.title : post.title_en

    return (
        <>
            <Head>
                <title>{title} | electroperedachi</title>
                <meta
                    name="description"
                    lang="ua"
                    content={post.description}
                    key="desc"
                />
                <meta
                    name="description"
                    lang="en"
                    content={post.description_en}
                    key="desc"
                />
                <meta
                    name="keywords"
                    content={`electroperedachi, ${post.keywords}`}
                />
                <meta property="og:image" content={post.image} />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <PostPageComponent post={post} />
        </>
    )
}

export const getStaticPaths = async ({ locales }) => {
    const { news } = await newsApi.getNews(1, 1000)

    const paths = []

    news.forEach((post) => {
        for (const locale of locales) {
            paths.push({
                params: { id: post.code },
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

    const { post } = await newsApi.getPost(context.params.id)

    if (!post) {
        return {
            notFound: true
        }
    }

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        headline: locale === "ua" ? post.title : post.title_en,
        description: locale === "ua" ? post.description : post.description_en,
        datePublished: post.created_at,
        author: {
            "@type": "Person",
            name: "electroperedachi"
        },
        image: {
            "@type": "ImageObject",
            url: post.image
        }
    }

    const script = `${JSON.stringify(schema)}`;

    return {
        props: {
            post: post,
            script: script
        },
        revalidate: 10
    }
}

export default PostPage
