import classes from "./Cyberpunk.module.css"

import Image from "next/image"

import { useMagicWriter } from "../../../../hooks/useTypedChar"
import { useState, useEffect, useRef } from 'react'

import { useIntl } from "react-intl"

import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"

import Button from "@mui/material/Button"

import moment from "moment"

import useWindowDimensions from "../../../../hooks/useWindowDimension"

import Link from "next/link"

import { MdOutlineMyLocation } from "react-icons/md";
import { LuTicket, LuClock4 } from "react-icons/lu";
import { BiMaleFemale } from "react-icons/bi";
import { TbCurrencyDollar } from "react-icons/tb";
import { IoMdArrowDown } from "react-icons/io";

import CyberpunkForm from "./CyberpunkForm/CyberpunkForm"
import CyberpunkFaqItem from "./CyberpunkFaqItem/CyberpunkFaqItem"

import { cx } from "../../../../utils/classnames"

import home_back_img from "/public/images/cyberpunk/main.webp"
import tabl from "/public/images/cyberpunk/tabl.svg"
import ramka1 from "/public/images/cyberpunk/ramk1.svg"
import info_card_mobile from "/public/images/cyberpunk/info_card_mobile.svg"
import ramka2 from "/public/images/cyberpunk/ramk2.svg"
import cabel1 from "/public/images/cyberpunk/cable1.webp"
import cabel2 from "/public/images/cyberpunk/cable2.webp"
import cabel3 from "/public/images/cyberpunk/cable3.webp"
import more_back from "/public/images/cyberpunk/more_back.webp"
import mission_back from "/public/images/cyberpunk/mission_back.svg"
import hand from "/public/images/cyberpunk/hand.webp"
import hand2 from "/public/images/cyberpunk/hand2.webp"
import decor1 from "/public/images/cyberpunk/decor1.svg"
import decor2 from "/public/images/cyberpunk/decor2.svg"

import skin1 from "/public/images/cyberpunk/solomia.webp"
import skin2 from "/public/images/cyberpunk/victoria.webp"
import skin3 from "/public/images/cyberpunk/maria.webp"
import skin4 from "/public/images/cyberpunk/roman.webp"
import card from "/public/images/cyberpunk/card.webp"
import dj_card from "/public/images/cyberpunk/dj_card.svg"

import message_back from "/public/images/cyberpunk/message.webp"
import message_back_mobile from "/public/images/cyberpunk/message_mobile_back.webp"

import earmake from "/public/images/cyberpunk/earmake.webp"
import baks from "/public/images/cyberpunk/baks.webp"
import manyface from "/public/images/cyberpunk/manyface.webp"
import noff from "/public/images/cyberpunk/noff.webp"
import nadai from "/public/images/cyberpunk/nadai.webp"

import rect1 from "/public/images/cyberpunk/rect1.svg"
import rect2 from "/public/images/cyberpunk/rect2.svg"
import rect3 from "/public/images/cyberpunk/rect3.svg"
import circle from "/public/images/cyberpunk/circle.svg"

import r25 from "/public/images/cyberpunk/r25.svg"

import stuff1 from "/public/images/cyberpunk/stuff1.webp"
import stuff2 from "/public/images/cyberpunk/stuff2.webp"
import decor3 from "/public/images/cyberpunk/decor3.svg"

import price_back from "/public/images/cyberpunk/price_back.webp"
import price_back_mobile from "/public/images/cyberpunk/price_back_mobile.webp"

import Aos from "aos"
import "aos/dist/aos.css"
import useIsChrome from "../../../../hooks/useIsChrome"

const Cyberpunk = (props) => {
    const { event } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)
    
    const intl = useIntl()

    const { width } = useWindowDimensions()

    const text1 = intl.formatMessage({ id: "cyberpunk.meta" })
    
    const typingMore1 = useMagicWriter(text1, 40)

    const [infoIndex, setInfoIndex] = useState(0)

    const isEnd = event ? moment().startOf("day") > moment(event.date) : true

    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)
    const videoRef = useRef(null)

    const isChrome = useIsChrome();

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const faq = event.faq

    const skins = [
        {
            img: skin1.src,
            name: intl.formatMessage({ id: "cyberpunk.card1.name" }),
            role: intl.formatMessage({ id: "cyberpunk.card1.role" }),
            age: 25,
            zodiac: intl.formatMessage({ id: "cyberpunk.card1.zodiac" }),
            city: intl.formatMessage({ id: "cyberpunk.card1.city" }),
            info: intl.formatMessage({ id: "cyberpunk.card1.info" })
        },
        {
            img: skin2.src,
            name: intl.formatMessage({ id: "cyberpunk.card2.name" }),
            role: intl.formatMessage({ id: "cyberpunk.card2.role" }),
            age: 23,
            zodiac: intl.formatMessage({ id: "cyberpunk.card2.zodiac" }),
            city: intl.formatMessage({ id: "cyberpunk.card2.city" }),
            info: intl.formatMessage({ id: "cyberpunk.card2.info" })
        },
        {
            img: skin3.src,
            name: intl.formatMessage({ id: "cyberpunk.card3.name" }),
            role: intl.formatMessage({ id: "cyberpunk.card3.role" }),
            age: 28,
            zodiac: intl.formatMessage({ id: "cyberpunk.card3.zodiac" }),
            city: intl.formatMessage({ id: "cyberpunk.card3.city" }),
            info: intl.formatMessage({ id: "cyberpunk.card3.info" })
        },
        {
            img: skin4.src,
            name: intl.formatMessage({ id: "cyberpunk.card4.name" }),
            role: intl.formatMessage({ id: "cyberpunk.card4.role" }),
            age: 32,
            zodiac: intl.formatMessage({ id: "cyberpunk.card4.zodiac" }),
            city: intl.formatMessage({ id: "cyberpunk.card4.city" }),
            info: intl.formatMessage({ id: "cyberpunk.card4.info" })
        }
    ]

    const djs = [
        {
            img: baks.src,
            name: "Kyiv2c",
            code: "#234T67",
            style: "Synthwave, House",
            time: "16:00",
            url: "https://soundcloud.com/kyiv2c"
        },
        {
            img: noff.src,
            name: "Noff",
            code: "#234T67",
            style: "Techno, Industrial",
            time: "19:30",
            url: "https://soundcloud.com/dj_noff"
        },
        {
            img: nadai.src,
            name: "Nadai",
            code: "#234T67",
            style: "Electroclash, Techno",
            time: "20:30",
            url: "https://soundcloud.com/nadai"
        },
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30",
            url: "https://soundcloud.com/earmake"
        },
        {
            img: manyface.src,
            name: "Manyface",
            code: "#234T67",
            style: "Synthpop, Electroclash",
            time: "18:30",
            url: "https://soundcloud.com/user-548157346"
        }
    ]

    const handleAddToCartClick = () => {
        import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
            ReactPixel.init("573414703062456")
            ReactPixel.track("AddToCart")
        })
    };

    const onDjClick = (djUrl) => {
        let anchor = document.createElement("a")
        anchor.href = djUrl
        anchor.target = "_blank"
        anchor.click()
    }

    const readMoreClick = () => {
        readMoreRef.current.scrollIntoView()
    }

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    useEffect(() => {
        Aos.init({ duration: 1000, offset: 100 })
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
        const handleScroll = () => {
            if (videoRef && videoRef.current) {
                const triggerElement = videoRef.current
                const triggerPosition = triggerElement.getBoundingClientRect()

                
                if (triggerPosition.y <= 348) {
                    setIsPlayVideo(true)
                }
            }
            if(paymentBlockRef && paymentBlockRef.current) {
                if (paymentBlockRef.current.getBoundingClientRect().top <= 150) {
                    if (!isAddToCartEventSend) {
                        setIsAddToCartEventSend(true)
                    }
                }
            }
        }

        window.addEventListener("scroll", handleScroll)
        return () => {
            window.removeEventListener("scroll", handleScroll)
        }
        
    }, [paymentBlockRef, videoRef])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            {/* HOME */}
            <div className={classes.home}
                style={{
                    backgroundImage: `url(${home_back_img.src})`
                }}
            >
                <div className={cx(classes.title, isChrome ? classes.chromeTitle : undefined)} data-aos="zoom-in" data-aos-duration="2000">
                    <div className={classes.titleH1}>
                        <h1>Crystal Ninja</h1>
                        <h1>Crystal Ninja</h1>
                    </div>
                    <div className={classes.titleH2}>
                        <h2>Cyberpunk</h2>
                        <h2>Cyberpunk</h2>
                    </div>
                </div>
                <div className={classes.homeDialog}>
                    <p
                        className={classes.gameText}
                        data-aos="fade-down"
                        data-aos-duration="2000"
                    >
                        {intl.formatMessage({ id: "cyberpunk.intro" })}
                    </p>
                    <div className={classes.answerBlock} data-aos="fade-up" data-aos-duration="2000">
                        <p className={classes.gameText}>KSID:</p>
                        <div className={classes.answers}>
                            <button className={classes.gameText} onClick={readMoreClick}>{intl.formatMessage({ id: "cyberpunk.answer1" })}</button>
                            <button className={classes.gameText} onClick={scrollToPayment}>{intl.formatMessage({ id: "cyberpunk.answer2" })} <span>{intl.formatMessage({ id: "cyberpunk.answer2.1" })}</span> {width > 468 ? intl.formatMessage({ id: "cyberpunk.answer2.2" }) : ""}</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* INTRO */}
            {width > 1170 ? (
                <div className={classes.intro} ref={readMoreRef}>
                    <div className={cx(classes.introInfo)}
                        style={{
                            backgroundImage: `url(${ramka1.src})`
                        }}
                    >
                        <p>{intl.formatMessage({ id: "cyberpunk.introText" })}</p>
                    </div>
                    <img src={tabl.src} alt="freedom, equality, techno"/>
                    <div className={cx(classes.introInfo, classes.ramka2)}
                        style={{
                            backgroundImage: `url(${ramka2.src})`
                        }}
                    >
                        <p>{intl.formatMessage({ id: "cyberpunk.introText2" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "cyberpunk.introText3" })}</p>
                    </div>
                </div>
            ) : (
                <div className={classes.introMobile} ref={readMoreRef}>
                    <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">Legend</h3>
                    <div className={cx(classes.introInfo)}
                        style={{
                            backgroundImage: `url(${info_card_mobile.src})`
                        }}
                    >
                        <p>{intl.formatMessage({ id: "cyberpunk.introText" })}</p>
                    </div>
                    <div className={classes.tablets}>
                        <img src={tabl.src} alt="freedom, equality, techno"/>
                        <img src={tabl.src} alt="freedom, equality, techno"/>
                    </div>
                    <div className={classes.introInfo}
                        style={{
                            backgroundImage: `url(${info_card_mobile.src})`
                        }}
                    >
                        <p>{intl.formatMessage({ id: "cyberpunk.introText2" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "cyberpunk.introText3" })}</p>
                    </div>
                </div>
            )}
            {/* VIDOS */}
            <div className={classes.vidos} data-aos="fade-down" data-aos-duration="2000">
                <div className={classes.videoBlock}>
                    <iframe
                        src={`https://www.youtube.com/embed/jjr1ou4yPvo?si=eM0ksxr9WbviMNS3&autoplay=${
                            isPlayVideo ? 1 : 0
                        }&mute=1`}
                        frameborder="0"
                        allowfullscreen
                        ref={videoRef}
                        data-aos="fade"
                        data-aos-duration="2000"
                    />
                </div>
                <img className={classes.cabel1} src={cabel1.src} alt="cables"/>
                <img className={classes.cabel2} src={cabel2.src} alt="cables"/>
                <img className={classes.cabel3} src={cabel3.src} alt="cables"/>
            </div>
            {/* MORE */}
            <div className={classes.more}
                style={{
                    backgroundImage: `url(${width > 468 ? more_back.src : message_back_mobile.src})`
                }}
            >
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">Main Goal</h3>
                <p className={classes.gameText}>
                    Е: &nbsp;
                    {typingMore1}
                </p>
            </div>
            {/* MISSION */}
            <div className={classes.mission}
                style={{
                    backgroundImage: `url(${mission_back.src})`
                }}
            >
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">Mission Steps</h3>
                <div className={classes.steps} data-aos="fade-down" data-aos-duration="2000">
                    <div className={cx(classes.step, classes.stepPast)}>
                        <div className={classes.stepNumberBlock}>
                            <p>01</p>
                        </div>
                        <p>{intl.formatMessage({ id: "cyberpunk.mission1" })}</p>
                    </div>
                    <div className={cx(classes.step, classes.stepActive)}>
                        <div className={classes.stepNumberBlock}>
                            <p>02</p>
                        </div>
                        <p>{intl.formatMessage({ id: "cyberpunk.mission2" })}</p>
                    </div>
                    <div className={cx(classes.step)}>
                        <div className={classes.stepNumberBlock}>
                            <p>03</p>
                        </div>
                        <p>{intl.formatMessage({ id: "cyberpunk.mission3" })}</p>
                    </div>
                    <div className={cx(classes.step)}>
                        <div className={classes.stepNumberBlock}>
                            <p>04</p>
                        </div>
                        <p>{intl.formatMessage({ id: "cyberpunk.mission4" })}</p>
                    </div>
                </div>
                <img src={hand.src} alt="hand" data-aos="fade-left" data-aos-duration="2000"/>
            </div>
            {/* DETAILS */}
            <div className={classes.details}>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">Party Details</h3>
                <p className={classes.gameText} data-aos="fade-down" data-aos-duration="2000">{intl.formatMessage({ id: "cyberpunk.phase" })}</p>
                <div className={classes.detailsSections} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <MdOutlineMyLocation />
                                <p>{intl.formatMessage({ id: "cyberpunk.place" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <a href="https://www.google.com/maps?client=safari&sca_esv=f917e2823a31333e&sca_upv=1&rls=en&output=search&q=Gulliver,+Creative+Quarter,+Tower+B&source=lnms&entry=mc" target={"_blank"} rel="noreferrer noopener">{intl.formatMessage({ id: "cyberpunk.placeInfo" })}</a>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <LuClock4 />
                                <p>{intl.formatMessage({ id: "cyberpunk.start" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>15:00/22:00</p>
                        </div>
                    </div>
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <LuTicket />
                                <p>{intl.formatMessage({ id: "cyberpunk.count" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>300</p>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <TbCurrencyDollar />
                                <p>{intl.formatMessage({ id: "cyberpunk.ticketPrice" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>600 UAH</p>
                            <p className={classes.detailText}>{intl.formatMessage({ id: "cyberpunk.ticketPriceInfo" })}</p>
                        </div>
                    </div>
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <BiMaleFemale />
                                <p>{intl.formatMessage({ id: "cyberpunk.dresscode" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberpunk.dresscodeText1" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.dresscodeText2" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.dresscodeText3" })}
                            </p>
                        </div>
                    </div>
                </div>
                <img src={hand2.src} alt="hand" data-aos="fade-right" data-aos-duration="2000"/>
            </div>
            {/* SKINS */}
            <h3 className={cx(classes.blockHeader, classes.collegues)} data-aos="fade-down" data-aos-duration="2000">Colleagues</h3>
            <div className={classes.skins} data-aos="fade-down" data-aos-duration="2000">
                {skins.map((el, index) => (
                    <div
                        className={cx(classes.skin, infoIndex === index ? classes.skinOpen : undefined)}
                        onMouseEnter={() => setInfoIndex(index)}
                        onMouseLeave={() => setInfoIndex(0)}
                        key={el.name}
                    >
                        <img src={el.img} alt={el.name} className={classes.skinImg}/>
                        <div className={classes.cardInfo}>
                            <img src={card.src} alt="card"/>
                            <div className={classes.skinInfo}>
                                <strong>{el.name}</strong>
                                <div className={classes.infoLine}/>
                                <div className={classes.subSkinInfo}>
                                    <p>{el.role}</p>
                                    <p>{el.age}</p>
                                    <p>{el.zodiac}</p>
                                    <p>{el.city}</p>
                                </div>
                                <div className={classes.infoLine}/>
                                <p>{el.info}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            {/* LINEUP */}
            <div className={classes.lineup}>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">LINE UP</h3>
                <img src={decor1.src} alt="decor" className={classes.decor1}/>
                <p className={classes.gameText} data-aos="fade-down" data-aos-duration="2000">{intl.formatMessage({ id: "cyberpunk.lineupText" })}</p>
                <div className={classes.djs} data-aos="fade-up" data-aos-duration="2000">
                    {djs.map(el => (
                        <div className={classes.dj} key={el.name} onClick={() => onDjClick(el.url)}>
                            <div className={classes.djLight}/>
                            <img src={dj_card.src} alt="card" className={classes.djCard}/>
                            <div className={classes.djImgContainer}>
                                <Image src={el.img} alt={el.name} fill/>
                            </div>
                            <div className={classes.djInfo}>
                                <div className={classes.djSection}>
                                    <p>{el.name}</p>
                                    <p>{el.code}</p>
                                </div>
                                <div className={cx(classes.djSection, classes.botDjSection)}>
                                    <div className={cx(classes.djSubSection, classes.djStyle)}>
                                        <span>Style</span>
                                        <p>{el.style}</p>
                                    </div>
                                    <div className={classes.djSubSection}>
                                        <span>Starts in</span>
                                        <p>{el.time}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
                <img src={decor2.src} alt="decor" className={classes.decor2}/>
            </div>
            {/* MESSAGE */}
            <div
                className={classes.message}
                style={{
                    backgroundImage: `url(${message_back.src})`
                }}
            >
                <div className={cx(classes.title, isChrome ? classes.chromeTitle : undefined)}>
                    <div className={classes.titleH1}>
                        <h1>Crystal Ninja</h1>
                        <h1>Crystal Ninja</h1>
                    </div>
                    <div className={classes.titleH2}>
                        <h2>Cyberpunk</h2>
                        <h2>Cyberpunk</h2>
                    </div>
                </div>
                <div className={classes.notification}>
                    <img src={circle.src} alt="circle" className={classes.circle} data-aos="zoom-in" data-aos-duration="2000"/>
                    <div className={classes.notBlock} data-aos="zoom-in" data-aos-duration="2000">
                        <div className={classes.notHeader}>
                            <img src={rect1.src} alt="decor"/>
                            <p>{intl.formatMessage({ id: "cyberpunk.messageTitle" })}</p>
                        </div>
                        <div className={classes.notBody}>
                            <img src={rect3.src} alt="decor" className={classes.ramka}/>
                            <img src={rect2.src} alt="decor"/>
                            <p className={classes.gameText}>{intl.formatMessage({ id: "cyberpunk.messageBody" })} <br/>{intl.formatMessage({ id: "cyberpunk.messageBody2" })}</p>
                        </div>
                    </div>
                </div>
                <Button className={classes.buyButt} onClick={scrollToPayment}>
                    <p>{intl.formatMessage({ id: "cyberpunk.buyTicket" })}</p>
                    <div className={classes.r25}>
                        <IoMdArrowDown />
                        <img src={r25.src} alt="r25"/>
                    </div>
                </Button>
            </div>
            {/* STUFF */}
            <div className={classes.stuff} data-aos="fade-down" data-aos-duration="2000">
                <h3 className={classes.blockHeader}>MISSION`S STUFF</h3>
                <div className={classes.stuffContainer}>

                    <div className={classes.stuffLeft}>
                        <img src={stuff1.src} alt="stuff" className={classes.stuffImg1}/>
                        <img src={stuff2.src} alt="stuff" className={classes.stuffImg2}/>
                        <div className={classes.blured}/>
                        <div className={cx(classes.blured, classes.blured2)}/>
                        <div className={classes.stuffLeftText}>
                            <div className={classes.detailHeader}>
                                <p>{intl.formatMessage({ id: "cyberpunk.profile" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberpunk.profileText1" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.profileText2" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.profileText3" })}
                            </p>
                        </div>
                    </div>
                    <div className={classes.stuffRight}
                        style={{
                            backgroundImage: `url(${decor3.src})`
                        }}
                    >
                        <div className={classes.detailHeader}>
                                <p>{intl.formatMessage({ id: "cyberpunk.case" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberpunk.caseText1" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.caseText2" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.caseText3" })}
                            </p>
                    </div>
                </div>
            </div>
            <div className={classes.stuffMobile} data-aos="fade-down" data-aos-duration="2000">
                <h3 className={classes.blockHeader}>MISSION`S STUFF</h3>
                <div className={classes.stuffContainer}>
                    <div className={classes.stuffLeft}>
                        <div className={classes.stuffLeftText}>
                            <div className={classes.detailHeader}>
                                <p>{intl.formatMessage({ id: "cyberpunk.profile" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberpunk.profileText1" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.profileText2" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.profileText3" })}
                            </p>
                        </div>
                        <div className={classes.stuffImages}>
                            <img src={stuff1.src} alt="stuff" className={classes.stuffImg1}/>
                            <img src={stuff2.src} alt="stuff" className={classes.stuffImg2}/>
                            <div className={classes.blured}/>
                            <div className={cx(classes.blured, classes.blured2)}/>
                        </div>
                    </div>
                    <div className={classes.stuffRight}
                        style={{
                            backgroundImage: `url(${decor3.src})`
                        }}
                    >
                        <div className={classes.detailHeader}>
                                <p>{intl.formatMessage({ id: "cyberpunk.case" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberpunk.caseText1" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.caseText2" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberpunk.caseText3" })}
                            </p>
                    </div>
                </div>
            </div>
            {/* PRICE */}
            <div className={classes.price} data-aos="fade" data-aos-duration="2000">
                {/* <div className={classes.priceInfo}>
                    <h3 className={classes.blockHeader}>PRICE</h3>
                    <p className={classes.gameText}>{intl.formatMessage({ id: "cyberpunk.priceSub" })}</p>
                </div> */}
                <img src={width > 568 ? price_back.src : price_back_mobile.src} alt="price_back" className={classes.priceBack}/>
            </div>
            {/* FORM */}
            {!isEnd && isShowBuy && (
                <div className={classes.form} data-aos="fade-down" data-aos-duration="2000">
                    <CyberpunkForm
                        paymentBlockRef={paymentBlockRef}
                        price={price}
                        setPrice={setPrice}
                        event={event}
                    />
                </div>
            )}
            {/* FAQ */}
            <div className={classes.faqContainer} data-aos="fade-down" data-aos-duration="2000">
                <div className={classes.faq}>
                    <h3 className={classes.blockHeader}>FAQ</h3>
                    <div className={classes.questions}>
                        {faq.map(el => (
                            <CyberpunkFaqItem item={el} key={el._id}/>
                        ))}
                    </div>
                </div>
            </div>
            {/* FOOTER */}
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
                    <Link href="/terms-of-use">
                        {intl.formatMessage({ id: "footer.terms" })}
                    </Link>
                    <Link href="/privacy-policy">
                        {intl.formatMessage({ id: "footer.privacy" })}
                    </Link>
                </div>
            </footer>
        </div>
    )
}

export default Cyberpunk