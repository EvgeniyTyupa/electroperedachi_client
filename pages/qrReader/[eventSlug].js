import { useState, useRef, useEffect } from "react";
import classes from "../../styles/QrReader.module.css";
import jsQR from "jsqr";
import { eventApi } from "../../api/api";
import Container from "../../components/UI/Container/Container";
import ActionButton from "../../components/UI/Buttons/ActionButton/ActionButton";
import Head from "next/head";
import { useAppContext } from "../../context/AppContext";
import moment from "moment";

const QRCodeReader = (props) => {
  const { currentEvent } = props;
  const { setIsFetchingContext } = useAppContext();

  const [result, setResult] = useState("");
  const [capturedImage, setCapturedImage] = useState(null);
  const [latestScanResult, setLatestScanResult] = useState(null);

  const videoRef = useRef(null);
  const isProcessing = useRef(false); // Флаг для дебаунсинга

  const constraints = { video: { facingMode: "environment" } };

  // Функция запуска камеры
  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error("Ошибка доступа к камере:", error);
    }
  };

  // Сброс состояния для нового сканирования
  const handleReset = () => {
    setResult("");
    setCapturedImage(null);
    setLatestScanResult(null);
    startCamera();
    requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    startCamera();

    return () => {
      // Останавливаем камеру при размонтировании компонента
      if (videoRef.current && videoRef.current.srcObject) {
        videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
      }
    };
  }, []);

  // Функция обработки кадра
  const processFrame = async () => {
    if (capturedImage) return; // Если QR уже считан, не продолжаем

    const video = videoRef.current;
    if (!video) {
      requestAnimationFrame(processFrame);
      return;
    }

    // Проверяем, что видео готово (ширина и высота не равны 0)
    if (video.videoWidth === 0 || video.videoHeight === 0) {
      requestAnimationFrame(processFrame);
      return;
    }

    // Если уже обрабатываем кадр — пропускаем
    if (isProcessing.current) {
      requestAnimationFrame(processFrame);
      return;
    }
    isProcessing.current = true;

    // Создаем канвас с размерами видео
    const canvas = document.createElement("canvas");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    const context = canvas.getContext("2d");

    // Рисуем текущий кадр
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    let imageData;
    try {
      imageData = context.getImageData(0, 0, canvas.width, canvas.height);
    } catch (e) {
      console.error("Ошибка получения данных изображения:", e);
      isProcessing.current = false;
      requestAnimationFrame(processFrame);
      return;
    }

    // Распознаем QR-код
    const code = jsQR(imageData.data, imageData.width, imageData.height);

    if (code && latestScanResult !== code.data) {
      setLatestScanResult(code.data);
      setIsFetchingContext(true);

      try {
        const { _id, userId, eventId, ticketTypeId } = JSON.parse(code.data);
        const imageUrl = canvas.toDataURL();
        setCapturedImage(imageUrl);

        let res = null

        const scanTs = moment().toISOString();

        if (!_id) {
            //concert ua case
            res = await eventApi.scanTicket(
                _id,
                userId,
                eventId,
                currentEvent._id,
                code.data
            )
        } else {
            res = await eventApi.scanTicket(
                _id,
                userId,
                eventId,
                currentEvent._id,
                "",
                ticketTypeId,
                scanTs
            )
        }
        setResult(res);

        // Останавливаем камеру после успешного сканирования
        if (videoRef.current && videoRef.current.srcObject) {
          videoRef.current.srcObject.getTracks().forEach((track) =>
            track.stop()
          );
        }
      } catch (error) {
        console.error("Ошибка при обработке QR-кода:", error);
      }
      setIsFetchingContext(false);
    }

    // Через 200 мс снимаем блокировку, чтобы не вызывать слишком часто
    setTimeout(() => {
      isProcessing.current = false;
    }, 200);

    requestAnimationFrame(processFrame);
  };

  useEffect(() => {
    // Запускаем цикл обработки кадров
    requestAnimationFrame(processFrame);
  }, [capturedImage]);

  return (
    <>
      <Head>
        <meta name="robots" content="noindex" />
      </Head>
      <div className={classes.qrReader}>
        <Container className={classes.container}>
          <div className={classes.qrBox}>
            {capturedImage ? (
              <>
                <img src={capturedImage} className={classes.previewStyle} alt="QR code snapshot" />
                <ActionButton onClick={handleReset}>
                  Submit new QR code
                </ActionButton>
              </>
            ) : (
              <video
                ref={videoRef}
                autoPlay
                playsInline
                muted
                style={{ display: capturedImage ? "none" : "block" }}
              />
            )}
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
                      result.status === "good" ? classes.good : classes.bad
                    }
                  >
                    {" "}
                    {result.status === "good" ? "good" : "bad"}
                  </span>
                </p>
                <p>
                  <b>Message:</b> {result.message}
                </p>
              </div>
            ) : (
              <p className={classes.noData}>No data submitted yet</p>
            )}
          </div>
        </Container>
      </div>
    </>
  );
};

export default QRCodeReader;

export const getStaticPaths = async ({ locales }) => {
  const { events } = await eventApi.getEvents(1, 1000);
  const paths = [];

  events.forEach((event) => {
    for (const locale of locales) {
      paths.push({
        params: { eventSlug: event.title_code },
        locale,
      });
    }
  });

  return {
    paths,
    fallback: "blocking",
  };
};

export async function getStaticProps(context) {
  const { event } = await eventApi.getEvent(context.params.eventSlug);

  if (!event) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      currentEvent: event,
    },
    revalidate: 10,
  };
}
