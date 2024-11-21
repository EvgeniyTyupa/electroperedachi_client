import classes from "./CyberChristmas.module.css"

import Image from "next/image"
import { useState, useEffect, useRef } from 'react'
import { useIntl } from "react-intl"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import Button from "@mui/material/Button"
import moment from "moment"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import Link from "next/link"

import { cx } from "../../../../utils/classnames"

import { useMagicWriter } from "../../../../hooks/useTypedChar"

import { IoMdArrowDown } from "react-icons/io";
import { MdOutlineMyLocation } from "react-icons/md";
import { LuTicket, LuClock4 } from "react-icons/lu";
import { BiMaleFemale } from "react-icons/bi";
import { TbCurrencyDollar } from "react-icons/tb";

import Aos from "aos"
import "aos/dist/aos.css"

import { useRouter } from "next/router"
import { FB_PIXEL } from "../../../../utils/constants"
import useIsChrome from "../../../../hooks/useIsChrome"

import MovingCandy from "./MovingCandy/MovingCandy"

import home_bg from "/public/images/cyber-christmas/home_bg.jpg"
import r25 from "/public/images/cyberpunk/r25.svg"
import worldIcon from "/public/images/cyber-christmas/world-icon.svg"
import runeIcon from "/public/images/cyber-christmas/rune-icon.svg"
import candyGreenImg from "/public/images/cyber-christmas/candy-green.svg"
import candyRedImg from "/public/images/cyber-christmas/candy-red.svg"

import cabel1 from "/public/images/cyber-christmas/cable1.png"
import cabel2 from "/public/images/cyber-christmas/cable2.png"
import cabel3 from "/public/images/cyber-christmas/cable3.png"

import speech_bg from "/public/images/cyber-christmas/speech_bg.png"

import hand1 from "/public/images/cyber-christmas/hand1.png"
import hand2 from "/public/images/cyber-christmas/hand2.png"

import locationIcon from "/public/images/cyber-christmas/location-icon.svg"
import timeIcon from "/public/images/cyber-christmas/time-icon.svg"
import dressIcon from "/public/images/cyber-christmas/dress-icon.svg"
import countIcon from "/public/images/cyber-christmas/calendar-icon.svg"
import priceIcon from "/public/images/cyber-christmas/price-icon.svg"

import hudImg from "/public/images/cyber-christmas/hud.png"
import dress1 from "/public/images/cyber-christmas/urban.png"
import dress2 from "/public/images/cyber-christmas/rave.png"
import dress3 from "/public/images/cyber-christmas/corpo.png"

import dj from "/public/images/cyber-christmas/dj.png"
import dj_card_green from "/public/images/cyber-christmas/card_green.svg"
import dj_card_red from "/public/images/cyber-christmas/card_red.svg"

import stage1Icon from "/public/images/cyber-christmas/stage1.svg"
import stage2Icon from "/public/images/cyber-christmas/stage2.svg"

import separator from "/public/images/cyber-christmas/separator.svg"
import separator_cyber from "/public/images/cyber-christmas/separator_cyber.svg"
import EqualizerSvg from "./EqualizerSvg/EqualizerSvg"

import wasImg from "/public/images/cyber-christmas/was.jpg"

import stage1will1 from "/public/images/cyber-christmas/stage1will1.jpg"
import stage1will2 from "/public/images/cyber-christmas/stage1will2.jpg"
import stage2will1 from "/public/images/cyber-christmas/stage2will1.jpg"
import stage2will2 from "/public/images/cyber-christmas/stage2will2.jpg"

import dop_bg from "/public/images/cyber-christmas/dop_bg.svg"
import dop1 from "/public/images/cyber-christmas/dop1.png"
import dop2 from "/public/images/cyber-christmas/dop2.png"
import dop3 from "/public/images/cyber-christmas/dop3.png"

import promo_preview from "/public/images/cyber-christmas/promo_preview.png"
import video_frame_mob from "/public/images/cyber-christmas/video_frame_mob.svg"

import gir from "/public/images/cyber-christmas/gir.png"
import CyberChristmasForm from "./CyberChristmasForm/CyberChristmasForm"
import CyberChristmasFaqItem from "./CyberChristmasFaqItem/CyberChristmasFaqItem"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"
import VideoLazy from "../../../Common/VideoLazy/VideoLazy"

import dj1 from "/public/images/cyber-christmas/dj1.png"
import dj2 from "/public/images/cyber-christmas/dj2.png"
import dj3 from "/public/images/cyber-christmas/dj3.png"
import dj4 from "/public/images/cyber-christmas/dj4.png"
import dj5 from "/public/images/cyber-christmas/dj5.png"
import dj6 from "/public/images/cyber-christmas/dj6.png"
import dj7 from "/public/images/cyber-christmas/dj7.png"
import dj8 from "/public/images/cyber-christmas/dj8.png"
import dj9 from "/public/images/cyber-christmas/dj9.png"
import dj10 from "/public/images/cyber-christmas/dj10.png"
import dj11 from "/public/images/cyber-christmas/dj11.png"

const CyberChristmas = (props) => {
    const { event } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const [infoIndex, setInfoIndex] = useState(0)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const isChrome = useIsChrome();

    const intl = useIntl()

    const title_sub_text = intl.formatMessage({ id: "cyberChristmas.titleSubText" })
    const speech_text = intl.formatMessage({ id: "cyberChristmas.speechText" })

    const typingMore1 = useMagicWriter(title_sub_text, 40)
    const typingMore2 = useMagicWriter(speech_text, 40)

    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)

    const faq = event.faq

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const stage1 = [
        {
            img: dj3.src,
            name: "Nadai",
            style: "Minimal Techno",
            url: "https://soundcloud.com/nadai"
        },
        {
            img: dj1.src,
            name: "Neumateria",
            style: "Melodic Techno, Indie Dance",
            url: "https://soundcloud.com/neumateria"
        },
        {
            img: dj2.src,
            name: "Latyshev",
            style: "Melodic Techno, Indie Dance",
            url: "https://soundcloud.com/kyiv2c"
        },
        {
            img: dj4.src,
            name: "Manyface",
            style: "Techno, Electro",
            url: "https://soundcloud.com/user-548157346"
        },
        {
            img: dj5.src,
            name: "Abradan",
            style: "Melodic Techno",
            url: "https://soundcloud.com/abradan"
        },
    ]

    const stage2 = [
        {
            img: dj6.src,
            name: "Sasha Storm",
            style: "Hard Techno",
            url: "https://soundcloud.com/sasha_storm_music"
        },
        {
            img: dj7.src,
            name: "Maria Rodina",
            style: "Hard Techno",
        },
        {
            img: dj8.src,
            name: "Symonenko (live)",
            style: "Techno, Industrial",
            url: "https://soundcloud.com/symonenkomusic"
        },
        {
            img: dj9.src,
            name: "Kyiv2c",
            style: "Psy Trance",
            url: "https://soundcloud.com/kyiv2c"
        },
        {
            img: dj10.src,
            name: "Buryi",
            style: "Electro",
            url: "https://soundcloud.com/buryidj"
        },
        {
            img: dj11.src,
            name: "Illusion",
            style: "Hypnotic Techno",
            url: "https://soundcloud.com/py1gj60edvqz"
        },
    ]

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const readMoreClick = () => {
        readMoreRef.current.scrollIntoView()
    }

    const handleAddToCartClick = () => {
        import("react-facebook-pixel")
        .then((module) => module.default)
        .then((ReactPixel) => {
            ReactPixel.init(FB_PIXEL)
            ReactPixel.track("AddToCart")
        })
    };

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
        Aos.init({ duration: 1000, offset: 100 })
    }, [])

    useEffect(() => {
        const handleScroll = () => {
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
        
    }, [paymentBlockRef])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            <div className={classes.home}
                style={{
                    backgroundImage: `url(${home_bg.src})`
                }}
            >
                <div className={cx(classes.title, isChrome ? classes.chromeTitle : undefined)}>
                    <div className={classes.titleH1}>
                        <h1>Cyber</h1>
                        <h1>Cyber</h1>
                    </div>
                    <div className={classes.titleH2}>
                        <h1>Christmas</h1>
                        <h1>Christmas</h1>
                    </div>
                </div>
                <p className={classes.subtitle}>Е: {typingMore1}</p>
                <Button className={classes.buyButt} onClick={scrollToPayment}>
                    <p>{intl.formatMessage({ id: "cyberpunk.buyTicket" })}</p>
                    <div className={classes.r25}>
                        <IoMdArrowDown />
                        <img src={r25.src} alt="r25"/>
                    </div>
                </Button>
                <button className={classes.moreButt} onClick={readMoreClick}>
                    {intl.formatMessage({ id: "vampire.more" })}
                    <IoMdArrowDown />
                </button>
            </div>
            <div className={classes.intro}>
                <div className={classes.introSection}>
                    <img src={worldIcon.src} alt="world icon"/>
                    <p>{intl.formatMessage({ id: "cyberChristmas.intro1" })}<br/>
                    {intl.formatMessage({ id: "cyberChristmas.intro2" })}</p>
                </div>
                <div className={classes.introSection}>
                    <img src={runeIcon.src} alt="rune icon"/>
                    <p>{intl.formatMessage({ id: "cyberChristmas.intro3" })}<br/>
                    {intl.formatMessage({ id: "cyberChristmas.intro4" })}
                    <br/><br/>
                    {intl.formatMessage({ id: "cyberChristmas.intro5" })}</p>
                </div>
            </div>
            <div className={classes.candies}>
                <MovingCandy img={candyGreenImg.src} side="left"/>
                <MovingCandy img={candyRedImg.src} side="right"/>
            </div>
            {/* VIDOS */}
            <div className={classes.vidos}>
                <div className={classes.videoBlock}>
                    <VideoLazy
                        src="/images/cyber-christmas/cyber_promo_21.mp4"
                        preview={promo_preview.src}
                        frame={video_frame_mob.src}
                        classNameMain={classes.promo}
                        classNameFrame={classes.frame}
                    />
                </div>
                <img className={classes.cabel3} src={cabel1.src} alt="cables"/>
                <img className={classes.cabel2} src={cabel2.src} alt="cables"/>
                <img className={classes.cabel1} src={cabel3.src} alt="cables"/>
            </div>
            <div className={classes.vidosText}>
                <p>{intl.formatMessage({ id: "cyberChristmas.vidosText1" })}</p>
                <p>{intl.formatMessage({ id: "cyberChristmas.vidosText2" })}</p>
                <label>{intl.formatMessage({ id: "cyberChristmas.vidosText1" })}<span>{intl.formatMessage({ id: "cyberChristmas.vidosText2" })}</span></label>
            </div>
            <div className={classes.speech}
                style={{
                    backgroundImage: `url(${speech_bg.src})`
                }}
            >
                <p>{typingMore2}</p>
            </div>
            {/* DETAILS */}
            <div className={classes.details} ref={readMoreRef}>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">PARTY DETAILS</h3>
                <div className={classes.detailsSections} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <img src={locationIcon.src} alt="location"/>
                                <p>{intl.formatMessage({ id: "cyberpunk.place" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>{intl.formatMessage({ id: "cyberChristmas.details1" })}
                            <br/><br/>
                            <strong>{intl.formatMessage({ id: "cyberChristmas.details2" })}</strong></p>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <img src={timeIcon.src} alt="time"/>
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
                                <img src={dressIcon.src} alt="dress"/>
                                <p>{intl.formatMessage({ id: "cyberpunk.dresscode" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                {intl.formatMessage({ id: "cyberChristmas.details3" })}
                                <br/><br/>
                                {intl.formatMessage({ id: "cyberChristmas.details4" })}
                                <br/><br/>
                                <strong>{intl.formatMessage({ id: "cyberChristmas.details5" })}</strong> {intl.formatMessage({ id: "cyberChristmas.details6" })}
                            </p>
                        </div>
                    </div>
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <img src={countIcon.src} alt="count"/>
                                <p>{intl.formatMessage({ id: "cyberpunk.count" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>800</p>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <img src={priceIcon.src} alt="price"/>
                                <p>{intl.formatMessage({ id: "cyberpunk.ticketPrice" })}</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>{price} UAH</p>
                            <p className={classes.detailText}>{intl.formatMessage({ id: "cyberChristmas.details7" })}</p>
                        </div>
                    </div>
                </div>
                <img src={hand2.src} className={classes.hand1} alt="hand" data-aos="fade-left" data-aos-duration="2000"/>
                <img src={hand1.src} className={classes.hand2} alt="hand" data-aos="fade-right" data-aos-duration="2000"/>
            </div>
            <div className={classes.dress}>
                <img src={hudImg.src} className={classes.hud} alt="hud"/>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">{intl.formatMessage({ id: "cyberChristmas.dresscode" })}</h3>
                <div className={classes.dressVariants}>
                    <div className={classes.dressEl}>
                        <div className={classes.dressImgContainer}>
                            <Image src={dress1} alt="Urban" fill/>
                        </div>
                        <p>Urban</p>
                    </div>
                    <div className={classes.dressEl}>
                        <div className={classes.dressImgContainer}>
                            <Image src={dress2} alt="Rave" fill/>
                        </div>
                        <p>Rave</p>
                    </div>
                    <div className={classes.dressEl}>
                        <div className={classes.dressImgContainer}>
                            <Image src={dress3} alt="Corpo" fill/>
                        </div>
                        <p>Corpo</p>
                    </div>
                </div>
            </div>
            <div className={classes.buy}>
                <Button className={classes.buyButt} onClick={scrollToPayment}>
                    <p>{intl.formatMessage({ id: "cyberpunk.buyTicket" })}</p>
                    <div className={classes.r25}>
                        <IoMdArrowDown />
                        <img src={r25.src} alt="r25"/>
                    </div>
                </Button>
            </div>
            <div className={classes.lineup}>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">LINE UP</h3>
                <div className={classes.stageHeader}>
                    <img src={stage1Icon.src} alt="stage1"/>
                    <p>{intl.formatMessage({ id: "cyberChristmas.lineup1" })}</p>
                </div>
                <div className={classes.stage}>
                    <div className={classes.skins} data-aos="fade-down" data-aos-duration="2000">
                        {stage1.map((el, index) => (
                            <div
                                className={cx(classes.skin, infoIndex === index ? classes.skinOpen : undefined)}
                                onMouseEnter={() => setInfoIndex(index)}
                                onMouseLeave={() => setInfoIndex(0)}
                                key={index}
                            >
                                <p className={classes.djName}><strong>{el.name}</strong></p>
                                <img src={el.img} alt={el.name} className={classes.skinImg}/>
                                <div className={classes.cardInfo}>
                                    <img src={dj_card_green.src} alt="card"/>
                                    <div className={classes.skinInfo}>
                                        <strong>{el.name}</strong>
                                        <div className={classes.infoLine}/>
                                        <div className={classes.subSkinInfo}>
                                            <p>{el.style}</p>
                                        </div>
                                        <div className={classes.infoLine}/>
                                        <a href={el.url} target="_blank">{intl.formatMessage({ id: "cyberChristmas.soc" })}</a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={classes.stageHeader}>
                    <img src={stage2Icon.src} alt="stage2"/>
                    <p>{intl.formatMessage({ id: "cyberChristmas.lineup2" })}</p>
                </div>
                <div className={classes.stage}>
                    <div className={cx(classes.skins, classes.skinsRed)} data-aos="fade-down" data-aos-duration="2000">
                        {stage2.map((el, index) => (
                            <div
                                className={cx(classes.skin, infoIndex === index + 10 ? classes.skinOpen : undefined)}
                                onMouseEnter={() => setInfoIndex(index + 10)}
                                onMouseLeave={() => setInfoIndex(10)}
                                key={index}
                            >
                                <p className={classes.djName}><strong>{el.name}</strong></p>
                                <img src={el.img} alt={el.name} className={classes.skinImg}/>
                                <div className={classes.cardInfo}>
                                    <img src={dj_card_red.src} alt="card"/>
                                    <div className={classes.skinInfo}>
                                        <strong>{el.name}</strong>
                                        <div className={classes.infoLine}/>
                                        <div className={classes.subSkinInfo}>
                                            <p>{el.style}</p>
                                        </div>
                                        <div className={classes.infoLine}/>
                                        {el.url && <a href={el.url} target="_blank">{intl.formatMessage({ id: "cyberChristmas.soc" })}</a>}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <img src={separator.src} alt="separator" className={classes.separator}/>
            {/* PLAYLIST */}
            <div className={classes.playlist}>
                <h3 className={classes.blockHeader} data-aos="fade-down" data-aos-duration="2000">PRE PARTY PLAYLIST</h3>
                <div className={classes.playlistBody}>
                    <EqualizerSvg/>
                    <iframe
                        style={{ borderRadius: '12px' }}
                        src="https://open.spotify.com/embed/playlist/0Z0DzhFhPNFQcRUcjbi1fe?utm_source=generator"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                        allowFullScreen
                    />
                    <EqualizerSvg/>
                </div>
            </div>
            <div className={classes.candies}>
                <MovingCandy img={candyGreenImg.src} side="left" index={2}/>
                <MovingCandy img={candyRedImg.src} side="right" index={2}/>
            </div>
            {/* HOW IT WAS */}
            <div className={classes.how}>
                <div className={cx(classes.howSection, classes.was)}>
                    <h4>{intl.formatMessage({ id: "cyberChristmas.was" })}</h4>
                    <div className={classes.howContainerImg}>
                        <Image src={wasImg} alt="how it was" fill/>
                    </div>
                </div>
                <div className={cx(classes.howSection, classes.will)}>
                    <h4>{intl.formatMessage({ id: "cyberChristmas.will" })}</h4>
                    <p>{intl.formatMessage({ id: "cyberChristmas.willText" })}</p>
                    <div className={classes.willStages}>
                        <div className={classes.willImgContainer}>
                            <Image src={stage1will1} alt="stage 1" fill/>
                        </div>
                        <p className={classes.stagesText}>Світлове шоу,</p>
                        <div className={classes.willImgContainer}>
                            <Image src={stage1will2} alt="stage 1" fill/>
                        </div>
                        <p className={classes.stagesText}>яке перенесе вас...</p>
                    </div>
                    <div className={classes.willStages}>
                        <div className={classes.willImgContainer}>
                            <Image src={stage2will1} alt="stage 2" fill/>
                        </div>
                        <p className={classes.stagesText}>у вимір кіберпанку!</p>
                        <div className={classes.willImgContainer}>
                            <Image src={stage2will2} alt="stage 2" fill/>
                        </div>
                    </div>
                    <p className={classes.disclaimer}>{intl.formatMessage({ id: "cyberChristmas.willText1" })}</p>
                </div>
            </div>
            {/* DOP */}
            <div className={classes.dop}
                style={{
                    backgroundImage: `url(${dop_bg.src})`
                }}
            >
                <img src={separator_cyber.src} alt="separator" className={classes.separator_cyber}/> 
                <img src={separator_cyber.src} alt="separator" className={classes.separator_cyber}/> 
                <div className={classes.dopEl}>
                    <div className={classes.dopImgContainer}>
                        <Image src={dop1} alt="dop" fill/>
                    </div>
                    <p>{intl.formatMessage({ id: "cyberChristmas.dop1" })}</p>
                </div>
                <div className={classes.dopEl}>
                    <div className={classes.dopImgContainer}>
                        <Image src={dop2} alt="dop" fill/>
                    </div>
                    <p>{intl.formatMessage({ id: "cyberChristmas.dop2" })}</p>
                </div>
                <div className={classes.dopEl}>
                    <div className={classes.dopImgContainer}>
                        <Image src={dop3} alt="dop" fill/>
                    </div>
                    <p>{intl.formatMessage({ id: "cyberChristmas.dop3" })}</p>
                </div>
            </div>
            <img className={classes.lights} src={gir.src} alt="lights" />
            {/* FORM */}
            <div className={classes.form}>
                <CyberChristmasForm
                    paymentBlockRef={paymentBlockRef}
                    price={price}
                    setPrice={setPrice}
                    event={event}
                />
            </div>
            {/* FAQ */}
            <div className={classes.faqContainer}>
                <div className={classes.faq}>
                    <h3 className={classes.blockHeader}>FAQ</h3>
                    <div className={classes.questions}>
                        {faq.map(el => (
                            <CyberChristmasFaqItem item={el} key={el._id}/>
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

export default CyberChristmas