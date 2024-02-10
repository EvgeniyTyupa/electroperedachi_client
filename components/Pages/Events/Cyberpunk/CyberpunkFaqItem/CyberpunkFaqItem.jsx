import { IconButton } from "@mui/material"
import { Collapse } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import ArrowSpeedIcon from "../../../../Common/Icons/ArrowSpeedIcon"
import classes from "./CyberpunkFaqItem.module.css"
import arrows from "/public/images/cyberpunk/arrows.svg"

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const CyberpunkFaqItem = (props) => {
    const { item } = props

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
                <h4>{title}</h4>
                <IconButton className={expanded ? classes.expBut : undefined}>
                    <ArrowSpeedIcon/>
                </IconButton>
            </div>
            <div className={classes.detailBorder}>
                <div className={classes.line}/>
                <div className={classes.parallelogram}/>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.expanded}>
                    <div className={classes.textBlock}>
                        <EditerMarkdown
                            source={text}
                            style={{
                                background: "transparent",
                                color: "white",
                                fontFamily: "Open Sans"
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default CyberpunkFaqItem