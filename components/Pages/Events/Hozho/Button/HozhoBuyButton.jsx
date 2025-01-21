import { useIntl } from "react-intl"
import classes from "./HozhoBuyButton.module.css"
import icon from "/public/images/hozho/buy_button_icon.svg"
import bg from "/public/images/hozho/button_bg.svg"

const HozhoBuyButton = (props) => {
    const intl = useIntl()

    return (
        <button
            className={classes.main}
            {...props}
            style={{
                backgroundImage: `url(${bg.src})`,
            }}
        >
            <img src={icon.src} alt="buy ticket icon"/>
            <p>{intl.formatMessage({ id: "hozho.buyButt" })}</p>
            <div className={classes.shadow}/>
        </button>
    )
}

export default HozhoBuyButton