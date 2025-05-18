import { useEffect, useRef, useState } from "react"
import classes from "./Video.module.css"
import { FaPlayCircle } from "react-icons/fa";
import { IconButton } from "@mui/material";
import Image from "next/image";

const Video = (props) => {
    const { src, poster, width, height } = props

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
            { rootMargin: '200px' }
        )
        io.observe(containerRef.current)
        return () => io.disconnect()
    }, [])

    return (
        <div className={classes.main}
            ref={containerRef}
            style={{ width, height }}
            onClick={() => setPlaying(true)}
        >
            {!playing ? (
                <>
                    <Image
                        src={poster}
                        alt="Video thumbnail"
                        layout="fill"
                        objectFit="cover"
                        unoptimized={false}
                        priority={false}
                    />
                    <IconButton className={classes.play}>
                        <FaPlayCircle/>
                    </IconButton>
                </>
            ) : (
                inView && (
                    <video
                        src={src}
                        poster={poster}
                        preload="auto"
                        autoPlay
                        controls
                        width={width}
                        height={height}
                        style={{ display: 'block' }}
                        {...props}
                    />
                )
            )}
        </div>
    )
}

export default Video