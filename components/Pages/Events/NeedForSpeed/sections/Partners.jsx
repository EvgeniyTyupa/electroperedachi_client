import classes from '../NeedForSpeed.module.css'
import { cx } from '../needForSpeedClasses'
import { Marquee } from '../motion/Marquee'
import { useNfsCopy } from '../useNfsCopy'
const logos = [
  { src: 'partner-jm.png', alt: 'Jägermeister', compact: true },
  { src: 'partner-img2450.png', alt: 'Partner' },
  { src: 'nfs-logo.webp', alt: 'Need for Speed', compact: true },
  { src: 'partner-logo-white.svg', desktop: 'partner-logo-white-desktop.svg', alt: 'Partner' },
  { src: 'partner-group.svg', desktop: 'partner-group-desktop.svg', alt: 'Partner' },
  { src: 'partner-uklon.png', alt: 'Uklon' },
  { src: 'partner-kievvag.png', alt: 'KievVagent Autoclub' }
]
export function Partners({ desktop = false }) {
  const copy = useNfsCopy()
  return <Marquee seconds={34} label={copy('Партнери')} className={cx(desktop ? 'partners partners--d' : 'partners')}>
    {logos.map(logo => <span key={logo.src} className={classes.partnerLogo}>
      <img src={'/images/need_for_speed/' + (desktop && logo.desktop ? logo.desktop : logo.src)} alt={logo.alt} className={logo.compact ? classes.partnerLogoCompact : undefined} />
    </span>)}
  </Marquee>
}
