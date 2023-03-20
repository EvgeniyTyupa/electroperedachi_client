import Link from "next/link"
import { RiArrowRightLine } from "react-icons/ri"
import classes from './NavigateButton.module.css'

const NavigateButton = (props) => {
    const { text, href } = props

    return (
        <Link href={href} className={classes.viewMore}>
            <span>{text}</span>
            <RiArrowRightLine/>
        </Link>
    )
}

export default NavigateButton