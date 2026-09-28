import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { Marquee } from '../motion/Marquee';
const jm = "/images/need_for_speed/partner-jm.png";
const img2450 = "/images/need_for_speed/partner-img2450.png";
const nfs = "/images/need_for_speed/nfs-logo.webp";
const logoWhite = "/images/need_for_speed/partner-logo-white.svg";
const logoWhiteDesk = "/images/need_for_speed/partner-logo-white-desktop.svg";
const group = "/images/need_for_speed/partner-group.svg";
const groupDesk = "/images/need_for_speed/partner-group-desktop.svg";
/* Sizes from Figma: mobile 1081:1030, desktop 1071:278. */
const MOBILE = [{
  src: jm,
  w: 36,
  h: 31,
  alt: 'Jägermeister'
}, {
  src: img2450,
  w: 84,
  h: 19,
  alt: 'Партнер'
}, {
  src: nfs,
  w: 41,
  h: 41,
  alt: 'Need for Speed'
}, {
  src: logoWhite,
  w: 70,
  h: 17,
  alt: 'Партнер'
}, {
  src: group,
  w: 74.199,
  h: 18.773,
  alt: 'Партнер'
}];
const DESKTOP = [{
  src: jm,
  w: 76,
  h: 65,
  alt: 'Jägermeister'
}, {
  src: img2450,
  w: 180,
  h: 39.633,
  alt: 'Партнер'
}, {
  src: nfs,
  w: 88,
  h: 87,
  alt: 'Need for Speed'
}, {
  src: logoWhiteDesk,
  w: 149,
  h: 35,
  alt: 'Партнер'
}, {
  src: groupDesk,
  w: 157.802,
  h: 39.926,
  alt: 'Партнер'
}];
/** 1b · Partners — marquee, 34s cycle (MOTION.md §3). */
export function Partners({
  desktop = false
}) {
  const logos = desktop ? DESKTOP : MOBILE;
  return <Marquee seconds={34} label="Партнери" className={cx(desktop ? 'partners partners--d' : 'partners')}>
      {logos.map((l, i) => <img key={i} src={l.src} width={l.w} height={l.h} alt={l.alt} style={{
      width: l.w,
      height: l.h
    }} />)}
    </Marquee>;
}
