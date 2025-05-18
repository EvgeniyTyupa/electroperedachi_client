import moment from "moment"
import Container from "../../../../UI/Container/Container"
import classes from "./EventBuyTicket.module.css"
import Image from "next/image"

import Aos from "aos"
import "aos/dist/aos.css"

import { useIntl } from "react-intl"
import { useEffect } from "react"
import { useState } from "react"
import { Button } from "@mui/material"
import EventBuyTicketForm from "./EventBuyTicketForm/EventBuyTicketForm"

import blue_liquid from "/public/images/blue_liquid.webp"
import Video from "../../../../Common/Video/Video"

const EventBuyTicket = (props) => {
    const { event, price, paymentBlockRef } = props

    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const [totalPriceDiscount, setTotalPriceDiscount] = useState(0)

    const [discount, setDiscount] = useState(0)

    const [ticketCart, setTicketCart] = useState([])

    const intl = useIntl()

    const minusCount = (ticketType) => {
        const newTicketCart = [ ...ticketCart ]
        const ticketTypeIndex = newTicketCart.findIndex(el => el._id === ticketType._id)
        if (ticketTypeIndex >= 0) {
            if (newTicketCart[ticketTypeIndex].count - 1 > 0) {
                newTicketCart[ticketTypeIndex].count -= 1
            } else {
                newTicketCart.splice(ticketTypeIndex, 1)
            }
        }
        setTicketCart(newTicketCart)
    }

    const plusCount = (ticketType) => {
        const newTicketCart = [ ...ticketCart ]
        const ticketTypeIndex = newTicketCart.findIndex(el => el._id === ticketType._id)

        if (ticketTypeIndex >= 0) {
            newTicketCart[ticketTypeIndex].count += 1
        } else {
            newTicketCart.push({
                _id: ticketType._id,
                price: discount ? Math.round(ticketType.price[0].price - (Number(ticketType.price[0].price) / 100 * Number(discount))) : ticketType.price[0].price,
                count: 1
            })
        }
        setTicketCart(newTicketCart)
    }

    useEffect(() => {
        setTotalPrice(price * count)
    }, [count, price])

    useEffect(() => {
        let newTotalPrice = 0
        ticketCart.forEach(el => {
            newTotalPrice += el.price * el.count
        })

        if (event.is_multi_buy) {
            let totalTicketCount = 0
            ticketCart.forEach(el => {
                totalTicketCount += el.count
            })

            if (totalTicketCount === 2) {
                setTotalPriceDiscount(newTotalPrice * 0.90)
            } else if (totalTicketCount === 3) {
                setTotalPriceDiscount(newTotalPrice * 0.85)
            } else if (totalTicketCount >= 4) {
                setTotalPriceDiscount(newTotalPrice * 0.80)
            } else {
                setTotalPriceDiscount(newTotalPrice)
            }
            setTotalPrice(newTotalPrice)
        } else {
            setTotalPrice(newTotalPrice)
        }
    }, [ticketCart])

    useEffect(() => {
        if (discount) {
            const newTicketCart = [ ...ticketCart ]
            newTicketCart.forEach(el => {
                el.price = Math.round(el.price - (Number(el.price) / 100 * Number(discount)))
            })
            setTicketCart(newTicketCart)
        }
    }, [discount])

    useEffect(() => {
        plusCount(event.price[0])
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <div
                    className={classes.left}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    {/* <h3>electroperedachi</h3> */}
                    {/* <p className={classes.date}>
                        {moment(event.date).format("DD.MM.YY")}
                    </p> */}
                    <Video
                        src="/video/16.mp4"
                        poster={event.image_on_ticket_form}
                        width={"100%"}
                        height={220}
                    />
                    {/* <Image
                        src={
                            event.image_on_ticket_form
                                ? event.image_on_ticket_form
                                : blue_liquid.src
                        }
                        alt={event.title}
                        fill
                        className={classes.liquid}
                    /> */}
                </div>
                <div
                    className={classes.right}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h2>{event.title}</h2>
                    <p className={classes.rules} ref={paymentBlockRef}>
                        {intl.formatMessage({ id: "event.ticketRules" })}
                    </p>
                    {event.price?.map((el, index) => (
                        el.price.length > 0 && (
                            <div key={index} className={classes.ticketsBlock}>
                                <div className={classes.ticketType}>
                                    <p className={classes.ticketName}>{el.name}</p>
                                    <p className={classes.price}>
                                        {intl.formatMessage({ id: "event.price" })}
                                        &nbsp;
                                        <span className={discount ? classes.oldPrice : ""}>{el.price[0]?.price}</span>
                                        &nbsp;
                                        <br/>
                                        {discount ? <span className={classes.discountPrice}>{Math.round(el.price[0]?.price - (el.price[0]?.price / 100 * discount))}{" "}</span> : ""}
                                        {intl.formatMessage({ id: "event.currency" })}.
                                    </p>
                                </div>
                                <div className={classes.ticketsCount}>
                                    <label>
                                        {intl.formatMessage({ id: "event.tickets" })}
                                    </label>
                                    <Button
                                        className={classes.countBut}
                                        onClick={() => minusCount(el)}
                                    >
                                        -
                                    </Button>
                                    <span>{ticketCart.find(type => type._id === el._id)?.count ?? 0}</span>
                                    <Button
                                        className={classes.countBut}
                                        onClick={() => plusCount(el)}
                                    >
                                        +
                                    </Button>
                                </div>
                            </div>
                        )
                    ))}
                    <div className={classes.totalPrice}>
                        <label>
                            {intl.formatMessage({ id: "event.totalPrice" })}
                        </label>
                        <div className={classes.priceBlock}>
                            <span className={(ticketCart.reduce((sum, el) => sum + el.count, 0) > 1 && event.is_multi_buy) ? classes.oldPrice : ""}>{totalPrice} {intl.formatMessage({ id: "event.currency" })}.</span>
                            {(totalPriceDiscount && ticketCart.reduce((sum, el) => sum + el.count, 0) > 1) ? <span className={classes.discountPrice}>{totalPriceDiscount} {intl.formatMessage({ id: "event.currency" })}</span> : ""}
                        </div>
                    </div>
                    <EventBuyTicketForm
                        ticketCart={ticketCart}
                        totalPrice={totalPrice}
                        count={count}
                        event={event}
                        price={price}
                        setDiscount={setDiscount}
                        totalPriceDiscount={totalPriceDiscount}
                    />
                </div>
            </Container>
        </div>
    )
}

export default EventBuyTicket
