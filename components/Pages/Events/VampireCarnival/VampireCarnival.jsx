import { Button } from "@mui/material"
import { useIntl } from "react-intl"
import classes from "./VampireCarnival.module.css"
import { IoArrowDownSharp } from "react-icons/io5"
import { IoMdPlay } from "react-icons/io"
import { useEffect, useRef, useState } from "react"
import moment from "moment"
import VampireForm from "./VampireForm/VampireForm"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"
import Link from "next/link"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import { cx } from "../../../../utils/classnames"
import Image from "next/image"
import VampireFaqItem from "./VampireFaqItem/VampireFaqItem"
import home_back_img from "/public/images/vampire/home.jpg"
import video_back_img from "/public/images/vampire/video.jpg"
import video_shadow_img from "/public/images/vampire/video_bg.png"
import invite_bg from "/public/images/vampire/invite.jpg"
import logo from "/public/images/vampire/logo.png"
import prev1 from "/public/images/vampire/prev1.jpg"
import prev2 from "/public/images/vampire/prev2.jpg"
import prev3 from "/public/images/vampire/prev3.jpg"
import residence from "/public/images/vampire/residence.webp"
import shadow2 from "/public/images/vampire/shadow2.png"
import girl from "/public/images/vampire/girl.jpg"
import veny from "/public/images/vampire/veny.png"
import price_img from "/public/images/vampire/price.png"

import marteli from "/public/images/vampire/marteli.webp"
import nadai from "/public/images/vampire/nadai.webp"
import kyiv2c from "/public/images/vampire/baks.webp"
import blade from "/public/images/vampire/blade.webp"
import neu from "/public/images/vampire/neu.webp"
import sky from "/public/images/vampire/sky.webp"
import noff from "/public/images/vampire/noff.webp"
import monastetiq from "/public/images/vampire/monastetiq.webp"
import manyface from "/public/images/vampire/manyface.webp"

import card from "/public/images/vampire/card.webp"
import dj_preview from "/public/images/vampire/loh.png"
import dj_card_bg from "/public/images/vampire/card_bg.webp"
import light from "/public/images/vampire/light.png"

const VampireCarnival = (props) => {
    const { event } = props

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const [isPlayVideo, setIsPlayVideo] = useState(false)

    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)
    const djsRef = useRef(null)
    const videoRef = useRef(null)

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const { width } = useWindowDimensions()

    const intl = useIntl()

    const faq = event.faq

    const stage1 = [
        {
            name: "Monastetiq",
            photo: monastetiq.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Nadai",
            photo: nadai.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Blade",
            photo: blade.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Neumateria",
            photo: neu.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Noff",
            photo: noff.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Paul Meise",
            photo: marteli.src,
            url: "https://soundcloud.com/nadai"
        }
    ]

    const stage2 = [
        {
            name: "Rave Mysterio",
            photo: marteli.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Staylen",
            photo: marteli.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Kyiv2c",
            photo: kyiv2c.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Manyface",
            photo: manyface.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Artem Sky",
            photo: sky.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Marteli",
            photo: marteli.src,
            url: "https://soundcloud.com/nadai"
        },
        {
            name: "Buryi",
            photo: marteli.src,
            url: "https://soundcloud.com/nadai"
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
            ReactPixel.init("573414703062456")
            ReactPixel.track("AddToCart")
        })
    };

    const handleDjHover = () => {
        const children = djsRef.current.children;
        children[0].children[0].classList.remove(classes.djInverMobile)
    }

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
        }
    }, [videoRef, djsRef, paymentBlockRef, width])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            {/* HOME */}
            <div
                className={classes.home}
                style={{
                    backgroundImage: `url(${home_back_img.src})`
                }}
            >
                <div className={classes.title}>
                    <h1>Vampire</h1>
                    <h2>Carnival</h2>
                </div>
                <div className={classes.foot}>
                    <p>{intl.formatMessage({ id: "vampire.titleFootText" })}</p>
                    <div className={classes.homeButts}>
                        <div className={classes.mock} />
                        <Button className={classes.cta} onClick={scrollToPayment}>{intl.formatMessage({ id: "vampire.cta" })}</Button>
                        <button className={classes.moreButt} onClick={readMoreClick}>
                            {intl.formatMessage({ id: "vampire.more" })}
                            <IoArrowDownSharp />
                        </button>
                    </div>
                </div>
            </div>
            {/* VIDEO */}
            <div
                className={classes.video}
                ref={readMoreRef}
                style={{
                    backgroundImage: `url(${video_back_img.src})`
                }}
            >
                <Image
                    src={video_shadow_img}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                <div ref={videoRef} className={classes.videoText}>
                    <p>{intl.formatMessage({ id: "vampire.video1" })}</p>
                    <p>{intl.formatMessage({ id: "vampire.video2" })}</p>
                </div>
                {!isPlayVideo ? (
                    <div className={classes.vidos} onClick={() => setIsPlayVideo(true)}>
                        <div className={classes.vidosText}>
                            <p>{intl.formatMessage({ id: "vampire.video4" })}</p>
                            <p>{intl.formatMessage({ id: "vampire.video5" })}</p>
                        </div>
                        <IoMdPlay />
                    </div>
                ) : (
                    <iframe
                        src={`https://www.youtube.com/embed/MZLht9w2Y88?si=ozr3oCh5h9EBxAjN?autoplay=${
                            isPlayVideo ? 1 : 0
                        }&mute=1`}
                        frameborder="0"
                        allowfullscreen
                        data-aos="fade"
                        data-aos-duration="2000"
                    />
                )}
                <div className={classes.videoText}>
                    <p>{intl.formatMessage({ id: "vampire.video3" })}</p>
                </div>
            </div>
            {/* INVITE */}
            <div
                className={classes.invite}
                style={{
                    backgroundImage: `url(${invite_bg.src})`
                }}
            >
                <Image
                    src={video_shadow_img}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                <p>{intl.formatMessage({ id: "vampire.invite1" })}</p>
                <h3>{intl.formatMessage({ id: "vampire.invite2" })}</h3>
                <p>{intl.formatMessage({ id: "vampire.invite3" })}</p>
            </div>
            {/* DETAILS */}
            <div
                className={classes.details}
                style={{
                    backgroundImage: `url(${logo.src})`
                }}
            >
                <h2>PARTY DETAILS</h2>
                <div className={classes.detailsCols}>
                    <div className={classes.detailsCol}>
                        <h4>PLACE</h4>
                        <p>{intl.formatMessage({ id: "vampire.details1" })}</p>
                        <p>{intl.formatMessage({ id: "vampire.details2" })}</p>
                        <p className={classes.redText}>{intl.formatMessage({ id: "vampire.details3" })}</p>
                    </div>
                    <div className={classes.detailsCol}>
                        <h4>PRICE</h4>
                        <h3>{price} UAH</h3>
                        <p>{intl.formatMessage({ id: "vampire.details4" })}</p>
                        <p>{intl.formatMessage({ id: "vampire.details5" })}</p>
                        <h4>SERVICE</h4>
                        <p>{intl.formatMessage({ id: "vampire.details6" })}</p>
                    </div>
                    <div className={classes.detailsCol}>
                        <h4>DRESS CODE</h4>
                        <p>{intl.formatMessage({ id: "vampire.details7" })}</p>
                        <p>{intl.formatMessage({ id: "vampire.details8" })}</p>
                        <h4 className={classes.duration}>DURATION</h4>
                        <h3>14:00 - 22:00</h3>
                    </div>
                </div>
                <Button onClick={scrollToPayment} className={classes.cta}>{intl.formatMessage({ id: "vampire.cta" })}</Button>
            </div>
            {/* PREVS */}
            <div className={classes.prevs}>
                <div className={classes.prev}>
                    <div className={classes.prevImg}>
                        <Image
                            src={prev1}
                            alt="vampires"
                            fill
                        />
                    </div>
                    <p>{intl.formatMessage({ id: "vampire.prev1" })}</p>
                </div>
                <div className={classes.prev}>
                    <div className={classes.prevImg}>
                        <Image
                            src={prev2}
                            alt="moon"
                            fill
                        />
                    </div>
                    <p>{intl.formatMessage({ id: "vampire.prev2" })}</p>
                </div>
                <div className={classes.prev}>
                    <div className={classes.prevImg}>
                        <Image
                            src={prev3}
                            alt="master"
                            fill
                        />
                    </div>
                    <p>{intl.formatMessage({ id: "vampire.prev3" })}</p>
                </div>
            </div>
            {/* LINEUP */}
            <div className={classes.lineup}>
                <div  className={cx(classes.stage, classes.stage1)}>
                    <h2>LINEUP STAGE 1</h2>
                    <div ref={djsRef} className={classes.djs}>
                        {stage1.map((el) => (
                            <div className={classes.djContainer}>
                                <div className={classes.dj} onMouseEnter={handleDjHover}>
                                    <Image
                                        className={classes.djMirror}
                                        src={dj_card_bg.src}
                                        fill
                                        alt="card"
                                    />
                                    <Image
                                        className={classes.djShadow}
                                        src={dj_preview.src}
                                        fill
                                        alt="dj shadow"
                                    />
                                    <Image
                                        className={classes.djPhoto}
                                        src={el.photo}
                                        fill
                                        alt="dj photo"
                                    />
                                    <Image
                                        className={classes.djCard}
                                        src={card.src}
                                        fill
                                        alt="mirror"
                                    />
                                </div>
                                <p>{el.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
                <div className={cx(classes.stage, classes.stage2)}>
                    <h2>LINEUP STAGE 2</h2>
                    <Image
                    src={video_shadow_img}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                    <div className={classes.djs}>
                        {stage2.map((el) => (
                            <div className={classes.djContainer}>
                                <div className={classes.dj} onMouseEnter={handleDjHover}>
                                    <Image
                                        className={classes.djMirror}
                                        src={dj_card_bg.src}
                                        fill
                                        alt="card"
                                    />
                                    <Image
                                        className={classes.djShadow}
                                        src={dj_preview.src}
                                        fill
                                        alt="dj shadow"
                                    />
                                    <Image
                                        className={classes.djPhoto}
                                        src={el.photo}
                                        fill
                                        alt="dj photo"
                                    />
                                    <Image
                                        className={classes.djCard}
                                        src={card.src}
                                        fill
                                        alt="mirror"
                                    />
                                </div>
                                <p>{el.name}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            {/* RESIDENCE */}
            <div
                className={classes.residence}
                style={{
                    backgroundImage: `url(${residence.src})`
                }}
            >
                <Image
                    src={video_shadow_img}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                <div className={classes.residenceContent}>
                    <h3>
                        RESIDENCE
                        <br />
                        IS WAITING
                        <br />
                        FOR YOU
                    </h3>
                    <p>{intl.formatMessage({ id: "vampire.residence1" })}</p>
                    <Button onClick={scrollToPayment} className={classes.cta}>{intl.formatMessage({ id: "vampire.cta" })}</Button>
                </div>
            </div>
            {/* GIRL */}
            <div
                className={classes.girl}
                style={{
                    backgroundImage: `url(${girl.src})`
                }}
            >
                <Image
                    src={shadow2}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                <p>{intl.formatMessage({ id: "vampire.girl1" })}</p>
                <p>{intl.formatMessage({ id: "vampire.girl2" })}</p>
            </div>
            {/* FAQ */}
            <div
                className={classes.faq}
                style={{
                    backgroundImage: `url(${veny.src})`
                }}
            >
                <Image
                    src={video_shadow_img}
                    alt="shadow"
                    fill
                    className={classes.shadow}
                />
                <h2>FAQ</h2>
                <div className={classes.questions}>
                    {faq.map((el, index) => (
                        <VampireFaqItem
                            key={el.title}
                            item={el}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            {/* PRICE */}
            <div
                className={classes.price}
                style={{
                    backgroundImage: width > 1170 ? `url(${price_img.src})` : `url(${light.src})`
                }}
            >
                <h2>PRICE</h2>
                <div className={classes.priceContent}>
                    <div className={classes.priceEmpty} />
                    <div className={classes.priceInfo}>
                        <p>{intl.formatMessage({ id: "vampire.price" })}</p>
                        <div className={classes.prices}>
                            <div className={cx(classes.priceBlock, classes.activePrice)}>
                                <p>{intl.formatMessage({ id: "vampire.currentPrice" })}</p>
                                <h4>{price} UAH</h4>
                            </div>
                            <div className={cx(classes.priceBlock)}>
                                <div className={classes.blur} />
                                <p>{intl.formatMessage({ id: "vampire.currentPrice" })}</p>
                                <h4>{price} UAH</h4>
                            </div>
                            <div className={cx(classes.priceBlock)}>
                                <div className={classes.blur} />
                                <p>{intl.formatMessage({ id: "vampire.currentPrice" })}</p>
                                <h4>{price} UAH</h4>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* FORM */}
            <VampireForm
                paymentBlockRef={paymentBlockRef}
                event={event}
                price={price}
                setPrice={setPrice}
            />
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

export default VampireCarnival
