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

const EventBuyTicket = (props) => {
    const { event, price, setPrice, paymentBlockRef } = props

    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const intl = useIntl()

    const minusCount = () => {
        if (count - 1 >= 1) {
            setCount(count - 1)
        }
    }

    const plusCount = () => {
        setCount(count + 1)
    }

    useEffect(() => {
        setTotalPrice(price * count)
    }, [count, price])

    useEffect(() => {
        Aos.init({ duration: 1000 })
    }, [])

    return (
        <div className={classes.main} ref={paymentBlockRef}>
            <Container className={classes.container}>
                <div
                    className={classes.left}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h3>electroperedachi</h3>
                    <p className={classes.date}>
                        {moment(event.date).format("DD.MM.YY")}
                    </p>
                    <Image
                        src={
                            event.image_on_ticket_form
                                ? event.image_on_ticket_form
                                : blue_liquid.src
                        }
                        alt={event.title}
                        fill
                        className={classes.liquid}
                    />
                </div>
                <div
                    className={classes.right}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h2>{event.title}</h2>
                    <p className={classes.rules}>
                        {intl.formatMessage({ id: "event.ticketRules" })}
                    </p>
                    <div className={classes.ticketsBlock}>
                        <p className={classes.price}>
                            {intl.formatMessage({ id: "event.price" })}{" "}
                            {totalPrice}{" "}
                            {intl.formatMessage({ id: "event.currency" })}.
                        </p>
                        <div className={classes.ticketsCount}>
                            <label>
                                {intl.formatMessage({ id: "event.tickets" })}
                            </label>
                            <Button
                                className={classes.countBut}
                                onClick={minusCount}
                            >
                                -
                            </Button>
                            <span>{count}</span>
                            <Button
                                className={classes.countBut}
                                onClick={plusCount}
                            >
                                +
                            </Button>
                        </div>
                    </div>
                    <EventBuyTicketForm
                        totalPrice={totalPrice}
                        count={count}
                        event={event}
                        setPrice={setPrice}
                        price={price}
                    />
                </div>
            </Container>
        </div>
    )
}

export default EventBuyTicket
