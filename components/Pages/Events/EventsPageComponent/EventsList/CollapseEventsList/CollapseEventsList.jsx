import { Button } from "@mui/material"
import { useRouter } from "next/router"
import classes from "./CollapseEventsList.module.css"
import moment from "moment"
import { RiArrowRightLine } from "react-icons/ri"
import { Collapse } from "@mui/material"
import { useState } from "react"
import EventsCardItem from "../../../../../Common/Events/EventsCardItem/EventsCardItem"
import { cx } from "../../../../../../utils/classnames"
import { useRef } from "react"
import { useEffect } from "react"

const CollapseEventsList = (props) => {
    const { events, defaultOpen } = props

    const { locale } = useRouter()

    const [lineHeight, setLineHeight] = useState(20)

    const containerRef = useRef(null)

    const [isOpen, setIsOpen] = useState(defaultOpen ? defaultOpen : false)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    const month =
        locale === "ua"
            ? moment(events[0].date).locale("uk").format("MMM")
            : moment(events[0].date).locale("en").format("MMM")

    useEffect(() => {
        if (isOpen) {
            const timer = setTimeout(() => {
                setLineHeight(containerRef.current.clientHeight)
              }, 270);
            return () => clearTimeout(timer);
        }
    })

    return (
        <div className={classes.main} ref={containerRef}>
            <div className={classes.title}>
                <div className={classes.point}>
                    <div className={classes.circle} />
                    <div
                        className={classes.line}
                        style={{
                            height: isOpen ? `${lineHeight}px` : "20px"
                        }}
                    />
                </div>
                <Button
                    onClick={handleOpen}
                    className={cx(
                        classes.opnBut,
                        isOpen ? classes.open : undefined
                    )}
                >
                    <span>
                        {month} {new Date(events[0].date).getFullYear()}
                    </span>
                    <span
                        style={{
                            display: "block",
                            marginLeft: "7px",
                            position: "relative",
                            top: isOpen ? "0" : "5px",
                            transitionDuration: ".3s",
                            transform: isOpen
                                ? "rotate(90deg)"
                                : "rotate(0deg)"
                        }}
                    >
                        <RiArrowRightLine />
                    </span>
                </Button>
            </div>
            <Collapse in={isOpen} timeout="auto" unmountOnExit>
                <div className={classes.wrapper}>
                    {events.map((el) => (
                        <EventsCardItem item={el} key={el._id} className={classes.card} classImageName={classes.cardImage}/>
                    ))}
                </div>
            </Collapse>
        </div>
    )
}

export default CollapseEventsList
