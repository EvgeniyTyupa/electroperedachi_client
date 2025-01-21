import classes from "./Hozho.module.css"
import home_bg from "/public/images/hozho/home.png"
import home_bg_en from "/public/images/hozho/home_en.png"
import home_bg_mob from "/public/images/hozho/home_bg_mob.jpg"
import { useIntl } from "react-intl"
import HozhoBuyButton from "./Button/HozhoBuyButton"
import arrow_icon from "/public/images/hozho/arrow.svg"
import intro_bg from "/public/images/hozho/intro_bg.png"
import intro_flask1 from "/public/images/hozho/intro_flask1.png"
import intro_flask2 from "/public/images/hozho/intro_flask2.png"
import intro_flask3 from "/public/images/hozho/intro_flask3.png"
import vidos_bg from "/public/images/hozho/vidos_bg.png"
import details_bg from "/public/images/hozho/details_bg.png"
import runa from "/public/images/hozho/runa.png"
import Image from "next/image"
import { PiPlayCircleThin } from "react-icons/pi";
import VideoLazy from "../../../Common/VideoLazy/VideoLazy"
import { useEffect, useRef, useState } from "react"
import location_icon from "/public/images/hozho/location_icon.svg"
import price_icon from "/public/images/hozho/price_icon.svg"
import dress_icon from "/public/images/hozho/dress_icon.svg"
import time_icon from "/public/images/hozho/time_icon.svg"
import count_icon from "/public/images/hozho/count_icon.svg"
import headliner_bg from "/public/images/hozho/headliner_bg.jpg"
import artists_bg from "/public/images/hozho/artists_bg.jpg"
import flask_bg from "/public/images/hozho/flask_bg.jpg"
import location_bg from "/public/images/hozho/location_bg.png"
import location_bg_mob from "/public/images/hozho/location_bg_mob.png"
import HozhoSlider from "./Slider/HozhoSlider"
import YoutubeCard from "../../../Common/YoutubeCard/YoutubeCard"
import krest from "/public/images/hozho/krest.svg"
import photo1 from "/public/images/hozho/photo1.png"
import photo2 from "/public/images/hozho/photo2.png"
import fog from "/public/images/hozho/fog.png"
import dresscode_bg from "/public/images/hozho/dresscode_bg.jpg"
import HozhoForm from "./HozhoForm/HozhoForm"
import moment from "moment"

import Aos from "aos"
import "aos/dist/aos.css"
import HozhoFaqItem from "./HozhoFaqItem/HozhoFaqItem"

import dr1_icon from "/public/images/hozho/dr1_icon.svg"
import dr2_icon from "/public/images/hozho/dr2_icon.svg"
import dr3_icon from "/public/images/hozho/dr3_icon.svg"
import dr1 from "/public/images/hozho/dr1.png"
import dr2 from "/public/images/hozho/dr2.png"
import dr3 from "/public/images/hozho/dr3.png"
import { FB_PIXEL } from "../../../../utils/constants"
import useWindowDimensions from "../../../../hooks/useWindowDimension"

import r4dj from "/public/images/hozho/R4DJ.png"
import g10 from "/public/images/hozho/g10.svg"
import jager from "/public/images/hozho/jager.png"
import dovzh from "/public/images/hozho/dovzh.svg"
import drug from "/public/images/hozho/drug.png"
import hozho_logo from "/public/images/hozho/hozho_logo.png"
import details_bg_mob from "/public/images/hozho/details_bg_mob.jpg"
import vidos_bg_mob from "/public/images/hozho/video_bg_mob.jpg"

const Hozho = (props) => {
    const { event } = props

    const [isPlayVideoTeaser, setIsPlayVideoTeaser] = useState(false)
    const [isPlayVideoLocation, setIsPlayVideoLocation] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const paymentBlockRef = useRef(null)
    const readMoreRef = useRef(null)

    const [price, setPrice] = useState(0)
    const [isShowBuy, setIsShowBuy] = useState(false)

    const intl = useIntl()
    const currentLocale = intl.locale;

    const faq = event.faq

    const { width } = useWindowDimensions()

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
            <div className={classes.home} style={{
                backgroundImage: width > 668 ? 
                    `url(${currentLocale === "ua" ? home_bg.src : home_bg_en.src})` :
                    `url(${home_bg_mob.src})`
            }}>
                <div className={classes.homeContent} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.homeTitleInfo}>
                        <div className={classes.partners}>
                            <img src={r4dj.src} alt="rent4dj"/>
                            <img src={g10.src} alt="g10"/>
                            <img src={jager.src} alt="jagermeister"/>
                            <img src={dovzh.src} alt="dovzhenko"/>
                            <img src={drug.src} alt="drugstore"/>
                        </div>
                        <div className={classes.present}>
                            <div className={classes.cityDate}>
                                <h3>{intl.formatMessage({ id: "hozho.city" })}</h3>
                                <h3>22.02</h3>
                            </div>
                            <img className={classes.hozhoLogo} src={hozho_logo.src} alt="hozho"/>
                            <h3 className={classes.venue}>{intl.formatMessage({ id: "hozho.address" })}</h3>
                        </div>
                    </div>
                    <p className={classes.homeSub}>{intl.formatMessage({ id: "hozho.sub" })}</p>
                    <HozhoBuyButton onClick={scrollToPayment}/>
                    <button className={classes.homeMore} onClick={readMoreClick}>
                        <img src={arrow_icon.src} alt="arrow"/>
                        <p>{intl.formatMessage({ id: "hozho.more" })}</p>
                    </button>
                </div>
            </div>
            {/* INTRO */}
            <div ref={readMoreRef} className={classes.intro} style={{
                backgroundImage: `url(${intro_bg.src})`
            }}>
                <div className={classes.introContainer} data-aos="fade-down" data-aos-duration="2000">
                    <h3>{intl.formatMessage({ id: "hozho.1" })}</h3>
                    <img className={classes.introImg1} src={intro_flask1.src} alt="flask"/>
                    <p>{intl.formatMessage({ id: "hozho.intro" })}</p>
                    <img className={classes.introImg2} src={intro_flask2.src} alt="flask"/>
                    <img className={classes.introImg3} src={intro_flask3.src} alt="flask"/>
                </div>
            </div>
            {/* VIDOS */}
            <div className={classes.vidos} data-aos="fade-down" data-aos-duration="2000">
                <p className={classes.vidosText}><strong>HOZHO</strong> {intl.formatMessage({ id: "hozho.vidos" })}</p>
                <div className={classes.vidosContainer}
                    style={{
                        backgroundImage: `url(${vidos_bg.src})`
                    }}
                    onClick={() => setIsPlayVideoTeaser(true)}
                >
                    {!isPlayVideoTeaser && <p>{intl.formatMessage({ id: "hozho.2" })}</p>}
                    {!isPlayVideoTeaser && <PiPlayCircleThin/>}
                    {isPlayVideoTeaser && (
                        <VideoLazy
                            src="/images/hozho/hozho3.mp4"
                            classNameMain={classes.videoMain}
                            isPlayVideo={isPlayVideoTeaser}
                        />
                    )}
                    {!isPlayVideoTeaser && <p className={classes.vidosBigText}>{intl.formatMessage({ id: "hozho.3" })}</p>}
                </div>
                <div className={classes.vidosContainerMob}>
                    <p>{intl.formatMessage({ id: "hozho.2" })}</p>
                    <p className={classes.vidosBigText}>{intl.formatMessage({ id: "hozho.3" })}</p>
                    {!isPlayVideoTeaser && (
                        <div className={classes.vidosBgMob}
                            onClick={() => setIsPlayVideoTeaser(true)}
                            style={{
                                backgroundImage: `url(${vidos_bg_mob.src})`
                            }}
                        />
                    )}
                    {isPlayVideoTeaser && (
                        <VideoLazy
                            src="/images/hozho/hozho3.mp4"
                            classNameMain={classes.videoMain}
                            isPlayVideo={isPlayVideoTeaser}
                        />
                    )}
                </div>
            </div>
            {/* DETAILS */}
            <div className={classes.details}
                style={{
                    backgroundImage: width > 1024 ? `url(${details_bg.src})` : `url(${details_bg_mob.src})`
                }}
            >
                <h3 data-aos="fade-down" data-aos-duration="2000">{intl.formatMessage({ id: "hozho.4" })}</h3>
                <div className={classes.runaContainer}>
                    <div className={classes.runaImg} data-aos="fade" data-aos-duration="2000">
                        <Image src={runa} alt="runa" fill/>
                    </div>
                    <div className={classes.detailsContainer}>
                        <div className={classes.detailsRow}>
                            <div className={`${classes.detail} ${classes.detailEnd}`} data-aos="fade-left" data-aos-duration="2000">
                                <div className={classes.detailHeader}>
                                    <img src={location_icon.src} alt="location"/>
                                    <p>{intl.formatMessage({ id: "hozho.5" })}</p>
                                </div>
                                <p className={classes.detailSub}>
                                    {intl.formatMessage({ id: "hozho.6" })}
                                </p>
                                <p className={classes.detailText}>{intl.formatMessage({ id: "hozho.7" })}</p>
                            </div>
                            <div className={`${classes.detail}`} data-aos="fade-right" data-aos-duration="2000">
                                <div className={classes.detailHeader}>
                                    <img src={price_icon.src} alt="price"/>
                                    <p>{intl.formatMessage({ id: "hozho.8" })}</p>
                                </div>
                                <p className={classes.detailText}>{intl.formatMessage({ id: "hozho.9" })} <br/>{intl.formatMessage({ id: "hozho.10" })}</p>
                            </div>
                        </div>
                        <div className={`${classes.detailsRow}`}>
                            <div className={`${classes.detail} ${classes.detailEnd} ${classes.detailRelative}`} data-aos="fade-left" data-aos-duration="2000">
                                <div className={classes.detailHeader}>
                                    <img src={count_icon.src} alt="count"/>
                                    <p>{intl.formatMessage({ id: "hozho.11" })}</p>
                                </div>
                                <p className={classes.detailText}>3000<br/>{intl.formatMessage({ id: "hozho.12" })}</p>
                            </div>
                            <div className={`${classes.detail}`} data-aos="fade-right" data-aos-duration="2000">
                                <div className={classes.detailHeader}>
                                    <img src={dress_icon.src} alt="dresscode"/>
                                    <p>{intl.formatMessage({ id: "hozho.13" })}</p>
                                </div>
                                <p className={classes.detailSub}>
                                    {intl.formatMessage({ id: "hozho.14" })}
                                </p>
                                <p className={classes.detailText}>{intl.formatMessage({ id: "hozho.15" })}</p>
                            </div>
                        </div>
                        <div className={`${classes.detailsRow}`}>
                            <div className={`${classes.detail} ${classes.detailEnd} ${classes.detailRelative}`}>
                            </div>
                            <div className={`${classes.detail}`} data-aos="fade-right" data-aos-duration="2000">
                                <div className={classes.detailHeader}>
                                    <img src={time_icon.src} alt="time"/>
                                    <p>{intl.formatMessage({ id: "hozho.16" })}</p>
                                </div>
                                <p className={classes.detailText}>15:00 - 22:30</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.buyButtContainer} data-aos="fade-up" data-aos-duration="2000">
                    <HozhoBuyButton onClick={scrollToPayment}/>
                </div>
            </div>
            {/* HEADLINER */}
            <div className={classes.headliner}>
                <div className={classes.headlinerTop}
                    style={{
                        backgroundImage: `url(${headliner_bg.src})`
                    }}
                >
                    <h3 data-aos="fade-down" data-aos-duration="2000">HEADLINER</h3>
                    <div className={classes.headlinerTopInfo}>
                        <div className={classes.headlinerTextBlock}>
                            <p data-aos="fade-left" data-aos-duration="2000"><strong>Hozho</strong> <span>- {intl.formatMessage({ id: "hozho.17" })}</span><br/>
                            {intl.formatMessage({ id: "hozho.18" })}</p>
                            <p data-aos="fade-left" data-aos-duration="2000">{intl.formatMessage({ id: "hozho.19" })}</p>
                        </div>
                        <p className={classes.rightText} data-aos="fade-right" data-aos-duration="2000">{intl.formatMessage({ id: "hozho.20" })}</p>
                    </div>
                    <p data-aos="fade-left" data-aos-duration="2000"><strong>{intl.formatMessage({ id: "hozho.21" })}</strong>, {intl.formatMessage({ id: "hozho.22" })} <br/>{intl.formatMessage({ id: "hozho.23" })}</p>
                </div>
                <div className={classes.slider} data-aos="fade-down" data-aos-duration="2000">
                    <HozhoSlider>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/PfIsOs5ObZU?si=HFdpQlHgs4pbJbMh"
                                title="Hozho at Volkswagen Arena, Istanbul (Türkiye) | Full Set"
                            />
                        </div>
                        <div className={classes.sliderEl}>
                            <iframe src="https://open.spotify.com/embed/artist/4SxTtbkEKXwyhltXD7tnYQ?utm_source=generator" width="100%" height="352px" frameBorder="0" allowfullscreen="" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
                        </div>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/w6ohEPMXPj8?si=fxPa3a0GVhI-Ogev"
                                title="Hozho - See The Light In The Darkness [100K SUBSCRIBERS SPECIAL]"
                            />
                        </div>
                    </HozhoSlider>
                </div>
            </div>
            {/* ARTISTS */}
            <div className={classes.artists}>
                <div className={classes.artistsTop}
                    style={{
                        backgroundImage: `url(${artists_bg.src})`
                    }}
                >
                    <div className={classes.artistsTitle} data-aos="fade-down" data-aos-duration="2000">
                        <h3>LINE UP</h3>
                        <p>{intl.formatMessage({ id: "hozho.24" })}</p>
                    </div>
                    <div className={classes.artistsTextBlock} data-aos="fade-down" data-aos-duration="2000">
                        <p><strong>{intl.formatMessage({ id: "hozho.25" })}</strong>, {intl.formatMessage({ id: "hozho.26" })}</p>
                        <p>{intl.formatMessage({ id: "hozho.27" })}</p>
                    </div>
                </div>
                <div className={classes.slider} data-aos="fade-down" data-aos-duration="2000">
                    <HozhoSlider>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/VjNr9ZVK4tI?si=uoMCBtrbj0LFAJWO"
                                title="Nadai @ Gulliver, Roof Top, Kyiv, High-Tech Minimal Mix | 4K"
                            />
                        </div>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/oW21H7l6cwo?si=EEt3Pqf0u98nH-4k"
                                title="Paul Meise @ National Circus of Ukraine, Techno Mix, Air Acrobatic Performance | 4K"
                            />
                        </div>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/UyECenAmWjY?si=Ed9EQvIzbTBqJzum"
                                title="Marteli @ National Circus of Ukraine, Techno Mix, Air Acrobatic Performance | 4K"
                            />
                        </div>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/DhqA_vwSfic?si=ih2Rb_AfRue6pn5w"
                                title="Staylen @ electroperedachi rave opera 10/05/19"
                            />
                        </div>
                        <div className={classes.sliderEl}>
                            <YoutubeCard
                                src="https://www.youtube.com/embed/qpbdrpvvnX8?si=pojeXOhFIzDgFEdR"
                                title="Noff @ electroperedachi Hortitsa open air 22/06/19"
                            />
                        </div>
                    </HozhoSlider>
                </div>
            </div>
            {/* FLASK */}
            <div className={classes.flask}
                style={{
                    backgroundImage: `url(${flask_bg.src})`
                }}
            >
                <div className={classes.flaskTopGrad}/>
                <div className={classes.flaskBotGrad}/>
                <div className={classes.flaskText} data-aos="fade-left" data-aos-duration="2000">
                    <h3>{intl.formatMessage({ id: "hozho.28" })}</h3>
                    <p>{intl.formatMessage({ id: "hozho.29" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "hozho.30" })}
                    </p>
                </div>
            </div>
            {/* LOCATION */}
            <div className={classes.location} data-aos="fade-down" data-aos-duration="2000">
                <h3>{intl.formatMessage({ id: "hozho.31" })}</h3>
                <p className={classes.locationSub}>{intl.formatMessage({ id: "hozho.32" })}</p>
                <div className={classes.locationPoints}>
                    <div className={classes.locationPoint}>
                        <div className={classes.greenLine}/>
                        <p>{intl.formatMessage({ id: "hozho.33" })}</p>
                    </div>
                    <div className={classes.locationPoint}>
                        <div className={classes.greenLine}/>
                        <p>{intl.formatMessage({ id: "hozho.34" })}</p>
                    </div>
                    <div className={classes.locationPoint}>
                        <div className={classes.greenLine}/>
                        <p>{intl.formatMessage({ id: "hozho.35" })}</p>
                    </div>
                </div>
                <div className={classes.locationVideo}
                    style={{
                        backgroundImage: width > 568 ? `url(${location_bg.src})` : `url(${location_bg_mob.src})`
                    }}
                    onClick={() => setIsPlayVideoLocation(true)}
                >
                    {isPlayVideoLocation && (
                        <VideoLazy
                            src="/images/hozho/location.mp4"
                            classNameMain={classes.locationMain}
                            isPlayVideo={isPlayVideoLocation}
                        />
                    )}
                </div>
            </div>
            {/* SHOW */}
            <div className={classes.show} data-aos="fade-down" data-aos-duration="2000">
                <h3>Show is waiting for you!</h3>
                <p>{intl.formatMessage({ id: "hozho.36" })}<br/>
                    {intl.formatMessage({ id: "hozho.37" })}
                </p>

                <p>
                {intl.formatMessage({ id: "hozho.38" })}<br/>
                    <strong>{intl.formatMessage({ id: "hozho.39" })}</strong><br/>
                    {intl.formatMessage({ id: "hozho.40" })}
                </p>
                <img src={krest.src} alt="krest" className={classes.krest}/>
                <div className={classes.showPhotos}>
                    <div className={classes.showPhoto}>
                        <Image src={photo1} alt="photo" fill/>
                    </div>
                    <div className={classes.showPhoto}>
                        <Image src={photo2} alt="photo" fill/>
                    </div>
                </div>
                <Image src={fog} alt="fog" className={classes.fog}/>
            </div>
            <HozhoForm
                paymentBlockRef={paymentBlockRef}
                price={price}
                setPrice={setPrice}
                event={event}
            />
            {/* FAQ */}
            <div className={classes.faqContainer} data-aos="fade-down" data-aos-duration="2000">
                <div className={classes.faq}>
                    <h3 className={classes.blockHeader}>FAQ</h3>
                    <div className={classes.questions}>
                        {faq.map(el => (
                            <HozhoFaqItem item={el} key={el._id}/>
                        ))}
                    </div>
                </div>
            </div>
            {/* DRESSCODE */}
            <div className={classes.dresscode}
                style={{
                    backgroundImage: `url(${dresscode_bg.src})`
                }}
            >
                <div className={classes.flaskTopGrad}/>
                <div className={classes.flaskBotGrad}/>
                <div className={classes.dressInfo} data-aos="fade-down" data-aos-duration="2000">
                    <h3>{intl.formatMessage({ id: "hozho.41" })}</h3>
                    <p className={classes.dressText}>
                        <strong>HOZHO</strong> — {intl.formatMessage({ id: "hozho.42" })}<br/>
                        <strong>{intl.formatMessage({ id: "hozho.43" })}</strong> {intl.formatMessage({ id: "hozho.44" })} 
                        <br/><br/>
                        {intl.formatMessage({ id: "hozho.45" })}
                    </p>
                    <div className={classes.dressBlocks}>
                        <div className={classes.dressBlock}>
                            <div className={classes.dressImgContainer}>
                                <Image src={dr1} alt="minimalism" fill/>
                            </div>
                            <div className={classes.dressTextBlock}>
                                <div className={classes.dressTextHeader}>
                                    <img src={dr1_icon.src} alt="icon"/>
                                    <p>{intl.formatMessage({ id: "hozho.46" })}</p>
                                </div>
                                <p className={classes.dressSub}>{intl.formatMessage({ id: "hozho.47" })}</p>
                            </div>
                        </div>
                        <div className={classes.dressBlock}>
                            <div className={classes.dressImgContainer}>
                                <Image src={dr2} alt="mistery" fill/>
                            </div>
                            <div className={classes.dressTextBlock}>
                                <div className={classes.dressTextHeader}>
                                    <img src={dr2_icon.src} alt="icon"/>
                                    <p>{intl.formatMessage({ id: "hozho.48" })}</p>
                                </div>
                                <p className={classes.dressSub}>{intl.formatMessage({ id: "hozho.49" })}</p>
                            </div>
                        </div>
                        <div className={classes.dressBlock}>
                            <div className={classes.dressImgContainer}>
                                <Image src={dr3} alt="brave" fill/>
                            </div>
                            <div className={classes.dressTextBlock}>
                                <div className={classes.dressTextHeader}>
                                    <img src={dr3_icon.src} alt="icon"/>
                                    <p>{intl.formatMessage({ id: "hozho.50" })}</p>
                                </div>
                                <p className={classes.dressSub}>{intl.formatMessage({ id: "hozho.51" })}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.dressFooter}>
                        <div className={classes.dressLeft}>
                            <p>{intl.formatMessage({ id: "hozho.52" })}</p>
                            <ul>
                                <li>{intl.formatMessage({ id: "hozho.53" })}</li>
                                <li>{intl.formatMessage({ id: "hozho.54" })}</li>
                                <li>{intl.formatMessage({ id: "hozho.55" })}</li>
                            </ul>
                        </div>
                        <div className={classes.dressRight}>
                            <p>{intl.formatMessage({ id: "hozho.56" })}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hozho