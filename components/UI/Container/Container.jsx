import { cx } from "../../../utils/classnames"
import classes from "./Container.module.css"

const Container = (props) => {
    const { className, children } = props

    return (
        <div className={classes.main}>
            <div className={cx(classes.container, className)}>
                {children}
            </div>
        </div>
    )
}

export default Container