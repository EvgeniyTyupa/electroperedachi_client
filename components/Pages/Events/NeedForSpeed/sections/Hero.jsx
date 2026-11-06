import { useNfsCopy } from "../useNfsCopy";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const heroBg = "/images/need_for_speed/hero-bg.webp";
const heroFade = "/images/need_for_speed/hero-fade.svg";
import { useStartLights } from "../motion/hooks";
import { TrafficLight } from "../components/TrafficLight";
import { TicketCta } from "../components/TicketCta";
import { Wordmark } from "../components/Wordmark";
import { LINKS } from "../content";
export function Hero() {
  const nfsCopy = useNfsCopy();
  const {
    state,
    word
  } = useStartLights();
  return <section className={classes["hero"]} id="hero" data-theme="night">
      <div className={classes["hero__plate"]}>
        <img src={heroBg} alt="" />
      </div>
      <img className={classes["hero__fade"]} src={heroFade} width={393} height={578} alt="" aria-hidden="true" />
      <Wordmark className={classes["hero__mark"]} />

      <div className={[classes["wrap"], classes["hero__body"]].join(" ")}>
        <h1 className={[classes["hero__title"], classes["stunt-md"]].join(" ")}>{" " + nfsCopy("Рейв у підземному") + " "}<br />{" " + nfsCopy("паркінгу") + " "}</h1>

        <div className={classes["lights"]}>
          <TrafficLight lit={state} label={nfsCopy("Стартові вогні")} />
          <p className={[classes["lights__word"], classes["black-italic"]].join(" ")} data-at={state} aria-hidden="true">{word}</p>
        </div>

        <p className={[classes["lead"], classes["hero__lead"]].join(" ")}>{" " + nfsCopy("Танцпол без лімітів швидкості. Вмикай двигун - той, що в тебе в грудях!") + " "}</p>

        <TicketCta href={LINKS.tickets}>{" " + nfsCopy("Купити квиток") + " "}</TicketCta>
      </div>
    </section>;
}
