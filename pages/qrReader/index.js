import { useState } from "react"
import classes from "../../styles/QrReader.module.css"
import jsQR from "jsqr"
import { eventApi } from "../../api/api"
import { useEffect } from "react"
import Container from "../../components/UI/Container/Container"

const QRCodeReader = () => {
    const [result, setResult] = useState("")
    const [imageSource, setImageSource] = useState("")

    const handleCapture = () => {
        const video = document.createElement("video")
        const canvas = document.createElement("canvas")
        const context = canvas.getContext("2d")

        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                video.srcObject = stream
                video.play()

                video.onloadedmetadata = () => {
                    canvas.width = video.videoWidth
                    canvas.height = video.videoHeight
                    context.drawImage(video, 0, 0, canvas.width, canvas.height)

                    const imageDataURL = canvas.toDataURL("image/png")
                    setImageSource(imageDataURL)

                    video.srcObject.getTracks().forEach((track) => track.stop())
                }
            })
            .catch((error) => {
                console.error("Error accessing camera:", error)
            })
    }

    const handleImageUpload = (event) => {
        const file = event.target.files[0]
        const reader = new FileReader()

        reader.onloadend = () => {
            setImageSource(reader.result)
        }

        if (file) {
            reader.readAsDataURL(file)
        }
    }

    useEffect(() => {
        const handleScan = () => {
            const img = new Image()
            img.onload = async () => {
                const canvas = document.createElement("canvas")
                const context = canvas.getContext("2d")
                canvas.width = img.width
                canvas.height = img.height
                context.drawImage(img, 0, 0, canvas.width, canvas.height)
                const imageData = context.getImageData(
                    0,
                    0,
                    canvas.width,
                    canvas.height
                )
                const code = jsQR(
                    imageData.data,
                    imageData.width,
                    imageData.height
                )

                if (code) {
                    const { _id, userId, eventId } = JSON.parse(code.data)
                    const res = await eventApi.scanTicket(_id, userId, eventId)
                    setResult(res)
                } else {
                    setResult({
                        status: "bad",
                        message: "QR code not found!"
                    })
                }
            }
            img.src = imageSource
        }

        handleScan()
    }, [imageSource])

    console.log(result)

    return (
        <div className={classes.qrReader}>
            <Container className={classes.container}>
                <div className={classes.qrBox}>
                    <input
                        type="file"
                        capture="camera"
                        accept="image/*"
                        onChange={handleImageUpload}
                    />
                    <button onClick={handleCapture}>Capture from Camera</button>
                </div>
                {result ? (
                    <div className={classes.qrOutput}>
                        <div className={classes.outputContainer}>
                            {result.user && (
                                <p>
                                    <b>Имя:</b> {result.user.name}
                                </p>
                            )}
                            {result.user && (
                                <p>
                                    <b>Ивент:</b> ОСЬ тобі party 15.01.21
                                </p>
                            )}
                            <p>
                                <b>Статус:</b>
                                <span
                                    className={
                                        result.status === "good"
                                            ? classes.good
                                            : classes.bad
                                    }
                                >
                                    {" "}
                                    {result.status === "good" ? "good" : "bad"}
                                </span>
                            </p>
                            <p>
                                <b>Сообщение:</b> {result.message}
                            </p>
                        </div>
                    </div>
                ) : (
                    <p className={classes.noData}>No data submited yet</p>
                )}
            </Container>
        </div>
    )
}

export default QRCodeReader

export const getServerSideProps = async ({ res }) => {
    res.setHeader("X-Robots-Tag", "noindex")

    return {
        props: {}
    }
}
