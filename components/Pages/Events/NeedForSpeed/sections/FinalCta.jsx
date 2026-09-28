import { CurrentPrice } from '../NeedForSpeedContext'
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const bg = "/images/need_for_speed/rail-techno-fashion.webp";
import { TicketCta } from '../components/TicketCta';
import { LINKS } from '../content';
/** 9 · Фінальний CTA */
export function FinalCta() {
  return <section className={classes["final"]} data-theme="night">
      <img className={classes["final__bg"]} src={bg} alt="" loading="lazy" />
      <div className={classes["final__scrim"]} />
      <div className={[classes["wrap"], classes["final__inner"]].join(" ")}>
        <h2 className={classes["h2"]}>Танцпол без<br />лімітів швидкості</h2>
        <div className={[classes["stack"], classes["stack--16"], classes["lead"]].join(" ")}>
          <p>14 листопада · Київ</p>
          <p className={classes["muted"]}>Квиток — <CurrentPrice />. Далі дорожче.</p>
        </div>
        <TicketCta href={LINKS.tickets} size="lg" block arrow>Купити квиток</TicketCta>
      </div>
    </section>;
}
