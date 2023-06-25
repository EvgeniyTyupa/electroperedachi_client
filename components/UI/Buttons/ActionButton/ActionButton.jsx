import { Button } from "@mui/material"
import { cx } from "../../../../utils/classnames"
import classes from './ActionButton.module.css'

const ActionButton = (props) => {
    const { children, onClick, className, color = "white", type = "button", disabled = false } = props

    return (
        <Button
            onClick={onClick}
            type={type}
            className={cx(classes.main, className)}
            sx={{ color: color }}
            disabled={disabled}
        >
            {children}
        </Button>
    )
}

export default ActionButton