import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../../components/UI/Container/Container"
import classes from "../../styles/Thankyou.module.css"

import thankyou_img from "/public/images/thankyou.svg"
import { AiFillCheckCircle } from "react-icons/ai"

const ThankyouPage = () => {
    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "thankyou.title" })} | electroperedachi</title>
            </Head>
            <div className={classes.main}>
                <Container className={classes.container}>
                    <img src={thankyou_img.src} alt="thankyou" className={classes.thankyouImg}/>
                    <div className={classes.text}>
                        <AiFillCheckCircle/>
                        <p>{intl.formatMessage({ id: "thankyou.text" })}</p>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default ThankyouPage