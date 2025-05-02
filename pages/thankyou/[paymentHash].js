import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import classes from "../../styles/Thankyou.module.css"

import thankyou_img from "/public/images/thankyou.svg"
import { AiFillCheckCircle } from "react-icons/ai"
import { useEffect } from "react"

import atob from "atob"

import { FB_PIXEL, USD_EQ } from "../../utils/constants"
import HozhoThankyou from "../../components/Pages/Events/Hozho/HozhoThankyou/HozhoThankyou"
import { ttqPurchase } from "../../utils/tikTokTracker"

const ThankyouPage = (props) => {
    const { paymentHash } = props

    const intl = useIntl()
    
    useEffect(() => {
        if (paymentHash) {
            const decoded = JSON.parse(atob(paymentHash))
            const { total_price } = decoded
            
            if (total_price) {
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

                ttqPurchase({ value: Number(total_price) / USD_EQ, currency: "USD" })
            }
        }

    }, [paymentHash])

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

    res.setHeader('X-Robots-Tag', 'noindex')
    
    return {
        props: {
            paymentHash
        }
    }
}

export default ThankyouPage