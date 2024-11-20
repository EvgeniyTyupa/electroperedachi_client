import { Button } from '@mui/material'
import Image from 'next/image'
import { useRouter } from 'next/router'
import { useIntl } from 'react-intl'
import classes from './HozhoThankyou.module.css'
import hozho from "/public/images/hozho/hozho.png"
import hozho_mob from "/public/images/hozho/hozho_mob.png"

const HozhoThankyou = () => {
    const intl = useIntl()

    const router = useRouter()

    const onClick = () => {
        router.push("/events/hozho")
    }

    return (
        <div className={classes.main}>
            <div className={classes.info}>
                <p className={classes.topInfo}>{intl.formatMessage({ id: "hozho.thankyou" })}</p>
                <div className={classes.imgContainerMob}>
                    <Image src={hozho_mob} alt="banner" fill/>
                </div>
                <p className={classes.botInfo}>{intl.formatMessage({ id: "hozho.thankyou2" })}</p>
                <Button onClick={onClick} className={classes.buyButt}>{intl.formatMessage({ id: "hozho.buy" })}</Button>
            </div>
            <div className={classes.imgContainer}>
                <Image src={hozho} alt="banner" fill/>
            </div>
        </div>
    )
}

export default HozhoThankyou