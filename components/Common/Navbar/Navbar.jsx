import classes from './Navbar.module.css'
import Link from 'next/link';
import logo from "/public/images/logo.svg"
import { useRouter } from 'next/dist/client/router';
import useNavLinks from '../../../hooks/useNavLinks';
import { cx } from '../../../utils/classnames';
import Container from '../../UI/Container/Container';
import CustomLink from '../../UI/Text/CustomLink/CustomLink';
import LanguageSelector from '../LanguageSelector/LanguageSelector';
import Burger from './Burger/Burger';
import { routes } from '../../../utils/routes';

const Navbar = () => {
    const router = useRouter()
    const links = useNavLinks()

    return (
        <nav className={cx(
            classes.main,
            router.pathname.includes("/events/") ? classes.absoluteDef : undefined,
            router.pathname === "/events" ? classes.transparent : undefined,
            router.pathname === "/events/hozho" ? classes.absolute : undefined,
            router.pathname === "/events/vampire-carnival" ? classes.absolute : undefined,
            router.pathname === "/events/cyber-christmas" ? classes.absolute : undefined,
            router.pathname === "/events/vice-city" ? classes.none : undefined,
        )}>
            <Container className={classes.container}>
                {router.pathname != "/events/vice-city" && (
                    <Link href={routes.home}>
                        <img src={logo.src} alt="logo" className={classes.logo}/>
                    </Link>
                )}
                <nav className={classes.links}>
                    {(router.pathname !== "/events/circus" &&
                    router.pathname !== "/events/cyberpunk" &&
                    router.pathname !== "/events/vampire-carnival" &&
                    router.pathname !== "/events/cyber-christmas" &&
                    router.pathname !== "/events/hozho" &&
                    router.pathname !== "/events/vice-city"
                    ) && (
                        links.map(el => (
                            <CustomLink
                                key={el.href}
                                href={el.href}
                                text={el.text}
                                className={cx(classes.link, router.pathname == el.href ? classes.active : "")}
                            />
                        ))
                    )}
                    <LanguageSelector/>
                </nav>
                <div className={classes.burger}>
                    <Burger/>
                </div>
            </Container>
        </nav>
    )
}

export default Navbar