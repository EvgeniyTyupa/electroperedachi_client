import { Collapse, IconButton } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import Header from "../../../../../../UI/Text/Header/Header"
import classes from "./FaqItem.module.css"
import { RiArrowRightLine } from "react-icons/ri"


const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const FaqItem = (props) => {
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
            <div className={classes.info}>
                <Header type="h4">{title}</Header>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <div className={classes.textBlock}>
                        <EditerMarkdown
                            source={text}
                            style={{
                                background: "transparent",
                                color: "black",
                                fontFamily: "Helvetica"
                            }}
                        />
                    </div>
                </Collapse>
            </div>
            <IconButton
                onClick={handleExpandClick}
                className={expanded ? classes.expanded : ""}
            >
                <RiArrowRightLine />
            </IconButton>
        </div>
    )
}

export default FaqItem
