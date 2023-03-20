import { Fragment } from "react"
import { cx } from "../../../../utils/classnames"
import classes from './Header.module.css'

const Header = (props) => {
    const { children, className, color = "white", type } = props

    return (
        <Fragment>
            {type === "h1" && (
                <h1
                    className={cx(classes.h1, className)}
                    style={{ color: color }}
                >
                    {children}
                </h1>
            )}
            {type === "h2" && (
                <h2 
                    className={cx(classes.h2, className)}
                    style={{ color: color }}
                >
                    {children}
                </h2>
            )}
             {type === "h3" && (
                <h3 
                    className={cx(classes.h3, className)}
                    style={{ color: color }}
                >
                    {children}
                </h3>
            )}
            {type === "h4" && (
                <h4 
                    className={cx(classes.h4, className)}
                    style={{ color: color }}
                >
                    {children}
                </h4>
            )}
            {type === "h5" && (
                <h5
                    className={cx(classes.h5, className)}
                    style={{ color: color }}
                >
                    {children}
                </h5>
            )}
        </Fragment>
    )
}

export default Header