import { IconButton } from "@mui/material"
import { Collapse } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import classes from "./ViceCityFaqItem.module.css"
import next_arr from "/public/images/vice-city/next_arr.svg"

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const ViceCityFaqItem = (props) => {
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
                    <img src={next_arr.src} alt="arrow"/>
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

export default ViceCityFaqItem