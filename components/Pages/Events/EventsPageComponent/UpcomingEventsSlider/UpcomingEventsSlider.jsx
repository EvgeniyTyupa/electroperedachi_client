import classes from "./UpcomingEventsSlider.module.css"
import { AnimatePresence, motion } from "framer-motion"
import { IconButton } from "@mui/material"
import { RiArrowRightLine, RiArrowLeftLine } from "react-icons/ri"
import { useState } from "react"
import { cx } from "../../../../../utils/classnames"
import UpcomingSlideItem from "./UpcomingSlideItem/UpcomingSlideItem"

const UpcomingEventsSlider = (props) => {
    const { events } = props

    const [currentIndex, setCurrentIndex] = useState(0)
    const [direction, setDirection] = useState("right")

    const moveLeft = () => {
        setDirection("left")
        if (currentIndex - 1 >= 0) {
            setCurrentIndex(currentIndex - 1)
        } else {
            setCurrentIndex(events.length - 1)
        }
    }

    const moveRight = () => {
        setDirection("right")
        if (currentIndex + 1 <= events.length - 1) {
            setCurrentIndex(currentIndex + 1)
        } else {
            setCurrentIndex(0)
        }
    }

    const variants = {
        in: {
            opacity: 0,
            transform: direction === "right" ? "translateX(100%) scale(0.9)" : "translateX(-100%) scale(0.9)",
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        inactive: {
            opacity: 1,
            transform: "translateX(0%) scale(1)",
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        },
        out: {
            opacity: 0,
            transform: direction === "right" ? "translateX(-100%) scale(0.9)" : "translateX(100%) scale(0.9)",
            transition: {
                duration: 1,
                ease: "easeInOut"
            }
        }
    }

    return (
        <div className={classes.main}>
            {events.length > 1 && (
                <IconButton
                    onClick={moveLeft}
                    className={cx(classes.moveButt, classes.moveLeftButt)}
                >
                    <RiArrowLeftLine />
                </IconButton>
            )}
            <AnimatePresence exitBeforeEnter={true}>
                <motion.div
                    key={currentIndex}
                    variants={variants}
                    initial="in"
                    animate="inactive"
                    exit="out"
                    className={classes.slide}
                >
                    <UpcomingSlideItem item={events[currentIndex]} />
                </motion.div>
            </AnimatePresence>
            {events.length > 1 && (
                <IconButton
                    onClick={moveRight}
                    className={cx(classes.moveButt, classes.moveRightButt)}
                >
                    <RiArrowRightLine />
                </IconButton>
            )}
        </div>
    )
}

export default UpcomingEventsSlider
