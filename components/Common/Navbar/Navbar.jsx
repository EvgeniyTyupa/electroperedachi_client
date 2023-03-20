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
        <header className={classes.main}>
            <Container className={classes.container}>
                <Link href={routes.home}>
                    <img src={logo.src} alt="logo" className={classes.logo}/>
                </Link>
                <nav className={classes.links}>
                    {links.map(el => (
                        <CustomLink
                            key={el.href}
                            href={el.href}
                            text={el.text}
                            className={cx(classes.link, router.pathname == el.href ? classes.active : "")}
                        />
                    ))}
                    <LanguageSelector/>
                </nav>
                <div className={classes.burger}>
                    <Burger/>
                </div>
            </Container>
        </header>
    )
}

export default Navbar