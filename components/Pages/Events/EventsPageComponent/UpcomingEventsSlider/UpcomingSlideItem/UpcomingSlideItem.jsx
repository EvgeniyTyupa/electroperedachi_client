import classes from "./UpcomingSlideItem.module.css"
import Image from "next/image"
import { useIntl } from "react-intl"
import { useRouter } from "next/router"
import moment from "moment"
import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"
import { routes } from "../../../../../../utils/routes"
import Header from "../../../../../UI/Text/Header/Header"

import Aos from 'aos';
import 'aos/dist/aos.css';
import ExploreButton from "../../../../../UI/Buttons/ExploreButton/ExploreButton"
import { cx } from "../../../../../../utils/classnames"
import { humanizeDates, humanizeDatesWithDay } from "../../../../../../utils/humanizeDate"

const UpcomingSlideItem = (props) => {
    const { item } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const { locale } = useRouter()
    const router = useRouter()
    const intl = useIntl()

    const city = locale === "ua" ? item.city : item.city_en
    const dayOfWeek = locale === "ua"
    ? moment(item.date).locale('uk').format('ddd')
    : moment(item.date).locale('en').format('ddd')

    const onClickBuyTicket = () => {
        router.push(`/events/${item.title_code}`)
    }

    useEffect(() => {
        let now = moment()

        if (item.pricing) {
            item.pricing.forEach((el) => {
                if (now >= moment(el.start) && now <= moment(el.end)) {
                    setPrice(el.price)
                    setIsShowBuy(true)
                }
            })
        } else if (item.price) {
            const allWindows = item.price.flatMap(t => t.price);

            const matching = allWindows.filter(el =>
                now.isBetween(
                    moment(el.start), 
                    moment(el.end), 
                    null, 
                    '[]'
                )
            );
            
            if (matching.length > 0) {
                const cheapest = matching.reduce((a, b) =>
                    a.price < b.price ? a : b
                );
                let currentPrice = cheapest.price;
                setPrice(currentPrice)
                setIsShowBuy(true)
            }
        }

    }, [])

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div>

            <Link className={classes.main} href={`${routes.events}/${item.title_code}`}>
                <Image src={item.poster.image} alt={item.title} fill className={classes.poster}/>
                <div className={classes.info}>
                    {(item.venue || city) && (
                        <div className={classes.block} data-aos="fade-left" data-aos-duration="2000">
                            <span>{intl.formatMessage({ id: "event.place" })}</span>
                            <p>{item.venue}, {city}</p>
                        </div>
                    )}
                    <div className={classes.block} data-aos="fade-left" data-aos-duration="2000">
                        <span>{intl.formatMessage({ id: "event.date" })}</span>
                        <p style={{ textTransform: "capitalize" }}>{humanizeDatesWithDay(item.dates ? item.dates : item.date)}, {humanizeDates(item.dates ? item.dates : item.date)}</p>
                        <label>{item.start} : {item.end}</label>
                    </div>
                    {isShowBuy && (
                        <div className={classes.block} data-aos="fade-left" data-aos-duration="2000">
                            <span>{intl.formatMessage({ id: "event.price" })}</span>
                            <p>{price} {intl.formatMessage({ id: "event.currency" })}.</p>
                        </div>
                    )}
                    <div className={cx(classes.block, classes.buy, classes.buyMobile)}>
                        <div className={classes.buyContainer}>
                            <span>{intl.formatMessage({ id: "event.buyTicket" })}</span>
                            <ExploreButton text={intl.formatMessage({ id: "event.buyTicket" })} onClick={onClickBuyTicket}/>
                        </div>
                    </div>
                </div>
                <div className={classes.titleContainer}>
                    <div className={classes.titleBlock} data-aos="fade" data-aos-duration="2000">
                        <Header type="h4">{intl.formatMessage({ id: "event.upcoming" })}</Header>
                        <div className={classes.title} data-aos="fade-down" data-aos-duration="2000">
                            <Header type="h2">{item.title}</Header>
                        </div>
                    </div>
                    <div className={cx(classes.titleBlock, classes.buy)}>
                        <div className={classes.buyContainer}>
                            <span>{intl.formatMessage({ id: "event.buyTicket" })}</span>
                            <ExploreButton/>
                        </div>
                    </div>
                </div>
            </Link>
        </div>
    )
}

export default UpcomingSlideItem