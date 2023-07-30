import { newsApi } from "../../api/api"
import Head from "next/head"
import PostPageComponent from "../../components/Pages/News/PostPageComponent/PostPageComponent"

const PostPage = (props) => {
    const { post, script, lang } = props

    let title = lang === "ua" ? post.title : post.title_en

    return (
        <>
            <Head>
                <title>{title}</title>
                {lang === "ua" ? (
                    <meta
                        name="description"
                        lang="ua"
                        content={post.description}
                        key="desc"
                    />
                ) : (
                    <meta
                        name="description"
                        lang="en"
                        content={post.description_en}
                        key="desc"
                    />
                )}
                <meta
                    name="keywords"
                    content={`electroperedachi, ${post.keywords}`}
                />
                <meta property="og:image" content={post.image} />
                <link
                    rel="canonical"
                    href={`https://electroperedachi.com/news/${post.code}`}
                    key="canonical"
                />
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
            "@type": "Organization",
            "name": "electroperedachi",
            "url": "https://electroperedachi.com"
        },
        image: {
            "@type": "ImageObject",
            "url": post.image
        }
    }

    const script = `${JSON.stringify(schema)}`;

    return {
        props: {
            post: post,
            script: script,
            lang: locale
        },
        revalidate: 10
    }
}

export default PostPage
