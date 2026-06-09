import { useIntl } from "react-intl"
import classes from "./ViceCity2026CampingItem.module.css"
import { AiOutlinePlus } from "react-icons/ai";
import { TfiMinus } from "react-icons/tfi";
import { useState } from "react";
import { Collapse } from "@mui/material";

const ViceCity2026CampingItem = (props) => {
    const { index, item } = props

    const [expanded, setExpanded] = useState(index === 0 ? true : false)

    const intl = useIntl()

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    return (
        <div className={`${classes.main} ${expanded && classes.active}`}>
            <div className={classes.header} onClick={handleExpandClick}>
                <p>0{index + 1} &nbsp;<span>{item.title}</span></p>
                {expanded ? <TfiMinus/> : <AiOutlinePlus/>}
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.points}>
                    {item.info.map(el => (
                        <div index={el.title}>
                            <span>{el.title}</span>
                            <p>{el.text}</p>
                        </div>
                    ))}
                </div>
            </Collapse>
        </div>
    )
}

export default ViceCity2026CampingItem