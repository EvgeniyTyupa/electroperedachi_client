import { MenuItem } from "@mui/material"
import { useState } from "react"
import { useEffect } from "react"
import { useIntl } from "react-intl"
import CustomSelect from "../../../../UI/Form/CustomSelect"
import classes from "./EventsViewModeControls.module.css"

const EventsViewModeControls = (props) => {
    const { filterYear, setFilterYear } = props

    const [years, setYears] = useState([])

    const intl = useIntl()

    const startYear = 2016
    const currentYear = new Date().getFullYear()

    useEffect(() => {
        const newYears = []
        for (let i = startYear; i <= currentYear; i++) {
            newYears.push(i)
        }
        setYears(newYears)
    }, [])

    return (
        <div className={classes.main}>
            <div className={classes.filters}>
                <CustomSelect
                    inputColor="white"
                    value={filterYear}
                    onChange={(e) => setFilterYear(e.target.value)}
                >
                    {years.map((el) => (
                        <MenuItem value={el} key={el}>
                            {el}
                        </MenuItem>
                    ))}
                    <MenuItem value="all">
                        {intl.formatMessage({ id: "events.allYears" })}
                    </MenuItem>
                </CustomSelect>
            </div>
        </div>
    )
}

export default EventsViewModeControls
