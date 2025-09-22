import { Collapse, IconButton } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import classes from "./MasqueradeFaqItem.module.css"
import { FiPlus } from "react-icons/fi";

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const MasqueradeFaqItem = (props) => {
    const { item, index } = props

    const { locale } = useRouter()

    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const title = locale === "ua" ? item.title : item.title_en
    const text = locale === "ua" ? item.text : item.text_en

    return (
        <div className={classes.main}>
            <div className={classes.info} onClick={handleExpandClick}>
                <p>{index < 10 ? "0" : ""}{index + 1}</p>
                <h4>{title}</h4>
                <button className={expanded ? classes.expBut : undefined}>
                    <FiPlus/>
                </button>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.expanded}>
                    <div className={classes.textBlock}>
                        <EditerMarkdown
                            source={text}
                            style={{
                                background: "transparent",
                                color: "white",
                                fontFamily: "Raleway",
                                fontWeight: "400",
                                fontSize: "18px"
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default MasqueradeFaqItem