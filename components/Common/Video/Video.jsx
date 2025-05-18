// components/Video.jsx
import { useEffect, useRef, useState } from "react"
import classes from "./Video.module.css"
import { IoPlayCircleOutline } from "react-icons/io5"
import { IconButton } from "@mui/material"
import Image from "next/image"

const Video = ({ src, poster, ratioClass = "", ...videoProps }) => {
    const [playing, setPlaying] = useState(false)
    const [inView, setInView] = useState(false)
    const containerRef = useRef(null)

    useEffect(() => {
        if (!containerRef.current) return
        const io = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setInView(true)
                    io.disconnect()
                }
            },
            { rootMargin: "200px" }
        )
        io.observe(containerRef.current)
        return () => io.disconnect()
    }, [])

    return (
        <div
            ref={containerRef}
            className={`${classes.main} ${ratioClass}`}
            onClick={() => setPlaying(true)}
        >
        {!playing && (
            <>
            <Image
                src={poster}
                alt="Video thumbnail"
                fill
                className={classes.poster}
                priority={false}
                unoptimized={false}
            />
            <IconButton className={classes.play}>
                <IoPlayCircleOutline />
            </IconButton>
            </>
        )}

        {playing && inView && (
            <video
                className={classes.video}
                src={src}
                poster={poster}
                preload="auto"
                autoPlay
                controls
                {...videoProps}
            />
        )}
        </div>
    )
}

export default Video
