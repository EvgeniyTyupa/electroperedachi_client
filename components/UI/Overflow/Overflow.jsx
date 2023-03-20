import React from 'react'
import { cx } from '../../../utils/classnames'
import classes from './Overflow.module.css'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Overflow = (props) => {
    const { children, className } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div
            className={cx(classes.main, className)}
            data-aos="fade"
            data-aos-duration="200"
        >
            {children}
        </div>
    )
}

export default Overflow