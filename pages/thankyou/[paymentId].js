import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import classes from "../../styles/Thankyou.module.css"

import thankyou_img from "/public/images/thankyou.svg"
import { AiFillCheckCircle } from "react-icons/ai"
import { useEffect } from "react"

import atob from "atob"

import { FB_PIXEL, TIKTOK_PIXEL, USD_EQ } from "../../utils/constants"
import { eventApi } from "../../api/api"

const ThankyouPage = (props) => {
    const { paymentHash } = props

    const intl = useIntl()

    useEffect(() => {
        if (paymentHash) {
            const decoded = JSON.parse(atob(paymentHash))
            const { total_price } = decoded
            
            if (total_price) {
                import('tiktok-pixel')
                .then(module => module.default)
                .then(TiktokPixel => {
                    TiktokPixel.init(TIKTOK_PIXEL)
                    TiktokPixel.track('Purchase', {
                        value: Number(total_price),
                        currency: "UAH"
                    })
                })
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
    const { paymentId } = params

    let paymentHash

    paymentHash = await eventApi.getPayment(paymentId)

    if (!paymentHash.paymentHash) {
        return {
            redirect: {
                destination: '/',
                permanent: false, // 307-redirect
            },
        }
    }

    res.setHeader('X-Robots-Tag', 'noindex')
    
    return {
        props: {
            paymentHash: paymentHash ? paymentHash.paymentHash : null
        }
    }
}

export default ThankyouPage