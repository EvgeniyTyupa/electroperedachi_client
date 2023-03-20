import { MenuItem } from "@mui/material"
import { TextField } from "@mui/material"
import Link from 'next/link';
import { useRouter } from "next/router";
import { MdKeyboardArrowDown } from "react-icons/md"
import classes from './LanguageSelector.module.css'
import moment from "moment";
import { useEffect } from "react";
import { Button } from "@mui/material";
import { cx } from "../../../utils/classnames";

const languageSelectorStyles = {
    width: "55px",
    color: "white",
    textTransform: "uppercase",
    "& .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent"
    },
    "& .Mui-focused .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent !important"
    },
    "& .Mui-hovered .MuiOutlinedInput-notchedOutline": {
        borderColor: "transparent !important"
    },
    "& .MuiOutlinedInput-input": {
        padding: 0
    },
    '&:hover fieldset': {
        borderColor: 'transparent !important',
    },
    "& a": {
        color: "white"
    },
    "& a:hover": {
        color: "white" 
    },
    "& svg": {
        color: "white"
    }
}

const LanguageSelector = () => {
    const { locales, locale } = useRouter()
    const router = useRouter()

    useEffect(() => {
        moment().locale(router.locale)
    }, [router.locale])

    return (
        <>
            <TextField
                select
                className={classes.select}
                value={router.locale}
                sx={languageSelectorStyles}
                SelectProps={{
                    IconComponent: MdKeyboardArrowDown
                }}
            >
                {locales.map(el => (
                    <MenuItem value={el} className={classes.menuItem} key={el}>
                        <Link key={el} href={{ href: router.pathname, query: {...router.query} }} locale={el}>{el}</Link>
                    </MenuItem>
                ))}
            </TextField>
            <div className={classes.buttons}>
                <Button>
                    <Link href={{ href: router.pathname, query: {...router.query} }} locale={"en"} className={cx(classes.langLink, locale === "en" ? classes.active : undefined)}>EN</Link>
                </Button>
                <Button>
                    <Link href={{ href: router.pathname, query: {...router.query} }} locale={"ua"} className={cx(classes.langLink, locale === "ua" ? classes.active : undefined)}>UA</Link>
                </Button>
            </div>
        </>
    )
}

export default LanguageSelector