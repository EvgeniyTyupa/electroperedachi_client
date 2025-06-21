import Image from "next/image"
import useWindowDimensions from "../../../../hooks/useWindowDimension"
import classes from "./ViceCity.module.css"

import home_bg from "/public/images/vice-city/home.jpg"
import vice_city_logo from "/public/images/vice-city/vice-city.png"
import video_location_thumb from "/public/images/vice-city/video_location_thumb.jpg"
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
import lineup_bg from "/public/images/vice-city/lineup_bg.jpg"
import heads_img from "/public/images/vice-city/heads.png"
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

import { GrPlayFill } from "react-icons/gr";
import { useEffect, useRef, useState } from "react"
import HozhoSlider from "../Hozho/Slider/HozhoSlider"
import YoutubeCard from "../../../Common/YoutubeCard/YoutubeCard"
import moment from "moment"
import ViceCityForm from "./ViceCityForm/ViceCityForm"
import ViceCityFaqItem from "./ViceCityFaqItem/ViceCityFaqItem"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"
import Link from "next/link"
import { useIntl } from "react-intl"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"

import Aos from "aos"
import "aos/dist/aos.css"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"

const ViceCity = (props) => {
    const { event } = props

    const { width } = useWindowDimensions()

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

    const faq = event.faq

    const lineup = [
        {
            cocobongo: [
                {
                    djs: [
                        { name: "Abradan" }
                    ]
                },
                {
                    djs: [
                        { name: "Alter" },
                        { name: "Antai" },
                    ]
                },
                {
                    djs: [
                        { name: "Boosin (Live)" },
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
                        { name: "Monastetiq" },
                    ]
                },
                {
                    djs: [
                        { name: "ODEUM" },
                    ]
                },
                {
                    djs: [
                        { name: "R.A.M." },
                    ]
                },
                {
                    djs: [
                        { name: "Sagan" },
                    ]
                },
            ],
            malibu: [
                {
                    djs: [
                        { name: "BSLV" },
                    ]
                },
                {
                    djs: [
                        { name: "Latyshev" },
                    ]
                },
                {
                    djs: [
                        { name: "Metodi Hristov" },
                    ]
                },
                {
                    djs: [
                        { name: "Nadai" },
                    ]
                },
                {
                    djs: [
                        { name: "Nakadia" },
                    ]
                },
                {
                    djs: [
                        { name: "Neumateria (Live)" },
                    ]
                },
                {
                    djs: [
                        { name: "OTRAK" },
                    ]
                },
            ]
        },
        {
            cocobongo: [
                {
                    djs: [
                        { name: "Artem Sky (Live)" }
                    ]
                },
                {
                    djs: [
                        { name: "Buryi" }
                    ]
                },
                {
                    djs: [
                        { name: "Kyiv2c" },
                    ]
                },
                {
                    djs: [
                        { name: "Manyface" },
                    ]
                },
                {
                    djs: [
                        { name: "Nadai" },
                    ]
                },
                {
                    djs: [
                        { name: "Paul Meise (Live)" },
                    ]
                },
                {
                    djs: [
                        { name: "QKI:" },
                        { name: "Rave Mysterio" },
                    ]
                },
                {
                    djs: [
                        { name: "VadimoooV" },
                    ]
                },
            ],
            malibu: [
                {
                    djs: [
                        { name: "Feerica" },
                    ]
                },
                {
                    djs: [
                        { name: "Marteli" },
                    ]
                },
                {
                    djs: [
                        { name: "Nickolas Grace" },
                    ]
                },
                {
                    djs: [
                        { name: "Noff" },
                    ]
                },
                {
                    djs: [
                        { name: "Maria Rodina" },
                        { name: "Sasha Storm" },
                    ]
                },
                {
                    djs: [
                        { name: "Staylen" },
                    ]
                },
                {
                    djs: [
                        { name: "Xenia Torino" },
                    ]
                },
            ]
        }
    ]

    const dress = [
        {
            name: "RAVER",
            dresscode: "Неон, світловідбивачі, спортивні окуляри, чорне, сітка, окуляри у темну пору",
            phrase: "Моє паливо - це бас!",
            mood: "Весь час біля сцени, глибоко в техно. Не зупиняється. Не говорить. Відданий танцю.",
            img: dress1_img.src
        },
        {
            name: "LOUNGER",
            dresscode: "Сорочка на розпашку, шорти, панамка",
            phrase: "Не поспішаю, у мене два дні.",
            mood: "Вічно з келихом, завжди з посмішкою. Спостерігає за вами, але не судить. на chill-зоні, біля води, на барі",
            img: dress2_img.src
        },
        {
            name: "HUNTER",
            dresscode: "Як справжній хантер, видає себе за LOUNGER і носить те саме",
            phrase: "Ми вже десь бачились?",
            mood: "Вічно з келихом, завжди з посмішкою. Спостерігає за вами, але не судить. на chill-зоні, біля води, на барі",
            img: dress3_img.src
        },
        {
            name: "UNIKUM",
            dresscode: "Поза жанрами. Сюр, театральність, стиль як меседж. абсурдні аксесуари, шарфи, перуки, драматичний макіяж",
            phrase: "Мене тут не мало бути. Але я тут",
            mood: "Вічно в образі, створює атмосферу",
            img: dress4_img.src
        },
        {
            name: "ESCAPIST",
            dresscode: "Тілесні відтінки, прозоре, легке",
            phrase: "Я тут, бо хочу розвіятись, подихати свіжим повітрям.",
            mood: "Втікає від рутини, хочу розчинитись у натовпі",
            img: dress5_img.src
        },
        {
            name: "THE DRIFTER",
            dresscode: "Вільний крій, натуральні тканини, лляні штани, відкриті плечі",
            phrase: "Я не запізнився. Я приєднався в свій час",
            mood: "Нікуди не поспішає. Всюди свій. Він не в центрі уваги — але всі запам’ятовують, як він з’явився і зник",
            img: dress6_img.src
        }
    ]

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

    const handleAddToCartClick = () => {
        import("react-facebook-pixel")
            .then((module) => module.default)
            .then((ReactPixel) => {
                ReactPixel.init(FB_PIXEL)
                ReactPixel.track("AddToCart")
            })
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

        window.addEventListener('wheel', onWheel, { passive: false });
        return () => window.removeEventListener('wheel', onWheel);
    }, []);

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

    return (
        <div className={classes.main}>
            {/* HOME */}
            <div className={classes.home} style={{
                backgroundImage: `url(${home_bg.src})`
            }}>
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
                        <h4>2-3 AUG</h4>
                        <div className={classes.vidosButtons}>
                            <button>WaTCH</button>
                            <button onClick={scrollToPayment}>BuY Ticket</button>
                        </div>
                    </div>
                </div>
                <div className={classes.vidosBlockMobile} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.vidosInfoMobile}>
                        <h4>KYIV, X-PARK</h4>
                        <h4>2-3 AUG</h4>
                    </div>
                    <div className={classes.locVidos}>
                        <Image src={video_location_thumb} alt="location preview" fill/>
                        <button>
                            <GrPlayFill/>
                        </button>
                    </div>
                </div>
                <div className={classes.buyButtMobile}>
                    <button onClick={scrollToPayment}>BuY Ticket</button>
                    <button onClick={scrollToPayment} className={classes.shadow}>BuY Ticket</button>
                </div>
                <img data-aos="fade-left" data-aos-duration="2000" src={girl.src} alt="girl" className={classes.girl}/>
            </div>
            {/* ABOUT */}
            <div className={classes.about}>
                <p className={classes.aboutIntro}>Важливо не те, що ти робиш — а що ти відчуваєш. Відчуй всесвіт Vice City на дводенному техно фестивалі у Х-Park</p>
                <h2 data-aos="fade-down" data-aos-duration="2000">ABout FESTIVAL</h2>
                <img data-aos="fade-left" data-aos-duration="2000" className={classes.palm1} src={palm1.src} alt="palm"/>
                <img data-aos="fade-right" data-aos-duration="2000" className={classes.palm2} src={palm2.src} alt="palm"/>
                <div className={classes.aboutInfo} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.introVidos} onClick={() => setIsPlayIntroVideo(true)}>
                        {isPlayIntroVideo ? (
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
                        )}
                    </div>
                    <p>
                        Є місця, в які їдуть, бо так треба. 
                        <br/><br/>
                        А є місця, в які мрієш потрапити та повернутись — <span>Vice City</span>
                        <br/><br/>
                        Дводенний техно фестиваль,  Nakadia, Metodi Hristov, та понад 30 артистів на 2х сценах
                        <br/><br/>
                        На острові. Біля води. Місто спокуси, гри, сповільнених дотиків і зухвалих рішень. Для тих, хто хоче більше.
                        <br/><br/>
                        У Vice City не буває “запізно”. Немає плану — є маршрут.
                        <br/><br/>
                        Тут замість “як треба” — “як хочу”.
                        <br/><br/>
                        Це — повернення до того, ким ти був, перш ніж усе стало “як треба”.
                        <br/><br/>
                        У Vice City ти не відвідувач. 
                        Ти — частина цього міста. Ти — головний герой.
                        <br/><br/>
                        Історя міста формується завдяки тобі: через твої рухи, твій стиль, твій настрій і дії
                        <br/><br/>
                        <span>Доповни цей всесвіт собою!</span>
                    </p>
                </div>
            </div>
            {/* LINEUP */}
            <div className={classes.lineup} style={{
                backgroundImage: `url(${lineup_bg.src})`
            }}>
                <h2 data-aos="fade-down" data-aos-duration="2000">Line Up</h2>
                <img data-aos="fade-right" data-aos-duration="2000" src={heads_img.src} alt="headliners" className={classes.headlinersImg}/>
                <div data-aos="fade-down" data-aos-duration="2000" className={classes.lineupInfo}>
                    <p className={classes.lineupLyrics}>Діджеї у Vice City — це ті, хто формує простір і реальність міста через ритм і звук. Вони буквально створюють архітектуру міста з музики, з кожним треком задаючи нові закони, настрій та атмосферу. Vice City еволюціонує залежно від того, хто зараз за пультом.</p>
                    <div className={classes.djsBlock}>
                        {lineup.map((el, index) => (
                            <div
                                className={classes.day}
                                onMouseEnter={() => setHoveredStage(width > 1024 ? index : 0)}
                                onMouseLeave={() => setHoveredStage(width > 1024 ? 1 : 0)}
                            >
                                <div className={classes.stageHover} style={{ opacity: hoveredStage === index ? 1 : 0 }}/>
                                <img src={index === 0 ? saturday_img.src : sunday_img.src}/>
                                <div className={classes.stages}>
                                    <div className={classes.stage}>
                                        <h5 style={{ color: hoveredStage === index ? "black" : "white" }}>Cocobongo</h5>
                                        <div className={classes.djs}
                                            style={{ color: hoveredStage === index ? "black" : "white" }}
                                        >
                                            {el.cocobongo.map(item => (
                                                <div className={classes.artist}>
                                                    {item.djs.map((dj, djIndex) => (
                                                        <p>{djIndex > 0 && "&"} {dj.name}</p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                    <div className={classes.stage}>
                                        <h5 style={{ color: hoveredStage === index ? "black" : "white" }}>Malibu</h5>
                                        <div className={classes.djs}
                                            style={{ color: hoveredStage === index ? "black" : "white" }}
                                        >
                                            {el.malibu.map(item => (
                                                <div className={classes.artist}>
                                                    {item.djs.map((dj, djIndex) => (
                                                        <p>{djIndex > 0 && "&"} {dj.name}</p>
                                                    ))}
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
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
                                    // className={classes.youtubeCard}
                                />
                            )}
                        </div>
                    ))}
                </HozhoSlider>
            </div>
            {/* PARTY DETAILS */}
            <div className={classes.details}>
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
                            <h6>ЛОКАЦІЯ</h6>
                        </div>
                        <p>X-Park - Найбільший актив-парк Європи. Це унікальне місце для відпочинку та релаксу, розташоване в Києві в зеленій зоні на Трухановому острові. Наш дводений фестиваль відбудеться на більшості території, яку відокремимо на схемі локації</p>
                    </div>
                    <div className={classes.detailsSection}>
                        <div className={classes.detailBlock}>
                            <div className={classes.detailHeader}>
                                <img src={dress_icon.src} alt="dress code icon"/>
                                <h6>ДРЕС-КОД</h6>
                            </div>
                            <p>Дрескод не є вимогою! Було б круто, якщо одягнешся за референсом, який показуємо нижче за допомогою архетипів</p>
                        </div>
                        <div className={classes.detailBlock}>
                            <div className={classes.detailHeader}>
                                <img src={time_icon.src} alt="time icon"/>
                                <h6>ЧАС</h6>
                            </div>
                            {event.dates.map(el => (
                                <p>{moment(el.date).format("DD.MM")} {el.start} - {el.end}</p>
                            ))}
                        </div>
                    </div>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={price_icon.src} alt="price icon"/>
                            <h6>ЦІНА КВИТКІВ</h6>
                        </div>
                        <p>Вартість квитків залежить від етапу передпродажу. Кількість етапів: IV. Ціна на вході найдорожча. Ціна на вході за квиток коштуватиме значно менше, якщо прийти зранку до 13:00</p>
                    </div>
                    <div className={classes.detailBlock}>
                        <div className={classes.detailHeader}>
                            <img src={club_icon.src} alt="service icon"/>
                            <h6>СЕРВІС</h6>
                        </div>
                        <p>На цій локації дійсно є, де розгулятись та зайняти себе різними активностями. Окрім комерційних ділянок, де ви можете придбати їжу\напої або щось на згадку - мерч\аксесуари\тощо, для вас також буде можливість відвідати пляж та поплавати (є душ та перевдягальня); поплавати на вейкборді; зіграти в баскетбол або настольний теніс; зняти мотоцикл на прокат; замовити кальян; відвідати тир; навіть, прийти зранку на йогу!</p>
                    </div>
                </div>
            </div>
            {/* HOW IT WAS */}
            <div className={classes.how_it_was} style={{
                backgroundImage: `url(${how_it_was_bg.src})`
            }} data-aos="fade-down" data-aos-duration="2000">
                <h2>HOW IT WAS</h2>
                <p>Here are the memories of your youth.<br/> Emotions that will remain forever!</p>
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
            {/* MEANWHILE */}
            <div className={classes.meanwhile}>
                <div data-aos="fade-down" data-aos-duration="2000" className={classes.meanwhileText}>
                    <p>Справжня версія тебе — не в Zoom, не в метро. Вона там, де дієш як хочеться, йдеш, куди вітер покличе</p>
                    <p>Важливо не що ти робиш — <span>а що ти відчуваєш.</span></p>
                </div>
                <div className={classes.meanwhileImg} data-aos="fade" data-aos-duration="2000">
                    <Image src={strip_img} alt="strip" fill/>
                </div>
            </div>
            {/* DRESS-CODE */}
            <div className={classes.dress}
                style={{
                    backgroundImage: `url(${home_bg.src})`
                }}
            >
                <div className={classes.dressHeader}>
                    <h2>DRESSCODE</h2>
                    <p>Якщо не маєш бажання - за дрескод можеш не паритись. Але якщо хочеш відповідати екосистемі і цікавить що одягти, можеш скористатися референсами! Ми підготували різні архетипи - найкращий спосіб пояснити дрес-код, вайб і навіть стилі поведінки без заборон і нудних інструкцій. Обирай одяг за станом, який найближче всього для тебе</p>
                </div>
                <img src={palm3.src} alt="palm" className={classes.palm3}/>
                <div className={classes.dressTypes} ref={containerRef}>
                    {dress.map((el, index) => (
                        <div className={classes.dressType}>
                            <div className={classes.dressBg}/>
                            <img src={el.img} className={index === 2 ? classes.fat : ""}/>
                            <div className={classes.dressInfo}>
                                <h5>{el.name}</h5>
                                <div className={classes.dressInfoPoint}>
                                    <h6>ДРЕС-КОД</h6>
                                    <p>{el.dresscode}</p>
                                </div>
                                <div className={classes.dressInfoPoint}>
                                    <h6>ФРАЗА</h6>
                                    <p>{el.phrase}</p>
                                </div>
                                <div className={classes.dressInfoPoint}>
                                    <h6>СТАН</h6>
                                    <p>{el.mood}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ViceCityForm
                event={event}
                price={price}
                setPrice={setPrice}
                paymentBlockRef={paymentBlockRef}
            />
            {/* FAQ */}
            <div className={classes.faq}>
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