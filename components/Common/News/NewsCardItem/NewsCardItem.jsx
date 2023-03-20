import classes from "./NewsCardItem.module.css"
import Image from 'next/image';
import { useRouter } from "next/router";
import Link from "next/link";
import LinesEllipsis from 'react-lines-ellipsis'
import PostDate from "../PostDate/PostDate";
import { cx } from "../../../../utils/classnames";

const NewsCardItem = (props) => {
    const { item, className } = props
    const { locale } = useRouter()
    
    let title = locale === "ua" ? item.title : item.title_en

    let description = locale === "ua" ? item.description : item.description_en

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
                <PostDate date={item.created_at}/>
                <Link href={`/news/${item.code}`}>
                    <h4 className={classes.title}>{title}</h4>
                </Link>
                <LinesEllipsis
                    text={description.trim()}
                    maxLine='3'
                    ellipsis='...'
                    trimRight
                    basedOn='letters'
                    className={classes.text}
                />
            </div>
        </div>
    )
}

export default NewsCardItem