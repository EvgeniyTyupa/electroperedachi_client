import Head from "next/head"
import { useIntl } from "react-intl"
import { newsApi } from "../../api/api"
import NewsPageComponent from "../../components/Pages/News/NewsPageComponent"

function NewsPage(props) {
    const { news, total } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "news.title" })} | electroperedachi</title>
                <meta name="description" content={intl.formatMessage({ id: "news.description" })} key="desc" />
            </Head>
            <NewsPageComponent news={news} total={total}/>
        </>
    )
}

export async function getStaticProps() {
    const { news, total } = await newsApi.getNews(1, 18)

    return {
        props: {
            news: news,
            total: total
        },
        revalidate: 10,
    }
}

export default NewsPage