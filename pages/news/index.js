import Head from "next/head"
import { useIntl } from "react-intl"
import { newsApi } from "../../api/api"
import NewsPageComponent from "../../components/Pages/News/NewsPageComponent"

function NewsPage(props) {
    const { news, total, script } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "news.title" })} | electroperedachi</title>
                <meta name="description" content={intl.formatMessage({ id: "news.description" })} key="desc" />
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, news`}/>
                <meta property="og:image" content="/poster.jpg" />
                <script
                    type="application/ld+json"
                    dangerouslySetInnerHTML={{ __html: script }}
                />
            </Head>
            <NewsPageComponent news={news} total={total}/>
        </>
    )
}

export async function getStaticProps(context) {
    const locale = context.locale

    const { news, total } = await newsApi.getNews(1, 18, "desc")

    const postSchemas = news.map((post) => {
        const schema = {
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": locale === "ua" ? post.title : post.title_en,
          "description": locale === "ua" ? post.description : post.description_en,
          "datePublished": post.created_at,
        };
    
        return schema;
    });

    const newsSchema = {
        "@context": "https://schema.org",
        "@type": "ItemList",
        "name": "Blog Posts",
        "itemListElement": postSchemas,
    };

    const script = `${JSON.stringify(newsSchema)}`;

    return {
        props: {
            news: news,
            total: total,
            script
        },
        revalidate: 10,
    }
}

export default NewsPage