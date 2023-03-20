import { Button } from "@mui/material"
import { cx } from "../../../../utils/classnames"
import classes from "./ExploreButton.module.css"
import { RiArrowRightLine } from "react-icons/ri"
import Link from "next/link"

const ExploreButton = (props) => {
    const { className, onClick, text, href = "" } = props

    return (
        <Link href={href}>
            <Button
                className={cx(classes.button, className)}
                onClick={onClick}
            >
                {text && <p>{text}</p>}
                <RiArrowRightLine/>
            </Button>
        </Link>
    )
}

export default ExploreButton