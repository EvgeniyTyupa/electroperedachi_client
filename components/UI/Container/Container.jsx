import { cx } from "../../../utils/classnames"
import classes from "./Container.module.css"

const Container = (props) => {
    const { className, children, disablePadding } = props

    return (
        <div className={cx(classes.main, disablePadding ? classes.disablePadding : "")}>
            <div className={cx(classes.container, className)}>
                {children}
            </div>
        </div>
    )
}

export default Container