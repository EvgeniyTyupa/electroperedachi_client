import Button from "@mui/material/Button"
import { useIntl } from "react-intl"
import { cx } from "../../../../utils/classnames"
import classes from "./CircusCarnival.module.css"
import Image from "next/image"

import { useRef, useState, useEffect } from "react"
import useWindowDimensions from "../../../../hooks/useWindowDimension"

import Aos from "aos"
import "aos/dist/aos.css"

import { ImClubs } from "react-icons/im"
import { GiSpades } from "react-icons/gi"
import { BsFillSuitDiamondFill, BsFillSuitHeartFill } from "react-icons/bs"
import CircusFaqItem from "./CircusFaqItem/CircusFaqItem"
import CircusCarnivalForm from "./CircusCarnivalForm/CircusCarnivalForm"

import home_back_img from "/public/images/circus/home.jpg"
import cloud_right from "/public/images/circus/cloud_right.png"
import cloud_left from "/public/images/circus/cloud_left.png"
import video_bg from "/public/images/circus/video_bg.png"
import circus_logo from "/public/images/circus/circ_logo.png"
import stars from "/public/images/circus/stars.svg"
import lights from "/public/images/circus/lights.png"
import clown_face from "/public/images/circus/clown_face.png"

import location from "/public/images/circus/location.svg"
import price from "/public/images/circus/price.svg"
import service from "/public/images/circus/service.svg"
import dress from "/public/images/circus/dress.svg"
import time from "/public/images/circus/time.svg"

import what1 from "/public/images/circus/what1.jpg"
import what2 from "/public/images/circus/what2.jpg"
import what3 from "/public/images/circus/what3.jpg"

import hand from "/public/images/circus/hand.png"

import card from "/public/images/circus/card.png"

import nadai from "/public/images/circus/nadai.png"

import show from "/public/images/circus/show.jpg"

import zombies from "/public/images/circus/zombies.jpg"

import chart from "/public/images/circus/chart.png"

const CircusCarnival = (props) => {
    const intl = useIntl()

    const audioRef = useRef(null)
    const videoRef = useRef(null)
    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)

    const [isMusicPlay, setIsMusicPlay] = useState(false)

    const music = "http://localhost:3002/public/circus_music.mp3"

    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const { width } = useWindowDimensions()

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const playMusic = () => {
        audioRef.current.volume = .5
        audioRef.current.play()
    }

    const readMoreClick = () => {
        if (!isMusicPlay) {
            playMusic()
            setIsMusicPlay(true)
        }
        readMoreRef.current.scrollIntoView()
    }

    const djs = [
        {
            name: "Sasha Storm",
            photo: nadai.src,
            url: "https://soundcloud.com/sasha_storm_music",
            suit: "heart",
            rank: "A"
        },
        {
            name: "Denali",
            photo: nadai.src,
            url: "https://soundcloud.com/denalidj",
            suit: "krest",
            rank: "Q"
        },
        {
            name: "Nadai",
            photo: nadai.src,
            url: "https://soundcloud.com/nadai",
            suit: "pika",
            rank: "K"
        },
        {
            name: "Impulse",
            photo: nadai.src,
            url: "https://soundcloud.com/impulse_techno",
            suit: "buba",
            rank: "J"
        },
        {
            name: "Marteli",
            photo: nadai.src,
            url: "https://soundcloud.com/marteli-techno",
            suit: "heart",
            rank: "J"
        },
        {
            name: "Staylen",
            photo: nadai.src,
            url: "https://soundcloud.com/staylen_techno",
            suit: "heart",
            rank: "Q"
        },
        {
            name: "Noff",
            photo: nadai.src,
            url: "https://soundcloud.com/dj_noff",
            suit: "pika",
            rank: "J"
        }
    ]

    const faq = [
        {
            title: "faq title UA",
            title_en: "faq title EN",
            text: "faq text UA",
            text: "faq text EN"
        },
        {
            title: "faq title UA",
            title_en: "faq title EN",
            text: "faq text UA",
            text: "faq text EN"
        },
        {
            title: "faq title UA",
            title_en: "faq title EN",
            text: "faq text UA",
            text: "faq text EN"
        },
        {
            title: "faq title UA",
            title_en: "faq title EN",
            text: "faq text UA",
            text: "faq text EN"
        }
    ]

    const onDjClick = (djUrl) => {
        let anchor = document.createElement("a")
        anchor.href = djUrl
        anchor.target = "_blank"
        anchor.click()
    }

    useEffect(() => {
        Aos.init({ duration: 1000, offset: 170 })
    }, [])    

    useEffect(() => {
        if (videoRef && videoRef.current) {
            const handleScroll = () => {
                const triggerElement = videoRef.current
                const triggerPosition = triggerElement.getBoundingClientRect()

                if (triggerPosition.y <= width > 548 ? 0 : 348) {
                    setIsPlayVideo(true)
                }
            }

            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [videoRef])

    return (
        <div className={classes.main}>
            <audio ref={audioRef} controls>
                <source src={music} type="audio/mp3" />
            </audio>
            <div
                className={classes.home}
                style={{
                    backgroundImage: `url(${home_back_img.src})`
                }}
            >
                <div
                    className={classes.homeContent}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <p>{intl.formatMessage({ id: "circus.sub" })}</p>
                    <div className={classes.homeButtons}>
                        <Button className={classes.cta} onClick={readMoreClick}>
                            {intl.formatMessage({ id: "circus.readmore" })}
                        </Button>
                        <div className={classes.animatedBut}>
                            <Button
                                className={cx(classes.cta)}
                                onClick={scrollToPayment}
                            >
                                {intl.formatMessage({ id: "circus.buyButt" })}
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.clouds} ref={readMoreRef}>
                <div
                    className={cx(classes.textCloudBlock, classes.cloudLeft)}
                    data-aos="fade-right"
                    data-aos-duration="2000"
                    style={{
                        backgroundImage: `url(${cloud_left.src})`
                    }}
                >
                    <p>{intl.formatMessage({ id: "circus.cloud1" })}</p>
                </div>
                <div
                    className={cx(classes.textCloudBlock, classes.cloudRight)}
                    style={{ backgroundImage: `url(${cloud_right.src})` }}
                    data-aos="fade-left"
                    data-aos-duration="2000"
                >
                    <p>{intl.formatMessage({ id: "circus.cloud2" })}</p>
                </div>
            </div>
            <div
                className={classes.video}
                style={{ backgroundImage: `url(${video_bg.src})` }}
            >
                <Image
                    src={circus_logo.src}
                    width={100}
                    height={100}
                    alt="circus logo"
                    className={classes.circus_logo}
                />
                <div className={classes.videoArea}>
                    <div className={classes.videoBlock} />
                    <iframe
                        src={`https://www.youtube.com/embed/S8SFJt_e6UA?si=nsjLb_CeRjCSDb_z?autoplay=${
                            isPlayVideo ? 1 : 0
                        }&mute=1`}
                        frameborder="0"
                        allowfullscreen
                        ref={videoRef}
                        data-aos="fade"
                        data-aos-duration="2000"
                    />
                    <div className={cx(classes.star, classes.star1)}>
                        <Image src={stars.src} alt="stars" fill />
                    </div>
                    <div className={cx(classes.star, classes.star2)}>
                        <Image src={stars.src} alt="stars" fill />
                    </div>
                    <div className={cx(classes.star, classes.star3)}>
                        <Image src={stars.src} alt="stars" fill />
                    </div>
                    <div className={cx(classes.star, classes.star4)}>
                        <Image src={stars.src} alt="stars" fill />
                    </div>
                </div>
            </div>
            <div className={classes.lights}>
                <img
                    src={lights.src}
                    alt="lights"
                    className={classes.lightsImg}
                />
                <p data-aos="fade-right" data-aos-duration="2000">
                    {intl.formatMessage({ id: "circus.lightsText" })}
                </p>
            </div>
            <div className={classes.features}>
                <img
                    src={clown_face.src}
                    alt="face"
                    className={classes.clownFaceImg}
                />
                <div className={classes.featuresCircle} />
                <div
                    className={classes.featuresInfo}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h2>PARTY DETAILS</h2>
                    <div className={classes.featuresContent}>
                        <div className={classes.featuresBlock}>
                            <div className={classes.featuresPoint}>
                                <img src={location.src} alt="location" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>PLACE</h4>
                                    <h3>National Ukrainian Circus, Kyiv</h3>
                                    <p className={classes.locationText}>
                                        {intl.formatMessage({
                                            id: "circus.locationText"
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.featuresBlock}>
                            <div className={classes.featuresPoint}>
                                <img src={price.src} alt="price" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>PRICE</h4>
                                    <h3>600 UAH</h3>
                                    <p>
                                        {intl.formatMessage({
                                            id: "circus.limit"
                                        })}
                                        <br />
                                        <br />
                                        {intl.formatMessage({
                                            id: "circus.limit2"
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className={classes.featuresPoint}>
                                <img src={service.src} alt="service" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>SERVICE</h4>
                                    <p>
                                        {intl.formatMessage({
                                            id: "circus.service"
                                        })}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.featuresBlock}>
                            <div className={classes.featuresPoint}>
                                <img src={dress.src} alt="dress code" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>DRESS CODE</h4>
                                    <p>
                                        {intl.formatMessage({
                                            id: "circus.dresscode"
                                        })}
                                        <br />
                                        <br />
                                        {intl.formatMessage({
                                            id: "circus.dresscode2"
                                        })}
                                    </p>
                                </div>
                            </div>
                            <div className={classes.featuresPoint}>
                                <img src={time.src} alt="time" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>DURATION</h4>
                                    <h3>15:30/22:30</h3>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={classes.animatedBut}>
                        <Button
                            className={cx(classes.cta)}
                            onClick={scrollToPayment}
                        >
                            {intl.formatMessage({ id: "circus.buyButt" })}
                        </Button>
                    </div>
                </div>
            </div>
            <div
                className={classes.what}
                data-aos="fade-down"
                data-aos-duration="2000"
            >
                <div className={classes.whatBlock}>
                    <img src={what1.src} alt="what" />
                    <p>{intl.formatMessage({ id: "circus.what1" })}</p>
                </div>
                <div className={classes.whatBlock}>
                    <img src={what2.src} alt="what" />
                    <p>{intl.formatMessage({ id: "circus.what2" })}</p>
                </div>
                <div className={classes.whatBlock}>
                    <img src={what3.src} alt="what" />
                    <p>{intl.formatMessage({ id: "circus.what3" })}</p>
                </div>
            </div>
            <div
                className={classes.lineup}
            >
                <h2 data-aos="fade-down" data-aos-duration="2000">LINE UP</h2>
                <img src={hand.src} alt="hand" className={classes.handImg} data-aos="fade-up"
                    data-aos-duration="2000"/>
                <div className={classes.djs} data-aos="fade-up"
                data-aos-duration="2000">
                    {djs.map((el, index) => (
                        <div
                            className={classes.dj}
                            onClick={() => onDjClick(el.url)}
                        >
                            <div className={classes.djContainer}>
                                <div
                                    className={classes.djUpper}
                                    style={{
                                        backgroundImage: `url(${card.src})`
                                    }}
                                >
                                    {index === 0 && (
                                        <div className={classes.djNameBlock}>
                                            <p
                                                className={cx(
                                                    classes.djName,
                                                    classes.djNameFirst
                                                )}
                                            >
                                                {el.name.split(" ")[0]}
                                            </p>
                                            <p
                                                className={cx(
                                                    classes.djName,
                                                    classes.djNameFirst
                                                )}
                                            >
                                                {el.name.split(" ")[1]}
                                            </p>
                                        </div>
                                    )}
                                    {index > 0 && (
                                        <p
                                            className={cx(
                                                classes.djName,
                                                classes.djNameOther
                                            )}
                                        >
                                            {el.name}
                                        </p>
                                    )}
                                </div>
                                <div className={classes.djInner}>
                                    <img src={el.photo} alt={el.name} />
                                    <div className={classes.djInfo}>
                                        <div
                                            className={cx(
                                                classes.djRank,
                                                classes.rankTop
                                            )}
                                        >
                                            <p>{el.rank}</p>
                                            {el.suit === "heart" && (
                                                <BsFillSuitHeartFill color="#920000" />
                                            )}
                                            {el.suit === "pika" && (
                                                <GiSpades color="black" />
                                            )}
                                            {el.suit === "krest" && (
                                                <ImClubs color="black" />
                                            )}
                                            {el.suit === "buba" && (
                                                <BsFillSuitDiamondFill color="#920000" />
                                            )}
                                        </div>
                                        <div
                                            className={cx(
                                                classes.djRank,
                                                classes.rankBot
                                            )}
                                        >
                                            <p>{el.rank}</p>
                                            {el.suit === "heart" && (
                                                <BsFillSuitHeartFill color="#920000" />
                                            )}
                                            {el.suit === "pika" && (
                                                <GiSpades color="black" />
                                            )}
                                            {el.suit === "krest" && (
                                                <ImClubs color="black" />
                                            )}
                                            {el.suit === "buba" && (
                                                <BsFillSuitDiamondFill color="#920000" />
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.show}>
                <div className={classes.showContent}>
                    <Image src={show.src} alt="show" fill />
                    <div className={classes.showInfo}>
                        <p
                            className={classes.showText1}
                            data-aos="fade-right"
                            data-aos-duration="2000"
                        >
                            SHOW IS
                            <br />
                            FOR
                        </p>
                        <div
                            className={classes.animatedBut}
                            data-aos="zoom-in"
                            data-aos-duration="2000"
                        >
                            <Button
                                className={cx(classes.cta)}
                                onClick={scrollToPayment}
                            >
                                {intl.formatMessage({ id: "circus.buyButt" })}
                            </Button>
                        </div>
                        <p
                            className={classes.showText2}
                            data-aos="fade-left"
                            data-aos-duration="2000"
                        >
                            WAITING
                            <br />
                            YOU
                        </p>
                    </div>
                </div>
            </div>
            <div className={classes.artists}>
                <div
                    className={classes.artistsText}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
                    <h2>
                        {intl.formatMessage({ id: "circus.artists.title" })}
                    </h2>
                    <p>
                        {intl.formatMessage({ id: "circus.artists.text1" })}
                        <br />
                        <br />
                        {intl.formatMessage({ id: "circus.artists.text2" })}
                        <br />
                        <br />
                        {intl.formatMessage({ id: "circus.artists.text3" })}
                    </p>
                </div>
                <img
                    src={zombies.src}
                    alt="art"
                    data-aos="fade-left"
                    data-aos-duration="2000"
                />
            </div>
            <div
                className={classes.faq}
                data-aos="fade-down"
                data-aos-duration="2000"
            >
                <h2>FAQ</h2>
                <div className={classes.questions}>
                    {faq.map((el) => (
                        <CircusFaqItem item={el} />
                    ))}
                </div>
            </div>
            <div
                className={classes.price}
                data-aos="fade-down"
                data-aos-duration="2000"
            >
                <div className={classes.priceInfo}>
                    <h2>PRICE</h2>
                    <p>{intl.formatMessage({ id: "circus.price" })}</p>
                </div>
                <img src={chart.src} alt="chart" />
            </div>
            <div data-aos="fade-down" data-aos-duration="2000">
                <CircusCarnivalForm paymentBlockRef={paymentBlockRef} />
            </div>
        </div>
    )
}

export default CircusCarnival
