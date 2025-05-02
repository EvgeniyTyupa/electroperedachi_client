import React from "react"
import { useRouter } from "next/router"
import Header from "../../../../../UI/Text/Header/Header"
import classes from "./EventDayAndStageLineUp.module.css"
import moment from "moment"
import Link from "next/link"

const EventDayAndStageLineUp = ({ day, event, index }) => {
    const { locale } = useRouter()
    const loc = locale === "ua" ? "uk" : "en"
    // Create a collator for locale-sensitive sorting
    const collator = new Intl.Collator(["uk", "en"], { sensitivity: "base" })

    return (
        <div className={classes.main}>
            <Header type="h4">{moment(event.dates[index].date).locale(loc).format("dddd")}</Header>
            <div className={classes.stages}>
                {day.stages.map((stage, stageIdx) => {
                    // Sort slots by the first DJ's name in each slot
                    const sortedSlots = [...stage.slots].sort((slotA, slotB) => {
                        const nameA = slotA.djs[0]?.name ?? ""
                        const nameB = slotB.djs[0]?.name ?? ""
                        return collator.compare(nameA, nameB)
                    })
                    return (
                        <div
                            key={stageIdx}
                            className={classes.stage}
                        >
                            <Header type="h5">{stage.name ?? `STAGE ${stageIdx + 1}`}</Header>
                            {sortedSlots.map((slot, slotIdx) => {
                                // Also sort DJs within each slot
                                const sortedDJs = [...slot.djs].sort((a, b) => collator.compare(a.name, b.name))
                                return (
                                    <div
                                        key={slotIdx}
                                        className={classes.slot}
                                    >
                                        {sortedDJs.map((dj, djIdx) => (
                                            <React.Fragment key={djIdx}>
                                                <Link
                                                    target="_blank"
                                                    href={dj.info_link}
                                                >
                                                    {dj.name}
                                                </Link>
                                                {djIdx < sortedDJs.length - 1 && <span> &amp; </span>}
                                            </React.Fragment>
                                        ))}
                                    </div>
                                )
                            })}
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default EventDayAndStageLineUp
