import React from "react"
import { motion } from "framer-motion"
import classes from "./AnimatedPage.module.css"

const AnimatedPage = (props) => {
    const { children } = props

    const variants = {
        in: {
            // x: direction === "right" ? "100%" : "-100%",
            opacity: 0,
            transform: "scale(0.9)",
            transition: {
              duration: 0.5,
              ease: 'easeInOut'
            }
        },
        inactive: {
            opacity: 1,
            x: "0",
            transform: "scale(1)",
            transition: {
              duration: 1,
              ease: 'easeInOut'
            },
        },
        out: {
            opacity: 0,
            transform: "scale(0.9)",
            // x: direction === "right" ? "100%" : "-100%",
            transition: {
              duration: 1,
              ease: 'easeInOut'
            }
        }
    }


    return (
        <motion.div
            variants={variants}
            initial="in"
            animate="inactive"
            exit="out"
            className={classes.main}
        >
            {children}
        </motion.div>
    )
}

export default AnimatedPage
