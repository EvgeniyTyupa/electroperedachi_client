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

const Burger = () => {
    const [isOpenBurger, setIsOpenBurger] = useState(false)

    const router = useRouter()

    const links = useNavLinks()

    const handleOpen = () => {
        setIsOpenBurger(!isOpenBurger)
    }

    const anchor = "right"

    return (
        <div className={classes.main}>
            <div className={classes.burger}>
                <IconButton onClick={handleOpen}>
                    <HiMenu />
                </IconButton>
            </div>
            <Drawer
                anchor={anchor}
                open={isOpenBurger}
                onClose={handleOpen}
                classes={{ root: classes.root, paper: classes.paper }}
                sx={{ zIndex: 199999999 }}
            >
                <div className={classes.header}>
                    <IconButton
                        onClick={handleOpen}
                        className={classes.closeBut}
                    >
                        <AiOutlineClose />
                    </IconButton>
                </div>
                <div className={classes.links}>
                    {links.map(el => (
                        <CustomLink
                            onClick={() => setIsOpenBurger(false)}
                            key={el.href}
                            href={el.href}
                            text={el.text}
                            className={cx(classes.link, router.pathname == el.href ? classes.active : "")}
                        />
                    ))}
                </div>
                <LanguageSelector handleOpen={handleOpen}/>
            </Drawer>
        </div>
    )
}

export default Burger