import { IconButton } from "@mui/material"
import { Collapse } from "@mui/material"
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import { useState } from "react"
import { AiOutlinePlus } from "react-icons/ai"
import { cx } from "../../../../../utils/classnames"
import classes from "./VampireFaqItem.module.css"

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const VampireFaqItem = (props) => {
    const { item, index } = props

    const { locale } = useRouter()

    const [expanded, setExpanded] = useState(false)

    const handleExpandClick = () => {
        setExpanded(!expanded)
    }

    const title = locale === "ua" ? item.title : item.title_en
    const text = locale === "ua" ? item.text : item.text_e

    return (
        <div className={cx(classes.main, index === 0 ? classes.first : "")}>
            <div
                className={classes.info}
                onClick={handleExpandClick}
            >
                <h5>0{index + 1}</h5>
                <div className={classes.title}>
                    <h4>{title}</h4>
                    <IconButton className={expanded ? classes.expBut : undefined}>
                        <AiOutlinePlus />
                    </IconButton>
                </div>
            </div>
            <Collapse
                in={expanded}
                timeout="auto"
                unmountOnExit
            >
                <div className={classes.expanded}>
                    <div className={classes.textBlock}>
                        <EditerMarkdown
                            source={text}
                            style={{
                                background: "transparent",
                                color: "white",
                                fontFamily: "ArialCurvie"
                            }}
                        />
                    </div>
                </div>
            </Collapse>
        </div>
    )
}

export default VampireFaqItem
