import classes from "./Burger.module.css"
import { AiOutlineClose } from 'react-icons/ai';
import { HiMenu } from "react-icons/hi"
import { IconButton } from "@mui/material";
import { Drawer } from "@mui/material";
import { useState } from "react";
import useNavLinks from "../../../../hooks/useNavLinks";
import CustomLink from "../../../UI/Text/CustomLink/CustomLink";
import { cx } from "../../../../utils/classnames";
import { useRouter } from "next/router";
import LanguageSelector from "../../LanguageSelector/LanguageSelector";
import Link from "next/link";
import palm from "/public/images/vice-city/palm4.svg"

const Burger = ({ themed }) => {
    const [isOpenBurger, setIsOpenBurger] = useState(false)

    const router = useRouter()

    const links = useNavLinks()

    const handleOpen = () => {
        setIsOpenBurger(!isOpenBurger)
    }

    const inEnglish = router.locale === "en"
    const openLabel = inEnglish ? "Open menu" : "Відкрити меню"
    const closeLabel = inEnglish ? "Close menu" : "Закрити меню"

    return (
        <div className={classes.main}>
            <div className={cx(classes.burger, themed && classes.themedTrigger)}>
                <IconButton onClick={handleOpen} aria-label={openLabel} aria-expanded={isOpenBurger}>
                    <HiMenu />
                </IconButton>
            </div>
            <Drawer
                anchor="right"
                open={isOpenBurger}
                onClose={() => setIsOpenBurger(false)}
                classes={{ root: classes.root, paper: router.pathname.includes("vice-city") ? classes.viceCity : cx(classes.paper, themed && "site-theme", themed && classes.themedPaper) }}
                sx={{ zIndex: 199999999 }}
            >
                <div className={classes.header}>
                    <IconButton
                        onClick={handleOpen}
                        className={classes.closeBut}
                        aria-label={closeLabel}
                    >
                        <AiOutlineClose />
                    </IconButton>
                </div>
                {router.pathname.includes("vice-city") && (
                    <img src={palm.src} alt="palm" className={classes.palm}/>
                )}
                <div className={classes.links}>
                    {router.pathname.includes("vice-city") ? (
                        <>
                            <Link href={"#about"} onClick={() => setIsOpenBurger(false)}>About Festival</Link>
                            <Link href={"#lineup"} onClick={() => setIsOpenBurger(false)}>Line up</Link>
                            <Link href={"#details"} onClick={() => setIsOpenBurger(false)}>Party Details</Link>
                            <Link href={"#how_it_was"} onClick={() => setIsOpenBurger(false)}>How it Was</Link>
                            <Link href={"#dresscode"} onClick={() => setIsOpenBurger(false)}>Dresscode</Link>
                            <Link href={"#faq"} onClick={() => setIsOpenBurger(false)}>FAQ</Link>
                            <Link href={"#playlist"} onClick={() => setIsOpenBurger(false)}>Playlist</Link>
                        </>
                    ) : (
                        <>
                            {links.map(el => (
                                <CustomLink
                                    onClick={() => setIsOpenBurger(false)}
                                    key={el.href}
                                    href={el.href}
                                    text={el.text}
                                    className={cx(classes.link, router.pathname == el.href ? classes.active : "")}
                                />
                            ))}
                        </>
                    )}
                </div>
                <LanguageSelector handleOpen={() => setIsOpenBurger(false)} drawerOnly={themed} />
            </Drawer>
        </div>
    )
}

export default Burger