import classes from "./TechnoFashion.module.css"
import home_bg from "/public/images/techno_fashion/home.jpg"
import aerea_live from "/public/images/techno_fashion/aerea_live.png"
import logo1 from "/public/images/techno_fashion/logo1.png"
import logo2 from "/public/images/techno_fashion/logo2.png"
import l1 from "/public/images/techno_fashion/l1.jpg"
import l2 from "/public/images/techno_fashion/l2.jpg"
import l3 from "/public/images/techno_fashion/l3.jpg"
import l4 from "/public/images/techno_fashion/l4.jpg"
import p1 from "/public/images/techno_fashion/p1.jpg"
import p2 from "/public/images/techno_fashion/p2.jpg"
import p3 from "/public/images/techno_fashion/p3.jpg"
import m1 from "/public/images/techno_fashion/m1.jpg"
import m2 from "/public/images/techno_fashion/m2.jpg"
import m3 from "/public/images/techno_fashion/m3.jpg"
import aerea_photo from "/public/images/techno_fashion/aerea_photo.jpg"
import play_icon from "/public/images/techno_fashion/play.svg"
import details from "/public/images/techno_fashion/details.jpg"
import video_preview from "/public/images/techno_fashion/preview.jpg"
import jaga from "/public/images/techno_fashion/jaga.png"
import rent4dj from "/public/images/techno_fashion/rent4dj.png"
import drug from "/public/images/techno_fashion/drug.png"
import kyiv from "/public/images/techno_fashion/kyiv.svg"
import { IoArrowDownSharp } from "react-icons/io5";
import Image from "next/image"
import HozhoSlider from "../Hozho/Slider/HozhoSlider"
import YoutubeCard from "../../../Common/YoutubeCard/YoutubeCard"
import { useEffect, useRef, useState } from "react"
import TechnoFashionForm from "./TechnoFashionForm/TechnoFashionForm"
import moment from "moment"
import { useIntl } from "react-intl"
import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import { getFbCookies } from "../../../../utils/getFbCookies"
import { v4 as uuidv4 } from 'uuid';
import { trackApi } from "../../../../api/api"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"

const TechnoFashion = (props) => {
    const { event } = props

    const paymentBlockRef = useRef(null)
    const moreBlockRef = useRef(null)

    const intl = useIntl()

    const [featuredMedia, setFeaturedMedia] = useState([])

    const [isAddToCartEventSend, setIsAddToCartEventSend] = useState(false)

    const [price, setPrice] = useState(0)

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const faq = event.faq

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    const scrollToMore = () => {
        moreBlockRef.current.scrollIntoView()
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
        const now = moment()

        // flatten all price-windows into one array
        if (event.price) {
            const allWindows = event.price.flatMap((t) => t.price)

            const matching = allWindows.filter((el) => now.isBetween(moment(el.start), moment(el.end), null, "[]"))

            if (matching.length > 0) {
                const cheapest = matching.reduce((a, b) => (a.price < b.price ? a : b))
                setPrice(cheapest.price)
            }
        }

        // Aos.init({ duration: 1000 })
    }, [])

    useEffect(() => {
        if (isAddToCartEventSend) {
            handleAddToCartClick()
        }
    }, [isAddToCartEventSend])

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

    return (
        <div className={classes.main}>
            <div className={classes.home}
                style={{
                    backgroundImage: `url(${home_bg.src})`
                }}
            >
                <p className={classes.homeTitle}>electroperedachi</p>
                <div className={classes.homeInfo}>
                    <h1>TECHNO<br/>FASHION</h1>
                    <img src={aerea_live.src} alt="aerea"/>
                    <p>Світ, натхненний естетикою «Vogue» перенесений у вимір рейву
                    <br/><br/>
                    Не дивись на показ. Будь показом!</p>
                    <button className={classes.buyBut} onClick={scrollToPayment}>
                        <p>ПРИДБАТИ КВИТОК</p>
                        <IoArrowDownSharp/>
                    </button>
                </div>
                <img src={logo1.src} alt="partners" className={classes.partner1}/>
                <img src={logo2.src} alt="partners" className={classes.partner2}/>
                <button className={classes.more} onClick={scrollToMore}>[ ДІЗНАТИСЬ БІЛЬШЕ ]</button>
            </div>
            <div className={classes.homeMobile}>
                <video
                    className={classes.videoHome}
                    src="/images/techno_fashion/vid.mp4"
                    autoPlay
                    loop
                    muted
                    playsInline
                />
                <div className={classes.homeMobileContent}>
                    <div className={classes.homeMobileTitle}>
                        <h2>electroperedachi</h2>
                        <div className={classes.partners}>
                            <img src={jaga.src} alt="jagermeister logo"/>
                            <img src={rent4dj.src} alt="rent4dj logo"/>
                            <img src={drug.src} alt="drugstore logo"/>
                            <img src={kyiv.src} alt="ty_kyiv logo"/>
                        </div>
                    </div>
                    <img className={classes.aerea_logo} src={aerea_live.src} alt="aerea"/>
                    <h1>TECHNO<br/>FASHION</h1>
                    <p>Світ, натхненний естетикою «Vogue» перенесений у вимір рейву
                    <br/><br/>
                    Не дивись на показ. Будь показом!</p>
                    <button className={classes.more} onClick={scrollToMore}>[ ДІЗНАТИСЬ БІЛЬШЕ ]</button>
                    <button className={classes.buyBut} onClick={scrollToPayment}>
                        <p>ПРИДБАТИ КВИТОК</p>
                        <IoArrowDownSharp/>
                    </button>
                </div>
            </div>
            <div className={classes.container}>
                <h2>LEGEND</h2>
                <div className={classes.legendContainer}>
                    <div className={classes.masonry}>
                        <img src={l1.src} alt="l1"/>
                        <p>
                            МОДА ЕВОЛЮЦІОНУВАЛА<br/>
                            ВОНА ПЕРЕСТАЛА БУТИ<br/>
                            МОНОЛОГОМ БРЕНДІВ<br/>
                            ВОНА СТАЛА ДІАЛОГОМ
                        </p>
                        <img src={l2.src} alt="l2"/>
                        <img src={l3.src} alt="l3"/>
                    </div>
                    <div className={classes.masonryRight}>
                        <div className={classes.video}>
                            <div className={classes.videoPreview}
                                style={{
                                    backgroundImage: `url(${video_preview.src})`
                                }}
                            >
                                <p>[ АНОНС ВІДЕО ]</p>
                                <img src={play_icon.src} alt="play icon"/>
                            </div>
                        </div>
                        <div className={classes.masonryRightContent}>
                            <img src={l4.src} alt="l4"/>
                            <div className={classes.masonryRightContentText}>
                                <p>Ми відкриваємо двері у простір people-driven естетики. Тут не оцінюють твою зовнішність за стандартами індустрії — тут сканують твою енергію.</p>
                                <p>Ти — головний герой об'єктива, який бачить те, чого не помічають інші.</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={classes.legendContainerMobile}>
                    <div className={classes.masonry}>
                        <div className={classes.block}>
                            <img src={m1.src} alt="l1"/>
                            <p>
                                МОДА ЕВОЛЮЦІОНУВАЛА,
                                ВОНА ПЕРЕСТАЛА БУТИ
                                МОНОЛОГОМ БРЕНДІВ.
                                ВОНА СТАЛА ДІАЛОГОМ
                            </p>
                        </div>
                        <div className={classes.block}>
                            <img src={m2.src} alt="m2"/>
                            <p>Ми відкриваємо двері у простір people-driven естетики. Тут не оцінюють твою зовнішність за стандартами індустрії — тут сканують твою енергію.</p>
                        </div>
                        <div className={classes.block}>
                            <img src={m3.src} alt="m2"/>
                            <p>Ти — головний герой об'єктива, який бачить те, чого не помічають інші.</p>
                        </div>
                    </div>
                    <div className={classes.masonryRight}>
                        <div className={classes.video}>
                            <div className={classes.videoPreview}
                                style={{
                                    backgroundImage: `url(${video_preview.src})`
                                }}
                            >
                                <p>Ви коли-небудь мріяли стати кращою версією себе? </p>
                                <img src={play_icon.src} alt="play icon"/>
                            </div>
                        </div>
                        <div className={classes.short}>
                            <h5>Не змінюй себе!</h5>
                            <p>Зміни масштаб своєї сміливості</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* ALARM */}
            <div className={classes.alarm}>
                <div className={classes.alarmTrack}>
                    <p>Бажаєш пройти по подіуму? Ти дизайнер і хочеш заявити про себе? Маєш магазин одягу і хочеш взяти участь у показі? Напиши у наш instagram @electroperedachi</p>
                    <p>Бажаєш пройти по подіуму? Ти дизайнер і хочеш заявити про себе? Маєш магазин одягу і хочеш взяти участь у показі? Напиши у наш instagram @electroperedachi</p>
                </div>
            </div>
            {/* DETAILS */}
            <div className={classes.detailsWrp}>
                <div className={classes.container}>
                    <div className={classes.details}>
                        <h2>Деталі вечірки</h2>
                        <div className={classes.detailsAnnotation}>
                            <p>
                                Мода — це не тільки те,<br/>
                                що ти носиш. <br/>
                                Це те, як ти рухаєшся. 
                            </p>
                            <p>
                                Techno Fashion - <br/>
                                Твій ритм. Твій стиль. <br/>
                                Твоя енергія
                            </p>
                        </div>
                        <div className={classes.detailsMain}>
                            <div className={classes.detailsImg}>
                                <Image src={details} alt="details aerea" fill/>
                            </div>
                            <div className={classes.detailsInfo}>
                                <div className={classes.detail}>
                                    <div className={classes.detailHeader}>
                                        <h3>ЦІНА</h3>
                                        <h3>1500 UAH</h3>
                                    </div>
                                    <p>Вартість квитків залежить від етапу передпродажу. Кількість етапів: IV. Ціна на вході найдорожча. </p>
                                </div>
                                <div className={classes.detail}>
                                    <div className={classes.detailHeader}>
                                        <h3>ЧАС</h3>
                                        <h3>15:00 - 22:30</h3>
                                    </div>
                                    <p>Lorem ipsum dolor sit amet consectetur. Maecenas congue</p>
                                </div>
                                <div className={classes.detail}>
                                    <div className={classes.detailHeader}>
                                        <h3>МІСЦЕ</h3>
                                        <h3>BLOCKBASTER MALL</h3>
                                    </div>
                                    <p>
                                        Ми створюємо простір, 
                                        де реальність стає подіумом. Світ, натхненний естетикою «Vogue», але перенесений у вимір рейву.
                                    </p>
                                    <button className={classes.buy} onClick={scrollToPayment}>[ ПРИДБАТИ КВИТОК ]</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* WHY */}
            <div className={classes.why}>
                <div className={classes.whyEl}>
                    <div className={classes.whyElImg}>
                        <Image src={p1} alt="atmosphere" fill/>
                    </div>
                    <h4>АТМОСФЕРА</h4>
                    <p>тут панує естетика скла, прозорості емоцій, мерехтіння світлового шоу і камер та холодного блакитного сяйва.</p>
                </div>
                <div className={classes.whyEl}>
                    <div className={classes.whyElImg}>
                        <Image src={p2} alt="world" fill/>
                    </div>
                    <h4>всесвіт</h4>
                    <p>Це світ епатажу, де спалахи камер замінюють сонце. простір без осуду можна бути ким завгодно Або взагалі ніким бо тобі це у кайф!</p>
                </div>
                <div className={classes.whyEl}>
                    <div className={classes.whyElImg}>
                        <Image src={p3} alt="podium" fill/>
                    </div>
                    <h4>community ПОДІУМ</h4>
                    <p>Ми зробимо власний подіум для комʼюніті. Ти заходиш у Blockbuster Mall, але потрапляєш за лаштунки власного зіркового життя.</p>
                </div>
            </div>
            <div className={classes.container}>
                <div className={classes.lineup}>
                    <h2>LINE UP</h2>
                    <div className={classes.lineupWrapper}>
                        <div className={classes.lineupLeft}>
                            <div className={classes.photoContainer}>
                                <Image src={aerea_photo} alt="AEREA" fill/>
                            </div>
                            <div className={classes.leftText}>
                                <p>special guest</p>
                                <h5>AEREA</h5>
                            </div>
                        </div>
                        <div className={classes.lineupRight}>
                            <p className={classes.lineupText}>Якщо світ — це показ мод, то артисти — це Audio Couturiers (Аудіо-Кутюр’є).  Вони не просто грають музику — вони "шиють" звукове полотно вечора.  Вони керують "показом", змушуючи відвідувачів рухатися синхронно, як на найкращих дефіле світу Вони відчувають натовп і змінюють ритм так, як дизайнер змінює тканину: від невагомих мелодій до щільного, фактурного техно.</p>
                            <div className={classes.djs}>
                                <p>AEREA (Live)</p>
                                <p>ABRADAN</p>
                                <p>NADAI</p>
                                <p>STAYLEN</p>
                                <p>PAUL MEISE (Live)</p>
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
            <TechnoFashionForm
                event={event}
                price={price}
                setPrice={setPrice}
                paymentBlockRef={paymentBlockRef}
            />
        </div>
    )
}

export default TechnoFashion