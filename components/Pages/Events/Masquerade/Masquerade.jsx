import classes from "./Masquerade.module.css"
import shadowImg from "/public/images/masquerade/shadow.webp"
import shadowImgTop from "/public/images/masquerade/shadowTop.webp"
import beforeBg from "/public/images/masquerade/before_bg.webp"
import after_thumb from "/public/images/masquerade/after_thumb.webp"
import svech from "/public/images/masquerade/svech.webp"
import det1 from "/public/images/masquerade/det1.webp"
import det2 from "/public/images/masquerade/det2.webp"
import det3 from "/public/images/masquerade/det3.webp"
import dustyImg from "/public/images/masquerade/dusty.png"
import saleBg from "/public/images/masquerade/saleBg.webp"
import p1 from "/public/images/masquerade/p1.webp"
import p2 from "/public/images/masquerade/p2.webp"
import p3 from "/public/images/masquerade/p3.webp"
import d1 from "/public/images/masquerade/d1.webp"
import d2 from "/public/images/masquerade/d2.webp"
import d3 from "/public/images/masquerade/d3.webp"
import d4 from "/public/images/masquerade/d4.webp"
import d5 from "/public/images/masquerade/d5.webp"
import d6 from "/public/images/masquerade/d6.webp"
import d7 from "/public/images/masquerade/d7.webp"
import d8 from "/public/images/masquerade/d8.webp"
import r1 from "/public/images/masquerade/r1.webp"
import r2 from "/public/images/masquerade/r2.webp"
import faqBg from "/public/images/masquerade/faq_bg.webp"
import listBg from "/public/images/masquerade/list_bg.webp"
import gerb from "/public/images/masquerade/gerb.webp"
import paper from "/public/images/masquerade/paper.webp"
import Image from "next/image"
import HozhoSlider from "../Hozho/Slider/HozhoSlider"
import { useEffect, useRef, useState } from "react"
import YoutubeCard from "../../../Common/YoutubeCard/YoutubeCard"
import { useIntl } from "react-intl"
import MasqueradeForm from "./MasqueradeForm/MasqueradeForm"
import { getFbCookies } from "../../../../utils/getFbCookies"

import { v4 as uuidv4 } from 'uuid';
import { trackApi } from "../../../../api/api"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"
import Link from "next/link"
import MasqueradeFaqItem from "./MasqueradeForm/MasqueradeFaqItem/MasqueradeFaqItem"

const Masquerade = (props) => {
    const { event } = props

    const [featuredMedia, setFeaturedMedia] = useState([])

    const [price, setPrice] = useState(0)

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const [isPlayIntroVideo, setIsPlayIntroVideo] = useState(false)

    const containerRef = useRef(null);
    const paymentBlockRef = useRef(null)

    const intl = useIntl()

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const faq = event.faq

    const djs = [
        {
            main: [
                {
                    djs: [ { name: "Dusty Kid" } ]
                },
                {
                    djs: [ { name: "Nadai" } ]
                },
                {
                    djs: [ { name: "Paul Meise" } ]
                },
                {
                    djs: [ { name: "Staylen" } ]
                },
                {
                    djs: [ { name: "Noff" } ]
                },
                {
                    djs: [ { name: "Foggy" } ]
                },
                {
                    djs: [ { name: "Neumateria" } ]
                },
            ],
            dark: [
                {
                    djs: [ { name: "Sasha Storm" } ]
                },
                {
                    djs: [ { name: "Maxim Vortex" } ]
                },
                {
                    djs: [ { name: "R.A.M." } ]
                },
                {
                    djs: [ { name: "Kyiv2c" } ]
                },
                {
                    djs: [ { name: "Kaleinikov" }, { name: "Bolotin" } ]
                },
                {
                    djs: [ { name: "Marteli" } ]
                },
            ]
        }
    ]

    const dress = [
        {
            name: "Vampire",
            img: d1,
            dresscode: "Темний шик, костюми, плащі, червоні акценти, високі комірці, готичні прикраси.",
            phrase: "Моє паливо — це ваша енергія",
            mood: "Впевнений, магнетичний. Завжди у центрі уваги, ніби господар ночі."
        },
        {
            name: "WEREWOLF",
            img: d2,
            dresscode: "Рвані тканини, хутро, шкіра, ланцюги. Енергія дикої стихії.",
            phrase: "Коли виходить місяць — я справжній",
            mood: "Нестримний, танцює до знемоги. Гучний, агресивний, але у вайбі з натовпом."
        },
        {
            name: "WITCH",
            img: d3,
            dresscode: "Капелюхи, чорні сукні, мереживо, містичні аксесуари (магічні кулони, підвіски).",
            phrase: "Ти під моїм закляттям.",
            mood: "Таємнича, інтригуюча, створює ауру довкола себе. Вона на межі спокуси й небезпеки."
        },
        {
            name: "PHANTOM",
            img: d4,
            dresscode: "Прозорі тканини, білий чи світлий одяг, маски-примари, легкість у деталях.",
            phrase: "Я тут, але ти мене не впіймаєш",
            mood: "Плинна, з’являється й зникає у натовпі. Танцює, наче тінь."
        },
        {
            name: "LOST SOUL",
            img: d5,
            dresscode: "бліді тони, розмитий макіяж, костюми зі слідами “зносу”, потертість як стиль.",
            phrase: "Я ще тут… але ненадовго.",
            mood: "Меланхолійний, загадковий. Наче шукає щось серед натовпу."
        },
        {
            name: "TRICKSTER",
            img: d6,
            dresscode: "Кольорові маски, венеційські костюми, яскраві контрасти, бубонці чи епатажні елементи.",
            phrase: "Моя маска сміється гучніше за мене.",
            mood: "Хаос у тілі. Тримає людей у напрузі, грає на контрастах, непередбачуваний."
        },
        {
            name: "RAVER",
            img: d7,
            dresscode: "Неон, світловідбивачі, спортивні окуляри, чорне, сітка, окуляри у темну пору",
            phrase: "Моє паливо - це бас!",
            mood: "Весь час біля сцени, глибоко в техно. Не зупиняється. Не говорить. Відданий танцю."
        },
        {
            name: "Sorceress",
            img: d8,
            dresscode: "Блиск, сяйво, елегантність. Золоті та срібні акценти, маска з дорогоцінним виглядом.",
            phrase: "Моя магія — це твій захват.",
            mood: "Заворожує, ніби з іншого виміру. Їхня присутність — як закляття."
        },
    ]

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
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

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
        const el = containerRef.current;
        if (!el) return;

        const TOP_OFFSET = 0;

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

    return (
        <div className={classes.main}>
            <div className={classes.home}>
                <video
                    className={classes.video}
                    src="/images/masquerade/fon_vd.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className={classes.homeInfo}>
                    <h1>MASQUERADE</h1>
                    <div className={classes.homeInfoSub}>
                        <h2>01.11</h2>
                        <h2>KYIV</h2>
                    </div>
                </div>
                <div className={classes.homeFoot}>
                    <p>Маска приховує твоє обличчя, але відкриває справжню сутність</p>
                    <button onClick={scrollToPayment} className={classes.buyButt}>Придбати квиток</button>
                </div>
                <img src={shadowImg.src} alt="shadow" className={classes.homeShadow}/>
            </div>
            {/* BEFORE */}
            <div className={classes.before}
                style={{
                    backgroundImage: `url(${beforeBg.src})`
                }}
            >
                <img src={shadowImgTop.src} alt="shadow" className={classes.shadowTop}/>
                <img src={shadowImg.src} alt="shadow" className={classes.shadowBot}/>
                <h3>МИНУЛОГО РОКУ...</h3>
                <div className={classes.afterVideo}>
                    <img src={svech.src} alt="svitlo" className={classes.svitlo}/>
                    <img src={svech.src} alt="svitlo" className={classes.svitlo}/>
                    {isPlayIntroVideo ? (
                        <video
                            className={classes.videoA}
                            controls
                            src={"/images/masquerade/vamp0211_after.mp4"}
                        />
                    ) :
                        <>
                            <Image className={classes.preview} src={after_thumb} alt="Aftermovie preview" fill/>
                            <button className={classes.startMovieButt} onClick={() => setIsPlayIntroVideo(true)}>ПЕРЕГЛЯНУТИ ВІДЕО aftermovie</button>
                        </>
                    }
                </div>
                <p>Дракула, лідер темних сил повернувся після сну і зібрав навколо себе нову фамілію. Сотні сміливців прийняли його виклик.</p>
            </div>
            {/* DETAILS */}
            <div className={classes.details}>
                <div className={classes.detailsHeader}>
                    <h3>ДЕТАЛІ ВЕЧІРКИ</h3>
                    <p className={classes.detailsSub}>Mаска - твій квиток у простір без правил і очікувань</p>
                </div>
                <div className={classes.detailsWrapper}>
                    <div className={classes.detail}>
                        <div className={classes.detailText}>
                            <h4>PLACE</h4>
                            <p>Жовтневий палац. Алея Героїв Небесної Сотні, 1.</p>
                        </div>
                        <img src={det1.src} alt="place"/>
                    </div>
                    <div className={classes.detail}>
                        <div className={classes.detailText}>
                            <h4>Price</h4>
                            <p><strong>1500 UAH</strong></p>
                            <p>Кількість квитків лімітована - 2000 осіб.</p>
                            <p>Вартість квитків залежить від етапу передпродажу.</p>
                        </div>
                        <img src={det2.src} alt="place"/>
                    </div>
                    <div className={classes.detail}>
                        <div className={classes.detailText}>
                            <h4>Duration</h4>
                            <p><strong>12:00 - 22:00</strong></p>
                            <h4>Service</h4>
                            <p>На локації буде фуд-корт, великий бар, лаунж зона та гардероб</p>
                        </div>
                        <img src={det3.src} alt="place"/>
                    </div>
                </div>
                <button onClick={scrollToPayment} className={classes.buyButt}>Придбати квиток</button>
            </div>
            {/* STORY */}
            <div className={classes.story}
                style={{
                    backgroundImage: `url(${listBg.src})`
                }}
            >
                <img src={shadowImgTop.src} alt="shadow" className={classes.shadowTop}/>
                <img src={shadowImg.src} alt="shadow" className={classes.shadowBot}/>
                <img src={gerb.src} alt="gerb" className={classes.gerb}/>
                <div className={classes.paper}>
                    <Image src={paper} alt="paper" fill/>
                    <p className={classes.topText}>Раз на рік, настає день, коли світ людей і тіней перетинаються. Реальність залишається за дверима, а час втрачає значення</p>
                    <p>Це не просто вечірка. Це бал Masquerade, на який запрошені всі — вампіри, перевертні, примари й ті, хто наважиться стати одним із них. В цей день протистояння між добром і злом зникає: під дахом Жовтневого Палацу всі рівні, всі — в одному ритмі.</p>
                    <p>Але у Дракули є й особистий задум: серед сотень масок він прагне знайти свою єдину — ту, чия загадковість і сміливість зможе підкорити його серце.</p>
                </div>
                <img src={gerb.src} alt="gerb" className={classes.gerb}/>
            </div>
            {/* LINEUP */}
            <div className={classes.lineup}>
                <h3>LINE UP</h3>
                <div className={classes.lineupWrapper}>
                    <div className={classes.headliner}>
                        <div className={classes.headlinerText}>
                            <p>Є ті, хто володіє таємницею оживлення масок. Їх називають Хранителі масок</p>
                            <p>Вони — діджеї Маскараду, провідники ритмів,
                                що пробуджують приховану сутність гостей. Їхні сети — закляття, яке стирає повсякденні обличчя й відкриває нові іпостасі. <br/>
                                Саме завдяки Хранителям масок бал стає живим організмом, де тане межа між людським
                                і міфічним. Їхнє мистецтво вплітає хаос
                                у гармонію, тримаючи баланс між світами.
                                Коли вони стають за пульти, маски оживають,
                                і кожен танцюрист стає частиною таємниці.
                            </p>
                            <div className={classes.special}>
                                <h4>special guest</h4>
                                <h5>Dusty Kid</h5>
                            </div>
                        </div>
                        <div className={classes.dustyImg}>
                            <Image src={dustyImg} alt="Dusty Kid" fill/>
                        </div>
                    </div>
                    <div className={classes.stages}>
                        <div className={classes.stage}>
                            <h4>MAIN</h4>
                            <div className={classes.djs}>
                                {djs[0].main.map(el => (
                                    <p>{el.djs.map((dj, djIndex) => (
                                        <p>{djIndex > 0 && "&"} {dj.name}</p>
                                    ))}</p>
                                ))}
                            </div>
                        </div>
                        <div className={classes.stage}>
                            <h4>DARK</h4>
                            <div className={classes.djs}>
                                {djs[0].dark.map(el => (
                                    <p>{el.djs.map((dj, djIndex) => (
                                        <p>{djIndex > 0 && "&"} {dj.name}</p>
                                    ))}</p>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={classes.featured}>
                <HozhoSlider
                    arrows={true}
                    length={featuredMedia.length}
                    // nextArrow={<NextArrow/>}
                    // prevArrow={<PrevArrow/>}
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
            {/* SALE */}
            <div className={classes.sale}
                style={{
                    backgroundImage: `url(${saleBg.src})`
                }}
            >
                <img src={shadowImgTop.src} alt="shadow" className={classes.shadowTop}/>
                <img src={shadowImg.src} alt="shadow" className={classes.shadowBot}/>
                <div className={classes.saleText}>
                    <p>Залиш реальність за дверима, </p>
                    <div className={classes.saleSub}>
                        <p>одягай свою маску та поринь у світ</p>
                        <h6>MASQUERADE</h6>
                    </div>
                    <button onClick={scrollToPayment} className={classes.buyButt}>Придбати квиток</button>
                </div>
            </div>
            {/* POINTS */}
            <div className={classes.points}>
                <div className={classes.point}>
                    <div className={classes.pointImg}>
                        <Image src={p1} alt="Музика як алхімія" fill />
                    </div>
                    <div className={classes.pointText}>
                        <h5>Музика як алхімія</h5>
                        <p>Від темних ритмів, що змушують серце битися швидше, до світлих мелодій, що зцілюють душу. <br/>
                        Це звук, який об’єднує протилежності.</p>
                    </div>
                </div>
                <div className={classes.point}>
                    <div className={classes.pointImg}>
                        <Image src={p2} alt="Маска — ключ до свободи" fill />
                    </div>
                    <div className={classes.pointText}>
                        <h5>Маска — ключ до свободи</h5>
                        <p>Вона дозволяє стати ким завгодно: героєм, міфічною істотою чи примарою ночі. Тут немає “правильно” чи “неправильно” — є лише твоє бажання бути собою.</p>
                    </div>
                </div>
                <div className={classes.point}>
                    <div className={classes.pointImg}>
                        <Image src={p3} alt="Простір без правил" fill />
                    </div>
                    <div className={classes.pointText}>
                        <h5>Простір без правил</h5>
                        <p>Палац Дракули перетворюється на місце, де час втрачає значення. Тут кожна маска — це нова історія, кожна тінь — союзник, кожен рух — частина ритуалу.</p>
                    </div>
                </div>
            </div>
            {/* ITS */}
            <div className={classes.its}>

            </div>
            {/* DRESSCODE */}
            <div className={classes.dresscode}>
                <div className={classes.dressHeader}>
                    <h3>ДРЕС-КОД</h3>
                    <p>Ким бути на маскараді вирішуєш тільки ти</p>
                </div>
                <div className={classes.dressTypes} ref={containerRef}>
                    {dress.map((el, index) => (
                        <div key={index} className={classes.dressType}>
                            <div className={classes.dressTypeImg}>
                                <Image src={el.img} alt={el.name} fill className={classes.drImg}/>
                                <h5>{el.name}</h5>
                                <img src={index % 2 === 0 ? r1.src : r2.src} alt="trinket" className={classes.trinket}/>
                            </div>
                            <div className={classes.dressInfo}>
                                <div className={classes.dressInfoPoint}>
                                    <h6>{intl.formatMessage({ id: "vice.15" })}</h6>
                                    <p>{el.dresscode}</p>
                                </div>
                                <div className={classes.dressInfoPoint}>
                                    <h6>{intl.formatMessage({ id: "vice.28" })}</h6>
                                    <p>“{el.phrase}”</p>
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
            <MasqueradeForm
                event={event}
                price={price}
                setPrice={setPrice}
                paymentBlockRef={paymentBlockRef}
            />
            <div className={classes.faq} id="faq"
                style={{
                    backgroundImage: `url(${faqBg.src})`
                }}
            >
                <img src={shadowImgTop.src} alt="shadow" className={classes.shadowTop}/>
                <img src={shadowImg.src} alt="shadow" className={classes.shadowBot}/>
                <h3>FAQ</h3>
                <div className={classes.questions}>
                    {faq.map((el, index) => (
                        <MasqueradeFaqItem
                            key={el.title}
                            item={el}
                            index={index}
                        />
                    ))}
                </div>
            </div>
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

export default Masquerade