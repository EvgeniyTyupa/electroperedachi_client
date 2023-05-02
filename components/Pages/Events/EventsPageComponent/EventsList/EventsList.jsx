import { useState } from "react"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import CollapseEventsList from "./CollapseEventsList/CollapseEventsList"
import classes from "./EventsList.module.css"

const EventsList = (props) => {
    const { events, filterYear } = props

    const intl = useIntl()

    const [filteredEvents, setFilteredEvents] = useState(events)
    const [sortedEvents, setSortedEvents] = useState([])

    useEffect(() => {
        if (filterYear === "all") {
            setFilteredEvents(events)
        } else {
            const newEvents = []
            events.forEach((el) => {
                if (new Date(el.date).getFullYear() === filterYear) {
                    newEvents.push(el)
                }
            })
            setFilteredEvents(newEvents)
        }
    }, [events, filterYear])

    useEffect(() => {
        const newFiltered = [...filteredEvents]

        const uniqueEventsByYear = []

        const newSorted = []

        // getting count of array length with years
        newFiltered.forEach((el) => {
            let isUniqYear = true
            uniqueEventsByYear.forEach((event) => {
                if (
                    new Date(event.date).getFullYear() ===
                    new Date(el.date).getFullYear()
                ) {
                    isUniqYear = false
                }
            })
            if (isUniqYear) {
                uniqueEventsByYear.push(el)
            }
        })

        // getting array of arrays with unique years
        uniqueEventsByYear.forEach((el) => {
            newSorted.push([el])
        })

        // push to inner array other events from full list with same year
        newSorted.forEach((el) => {
            el.forEach((i_ev) => {
                newFiltered.forEach((event) => {
                    if (
                        new Date(i_ev.date).getFullYear() ===
                            new Date(event.date).getFullYear() &&
                        event._id !== i_ev._id
                    ) {
                        el.push(event)
                    }
                })
            })
        })

        const fin_res = []

        // getting count of array length with month in year
        newSorted.forEach((el) => {
            const uniqueEventsByMonth = []

            el.forEach((event) => {
                let isUniqMonth = true
                uniqueEventsByMonth.forEach((unique_event) => {
                    if (
                        new Date(event.date).getMonth() ===
                        new Date(unique_event.date).getMonth()
                    ) {
                        isUniqMonth = false
                    }
                })
                if (isUniqMonth) {
                    uniqueEventsByMonth.push(event)
                }
            })

            el = []

            // getting array of arrays with unique events by month in year
            uniqueEventsByMonth.forEach((event) => {
                el.push([event])
            })

            // push to inner array other events from full list with same month
            el.forEach((i_arr) => {
                i_arr.forEach((i_ev) => {
                    newFiltered.forEach((event) => {
                        if (
                            new Date(i_ev.date).getMonth() ===
                                new Date(event.date).getMonth() &&
                            new Date(i_ev.date).getFullYear() ===
                                new Date(event.date).getFullYear() &&
                            event._id !== i_ev._id
                        ) {
                            i_arr.push(event)
                        }
                    })
                })
            })

            fin_res.push(el)
        })

        setSortedEvents(fin_res)
    }, [filteredEvents])

    return (
        <div className={classes.main}>
            {sortedEvents.map((el, index) => {
                return (
                    el.map(month => (
                        <CollapseEventsList defaultOpen={index === 0} events={month} key={month[0]._id}/>
                    ))
                )
            })}
            {sortedEvents.length === 0 && (
                <p>{intl.formatMessage({ id: "events.empty" })}</p>
            )}
        </div>
    )
}

export default EventsList
