import { useState } from "react"
import classes from "../../styles/QrReader.module.css"
import jsQR from "jsqr"
import { eventApi } from "../../api/api"
import Container from "../../components/UI/Container/Container"
import { useRef } from "react"
import ActionButton from "../../components/UI/Buttons/ActionButton/ActionButton"
import Head from "next/head"
import { useAppContext } from "../../context/AppContext"
import { useEffect } from "react"

const QRCodeReader = (props) => {
    const { currentEvent } = props

    const { setIsFetchingContext } = useAppContext()

    const [result, setResult] = useState("")
    const [capturedImage, setCapturedImage] = useState(null)
    const [isScanning, setIsScanning] = useState(true);

    const videoRef = useRef(null)

    const handleReset = () => {
        setResult("")
        setCapturedImage(null)
        setIsScanning(true);
    }

    useEffect(() => {
        const constraints = { video: { facingMode: "environment" } }

        const startCamera = async () => {
            try {
                const stream = await navigator.mediaDevices.getUserMedia(
                    constraints
                )
                videoRef.current.srcObject = stream
            } catch (error) {
                console.error("Error accessing camera:", error)
            }
        }

        startCamera()

        return () => {
            // Stop the camera when the component unmounts
            if (videoRef.current.srcObject) {
                videoRef.current.srcObject.getTracks().forEach((track) => {
                    track.stop()
                })
            }
        }
    }, [])

    const processFrame = async () => {
        if (!isScanning) {
            return;
        }
        const video = videoRef.current
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        context.drawImage(video, 0, 0, canvas.width, canvas.height)

        const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
        )
        const code = jsQR(imageData.data, imageData.width, imageData.height)

        if (code) {
            setIsFetchingContext(true)
            setIsScanning(false);

            const { _id, userId, eventId } = JSON.parse(code.data)

            const image = new Image()
            image.src = canvas.toDataURL()
            setCapturedImage(image.src)

            context.clearRect(0, 0, canvas.width, canvas.height);

            const res = await eventApi.scanTicket(
                _id,
                userId,
                eventId,
                currentEvent._id
            )

            setResult(res)
            setIsFetchingContext(false)

            setTimeout(() => {
                setIsScanning(true);
            }, 2000);
        }
        requestAnimationFrame(processFrame)
    }

    useEffect(() => {
        requestAnimationFrame(processFrame)
    }, [])

    return (
        <>
            <Head>
                <meta name="robots" content="noindex" />
            </Head>
            <div className={classes.qrReader}>
                <Container className={classes.container}>
                    <div className={classes.qrBox}>
                        {capturedImage && (
                            <>
                                <img src={capturedImage} className={classes.previewStyle}/>
                                <ActionButton
                                    onClick={handleReset}
                                    disabled={!isScanning}
                                >
                                    {!isScanning ? "Wait..." : "Submit new QR code"}
                                </ActionButton>
                            </>
                        )}
                        <video
                            ref={videoRef}
                            autoPlay
                            playsInline
                            muted
                            style={{
                                display: capturedImage ? "none" : "block"
                            }}
                        />
                    </div>
                    <div className={classes.qrOutput}>
                        {result ? (
                            <div className={classes.outputContainer}>
                                {result.user && (
                                    <p>
                                        <b>Name:</b> {result.user.email}
                                    </p>
                                )}
                                {result.user && (
                                    <p>
                                        <b>Event:</b> {result.event.title}
                                    </p>
                                )}
                                <p>
                                    <b>Status:</b>
                                    <span
                                        className={
                                            result.status === "good"
                                                ? classes.good
                                                : classes.bad
                                        }
                                    >
                                        {" "}
                                        {result.status === "good"
                                            ? "good"
                                            : "bad"}
                                    </span>
                                </p>
                                <p>
                                    <b>Message:</b> {result.message}
                                </p>
                            </div>
                        ) : (
                            <p className={classes.noData}>
                                No data submited yet
                            </p>
                        )}
                    </div>
                </Container>
            </div>
        </>
    )
}

export default QRCodeReader

export const getStaticPaths = async ({ locales }) => {
    const { events } = await eventApi.getEvents(1, 1000)

    const paths = []

    events.forEach((event) => {
        for (const locale of locales) {
            paths.push({
                params: { eventSlug: event.title_code },
                locale
            })
        }
    })

    return {
        paths: paths,
        fallback: "blocking"
    }
}

export async function getStaticProps(context) {
    const { event } = await eventApi.getEvent(context.params.eventSlug)

    if (!event) {
        return {
            notFound: true
        }
    }

    return {
        props: {
            currentEvent: event
        },
        revalidate: 10
    }
}
