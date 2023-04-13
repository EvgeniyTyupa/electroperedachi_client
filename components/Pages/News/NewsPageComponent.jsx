import { useEffect } from "react"
import NewsCardItem from "../../Common/News/NewsCardItem/NewsCardItem"
import Container from "../../UI/Container/Container"
import Header from "../../UI/Text/Header/Header"
import classes from "./NewsPageComponent.module.css"

import InfiniteScroll from "react-infinite-scroll-component";

import Aos from 'aos';
import 'aos/dist/aos.css';
import LastPost from "../../Common/News/LastPost/LastPost"
import { useIntl } from "react-intl"
import Dna from "../../UI/Animation/Dna/Dna"
import { useState } from "react"
import { newsApi } from "../../../api/api"
import PreloaderMini from "../../Common/Preloader/PreloaderMini"

const NewsPageComponent = (props) => {
    const { news, total } = props
    
    const [page, setPage] = useState(1)
    const [totalNews, setTotalNews] = useState(news)
    const pageSize = 18

    const intl = useIntl()

    const fetchMore = async () => {
        setPage((prev) => prev + 1)
        const { news } = await newsApi.getNews(page + 1, pageSize)
        const tmp = totalNews.map(el => el)
        news.forEach(el => {
            tmp.push(el)
        })
        setTotalNews(tmp)
    }

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <div data-aos="fade-down" data-aos-duration="2000" className={classes.header}>
                    <Header type="h2">{intl.formatMessage({ id: "news.title" })}</Header>
                </div>
                <LastPost post={news[0]}/>
                <InfiniteScroll
                    dataLength={totalNews.length}
                    hasMore={total > totalNews.length}
                    next={fetchMore}
                    loader={<PreloaderMini/>}
                    className={classes.infinity}
                >
                    <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                        {totalNews.map((el, index) => (
                            index > 0 && (
                                <NewsCardItem item={el} key={el._id}/>
                            )
                        ))}
                    </div>
                </InfiniteScroll>
            </Container>
            <div className={classes.lines}>
                <Dna/>
            </div>
        </div>
    )
}

export default NewsPageComponent