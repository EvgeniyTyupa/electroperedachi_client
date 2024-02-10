import classes from "./Cyberpunk.module.css"

import Image from "next/image"

import { useMagicWriter } from "../../../../hooks/useTypedChar"
import { useState, useEffect, useRef } from 'react'

import { useIntl } from "react-intl"

import useNavLinks from "../../../../hooks/useNavLinks"
import useSocialLinks from "../../../../hooks/useSocialLinks"
import CustomLink from "../../../UI/Text/CustomLink/CustomLink"

import Button from "@mui/material/Button"

import Link from "next/link"

import { HiOutlineLocationMarker } from "react-icons/hi";
import { LuClock4 } from "react-icons/lu";
import { RiTicket2Line, RiTShirtLine } from "react-icons/ri";
import { PiDatabaseLight } from "react-icons/pi";
import { IoMdArrowDown } from "react-icons/io";

import { cx } from "../../../../utils/classnames"

import home_back_img from "/public/images/cyberpunk/main.jpg"
import tabl from "/public/images/cyberpunk/tabl.svg"
import ramka1 from "/public/images/cyberpunk/ramk1.svg"
import ramka2 from "/public/images/cyberpunk/ramk2.svg"
import cabel1 from "/public/images/cyberpunk/cable1.png"
import cabel2 from "/public/images/cyberpunk/cable2.png"
import cabel3 from "/public/images/cyberpunk/cable3.png"
import girl from "/public/images/cyberpunk/girl.jpg"
import more_back from "/public/images/cyberpunk/more_back.png"
import mission_back from "/public/images/cyberpunk/mission_back.svg"
import hand from "/public/images/cyberpunk/hand.png"
import hand2 from "/public/images/cyberpunk/hand2.png"
import decor1 from "/public/images/cyberpunk/decor1.svg"
import decor2 from "/public/images/cyberpunk/decor2.svg"

import skin1 from "/public/images/cyberpunk/solomia.jpg"
import skin2 from "/public/images/cyberpunk/victoria.jpg"
import skin3 from "/public/images/cyberpunk/maria.jpg"
import skin4 from "/public/images/cyberpunk/roman.jpg"
import card from "/public/images/cyberpunk/card.png"
import dj_card from "/public/images/cyberpunk/dj_card.svg"

import message_back from "/public/images/cyberpunk/message.png"

import earmake from "/public/images/cyberpunk/earmake.png"

import rect1 from "/public/images/cyberpunk/rect1.svg"
import rect2 from "/public/images/cyberpunk/rect2.svg"
import rect3 from "/public/images/cyberpunk/rect3.svg"
import circle from "/public/images/cyberpunk/circle.svg"

import r25 from "/public/images/cyberpunk/r25.svg"

import stuff1 from "/public/images/cyberpunk/stuff1.jpg"
import stuff2 from "/public/images/cyberpunk/stuff2.jpg"
import decor3 from "/public/images/cyberpunk/decor3.svg"

import price_back from "/public/images/cyberpunk/price_back.png"
import CyberpunkForm from "./CyberpunkForm/CyberpunkForm"
import CyberpunkFaqItem from "./CyberpunkFaqItem/CyberpunkFaqItem"

const Cyberpunk = (props) => {
    const text1 = "Основна мета - знайти спосіб відкрити кейс та трасувати дані на сервер. Є декілька способів відкриття, але найпростіший - знайти колегу для злиття своїх кодів. \n\n У останні секунди звʼязку ми отримали пул з цифрами, думаємо це частина коду. Не зволікай часу, стань частиною плану!"
    
    const typingMore1 = useMagicWriter(text1, 40)

    const [infoIndex, setInfoIndex] = useState(0)

    const paymentBlockRef = useRef(null)

    const intl = useIntl()

    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const faq = [
        {
            title: "Чи можу я використати придбаний квиток скасованої події Union?",
            text: "Згідно з документом, що підтверджується при придбанні квитків Умови та правила на заходах організації electroperedachi, ми чекаємо усіх хто придбав квитки на скасований захід, на будь-яку подію у майбутньому. Ваш квиток не втрачає важність, а також може бути використаним навіть якщо ціна є вищою."
        }
    ]

    const skins = [
        {
            img: skin1.src,
            name: "Соломія",
            role: "Кібер-шпіон",
            age: 25,
            zodiac: "Риби",
            city: "Київ",
            info: "Ви вже знайомі 4 роки"
        },
        {
            img: skin2.src,
            name: "Вікторія",
            role: "Кібер-шпіон",
            age: 22,
            zodiac: "Лев",
            city: "Львів",
            info: "Ви вже знайомі 4 роки"
        },
        {
            img: skin3.src,
            name: "Марія",
            role: "Кібер-шпіон",
            age: 26,
            zodiac: "Скорпіон",
            city: "Запоріжжя",
            info: "Ви вже знайомі 4 роки"
        },
        {
            img: skin4.src,
            name: "Роман",
            role: "Кібер-шпіон",
            age: 28,
            zodiac: "Стілець",
            city: "Київ",
            info: "Ви вже знайомі 4 роки"
        }
    ]

    const djs = [
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30"
        },
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30"
        },
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30"
        },
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30"
        },
        {
            img: earmake.src,
            name: "Earmake",
            code: "#234T67",
            style: "Synthwave, Psybient",
            time: "17:30"
        }
    ]

    const scrollToPayment = () => {
        paymentBlockRef.current.scrollIntoView()
    }

    return (
        <div className={classes.main}>
            {/* HOME */}
            <div className={classes.home}
                style={{
                    backgroundImage: `url(${home_back_img.src})`
                }}
            >
                <div className={classes.title}>
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
                    <p className={classes.gameText}>Е: Твій час прийшов Чумба, ти потрібен для місії</p>
                    <div className={classes.answerBlock}>
                        <p className={classes.gameText}>KSID:</p>
                        <div className={classes.answers}>
                            <button className={classes.gameText}>Ознайомитись з досьє завдання</button>
                            <button className={classes.gameText} onClick={scrollToPayment}>Пропустити та <span>придбати доступ</span> одразу</button>
                        </div>
                    </div>
                </div>
            </div>
            {/* INTRO */}
            <div className={classes.intro}>
                <div className={cx(classes.introInfo)}
                    style={{
                        backgroundImage: `url(${ramka1.src})`
                    }}
                >
                    <p>Уяви, недалеке майбутньє, світом правлять корпорації, а інформація – найпотужніша валюта. Твоя колега пішла на завдання у корпо, щоб хакнути кейс, що містить важливі дані для створення революційних технологій. Вже 3 день з нею немає звʼязку.</p>
                </div>
                <img src={tabl.src} alt="freedom, equality, techno"/>
                <div className={cx(classes.introInfo, classes.ramka2)}
                    style={{
                        backgroundImage: `url(${ramka2.src})`
                    }}
                >
                    <p>На 9 березня запланована таємна корпоративна асамблея, на 11 поверсі будівлі Gulliver, Creative Quarter у центрі Києва. Вхід - Б. Тобі необхідно  туди потрапити
                    <br/><br/>
                    Проте тобі обов'язково потрібно замаскуватись під єлітного корпо працівника. У досьє до завдання знайдеш референс.</p>
                </div>
            </div>
            {/* VIDOS */}
            <div className={classes.vidos}>
                <div className={classes.videoBlock}>
                    <img src={girl.src} alt="girl"/>
                </div>
                <img className={classes.cabel1} src={cabel1.src} alt="cables"/>
                <img className={classes.cabel2} src={cabel2.src} alt="cables"/>
                <img className={classes.cabel3} src={cabel3.src} alt="cables"/>
            </div>
            {/* MORE */}
            <div className={classes.more}
                style={{
                    backgroundImage: `url(${more_back.src})`
                }}
            >
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
                <h3 className={classes.blockHeader}>Mission Steps</h3>
                <div className={classes.steps}>
                    <div className={cx(classes.step, classes.stepPast)}>
                        <div className={classes.stepNumberBlock}>
                            <p>01</p>
                        </div>
                        <p>Ми знайшли спосіб потрапити на асамблею та приготували твій тимчасовий профіль</p>
                    </div>
                    <div className={cx(classes.step, classes.stepActive)}>
                        <div className={classes.stepNumberBlock}>
                            <p>02</p>
                        </div>
                        <p>Наступний вихід - твій. Замаскуйся у єлітного корпо працівника та викупи у нетранера доступ до заходу</p>
                    </div>
                    <div className={cx(classes.step)}>
                        <div className={classes.stepNumberBlock}>
                            <p>03</p>
                        </div>
                        <p>Пройди повз охорону, та інтегруватись у атмосферу</p>
                    </div>
                    <div className={cx(classes.step)}>
                        <div className={classes.stepNumberBlock}>
                            <p>04</p>
                        </div>
                        <p>Зроби трасування даних. Для цього треба знайти колегу, щоб відчинити кейс. Далі, можеш насолоджуватись подією</p>
                    </div>
                </div>
                <img src={hand.src} alt="hand"/>
            </div>
            {/* DETAILS */}
            <div className={classes.details}>
                <h3 className={classes.blockHeader}>Party Details</h3>
                <p className={classes.gameText}>Е: Інструктаж для 2-ї та 3-ї фази</p>
                <div className={classes.detailsSections}>
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <HiOutlineLocationMarker />
                                <p>Miсце події</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>Корпоративна Вежа - Gulliver Creative Quarter, Вхід Б</p>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <LuClock4 />
                                <p>Початок \ Кінець</p>
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
                                <RiTicket2Line />
                                <p>Кількість квитків</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>300</p>
                        </div>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <PiDatabaseLight />
                                <p>Ціна квитків</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={cx(classes.detailText, classes.time)}>600 UAH</p>
                            <p className={classes.detailText}>Ціна квитків залежить від етапу передпродажу. Кількість етапів: ІІ. Чим ближче до дати - тим дорожче. Не зволікайте.</p>
                        </div>
                    </div>
                    <div className={classes.detailSection}>
                        <div className={classes.detail}>
                            <div className={classes.detailHeader}>
                                <RiTShirtLine />
                                <p>Дресс-Код</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                Тобі треба замаскуватись, для цього потрібно одягнутись в стилі корпо. Нижче знайдеш твоїх “колег” з праці, використай це, як референс.
                                <br/><br/>
                                Чим краще маскування, тим більший шанс оминути охорону не викликаючи підозри
                                <br/><br/>
                                Інакше, мусиш підкупити охоронців.
                            </p>
                        </div>
                    </div>
                </div>
                <img src={hand2.src} alt="hand"/>
            </div>
            {/* SKINS */}
            <div className={classes.skins}>
                {skins.map((el, index) => (
                    <div
                        className={cx(classes.skin, infoIndex === index ? classes.skinOpen : undefined)}
                        onMouseEnter={() => setInfoIndex(index)}
                        onMouseLeave={() => setInfoIndex(0)}
                        key={el.name}
                    >
                        <img src={el.img} alt={el.name} className={classes.skinImg}/>
                        <div className={classes.cardInfo}>
                            <img src={card.src}/>
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
                <h3 className={classes.blockHeader}>LINE UP</h3>
                <img src={decor1.src} alt="decor" className={classes.decor1}/>
                <p className={classes.gameText}>Е: Вони попіклуються, щоб ви мали про що згадати з цієї події, під час наступного Брейнданс’у</p>
                <div className={classes.djs}>
                    {djs.map(el => (
                        <div className={classes.dj} key={el.name}>
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
                <div className={classes.title}>
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
                    <img src={circle.src} alt="circle" className={classes.circle}/>
                    <div className={classes.notBlock}>
                        <div className={classes.notHeader}>
                            <img src={rect1.src} alt="decor"/>
                            <p>Ви отримали повідомлення</p>
                        </div>
                        <div className={classes.notBody}>
                            <img src={rect3.src} alt="decor" className={classes.ramka}/>
                            <img src={rect2.src} alt="decor"/>
                            <p className={classes.gameText}>Е: Агов, чумба! Незволікай! <br/>Квитків на подію лімітовано, встигни отримати доступ поки є місця</p>
                        </div>
                    </div>
                </div>
                <Button className={classes.buyButt} onClick={scrollToPayment}>
                    <p>ПРИДБАТИ КВИТОК</p>
                    <div className={classes.r25}>
                        <IoMdArrowDown />
                        <img src={r25.src} alt="r25"/>
                    </div>
                </Button>
            </div>
            {/* STUFF */}
            <div className={classes.stuff}>
                <h3 className={classes.blockHeader}>MISSION`S STUFF</h3>
                <div className={classes.stuffContainer}>

                    <div className={classes.stuffLeft}>
                        <img src={stuff1.src} alt="stuff" className={classes.stuffImg1}/>
                        <img src={stuff2.src} alt="stuff" className={classes.stuffImg2}/>
                        <div className={classes.blured}/>
                        <div className={cx(classes.blured, classes.blured2)}/>
                        <div className={classes.stuffLeftText}>
                            <div className={classes.detailHeader}>
                                <p>Профіль для завдання</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                Ми знайшли спосіб потрапити на захід корпорації. приготували тимчасовий профіль. 
                                <br/><br/>
                                Хоча тебе не будуть знати в лице, всі з тобою знайомі, оскільки весь цей час ви працювали разом віддалено. 
                                <br/><br/>
                                Твій нікнейм - KSID. Працює у відділу захисту програмного забеспечення. На цій посаді, ти вже давно та очікуєш незабаром підвищення.
                            </p>
                        </div>
                    </div>
                    <div className={classes.stuffRight}
                        style={{
                            backgroundImage: `url(${decor3.src})`
                        }}
                    >
                        <div className={classes.detailHeader}>
                                <p>Кейс</p>
                            </div>
                            <div className={classes.detailBorder}>
                                <div className={classes.line}/>
                                <div className={classes.parallelogram}/>
                            </div>
                            <p className={classes.detailText}>
                                Що ж, той хто володіє кейсом, зокрема тим, що всередині, має владу у всесвіті Crystal Ninja. Ці дані, що записані на Braindance девайсі, мають вплив на вектор подій. 
                                <br/><br/>
                                Коли відкриєш та надішлеш нам дані - ти отримаєш подарунки від партнерів. Не будемо відкривати завісу, сам дізнаєшся, що отримаєш врешті решт. 
                                <br/><br/>
                                Але запевняємо, подарунки - переконливі. Памʼятай, частину коду знайдеш у матеріалах доступу, після купівлі.
                            </p>
                    </div>
                </div>
            </div>
            {/* PRICE */}
            <div className={classes.price}>
                <div className={classes.priceInfo}>
                    {/* <img src={moon.src} alt="moon" className={classes.moon}/> */}
                    <h3 className={classes.blockHeader}>PRICE</h3>
                    <p className={classes.gameText}>Е: Чим ближче до дати - тим дорожче. Не зволікайте :)</p>
                </div>
                <img src={price_back.src} alt="price_back" className={classes.priceBack}/>
            </div>
            {/* FORM */}
            <CyberpunkForm paymentBlockRef={paymentBlockRef}/>
            {/* FAQ */}
            <div className={classes.faqContainer}>
                <div className={classes.faq}>
                    <h3 className={classes.blockHeader}>FAQ</h3>
                    <div className={classes.questions}>
                        {faq.map(el => (
                            <CyberpunkFaqItem item={el}/>
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