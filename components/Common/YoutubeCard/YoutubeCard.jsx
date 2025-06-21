import { useState } from "react"
import classes from "./YoutubeCard.module.css"

const YoutubeCard = (props) => {
    const { src, title, className } = props

    const [isShowContainer, setIsShowContainer] = useState(true)

    return (
        <div className={`${classes.main} ${className}`} onClick={() => setIsShowContainer(false)}>
            {isShowContainer && <div className={classes.container}/>}
            <iframe 
                src={src}
                loading="lazy"
                style={{ border: "none" }}
                allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                title={title}
            ></iframe>
        </div>
    )
}

export default YoutubeCard