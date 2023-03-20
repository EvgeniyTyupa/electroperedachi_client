import { useIntl } from "react-intl"
import NewsCardItem from "../../../Common/News/NewsCardItem/NewsCardItem"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from "./HomeNewsSection.module.css"
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import NavigateButton from "../../../UI/Buttons/NavigateButton/NavigateButton"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import { useState } from "react"
import ActionButton from "../../../UI/Buttons/ActionButton/ActionButton"
import { useRouter } from "next/router"
import { routes } from "../../../../utils/routes"

const HomeNewsSection = (props) => {
    const { news } = props

    const [viewCardCount, setViewCardCount] = useState(0)

    const intl = useIntl()

    const router = useRouter()

    const { width } = useWindowDimensions()

    const onViewMoreClick = () => {
        router.push(routes.news)
    }

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    useEffect(() => {
        setViewCardCount(width > 1024 ? 0 : ((width <= 1024 && width > 568) ? 2 : 3))
    }, [width])

    return (
        <Container className={classes.main}>
            <div className={classes.header} data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                <Header type="h2">{intl.formatMessage({ id: "news.title" })}</Header>
                <NavigateButton text={intl.formatMessage({ id: "news.viewMore" })} href="/news"/>
            </div>
            <div className={classes.newsWrapper} data-aos="fade-up" data-aos-duration="2000">
                {news.slice(-viewCardCount, 3).map(el => (
                    <NewsCardItem item={el} key={el._id}/>
                ))}
            </div>
            <ActionButton className={classes.navigateBut} onClick={onViewMoreClick}>{intl.formatMessage({ id: "news.viewMore" })}</ActionButton>
        </Container>
    )
}

export default HomeNewsSection