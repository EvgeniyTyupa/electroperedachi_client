import Button from "@mui/material/Button"
import { useIntl } from "react-intl"
import { cx } from "../../../../utils/classnames"
import classes from "./CircusCarnival.module.css"
import Image from "next/image"

import { useRef, useState, useEffect } from "react"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import moment from "moment"

import Aos from "aos"
import "aos/dist/aos.css"

import { ImClubs } from "react-icons/im"
import { GiSpades } from "react-icons/gi"
import { BsFillSuitDiamondFill, BsFillSuitHeartFill } from "react-icons/bs"
import CircusFaqItem from "./CircusFaqItem/CircusFaqItem"
import CircusCarnivalForm from "./CircusCarnivalForm/CircusCarnivalForm"

import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"

import home_back_img from "/public/images/circus/home.webp"
import cloud_right from "/public/images/circus/cloud_right.webp"
import cloud_left from "/public/images/circus/cloud_left.webp"
import clouds_mobile from "/public/images/circus/clouds_mobile.webp"
import video_bg from "/public/images/circus/video_bg.webp"
import circus_logo from "/public/images/circus/circ_logo.webp"
import stars from "/public/images/circus/stars.svg"
import lights from "/public/images/circus/lights.webp"
import clown_face from "/public/images/circus/clown_face.webp"

import location from "/public/images/circus/location.svg"
import service from "/public/images/circus/service.svg"
import priceIcon from "/public/images/circus/price.svg"
import dress from "/public/images/circus/dress.svg"
import time from "/public/images/circus/time.svg"

import what1 from "/public/images/circus/what1.webp"
import what2 from "/public/images/circus/what2.webp"
import what3 from "/public/images/circus/what3.webp"

import hand from "/public/images/circus/hand.webp"

import card from "/public/images/circus/card.webp"

import nadai from "/public/images/circus/nadai.webp"
import storm from "/public/images/circus/storm.webp"
import denali from "/public/images/circus/denali.webp"
import noff from "/public/images/circus/noff.webp"
import marteli from "/public/images/circus/marteli.webp"
import impulse from "/public/images/circus/impulse.webp"
import paul_meise from "/public/images/circus/paul_meise.webp"
import staylen from "/public/images/circus/staylen.webp"

import show from "/public/images/circus/show.webp"

import zombies from "/public/images/circus/zombies.webp"

import chart from "/public/images/circus/chart.webp"
import chart_mobile from "/public/images/circus/chart_mobile.webp"

import lamp from "/public/images/circus/lamp.webp"
import lamp_mobile from "/public/images/circus/light_mobile.webp"
import shadow from "/public/images/circus/shadow.webp"

const CircusCarnival = (props) => {
    const { event } = props

    const intl = useIntl()

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const videoRef = useRef(null)
    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)
    const djsRef = useRef(null)

    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const { width } = useWindowDimensions()

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const isEnd = event ? moment().startOf("day") > moment(event.date) : true

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const readMoreClick = () => {
        readMoreRef.current.scrollIntoView()
    }

    const djs = [
        {
            name: "Sasha Storm",
            photo: storm.src,
            url: "https://soundcloud.com/sasha_storm_music",
            suit: "heart",
            rank: "A"
        },
        {
            name: "Denali",
            photo: denali.src,
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
            photo: impulse.src,
            url: "https://soundcloud.com/impulse_techno",
            suit: "buba",
            rank: "J"
        },
        {
            name: "Marteli",
            photo: marteli.src,
            url: "https://soundcloud.com/marteli-techno",
            suit: "heart",
            rank: "J"
        },
        {
            name: "Staylen",
            photo: staylen.src,
            url: "https://soundcloud.com/staylen_techno",
            suit: "heart",
            rank: "Q"
        },
        {
            name: "Noff",
            photo: noff.src,
            url: "https://soundcloud.com/dj_noff",
            suit: "pika",
            rank: "J"
        },
        {
            name: "Paul Meise",
            photo: paul_meise.src,
            url: "https://soundcloud.com/dj_meise",
            suit: "krest",
            rank: "A"
        }
    ]

    const faq = event.faq

    const onDjClick = (djUrl) => {
        let anchor = document.createElement("a")
        anchor.href = djUrl
        anchor.target = "_blank"
        anchor.click()
    }

    const setCloudsOffset = (width) => {
        if (width > 1920) {
            return 300
        } else if (width <= 1920 && width >= 1280) {
            return 170
        } else {
            return 150
        }
    }

    const handleDjHover = () => {
        const children = djsRef.current.children;
        children[0].children[0].classList.remove(classes.djInverMobile)
    }

    useEffect(() => {
        Aos.init({ duration: 1000, offset: setCloudsOffset(width) })
    }, [])

    useEffect(() => {
        let now = moment()

        event.pricing.forEach((el) => {
            if (now >= moment(el.start) && now <= moment(el.end)) {
                setPrice(el.price)
                setIsShowBuy(true)
            }
        })
    }, [])

    useEffect(() => {
        if (videoRef && videoRef.current && djsRef && djsRef.current) {
            const handleScroll = () => {
                const triggerElement = videoRef.current
                const triggerPosition = triggerElement.getBoundingClientRect()

                if (triggerPosition.y <= width > 548 ? 0 : 348) {
                    setIsPlayVideo(true)
                }

                if (width < 568) {
                    if (djsRef.current && djsRef.current.children) {
                        const children = djsRef.current.children;
    
                        for (let i = 0; i < children.length; i++) {
                            if (children[i].getBoundingClientRect().y < 300) {
                                children[i].children[0].classList.add(classes.djInverMobile);
                            }
                        }
                    }
                } else {
                    const children = djsRef.current.children;
                    children[0].children[0].classList.add(classes.djInverMobile)
                }

            }

            window.addEventListener("scroll", handleScroll)
            return () => {
                window.removeEventListener("scroll", handleScroll)
            }
        }
    }, [videoRef, djsRef, width])

    return (
        <div className={classes.main}>
            <div
                className={classes.home}
                style={{
                    backgroundImage: `url(${home_back_img.src})`
                }}
            >
                <h1>Circus<br/>Carnival</h1>
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
                className={classes.cloudsMobile}
                data-aos="fade-down"
                data-aos-duration="2000"
                style={{
                    backgroundImage: `url(${clouds_mobile.src})`
                }}
            >
                <p>{intl.formatMessage({ id: "circus.cloud1" })}</p>
                <p>{intl.formatMessage({ id: "circus.cloud2" })}</p>
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
                                        &nbsp;
                                        <span>
                                            {intl.formatMessage({
                                                id: "circus.locationText2"
                                            })}
                                        </span>
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={classes.featuresBlock}>
                            <div className={classes.featuresPoint}>
                                <img src={priceIcon.src} alt="price" />
                                <div className={classes.featuresPointInfo}>
                                    <h4>PRICE</h4>
                                    <h3>600 UAH</h3>
                                    <p>
                                        {intl.formatMessage({
                                            id: "circus.limit"
                                        })}
                                        <span>&nbsp;{intl.formatMessage({
                                            id: "circus.limit1_1"
                                        })}</span>
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
                                    <h3>15:30 - 22:30</h3>
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
            <div className={classes.lineup}>
                <h2 data-aos="fade-down" data-aos-duration="2000">
                    LINE UP
                </h2>
                <img
                    src={hand.src}
                    alt="hand"
                    className={classes.handImg}
                    data-aos="fade-up"
                    data-aos-duration="2000"
                />
                <div
                    className={classes.djs}
                    ref={djsRef}
                    data-aos="fade-up"
                    data-aos-duration="2000"
                    onMouseEnter={handleDjHover}
                >
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
                                    {index === djs.length - 1 && (
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
                                    {(index > 0 && index < djs.length -1) && (
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
                                        <p
                                            className={cx(
                                                classes.djName,
                                                classes.djNameOther
                                            )}
                                        >
                                            {el.name}
                                        </p>
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
            <div className={classes.showMobile}>
                <div className={classes.showContent}>
                    <Image src={show.src} alt="show" fill />
                    <div className={classes.showInfo}>
                        <p
                            className={classes.showText1}
                            data-aos="fade-down"
                            data-aos-duration="2000"
                        >
                            SHOW IS
                            <br />
                            WAITING
                            <br/>
                            FOR YOU
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
            <div className={classes.faq}>
                <h2>FAQ</h2>
                <img
                    src={width > 568 ? lamp.src : lamp_mobile.src}
                    alt="light"
                    className={classes.lampImg}
                    data-aos="fade"
                    data-aos-duration="2000"
                />
                <div
                    className={classes.questions}
                    data-aos="fade-down"
                    data-aos-duration="2000"
                >
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
                <img src={width > 568 ? chart.src : chart_mobile.src} alt="chart" className={classes.chart}/>
                <img src={shadow.src} alt="shadow" className={classes.shadowImg}/>
            </div>
            {!isEnd && isShowBuy && (
                <div className={classes.form} data-aos="fade-down" data-aos-duration="2000">
                    <CircusCarnivalForm
                        paymentBlockRef={paymentBlockRef}
                        event={event}
                        price={price}
                        setPrice={setPrice}
                    />
                </div>
            )}
            <footer className={classes.footer}>
                <div className={classes.links}>
                    {links.map((el) => (
                        <CustomLink
                            key={el.href}
                            href={el.href}
                            text={el.text}
                            className={classes.link}
                        />
                    ))}
                </div>
                <div className={classes.social}>
                    {socialLinks.map((el) => (
                        <a
                            href={el.url}
                            key={el.url}
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            {el.icon}
                        </a>
                    ))}
                </div>
                <div className={classes.mini}>
                    <a download href="/tandc.pdf">
                        {intl.formatMessage({ id: "footer.terms" })}
                    </a>
                    <a download href="/data_protection.pdf">
                        {intl.formatMessage({ id: "footer.privacy" })}
                    </a>
                </div>
            </footer>
        </div>
    )
}

export default CircusCarnival
