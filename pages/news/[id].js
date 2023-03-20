import { newsApi } from "../../api/api"
import Head from "next/head"
import PostPageComponent from "../../components/Pages/News/PostPageComponent/PostPageComponent"
import { useRouter } from "next/router"

const PostPage = (props) => {
    const { post } = props

    const { locale } = useRouter()

    let title = locale === "ua" ? post.title : post.title_en
    let description = locale === "ua" ? post.description : post.description_en

    return (
        <>
            <Head>
                <title>{title} | electroperedachi</title>
                <meta name="description" content={description} key="desc" />
                <meta property="og:image" content={post.image} />
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
    const { post } = await newsApi.getPost(context.params.id)

    if (!post) {
        return {
            notFound: true
        }
    } 

    return {
        props: {
            post: post
        }
    }
}

export default PostPage
