import classes from './Navbar.module.css'
import Link from 'next/link';
import logo from "/public/images/logo.svg"
import { useRouter } from 'next/router';
import useNavLinks from '../../../hooks/useNavLinks';
import { cx } from '../../../utils/classnames';
import Container from '../../UI/Container/Container';
import CustomLink from '../../UI/Text/CustomLink/CustomLink';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Burger from './Burger/Burger';
import { routes } from '../../../utils/routes';
import { isCustomEventLanding } from '../../../utils/navigation';
import AccountIcon from '../AccountIcon';

const Navbar = ({ themed }) => {
    const router = useRouter()
    const links = useNavLinks()
    const customLanding = isCustomEventLanding(router.pathname)
    const inAccount = router.pathname === "/account" || router.pathname.startsWith("/account/")
    const accountLabel = router.locale === "en" ? "My account" : "Особистий кабінет"

    return (
        <nav className={cx(
            classes.main,
            router.pathname.includes("/events/") ? classes.absoluteDef : undefined,
            themed && classes.themed,
            !themed && router.pathname === "/events" ? classes.transparent : undefined,
            router.pathname === "/events/hozho" ? classes.absolute : undefined,
            router.pathname === "/events/vampire-carnival" ? classes.absolute : undefined,
            router.pathname === "/events/cyber-christmas" ? classes.absolute : undefined,
            router.pathname === "/events/masquerade" ? classes.absolute : undefined,
            router.pathname.includes("/events/vice-city") ? classes.fixed : undefined,
            router.pathname === "/events/techno-fashion" ? classes.none : undefined,
            router.pathname === "/events/need-for-speed" ? classes.none : undefined
        )}>
            <Container className={classes.container}>
                {(!router.pathname.includes("/events/vice-city") && router.pathname != "/events/techno-fashion" && router.pathname != "/events/need-for-speed") && (
                    <Link href={routes.home}>
                        {themed
                            ? <span className={classes.wordmark}>electroperedachi</span>
                            : <img src={logo.src} alt="electroperedachi" className={classes.logo} />}
                    </Link>
                )}
                <div className={classes.links}>
                    {!customLanding && (
                        links.filter(el => !el.account).map(el => (
                            <CustomLink
                                key={el.href}
                                href={el.href}
                                text={el.text}
                                className={cx(classes.link, router.pathname == el.href ? classes.active : "")}
                            />
                        ))
                    )}
                </div>
                <div className={cx(classes.actions, !customLanding ? classes.accountActions : undefined)}>
                    {!themed && <div className={classes.language}><LanguageSelector /></div>}
                    {!customLanding && <Link href="/account" className={cx(classes.accountLink, inAccount ? classes.accountActive : "")} aria-label={accountLabel} title={accountLabel} aria-current={inAccount ? "page" : undefined}><AccountIcon /></Link>}
                </div>
                <div className={classes.burger}>
                    <Burger themed={themed} />
                </div>
            </Container>
        </nav>
    )
}

export default Navbar