import useNavLinks from "../../../hooks/useNavLinks"
import useSocialLinks from "../../../hooks/useSocialLinks"
import classes from "./Footer.module.css"
import { cx } from "../../../utils/classnames"
import { useRouter } from "next/router"
import CustomLink from "../../UI/Text/CustomLink/CustomLink"
import { useIntl } from "react-intl"
import PeaksFooter from "./PeaksFooter/PeaksFooter"
import Container from "../../UI/Container/Container"
import Link from "next/link"

const Footer = () => {
    const router = useRouter()
    const links = useNavLinks()
    const socialLinks = useSocialLinks()

    const intl = useIntl()

    return (
        <>
            {router.asPath !== "/events/145bpm" && (
                <footer className={classes.main}>
                    <Container className={classes.container}>
                        <div className={classes.links}>
                            {links.map((el) => (
                                <CustomLink
                                    key={el.href}
                                    href={el.href}
                                    text={el.text}
                                    className={cx(
                                        classes.link,
                                        router.pathname == el.href ? classes.active : ""
                                    )}
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
                    </Container>
                    <PeaksFooter />
                </footer>
            )}
        </>
    )
}

export default Footer
