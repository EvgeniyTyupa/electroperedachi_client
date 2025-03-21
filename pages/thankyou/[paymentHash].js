import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import classes from "../../styles/Thankyou.module.css"

import thankyou_img from "/public/images/thankyou.svg"
import { AiFillCheckCircle } from "react-icons/ai"
import { useEffect } from "react"
import { useRouter } from "next/router"
import { eventApi } from "../../api/api"
import { useAppContext } from "../../context/AppContext"

import atob from "atob"

import moment from "moment"
import { FB_PIXEL, USD_EQ } from "../../utils/constants"
import HozhoThankyou from "../../components/Pages/Events/Hozho/HozhoThankyou/HozhoThankyou"

const ThankyouPage = (props) => {
    const { paymentHash, message } = props

    const intl = useIntl()
    const router = useRouter()

    const { setIsFetchingContext } = useAppContext()
    
    useEffect(() => {
        if (!paymentHash || message === "Not found") {
            router.push("/")
        } else if (message === "Ok") {
            setIsFetchingContext(true)
            const decoded = JSON.parse(atob(paymentHash))
            const { userId, count, promo, event_id, total_price, promocode, email, phone, google_table_id } = decoded
            eventApi.createTicket(userId, count, promo, event_id, total_price, promocode)
            .then(() => setIsFetchingContext(false))
            .catch(() => setIsFetchingContext(false))

            
            if (google_table_id) {
                import('react-facebook-pixel')
                .then(module => module.default)
                .then(ReactPixel => {
                    // ReactPixel.init('573414703062456')
                    ReactPixel.init(FB_PIXEL)
                    ReactPixel.track('Purchase', {
                        value: Number(total_price) / USD_EQ,
                        currency: "USD"
                    })
                })
    
                eventApi.saveDataToGoogleSheet({
                    date: moment().format('DD/MM/YYYY HH:mm'),
                    email: email,
                    phone: phone,
                    totalPrice: total_price,
                    userURL: ""
                }, google_table_id, "sheet2")
            }
        }
    }, [paymentHash, message])

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "thankyou.title" })}</title>
            </Head>
            <div className={classes.main}>
                <Container className={classes.container}>
                    <img src={thankyou_img.src} alt="thankyou" className={classes.thankyouImg}/>
                    <div className={classes.text}>
                        <AiFillCheckCircle/>
                        <p>{intl.formatMessage({ id: "thankyou.text" })}</p>
                    </div>
                    {/* <HozhoThankyou/> */}
                </Container>
            </div>
        </>
    )
}

export const getServerSideProps = async ({ params, res }) => {
    const { paymentHash } = params

    let response = await eventApi.checkPaymentHash(paymentHash)
    
    if (response.message !== "Ok") {
        response = await eventApi.checkPaymentHash(paymentHash)

        if (response.message !== "Ok") {
            response = await eventApi.checkPaymentHash(paymentHash)            
        }
    }

    res.setHeader('X-Robots-Tag', 'noindex')
    
    return {
        props: {
            paymentHash,
            message: response.message
        }
    }
}

export default ThankyouPage