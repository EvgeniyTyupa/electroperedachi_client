import classes from "./CyberpunkForm.module.css"
import robot from "/public/images/cyberpunk/girl.webp"
import Image from "next/image"
import { useIntl } from "react-intl"
import { useEffect, useState } from "react"
import Button from "@mui/material/Button"
import { cx } from "../../../../../utils/classnames"
import CyberpunkBuyForm from "./CyberpunkBuyForm/CyberpunkBuyForm"

const CyberpunkForm = (props) => {
    const { event, price, paymentBlockRef } = props

    const [count, setCount] = useState(1)
    const [totalPrice, setTotalPrice] = useState(0)

    const [totalPriceDiscount, setTotalPriceDiscount] = useState(0)

    const [discount, setDiscount] = useState(0)

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
        if (!event?.is_multi_buy) {
            const newPrice = price - discount
            setTotalPriceDiscount(Math.ceil(newPrice) * count)
        } else {
            let newDiscountPercents = 0
            switch(count) {
                case 1: {
                    newDiscountPercents = 0
                    break
                }
                case 2: {
                    newDiscountPercents = 10
                    break
                }
                case 3: {
                    newDiscountPercents = 15
                    break
                }
                default: {
                    newDiscountPercents = 20
                    break
                }
            }
            const newDiscount = (price * count) / 100 * newDiscountPercents
            setTotalPriceDiscount(Math.ceil(price * count - newDiscount))
        }
    }, [count, discount, price, event])

    return (
        <div className={classes.main}>
            <div className={classes.left}>
                <div className={classes.leftImgContainer}>
                    <Image src={robot.src} alt="robot_hud" fill/>
                </div>
            </div>
            <div className={classes.right}>
                <p className={classes.electroperedachi}>electroperedachi</p>
                <div className={classes.titleBlock} ref={paymentBlockRef}>
                    <h3 className={classes.title}>CRYSTAL NINJA</h3>
                    <h3 className={classes.titleAbsolute}>CRYSTAL NINJA</h3>
                </div>
                <p className={classes.rules}>
                    {intl.formatMessage({ id: "event.ticketRules" })}
                </p>
                <div className={classes.ticketsBlock}>
                    <p className={classes.price}>
                        {intl.formatMessage({ id: "event.price" })}
                        &nbsp;
                        <span className={totalPriceDiscount !== totalPrice ? classes.oldPrice : ""}>{totalPrice}</span>
                        &nbsp;
                        <br/>
                        {totalPriceDiscount != totalPrice && <span className={classes.discountPrice}>{totalPriceDiscount}{" "}</span>}
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
                            className={cx(classes.countBut, classes.countButt2)}
                            onClick={plusCount}
                        >
                            +
                        </Button>
                    </div>
                </div>
                <CyberpunkBuyForm
                    totalPrice={totalPrice}
                    count={count}
                    event={event}
                    price={price}
                    setDiscount={setDiscount}
                    totalPriceDiscount={totalPriceDiscount}
                />
            </div>
        </div>
    )
}

export default CyberpunkForm