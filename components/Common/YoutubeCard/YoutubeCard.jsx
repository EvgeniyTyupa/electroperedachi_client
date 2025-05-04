import classes from "./YoutubeCard.module.css"

const YoutubeCard = (props) => {
    const { src, title } = props

    return (
        <div className={classes.main}>
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