import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import classes from "../../styles/Thankyou.module.css"
import Link from "next/link"

import thankyou_img from "/public/images/thankyou.svg"
import { AiFillCheckCircle } from "react-icons/ai"
import { useEffect, useRef, useState } from "react"

import atob from "atob"

import { FB_PIXEL, TIKTOK_PIXEL } from "../../utils/constants"
import { eventApi } from "../../api/api"

const ThankyouPage = ({ paymentId, initialPayment }) => {
    const intl = useIntl()

    const [payment, setPayment] = useState(initialPayment)
    const trackedPaymentId = useRef(null)

    const status = payment?.status ?? "pending"
    const paymentHash = payment?.paymentHash

    // Ждём подтверждения оплаты без редиректов.
    useEffect(() => {
        if (status != "pending") return

        let stopped = false
        let timer

        const checkPayment = async () => {
            try {
                const nextPayment = await eventApi.getPayment(paymentId)

                if (stopped) return

                if (nextPayment?.paymentHash) {
                    setPayment(nextPayment)

                    if (
                        nextPayment.status === "success" ||
                        nextPayment.status === "failed"
                    ) {
                        return
                    }
                }
            } catch (error) {
                // Ошибка запроса не означает ошибку оплаты.
                // Повторим проверку через 3 секунды.
            }

            if (!stopped) {
                timer = setTimeout(checkPayment, 3000)
            }
        }

        checkPayment()

        return () => {
            stopped = true
            clearTimeout(timer)
        }
    }, [paymentId, status])

    // Отправляем события только после подтверждённой оплаты.
    useEffect(() => {
        if (status !== "success" || !paymentHash) return
        if (trackedPaymentId.current === paymentId) return

        let decoded

        try {
            decoded = JSON.parse(atob(paymentHash))
        } catch (error) {
            console.error("Failed to decode paymentHash:", error)
            return
        }

        const { total_price, fb_event_id, count, ticket_cart } = decoded
        const value = Number(total_price)

        if (!Number.isFinite(value) || value <= 0) return

        const ticketsCount = Array.isArray(ticket_cart)
            ? ticket_cart.reduce(
                (sum, item) => sum + (Number(item.count) || 0),
                0
            )
            : Number(count) || 1

        // Защита от повторного запуска эффекта в рамках этой страницы.
        trackedPaymentId.current = paymentId

        import("react-facebook-pixel")
            .then((module) => module.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL)

                ReactPixel.track(
                    "Purchase",
                    {
                        value,
                        currency: "UAH",
                        num_items: ticketsCount || 1
                    },
                    fb_event_id ? { eventID: fb_event_id } : undefined
                )
            })
            .catch((error) => {
                console.error("FB Pixel error:", error)
            })

        import("tiktok-pixel")
            .then((module) => module.default)
            .then((TiktokPixel) => {
                TiktokPixel.init(TIKTOK_PIXEL)

                TiktokPixel.track("Purchase", {
                    value,
                    currency: "UAH"
                })
            })
            .catch((error) => {
                console.error("TikTok Pixel error:", error)
            })
    }, [paymentId, paymentHash, status])

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "thankyou.title" })}</title>
                <meta name="robots" content="noindex" />
            </Head>

            <div className={classes.main}>
                <Container className={classes.container}>
                    <img
                        src={thankyou_img.src}
                        alt="thankyou"
                        className={classes.thankyouImg}
                    />

                    <div className={classes.text}>
                        <AiFillCheckCircle />
                        <p>{intl.formatMessage({ id: "thankyou.text" })}</p>
                    </div>

                    <div className={classes.after}>
                        <h3>
                            {intl.formatMessage({ id: "thankyou.afterTitle" })}
                        </h3>

                        <p>{intl.formatMessage({ id: "thankyou.after" })}</p>

                        <Link href="https://t.me/+U96uaLrjwEllNTcy">
                            {intl.formatMessage({ id: "thankyou.cta" })}
                        </Link>
                    </div>

                    {/* <HozhoThankyou/> */}
                </Container>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params, res }) => {
    const { paymentId } = params

    res.setHeader("X-Robots-Tag", "noindex")
    res.setHeader("Cache-Control", "no-store")

    let initialPayment = null

    try {
        const payment = await eventApi.getPayment(paymentId)

        if (payment?.paymentHash) {
            initialPayment = {
                paymentHash: payment.paymentHash,
                status: payment.status ?? "pending"
            }
        }
    } catch (error) {
        // Открываем страницу даже при временной ошибке запроса.
        // Проверка продолжится в браузере.
        console.error("Failed to fetch payment:", error.message)
    }

    return {
        props: {
            paymentId,
            initialPayment
        }
    }
}

export default ThankyouPage