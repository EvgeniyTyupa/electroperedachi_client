import React, { useState } from 'react'
import { cx } from '../../../../utils/classnames'
import classes from './Toogle.module.css'

const Toogle = (props) => {
    const {
        onChange,
        checked = false,
        label,
        className
    } = props

    const [isChecked, setIsChecked] = useState(checked)

    const handleChecked = () => {
        setIsChecked(!isChecked)
        onChange(!isChecked)
    }

    return (
        <div className={cx(classes.main, className)}>
            <label className={classes.switch}>
                <input 
                    type="checkbox" 
                    className={classes.checkbox}
                    checked={isChecked}
                    onChange={handleChecked}
                />
                <span className={classes.slider}/>
            </label>
            {label && <span className={classes.toogleLabel} onClick={handleChecked}>{label}</span>}
        </div>
    )
}

export default Toogle