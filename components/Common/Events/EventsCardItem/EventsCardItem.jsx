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

const EventsCardItem = (props) => {
    const { item, className, classImageName } = props

    const { locale } = useRouter()

    const { width } = useWindowDimensions()

    let date = locale === "ua" 
    ? moment(item.date).locale('uk').format("DD MMM YYYY")
    : moment(item.date).locale('en').format("DD MMM YYYY")

    const lineup = item.lineup[0].djs.map((el, index) => (
        el.name + (index < item.lineup[0].djs.length - 1 ? ", " : "")
    ))

    const city = locale === "ua" ? item.city : item.city_en
    
    const lineup_limit_text = shortText(lineup.join(" "), width > 568 ? 60 : 1000, "...");
    const address = shortText(`${city}, ${item.venue}`, 35, "...")

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
                            <h5>{item.title}</h5>
                            <div className={classes.lineup}>
                                <span>{lineup_limit_text}</span>
                            </div>
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