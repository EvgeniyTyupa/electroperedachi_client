import Link from "next/link";
import { useIntl } from "react-intl";
import useNavLinks from "../../../../../hooks/useNavLinks";
import useSocialLinks from "../../../../../hooks/useSocialLinks";
import classes from "../NeedForSpeed.module.css";

const socialNames = ["Facebook", "Instagram", "SoundCloud", "YouTube", "Telegram"];

export function Footer() {
  const links = useNavLinks();
  const socialLinks = useSocialLinks();
  const intl = useIntl();

  return <footer className={classes.foot} data-theme="night">
    <div className={classes.foot__inner}>
      <img className={classes.foot__logo} src="/images/need_for_speed/nfs-logo.webp" width={321} height={321} alt="Need for Speed" loading="lazy" />
      <Link href="/" className={classes.foot__mark}>electroperedachi</Link>
      <nav className={classes.foot__nav} aria-label={intl.formatMessage({ id: "navbar.main" })}>
        {links.map(link => <Link key={link.href} href={link.href}>{link.text}</Link>)}
      </nav>
      <div className={classes.foot__social}>
        {socialLinks.map((link, index) => <a key={link.url} href={link.url} target="_blank" rel="noopener noreferrer" aria-label={socialNames[index]}>{link.icon}</a>)}
      </div>
      <div className={classes.foot__legal}>
        <Link href="/terms-of-use">{intl.formatMessage({ id: "footer.terms" })}</Link>
        <Link href="/privacy-policy">{intl.formatMessage({ id: "footer.privacy" })}</Link>
      </div>
    </div>
  </footer>;
}
