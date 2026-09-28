import classes from "../../NeedForSpeed.module.css";
import { cx } from "../../needForSpeedClasses";
const heroBg = "/images/need_for_speed/hero-bg-desktop.webp";
import { useStartLights } from '../../motion/hooks';
import { TrafficLight } from '../../components/TrafficLight';
import { TicketCta } from '../../components/TicketCta';
import { Wordmark } from '../../components/Wordmark';
import { LINKS } from '../../content';
/** 1 · Hero — Figma 1071:257 (1440 × 810). */
export function HeroDesktop() {
  const {
    state,
    word
  } = useStartLights();
  return <section className={classes["hero-d"]} id="hero" data-theme="night">
      <img className={classes["hero-d__bg"]} src={heroBg} alt="" />
      <div className={classes["hero-d__scrim"]} />
      <div className={classes["hero-d__body"]}>
        <Wordmark copies={3} />
        <div className={classes["lights"]}>
          <TrafficLight lit={state} label="Стартові вогні" />
          <p className={[classes["lights__word"], classes["black-italic"]].join(" ")} data-at={state} aria-hidden="true">{word}</p>
        </div>
        <h1 className={classes["hero-d__title"]}>Рейв<br />у підземному<br />паркінгу</h1>
        <p className={[classes["lead-d"], classes["hero-d__lead"]].join(" ")}>Танцпол без лімітів швидкості. Вмикай двигун - той, що в тебе в грудях!</p>
        <TicketCta href={LINKS.tickets} size="lg" arrow>Купити квиток</TicketCta>
      </div>
    </section>;
}
