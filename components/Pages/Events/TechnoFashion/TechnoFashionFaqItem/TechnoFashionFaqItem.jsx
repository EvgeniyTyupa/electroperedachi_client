import { IconButton } from "@mui/material"
import { Collapse } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import classes from "./TechnoFashionFaqItem.module.css"
import { LiaPlusSolid } from "react-icons/lia";

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const TechnoFashionFaqItem = (props) => {
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
                    <LiaPlusSolid />
                </IconButton>
            </div>
            <div className={classes.detailBorder}>
                <div className={classes.line}/>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
                <div className={classes.expanded}>
                    <div className={classes.textBlock}>
                        <EditerMarkdown
                            source={text}
                            style={{
                                background: "transparent",
                                color: "white",
                                fontFamily: "Helvetica"
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default TechnoFashionFaqItem