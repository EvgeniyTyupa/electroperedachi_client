import { CurrentPrice } from '../../NeedForSpeedContext'
import classes from "../../NeedForSpeed.module.css";
import { cx } from "../../needForSpeedClasses";
const bg = "/images/need_for_speed/final-bg-desktop.webp";
import { TicketCta } from '../../components/TicketCta';
import { LINKS } from '../../content';
/** 9 · Фінальний CTA — Figma 1075:684. */
export function FinalDesktop() {
  return <section className={classes["final-d"]} data-theme="night">
      <img className={classes["final-d__bg"]} src={bg} alt="" loading="lazy" />
      <div className={classes["final-d__scrim"]} />
      <div className={[classes["wrap-d"], classes["final-d__inner"]].join(" ")}>
        <h2 className={[classes["h2"], classes["final-d__title"]].join(" ")}>Танцпол без лімітів швидкості</h2>
        <div className={[classes["stack"], classes["stack--16"], classes["lead-d"]].join(" ")}>
          <p>14 листопада · Київ</p>
          <p className={classes["muted"]}>Квиток — <CurrentPrice />. Далі дорожче.</p>
        </div>
        <TicketCta href={LINKS.tickets} size="lg" arrow>Купити квиток</TicketCta>
      </div>
    </section>;
}
