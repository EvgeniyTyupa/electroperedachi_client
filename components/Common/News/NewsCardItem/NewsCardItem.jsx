import { useEffect, useState, useRef } from "react"
import classes from "./NewsCardItem.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import Link from "next/link"
import LinesEllipsis from "react-lines-ellipsis"
import PostDate from "../PostDate/PostDate"
import { cx } from "../../../../utils/classnames"
import Header from "../../../UI/Text/Header/Header"

const NewsCardItem = (props) => {
    const { item, className } = props
    const { locale } = useRouter()

    const titleRef = useRef(null)

    const [titleLinesCount, setTitleLinesCount] = useState(1)

    const calculateMaxLines = () => {
        if (titleLinesCount === 1) {
            return 4
        } else if (titleLinesCount === 2) {
            return 2
        } else if (titleLinesCount === 3) {
            return 1
        } else {
            return 0
        }
    }

    let title = locale === "ua" ? item.title : item.title_en

    let description = locale === "ua" ? item.description : item.description_en

    useEffect(() => {
        if (titleRef && titleRef.current) {
            let lineHeight = Number(
                window
                    .getComputedStyle(titleRef.current)
                    .lineHeight.split("px")[0]
            )
            let lineCount = titleRef.current.clientHeight / lineHeight
            setTitleLinesCount(lineCount)
        }
    }, [titleRef, titleRef.current])

    return (
        <div className={cx(classes.main, className)}>
            <Link href={`/news/${item.code}`}>
                <div className={classes.imageContainer}>
                    <Image
                        src={item.image}
                        alt={locale === "/ua" ? item.title : item.title_en}
                        style={{ objectFit: "cover" }}
                        className={classes.image}
                        fill
                    />
                </div>
            </Link>
            <div className={classes.content}>
                <PostDate date={item.created_at} />
                <Link href={`/news/${item.code}`}>
                    <Header type="h4" className={classes.title} titleRef={titleRef}>
                        {title}
                    </Header>
                </Link>
                <LinesEllipsis
                    text={description.trim()}
                    maxLine={calculateMaxLines()}
                    ellipsis="..."
                    trimRight
                    basedOn="letters"
                    className={classes.text}
                />
            </div>
        </div>
    )
}

export default NewsCardItem
