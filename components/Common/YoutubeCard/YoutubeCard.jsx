import classes from "./YoutubeCard.module.css"

const YoutubeCard = (props) => {
    const { src, title } = props

    return (
        <div className={classes.main}>
            <iframe src={src} title={title} frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
            <p>{title}</p>
        </div>
    )
}

export default YoutubeCard