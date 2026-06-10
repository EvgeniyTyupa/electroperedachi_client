import Image from "next/image"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import classes from "./ViceCity2026.module.css"

import home_bg from "/public/images/vice-city/home.jpg"
import vice_city_logo from "/public/images/vice-city/vice-city.png"
import video_location_thumb from "/public/images/vice-city/video_location_thumb2.webp"
import video_location_thumb2 from "/public/images/vice-city/video_location_thumb.jpg"
import video_intro_thumb from "/public/images/vice-city/video_intro_thumb.jpg"
import girl from "/public/images/vice-city/girl.png"
import palm1 from "/public/images/vice-city/palm1.svg"
import palm2 from "/public/images/vice-city/palm2.svg"
import palm3 from "/public/images/vice-city/palm3.svg"
import next_arr from "/public/images/vice-city/next_arr.svg"
import prev_arr from "/public/images/vice-city/prev_arr.svg"
import club_icon from "/public/images/vice-city/club_icon.svg"
import dress_icon from "/public/images/vice-city/dress_icon.svg"
import time_icon from "/public/images/vice-city/time_icon.svg"
import price_icon from "/public/images/vice-city/price_icon.svg"
import service_icon from "/public/images/vice-city/service_icon.svg"
import boatyard_icon from "/public/images/vice-city/boatyard_icon.svg"
import man_icon from "/public/images/vice-city/man_icon.svg"
import sun_icon from "/public/images/vice-city/sun.svg"
import gang_icon from "/public/images/vice-city/gang.svg"
import home_icon from "/public/images/vice-city/home.svg"
import lineup_bg from "/public/images/vice-city/lineup_bg.jpg"
import heads_img from "/public/images/vice-city/djs_heads.webp"
import lineup_head from "/public/images/vice-city/head_lineup.png"
import day1 from "/public/images/vice-city/day1.png"
import day2 from "/public/images/vice-city/day2.png"
import day3 from "/public/images/vice-city/day3.png"
import saturday_img from "/public/images/vice-city/saturday.png"
import sunday_img from "/public/images/vice-city/sunday.png"
import details_img from "/public/images/vice-city/details.png"
import how_it_was_bg from "/public/images/vice-city/how_it_was_bg.jpg"
import strip_img from "/public/images/vice-city/strip.png"
import dress1_img from "/public/images/vice-city/dress1.png"
import dress2_img from "/public/images/vice-city/dress2.png"
import dress3_img from "/public/images/vice-city/dress3.png"
import dress4_img from "/public/images/vice-city/dress4.png"
import dress5_img from "/public/images/vice-city/dress5.png"
import dress6_img from "/public/images/vice-city/dress6.png"
import light_img from "/public/images/vice-city/light.svg"
import camping_img from "/public/images/vice-city/camping.webp"
import dots_img from "/public/images/vice-city/dots.svg"

import loc1_img from "/public/images/vice-city/loc1.webp"
import loc2_img from "/public/images/vice-city/loc2.webp"
import loc3_img from "/public/images/vice-city/loc3.webp"
import loc4_img from "/public/images/vice-city/loc4.webp"
import loc5_img from "/public/images/vice-city/loc5.webp"
import loc6_img from "/public/images/vice-city/loc6.webp"
import loc7_img from "/public/images/vice-city/loc7.webp"
import loc8_img from "/public/images/vice-city/loc8.webp"
import loc9_img from "/public/images/vice-city/loc9.webp"
import loc10_img from "/public/images/vice-city/loc10.webp"
import scheme_img from "/public/images/vice-city/scheme.webp"
import img340 from "/public/images/vice-city/340.png"
import tickets_bg from "/public/images/vice-city/tickets.webp"
import price_img from "/public/images/vice-city/price.webp"

import playlist_img from "/public/images/vice-city/playlist.jpg"

import mob_bg from "/public/images/vice-city/mobbg.webp"
import shadow_bg from "/public/images/vice-city/shadow.png"

import { GrPlayFill } from "react-icons/gr";
import { useEffect, useRef, useState } from "react"
import HozhoSlider from "../Hozho/Slider/HozhoSlider"
import YoutubeCard from "../../../Common/YoutubeCard/YoutubeCard"
import moment from "moment"
import ViceCityForm from "./ViceCity2026Form/ViceCity2026Form"
import ViceCityFaqItem from "./ViceCity2026FaqItem/ViceCity2026FaqItem"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"
import Link from "next/link"
import { useIntl } from "react-intl"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"

import Aos from "aos"
import "aos/dist/aos.css"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"
import ViceCityLocModal from "./ViceCity2026LocModal/ViceCity2026LocModal"
import { trackApi } from "../../../../api/api"
import { getFbCookies } from "../../../../utils/getFbCookies"

import { v4 as uuidv4 } from 'uuid';

import dynamic from 'next/dynamic';
import ViceCity2026CampingItem from "./ViceCity2026CampingItem/ViceCity2026CampingItem"
import { Checkbox, FormControlLabel } from "@mui/material"

const InstagramEmbed = dynamic(
  () =>
    import('react-social-media-embed').then((mod) => mod.InstagramEmbed),
  { ssr: false }
);


const ViceCity = (props) => {
    const { event } = props

    const touchData = useRef({ startX: 0, startY: 0, scrollStart: 0 });

    const { width } = useWindowDimensions()

    const [isIncludeCamping, setIsIncludeCamping] = useState(false)

    const intl = useIntl()

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const containerRef = useRef(null);

    const paymentBlockRef = useRef(null)

    const [price, setPrice] = useState(0)

    const [hoveredStage, setHoveredStage] = useState(width > 1024 ? 1 : 0)
    const [featuredMedia, setFeaturedMedia] = useState([])

    const [isPlayIntroVideo, setIsPlayIntroVideo] = useState(false)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const [isOpenLocModal, setIsOpenLocModal] = useState(false)

    const faq = event.faq

    const lineup = [
        {
            cocobongo: [
                {
                    djs: [
                        { name: "Sasha Storm" },
                    ]
                },
                {
                    djs: [
                        { name: "Benefik" },
                        { name: "Zhorov" },
                    ]
                },
                {
                    djs: [
                        { name: "MAAT (Live)" },
                    ]
                },
                {
                    djs: [
                        { name: "Artem Sky (Live)" },
                    ]
                },
                {
                    djs: [
                        { name: "SETH" },
                    ]
                },
                {
                    djs: [
                        { name: "Dozorova" },
                    ]
                }
            ],
            malibu: [
                {
                    djs: [
                        { name: "Pascal Roth 🇫🇷" }
                    ]
                },
                {
                    djs: [
                        { name: "Black Hertz 🇧🇷" },
                    ]
                },
                {
                    djs: [
                        { name: "Monastetiq" },
                    ]
                },
                {
                    djs: [
                        { name: "Manyface" }
                    ]
                },
                {
                    djs: [
                        { name: "MirSee" },
                    ]
                }
            ]
        },
        {
            cocobongo: [
                {
                    djs: [
                        { name: "Lorenzo Raganzini 🇮🇹" },
                    ]
                },
                {
                    djs: [
                        { name: "Eternity" },
                    ]
                },
                {
                    djs: [
                        { name: "Nadai" },
                    ]
                },
                {
                    djs: [
                        { name: "Illusion" },
                    ]
                },
                {
                    djs: [
                        { name: "Krata" },
                        { name: "ROGAUZH33" },
                    ]
                },
                {
                    djs: [
                        { name: "SHNUR" },
                    ]
                }
            ],
            malibu: [
                {
                    djs: [
                        { name: "Rafael Cerato 🇫🇷" }
                    ]
                },
                {
                    djs: [
                        { name: "DJ KON'" }
                    ]
                },
                {
                    djs: [
                        { name: "Abradan" }
                    ]
                },
                {
                    djs: [
                        { name: "Noff" },
                    ]
                },
                {
                    djs: [
                        { name: "Maxim Vortex" },
                        { name: "Semerich" },
                    ]
                },
                {
                    djs: [
                        { name: "Odeum UA" },
                    ]
                },
                {
                    djs: [
                        { name: "Cruz" },
                    ]
                },
                {
                    djs: [
                        { name: "Harry Vander" }
                    ]
                }
            ]
        },
        {
            cocobongo: [
                {
                    djs: [
                        { name: "Maria Rodina" },
                        { name: "Polka" },
                    ]
                },
                {
                    djs: [
                        { name: "Staylen" },
                    ]
                },
                {
                    djs: [
                        { name: "Yevgen Shulga" },
                    ]
                },
                {
                    djs: [
                        { name: "Blade" },
                    ]
                },
                {
                    djs: [
                        { name: "VADOZ" }
                    ]
                },
                {
                    djs: [
                        { name: "Kyiv2c" },
                    ]
                },
                {
                    djs: [
                        { name: "Bako" },
                    ]
                }
            ],
            malibu: [
                {
                    djs: [
                        { name: "RAJA 🇺🇦" }
                    ]
                },
                {
                    djs: [
                        { name: "Adonis FR 🇫🇷" }
                    ]
                },
                {
                    djs: [
                        { name: "Nadai" }
                    ]
                },
                {
                    djs: [
                        { name: "Otrak" },
                    ]
                },
                {
                    djs: [
                        { name: "R.A.M." }
                    ]
                },
                {
                    djs: [
                        { name: "Vinogradov" },
                    ]
                },
                {
                    djs: [
                        { name: "barma" },
                    ]
                }
            ]
        }
    ]

    const dress = [
        {
            name: "RAVER",
            dresscode: intl.formatMessage({ id: "vice.30" }),
            phrase: intl.formatMessage({ id: "vice.31" }),
            mood: intl.formatMessage({ id: "vice.32" }),
            img: dress1_img.src
        },
        {
            name: "UNIKUM",
            dresscode: intl.formatMessage({ id: "vice.39" }),
            phrase: intl.formatMessage({ id: "vice.40" }),
            mood: intl.formatMessage({ id: "vice.41" }),
            img: dress2_img.src
        },
        {
            name: "HUNTER",
            dresscode: intl.formatMessage({ id: "vice.36" }),
            phrase: intl.formatMessage({ id: "vice.37" }),
            mood: intl.formatMessage({ id: "vice.38" }),
            img: dress3_img.src
        },
        {
            name: "DRIFTER",
            dresscode: intl.formatMessage({ id: "vice.45" }),
            phrase: intl.formatMessage({ id: "vice.46" }),
            mood: intl.formatMessage({ id: "vice.47" }),
            img: dress4_img.src
        },
        {
            name: "LOUNGER",
            dresscode: intl.formatMessage({ id: "vice.33" }),
            phrase: intl.formatMessage({ id: "vice.34" }),
            mood: intl.formatMessage({ id: "vice.35" }),
            img: dress5_img.src
        }
    ]

    const campingQuestions = [
        {
            title: intl.formatMessage({ id: "vice.69" }),
            info: [
                {
                    title: intl.formatMessage({ id: "vice.73" }),
                    text: intl.formatMessage({ id: "vice.70" })
                },
                {
                    title: intl.formatMessage({ id: "vice.74" }),
                    text: intl.formatMessage({ id: "vice.75" })
                }
            ]
        },
        {
            title: intl.formatMessage({ id: "vice.71" }),
            info: [
                {
                    title: intl.formatMessage({ id: "vice.76" }),
                    text: intl.formatMessage({ id: "vice.77" })
                },
                {
                    title: "",
                    text: intl.formatMessage({ id: "vice.78" })
                },
                {
                    title: "",
                    text: intl.formatMessage({ id: "vice.79" })
                },
                {
                    title: intl.formatMessage({ id: "vice.80" }),
                    text: intl.formatMessage({ id: "vice.81" })
                }
            ]
        },
        {
            title: intl.formatMessage({ id: "vice.72" }),
            info: [
                {
                    title: "",
                    text: intl.formatMessage({ id: "vice.82" })
                }
            ]
        }
    ]

    const location = [loc1_img, loc2_img, loc3_img, loc4_img, loc5_img, loc6_img, loc7_img, loc8_img, loc9_img, loc10_img]

    const PrevArrow = ({ onClick }) => (
        <div className="hozho-arrow hozho-prev" onClick={onClick}>
            <img src={prev_arr.src} alt="prev arr"/>
        </div>
    )

    const NextArrow = ({ onClick }) => (
        <div className="hozho-arrow hozho-next" onClick={onClick}>
            <img src={next_arr.src} alt="next arr"/>
        </div>
    )

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const handleAddToCartClick = async () => {
        const { fbp, fbc } = getFbCookies();
        const eventId = uuidv4(); 

        await trackApi.trackEvent('add_to_cart', {
            url: window.location.href,
            fbp,
            fbc,
            ua: navigator.userAgent,
        });

        import('react-facebook-pixel')
            .then((module) => module.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL); // 👈 вставь свой ID
                ReactPixel.track('AddToCart', {
                    eventID: eventId,
                });
            })
            .catch((err) => {
                console.error('Facebook Pixel error:', err);
            });

        import('tiktok-pixel')
            .then(module => module.default)
            .then(TiktokPixel => {
                TiktokPixel.init(TIKTOK_PIXEL)
                TiktokPixel.track("AddToCart")
            })
    }

    useEffect(() => {
        const newFeaturedMedia = []

        if (event.lineup[0].stages) {
            event.lineup.forEach((day) => {
                day?.stages.forEach((stage) => {
                    stage?.slots.forEach((slot) => {
                        slot?.djs.forEach((dj) => {
                            if (dj.embed_link) {
                                newFeaturedMedia.push({
                                    url: dj.embed_link,
                                    title: dj.embed_title
                                })
                            }
                        })
                    })
                })
            })
        }

        setFeaturedMedia(newFeaturedMedia)
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
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [paymentBlockRef])

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;

        const TOP_OFFSET = 350;

        const onWheel = (e) => {
            if (e.deltaY <= 0) {
                return;
            }

            const rect = el.getBoundingClientRect();

            const shouldActivate =
                rect.top < window.innerHeight - (window.innerHeight) + TOP_OFFSET && // rect.top < TOP_OFFSET
                rect.top > -rect.height; 

            if (!shouldActivate) {
                return;
            }

            const { scrollLeft, scrollWidth, clientWidth } = el;
            const canScrollRight = scrollLeft + clientWidth < scrollWidth;

            if (canScrollRight) {
                e.preventDefault();
                el.scrollLeft += e.deltaY;
            }
        };

        const onTouchStart = (e) => {
            touchData.current.startX = e.touches[0].clientX;
            touchData.current.startY = e.touches[0].clientY;
            touchData.current.scrollStart = el.scrollLeft;
        };
      
        const onTouchMove = (e) => {
            const x = e.touches[0].clientX;
            const y = e.touches[0].clientY;
            const dx = touchData.current.startX - x;
            const dy = touchData.current.startY - y;
      
                // если жест преимущественно по горизонтали
            if (Math.abs(dx) > Math.abs(dy)) {
                const { scrollStart } = touchData.current;
                const { scrollWidth, clientWidth } = el;
        
                // проверяем, есть ли куда скроллить
                if (
                    (dx > 0 && scrollStart + clientWidth < scrollWidth) ||
                    (dx < 0 && scrollStart > 0)
                ) {
                    e.preventDefault();              // не скроллим страницу
                    el.scrollLeft = scrollStart + dx; // листаем галерею
                }
            }
            // иначе — вертикальный жест, отпускаем и пускаем страницу
        };

        window.addEventListener('wheel', onWheel, { passive: false });
        el.addEventListener('touchstart', onTouchStart, { passive: true });
        el.addEventListener('touchmove', onTouchMove, { passive: false });

        return () => {
            window.removeEventListener('wheel', onWheel);
            el.removeEventListener('touchstart', onTouchStart);
            el.removeEventListener('touchmove', onTouchMove);
        };
    }, []);

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            {isOpenLocModal && (
                <ViceCityLocModal item={isOpenLocModal} onClose={() => setIsOpenLocModal(null)}/>
            )}
            {/* HOME */}
            <div className={classes.home} style={{
                backgroundImage: `url(${width > 468 ? home_bg.src : mob_bg.src})`
            }} id="main">
                <div className={classes.partners}>
                    {event.partners.map(el => (
                        <img src={el.image} alt={el.name}/>
                    ))}
                </div>
                <h1>electroperedachi</h1>
                <img src={vice_city_logo.src} alt={"vice city logo"} className={classes.viceCityLogoMobile}/>
                <div className={classes.vidosBlock}>
                    <img src={vice_city_logo.src} alt={"vice city logo"} className={classes.viceCityLogo}/>
                    <Image src={video_location_thumb} alt="location preview" fill/>
                    <div className={classes.vidosInfo} data-aos="fade-right" data-aos-duration="2000">
                        <h4>KYIV, X-PARK</h4>
                        <h4>31 JUL <label className={classes.amp}>&amp;</label> 1-2 AUG</h4>
                        <div className={classes.vidosButtons}>
                            <button onClick={() => setIsOpenLocModal("https://www.youtube.com/embed/yqarjI0Ewag?si=pzEcuwOF7u1gDC26")}>WaTCH</button>
                            <button onClick={scrollToPayment}>BuY Ticket</button>
                        </div>
                    </div>
                </div>
                <div className={classes.vidosBlockMobile} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.vidosInfoMobile}>
                        <h4>31 JUL <label className={classes.amp}>&amp;</label><br/> 1-2 AUG</h4>
                        <h4>X-PARK</h4>
                    </div>
                    <div className={classes.locVidos}>
                        <Image src={video_location_thumb} alt="location preview" fill/>
                        <button onClick={() => setIsOpenLocModal(true)}>
                            <GrPlayFill/>
                        </button>
                    </div>
                </div>
                <div className={classes.buyButtMobile}>
                    <button onClick={scrollToPayment}>BuY Ticket</button>
                    <button onClick={scrollToPayment} className={classes.shadow}>BuY Ticket</button>
                    <img src={light_img.src} alt="light"/>
                </div>
                <div className={`${classes.partners} ${classes.partnersMobile}`}>
                    {event.partners.map(el => (
                        <img src={el.image} alt={el.name}/>
                    ))}
                </div>
                <img data-aos="fade-left" data-aos-duration="2000" src={girl.src} alt="girl" className={classes.girl}/>
                <img src={shadow_bg.src} alt="shadow" className={classes.shadow_bg}/>
            </div>
            {/* ABOUT */}
            <div className={classes.about} id="about">
                <p className={classes.aboutIntro}>{intl.formatMessage({ id: "vice.1.1" })}&nbsp;<span>{intl.formatMessage({ id: "vice.1.2" })}</span>&nbsp;{intl.formatMessage({ id: "vice.1.3" })}</p>
                <h2 data-aos="fade-down" data-aos-duration="2000">ABout FESTIVAL</h2>
                <img data-aos="fade-left" data-aos-duration="2000" className={classes.palm1} src={palm1.src} alt="palm"/>
                <img data-aos="fade-right" data-aos-duration="2000" className={classes.palm2} src={palm2.src} alt="palm"/>
                <div className={classes.aboutInfo} data-aos="fade-down" data-aos-duration="2000">
                    <p>
                        {intl.formatMessage({ id: "vice.2" })} &nbsp;
                        {intl.formatMessage({ id: "vice.3" })}<span>Vice City</span>
                        <br/><br/>
                        {intl.formatMessage({ id: "vice.4.0" })}&nbsp;
                        <span>Lorenzo Raganzini, Rafael Cerato</span>&nbsp;
                        {intl.formatMessage({ id: "vice.4.2" })}
                        <br/><br/>
                        <div className={classes.introVidos} onClick={() => setIsPlayIntroVideo(true)}>
                            {/* {isPlayIntroVideo ? (
                                <video
                                    className={classes.video}
                                    controls
                                    src={"/images/vice-city/intro.mp4"}
                                />
                            ) : (
                                <>
                                    <Image src={video_intro_thumb} alt="intro video preview" fill/>
                                    <button className={classes.playButt}>
                                        <GrPlayFill/>
                                    </button>
                                </>
                            )} */}
                            <InstagramEmbed url="https://www.instagram.com/p/DNOH__2NJEb/?img_index=1" width={"100%"} />
                        </div>
                        <br/>
                        {intl.formatMessage({ id: "vice.5" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "vice.6" })}
                        {/* <br/><br/>
                        {intl.formatMessage({ id: "vice.7" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "vice.8" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "vice.9" })}
                        <br/><br/>
                        {intl.formatMessage({ id: "vice.10" })}
                        <br/><br/>
                        <span>{intl.formatMessage({ id: "vice.11" })}</span> */}
                    </p>
                </div>
            </div>
            {/* LINEUP */}
            <div className={classes.lineup} style={{
                backgroundImage: `url(${lineup_bg.src})`
            }} id="lineup">
                <h2 data-aos="fade-down" data-aos-duration="2000">Line Up</h2>
                <img data-aos="fade-down" data-aos-duration="2000" src={heads_img.src} alt="headliners" className={classes.headlinersImg}/>
                <div data-aos="fade-down" data-aos-duration="2000" className={classes.lineupInfo}>
                    <img src={lineup_head.src} alt="text title" className={classes.lineupHeader}/>
                    
                    {/* <p className={classes.djsDescription}>{intl.formatMessage({ id: "vice.12" })}</p> */}
                </div>
                <div className={classes.featured}>
                    <HozhoSlider
                        arrows={true}
                        length={featuredMedia.length}
                        nextArrow={<NextArrow/>}
                        prevArrow={<PrevArrow/>}
                    >
                        {featuredMedia.map((el, index) => (
                            <div
                                className={classes.sliderEl}
                                key={index}
                            >
                                {el.url?.includes("<iframe") ? (
                                    <div className={classes.spoty} dangerouslySetInnerHTML={{ __html: el.url }}/>
                                ) : (
                                    <YoutubeCard
                                        src={el.url}
                                        title={el.title}
                                        className={classes.youtubeCardLine}
                                    />
                                )}
                            </div>
                        ))}
                    </HozhoSlider>
                </div>
                <img src={shadow_bg.src} alt="shadow" className={classes.shadow_bg}/>
            </div>
            <div className={classes.artists}>
                <p>
                    {intl.formatMessage({ id: "vice.11.2" })}&nbsp;
                    <span>{intl.formatMessage({ id: "vice.11.3" })}</span>&nbsp;
                    {intl.formatMessage({ id: "vice.11.4" })}&nbsp;
                    <span>{intl.formatMessage({ id: "vice.11.5" })}</span>&nbsp;
                    {intl.formatMessage({ id: "vice.11.6" })}
                </p>
                <div className={`${classes.dayLineup}`} data-aos="fade-down" data-aos-duration="2000">
                    <div className={`${classes.shape} ${classes.shape1}`}/>
                    <div className={classes.stageContainer}>
                        <img src={day1.src} alt="day 1" className={classes.dayHeader}/>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={club_icon.src} alt="stage icon"/>
                                <h6>TECHNO STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[0].cocobongo.map((slot, index) => (
                                    <div className={classes.slot} key={index}>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.dj} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>&nbsp;b2b&nbsp;</p>}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={boatyard_icon.src} alt="stage icon"/>
                                <h6>MELODIC STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[0].malibu.map((slot, index) => (
                                    <>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.slot} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>b2b</p>}
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.lineupTextBlock}>
                    <p>{intl.formatMessage({ id: "vice.11.7" })}</p>
                    <p><span>{intl.formatMessage({ id: "vice.11.8" })}</span></p>
                    <p>{intl.formatMessage({ id: "vice.11.9" })}</p>
                </div>
                <div className={`${classes.dayLineup} ${classes.dayLineup2}`} data-aos="fade-down" data-aos-duration="2000">
                    <div className={`${classes.shape} ${classes.shape2}`}/>
                    <div className={classes.stageContainer}>
                        <img src={day2.src} alt="day 2" className={classes.dayHeader}/>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={club_icon.src} alt="stage icon"/>
                                <h6>TECHNO STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[1].cocobongo.map((slot, index) => (
                                    <div className={classes.slot} key={index}>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.dj} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>&nbsp;b2b&nbsp;</p>}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={boatyard_icon.src} alt="stage icon"/>
                                <h6>MELODIC STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[1].malibu.map((slot, index) => (
                                    <>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.slot} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>&nbsp;b2b</p>}
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.lineupTextBlock}>
                    <p><span>{intl.formatMessage({ id: "vice.11.10" })}</span></p>
                    <p>{intl.formatMessage({ id: "vice.11.11" })}</p>
                </div>
                <div className={`${classes.dayLineup} ${classes.dayLineup}`} data-aos="fade-down" data-aos-duration="2000">
                    <div className={`${classes.shape} ${classes.shape3}`}/>
                    <div className={classes.stageContainer}>
                        <img src={day3.src} alt="day 3" className={classes.dayHeader}/>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={club_icon.src} alt="stage icon"/>
                                <h6>TECHNO STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[2].cocobongo.map((slot, index) => (
                                    <div className={classes.slot} key={index}>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.dj} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>&nbsp;b2b&nbsp;</p>}
                                            </div>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className={classes.stage}>
                            <div className={classes.stageHeader}>
                                <img src={boatyard_icon.src} alt="stage icon"/>
                                <h6>MELODIC STAGE</h6>
                            </div>
                            <div className={classes.stageContent}>
                                {lineup[2].malibu.map((slot, index) => (
                                    <>
                                        {slot.djs.map((dj, index) => (
                                            <div className={classes.slot} key={index}>
                                                <p key={index}>{dj.name}</p>
                                                {(slot.djs.length > 1 && index === 0) && <p>&nbsp;b2b&nbsp;</p>}
                                            </div>
                                        ))}
                                    </>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.lineupTextBlock}>
                    <p>{intl.formatMessage({ id: "vice.11.12" })}</p>
                </div>
            </div>
            {/* HOW IT WAS */}
            <div className={classes.how_it_was} style={{
                backgroundImage: `url(${how_it_was_bg.src})`
            }} data-aos="fade-down" data-aos-duration="2000" id="how_it_was">
                <h2>HOW IT WAS</h2>
                <p><span>{intl.formatMessage({ id: "vice.23.0.1" })}</span></p>
                <p>{intl.formatMessage({ id: "vice.23.0.2" })} <span>{intl.formatMessage({ id: "vice.23.0.3" })}</span></p>
            </div>
            <div className={classes.howItWasSlider}>
                <HozhoSlider
                    arrows={true}
                    length={event.howItWas?.content?.length}
                    nextArrow={<NextArrow/>}
                    prevArrow={<PrevArrow/>}
                >
                    {event.howItWas?.content?.map((el, index) => (
                        <div
                            className={classes.sliderEl}
                            key={index}
                        >
                            {el.photo ? (
                                <div className={classes.photoSlider}>
                                    <Image fill src={el.photo} alt={el.title ? el.title : "How it Was"}/>
                                </div>
                            ) : (
                                <YoutubeCard
                                    src={el.youtubeUrl}
                                    title={el.title}
                                    className={classes.youtubeCard}
                                />
                            )}
                        </div>
                    ))}
                </HozhoSlider>
            </div>
            {/* PARTY DETAILS */}
            <div className={classes.details} id="details">
                <h2 data-aos="fade-right" data-aos-duration="2000">PARTY DETAILS</h2>
                <div className={classes.detailsImgContainer}>
                    <div className={classes.detailsImg} data-aos="fade" data-aos-duration="2000">
                        <Image src={details_img} alt="details image" fill/>
                    </div>
                </div>
                <div data-aos="fade-right" data-aos-duration="2000" className={classes.detailsInfo}>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={club_icon.src} alt="location icon"/>
                            <h6>{intl.formatMessage({ id: "vice.13" })}</h6>
                        </div>
                        <div className={classes.locationBlock}>
                            <Image src={video_location_thumb2} alt="location preview" fill/>
                            <div className={classes.vidosInfo} data-aos="fade-right" data-aos-duration="2000">
                                <button onClick={() => setIsOpenLocModal("https://www.youtube.com/embed/vqR6_TMrycg?si=1ohododMdoldeZNw")}>
                                    <GrPlayFill/>
                                </button>
                            </div>
                        </div>
                        <p>{intl.formatMessage({ id: "vice.14" })}</p>
                    </div>
                    <div className={classes.detailsSection}>
                        <div className={classes.detailBlock}>
                            <div className={classes.detailHeader}>
                                <img src={service_icon.src} alt="service icon"/>
                                <h6>{intl.formatMessage({ id: "vice.20" })}</h6>
                            </div>
                            <div className={classes.schemeImg}>
                                <Image src={scheme_img} alt="scheme" fill/>
                            </div>
                            <p>
                                <span>{intl.formatMessage({ id: "vice.21" })}</span> {intl.formatMessage({ id: "vice.21.1" })}
                            </p>
                            <p>
                                <span>{intl.formatMessage({ id: "vice.21.2" })}</span> {intl.formatMessage({ id: "vice.21.3" })} <span>{intl.formatMessage({ id: "vice.21.4" })}</span>
                            </p>
                            <ul>
                                <li><span>{intl.formatMessage({ id: "vice.21.5" })}</span> {intl.formatMessage({ id: "vice.21.6" })}</li>
                                <li><span>{intl.formatMessage({ id: "vice.21.7" })}</span></li>
                                <li>{intl.formatMessage({ id: "vice.21.8" })}</li>
                                <li>{intl.formatMessage({ id: "vice.21.9" })}</li>
                                <li>{intl.formatMessage({ id: "vice.21.10" })}</li>
                                <li>{intl.formatMessage({ id: "vice.21.11" })}</li>
                                <li><span>{intl.formatMessage({ id: "vice.21.12" })}</span></li>
                            </ul>
                            <p>{intl.formatMessage({ id: "vice.21.13" })}<span>{intl.formatMessage({ id: "vice.21.14" })}</span>{intl.formatMessage({ id: "vice.21.15" })}</p>
                        </div>
                    </div>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={man_icon.src} alt="fest icon"/>
                            <h6>{intl.formatMessage({ id: "vice.022.1" })}</h6>
                        </div>
                        <div className={classes.compareBlock}>
                            <div className={classes.compareOld}>
                                <p className={classes.compareYear}>2025</p>
                                <div className={classes.compareInfo}>
                                    <div className={classes.compareInfoInner}>
                                        <p>{intl.formatMessage({ id: "vice.022.2" })}</p>
                                    </div>
                                </div>
                            </div>
                            <div className={`${classes.compareOld} ${classes.compareNew}`}>
                                <p className={classes.compareYear}>2026</p>
                                <div className={classes.compareInfo}>
                                    <div className={classes.compareInfoInner}>
                                        <div className={classes.comparePointBlock}>
                                            <p><span>{intl.formatMessage({ id: "vice.022.3" })}</span></p>
                                            <img src={sun_icon.src} alt="sun icon"/>
                                        </div>
                                        <p><span>{intl.formatMessage({ id: "vice.022.4" })}</span>{intl.formatMessage({ id: "vice.022.4.1" })}</p>
                                        <div className={classes.comparePointBlock}>
                                            <p><span>{intl.formatMessage({ id: "vice.022.5" })}</span></p>
                                            <img src={gang_icon.src} alt="gang icon"/>
                                        </div>
                                        <p><span>{intl.formatMessage({ id: "vice.022.6" })}</span> {intl.formatMessage({ id: "vice.022.6.1" })}</p>
                                        <p><span>{intl.formatMessage({ id: "vice.022.7" })}</span>{intl.formatMessage({ id: "vice.022.7.1" })}</p>
                                        <p><span>{intl.formatMessage({ id: "vice.022.8" })}</span></p>
                                        <div>
                                            <div className={classes.comparePointBlock}>
                                                <p><span>{intl.formatMessage({ id: "vice.022.9" })}</span></p>
                                                <img src={home_icon.src} alt="home icon"/>
                                            </div>
                                            <p>{intl.formatMessage({ id: "vice.022.10" })}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <p>{intl.formatMessage({ id: "vice.022.11" })} <span>{intl.formatMessage({ id: "vice.022.12" })}</span> {intl.formatMessage({ id: "vice.022.13" })} <span>{intl.formatMessage({ id: "vice.022.13" })}</span> <span>{intl.formatMessage({ id: "vice.022.14" })}</span> <span>{intl.formatMessage({ id: "vice.022.15" })}</span></p>
                    </div>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={sun_icon.src} alt=" icon"/>
                            <h6>{intl.formatMessage({ id: "vice.23.1" })}</h6>
                        </div>
                        <p>{intl.formatMessage({ id: "vice.23.2" })} <span>{intl.formatMessage({ id: "vice.23.3" })}</span>{intl.formatMessage({ id: "vice.23.4" })} <span>{intl.formatMessage({ id: "vice.23.5" })}</span></p>
                        <p>{intl.formatMessage({ id: "vice.23.6" })}</p>
                        <p>{intl.formatMessage({ id: "vice.23.7" })}</p>
                    </div>
                    {/* <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={dress_icon.src} alt="dress code icon"/>
                            <h6>{intl.formatMessage({ id: "vice.15" })}</h6>
                        </div>
                        <p>{intl.formatMessage({ id: "vice.16" })}</p>
                    </div>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={time_icon.src} alt="time icon"/>
                            <h6>{intl.formatMessage({ id: "vice.17" })}</h6>
                        </div>
                        {event.dates.map(el => (
                            <p>{moment(el.date).format("DD.MM")} {el.start} - {el.end}</p>
                        ))}
                    </div> */}
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={price_icon.src} alt="price icon"/>
                            <h6>{intl.formatMessage({ id: "vice.18" })}</h6>
                        </div>
                        <p>{intl.formatMessage({ id: "vice.19.1" })}</p>
                        <img src={price_img.src} alt="price rises"/>
                    </div>
                </div>
                <div className={classes.buyButtMobile} style={{ marginTop: "1rem", width: "100%" }}>
                    <button onClick={scrollToPayment} style={{ width: "100%" }}>BuY Ticket</button>
                    {/* <button onClick={scrollToPayment} className={classes.shadow}>BuY Ticket</button> */}
                    {/* <img src={light_img.src} alt="light"/> */}
                </div>
            </div>
            <div className={classes.camping}>
                <div className={classes.campingImgContainer}>
                    <Image src={camping_img} alt="camping" fill/>
                </div>
                <div className={classes.campingContent}>
                    <div className={classes.campingMiniHeader}>
                        <div/>
                        <p>{intl.formatMessage({ id: "vice.51" })}</p>
                    </div>
                    <h3>{intl.formatMessage({ id: "vice.52" })}</h3>
                    <div className={classes.campingPadding}>
                        <p>{intl.formatMessage({ id: "vice.53" })}</p>
                        <p><span>{intl.formatMessage({ id: "vice.54" })}</span></p>
                        <p>{intl.formatMessage({ id: "vice.55" })}</p>
                    </div>
                    <div className={classes.campingDay}>
                        <label>// {intl.formatMessage({ id: "vice.56" })}</label>
                        <p>{intl.formatMessage({ id: "vice.57" })}</p>
                    </div>
                    <div className={classes.campingPoints}>
                        <img src={dots_img.src} alt="dots"/>
                        <div className={classes.campingPointsContent}>
                            <div className={classes.point}>
                                <span>{intl.formatMessage({ id: "vice.58" })}</span>
                                <p>{intl.formatMessage({ id: "vice.59" })}</p>
                            </div>
                            <div className={classes.point}>
                                <span>{intl.formatMessage({ id: "vice.60" })}</span>
                                <p>{intl.formatMessage({ id: "vice.61" })} <label>{intl.formatMessage({ id: "vice.62" })}</label></p>
                            </div>
                            <div className={classes.point}>
                                <span>{intl.formatMessage({ id: "vice.63" })}</span>
                                <p>{intl.formatMessage({ id: "vice.64" })}</p>
                            </div>
                        </div>
                    </div>
                    <div className={classes.campingProgress}>
                        <div className={classes.campingProgressHead}>
                            <p>{intl.formatMessage({ id: "vice.65" })}</p>
                            <span>{intl.formatMessage({ id: "vice.66" })}</span>
                        </div>
                        <div className={classes.progress}>
                            <div className={classes.active}/>
                            <div className={classes.active}/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                            <div/>
                        </div>
                        <div className={classes.campingData}>
                            <p><span>70-80</span> {intl.formatMessage({ id: "vice.67" })}</p>
                            <p><span>200</span> {intl.formatMessage({ id: "vice.68" })}</p>
                        </div>
                    </div>
                    <div className={classes.campingCollapse}>
                        {campingQuestions.map((el, index) => (
                            <ViceCity2026CampingItem index={index} item={el}/>
                        ))}
                    </div>
                    <div className={classes.campingCheck}>
                        <h4>{intl.formatMessage({ id: "vice.83" })}</h4>
                        <div className={classes.check}>
                            <FormControlLabel
                                sx={{
                                    fontFamily: "ChaletMedium"
                                }}
                                control={<Checkbox checked={isIncludeCamping} size="medium" onChange={() => setIsIncludeCamping(!isIncludeCamping)} />}
                                label={
                                    <div className={classes.checkText}>
                                        <h4>{intl.formatMessage({ id: "vice.84" })}</h4>
                                        <p>{intl.formatMessage({ id: "vice.85" })}</p>
                                    </div>
                                }
                            />
                        </div>
                    </div>
                </div>
            </div>
            {/* MEANWHILE */}
            {/* <div className={classes.meanwhile}>
                <div data-aos="fade-down" data-aos-duration="2000" className={classes.meanwhileText}>
                    <p>{intl.formatMessage({ id: "vice.24" })}</p>
                    <p>{intl.formatMessage({ id: "vice.25" })} <span>{intl.formatMessage({ id: "vice.26" })}</span></p>
                </div>
                <div className={classes.meanwhileImg} data-aos="fade" data-aos-duration="2000">
                    <Image src={strip_img} alt="strip" fill/>
                </div>
            </div> */}
            {/* DRESS-CODE */}
            <div className={classes.dress}
                style={{
                    backgroundImage: `url(${home_bg.src})`
                }}
                id="dresscode"
            >
                <div className={classes.dressHeader}>
                    <h2>DRESSCODE</h2>
                    <p>{intl.formatMessage({ id: "vice.27" })}</p>
                </div>
                <img src={palm3.src} alt="palm" className={classes.palm3}/>
                <div className={classes.dressTypes} ref={containerRef}>
                    {dress.map((el, index) => (
                        <div className={classes.dressType}>
                            <div className={classes.dressBg}/>
                            <img src={el.img} className={
                                `
                                    ${index === 0 ? classes.dress1 : ""} 
                                    ${index === 1 ? classes.dress2 : ""} 
                                    ${index === 2 ? classes.dress3 : ""} 
                                    ${index === 3 ? classes.dress4 : ""} 
                                    ${index === 4 ? classes.dress5 : ""} 
                                    ${index === 5 ? classes.dress6 : ""}
                                `
                                
                            }/>
                            <div className={classes.dressInfo}>
                                <h5>{el.name}</h5>
                                <div className={classes.dressInfoPoint}>
                                    <h6>{intl.formatMessage({ id: "vice.15" })}</h6>
                                    <p>{el.dresscode}</p>
                                </div>
                                <div className={classes.dressInfoPoint}>
                                    <h6>{intl.formatMessage({ id: "vice.28" })}</h6>
                                    <p>{el.phrase}</p>
                                </div>
                                <div className={classes.dressInfoPoint}>
                                    <h6>{intl.formatMessage({ id: "vice.29" })}</h6>
                                    <p>{el.mood}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div className={classes.location} data-aos="fade-down" data-aos-duration="2000">
                <h2>Location Demo</h2>
                <HozhoSlider
                    arrows={true}
                    length={location.length}
                    nextArrow={<NextArrow/>}
                    prevArrow={<PrevArrow/>}
                >
                    {location.map((el, index) => (
                        <div
                            className={classes.sliderEl}
                            key={index}
                        >
                            <div className={classes.locPhoto}>
                                <Image fill src={el} alt={"location photo"}/>
                            </div>
                        </div>
                    ))}
                </HozhoSlider>
                <div className={classes.locationText}>
                    <p>{intl.formatMessage({ id: "vice.23.8" })}<br/><span>{intl.formatMessage({ id: "vice.23.9" })}</span></p>
                    <p>{intl.formatMessage({ id: "vice.23.10" })}</p>
                    <p style={{ color: "#FC99CC" }}>{intl.formatMessage({ id: "vice.23.11" })}</p>
                </div>
            </div>
            <div className={classes.tickets}
                style={{
                    backgroundImage: `url(${tickets_bg.src})`
                }}
            >
                <h2>Tickets</h2>
                <p>{intl.formatMessage({ id: "vice.48" })} <span>{intl.formatMessage({ id: "vice.49" })}</span></p>
            </div>
            <div id="buy_ticket">
                <ViceCityForm
                    event={event}
                    price={price}
                    setPrice={setPrice}
                    paymentBlockRef={paymentBlockRef}
                    isIncludeCamping={isIncludeCamping}
                    setIsIncludeCamping={setIsIncludeCamping}
                />
            </div>
            {/* FAQ */}
            <div className={classes.faq} id="faq">
                <h2>Faq</h2>
                <div className={classes.questions}>
                    {faq.map((el, index) => (
                        <ViceCityFaqItem
                            key={el.title}
                            item={el}
                            index={index}
                        />
                    ))}
                </div>
            </div>
            {/* PLAYLIST */}
            <div className={classes.playlist}>
                <h2>PlaYlist</h2>
                <div className={classes.playlistContent}>
                    <iframe
                        src="https://open.spotify.com/embed/playlist/6qMmJpJDzF3wTcBmpMlwoC?utm_source=generator&theme=0"
                        width="100%"
                        height="352"
                        frameBorder="0"
                        allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                        loading="lazy"
                    />
                    <div className={classes.playlistImg}>
                        <Image src={playlist_img} alt="playlist" fill/>
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

export default ViceCity