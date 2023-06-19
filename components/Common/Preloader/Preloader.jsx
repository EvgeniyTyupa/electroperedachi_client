import React from 'react'
import classes from './Preloader.module.css'
import Overflow from '../../UI/Overflow/Overflow'
import preloader from "/public/images/100x100.svg"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const Preloader = () => {

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <Overflow>
            <img
                src={preloader.src}
                alt="preloader"
                className={classes.img}
                data-aos="fade-up"
                data-aos-duration="300"
            />
        </Overflow>
    )
}

export default Preloader