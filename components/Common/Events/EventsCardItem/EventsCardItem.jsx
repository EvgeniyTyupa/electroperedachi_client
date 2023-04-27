import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/router'
import classes from './EventsCardItem.module.css'
import moment from "moment";
import { shortText } from "limit-text-js";
import { Divider } from '@mui/material';
import { HiLocationMarker } from 'react-icons/hi'
import { cx } from '../../../../utils/classnames';
import useWindowDimensions from '../../../../hooks/useWindowDimension';
import LinesEllipsis from 'react-lines-ellipsis';
import { useRef } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

const EventsCardItem = (props) => {
    const { item, className, classImageName } = props

    const titleRef = useRef(null)

    const [titleLinesCount, setTitleLinesCount] = useState(1)

    const { locale } = useRouter()

    const { width } = useWindowDimensions()

    let date = locale === "ua" 
    ? moment(item.date).locale('uk').format("DD MMM YYYY")
    : moment(item.date).locale('en').format("DD MMM YYYY")

    const lineup = item.lineup[0].djs.map((el, index) => (
        el.name + (index < item.lineup[0].djs.length - 1 ? ", " : "")
    ))

    const city = locale === "ua" ? item.city : item.city_en
    
    const lineup_limit_text = shortText(lineup.join(" "), width > 1440 ? 120 : (width > 1000 && width <= 1440) ? 60 : 1000, "...");
    const address = shortText(`${city}${item.venue ? `, ${item.venue}` : ""}`, 35, "...")

    const calculateMaxLines = () => {
        if (titleLinesCount === 1) {
            return 2
        } else if (titleLinesCount === 2) {
            return 1
        } else {
            return 0
        }
    }

    useEffect(() => {
        if (titleRef && titleRef.current) {
            let lineHeight = Number(window.getComputedStyle(titleRef.current).lineHeight.split("px")[0])
            console.log(titleRef.current.clientHeight, lineHeight, Number(window.getComputedStyle(titleRef.current).lineHeight.split("px")[0]))
            let lineCount = titleRef.current.clientHeight / lineHeight
            setTitleLinesCount(lineCount)
        }
    }, [titleRef, titleRef.current])

    return (
        <div className={cx(classes.main, className)}>
            <Link href={`/events/${item.title_code}`}>
                <div className={cx(classes.imageContainer, classImageName)}>
                    <Image
                        src={item.poster.image}
                        alt={item.title}
                        style={{ objectFit: "cover" }}
                        className={classes.image}
                        fill
                    />
                </div>
                <div className={classes.info}>
                    <div className={classes.mainInfo}>
                        <div className={classes.date}>
                            <p>{date}</p>
                        </div>
                        <div className={classes.titleAndLineup}>
                            <h5 ref={titleRef}>{item.title}</h5>
                            <LinesEllipsis
                                text={lineup.join(" ")}
                                maxLine={width > 568 ? calculateMaxLines() : 6}
                                ellipsis="..."
                                trimRight
                                basedOn="words"
                                className={classes.lineup}
                            />
                        </div>
                    </div>
                    <Divider className={classes.innerDivider} sx={{
                        width: "100%",
                        height: "1px",
                        color: "#C4C4C4",
                        backgroundColor: "#C4C4C4",
                        margin: "15px 0"
                    }}/>
                    {(city || item.venue) && (
                        <div className={classes.infoLocation}>
                            <div className={classes.infoField}>
                                <HiLocationMarker/>
                                <address>{address}</address>
                            </div>
                        </div>
                    )}
                </div>
            </Link>
        </div>
    )
}

export default EventsCardItem