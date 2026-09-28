import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const locationBg = "/images/need_for_speed/location-bg.webp";
import { useSignal } from '../motion/hooks';
import { SIGNAL_STATES } from '../content';
/**
 * 3 · Локація — the signal: lamp, label and auto-typed line advance together
 * (MOTION.md §4). 16ms/char, 2600ms hold, tap a lamp to take over.
 */
export function Location() {
  const {
    index,
    typed,
    done,
    pick,
    current
  } = useSignal(SIGNAL_STATES);
  return <section className={classes["place"]} id="place" data-theme="night">
      <img className={classes["place__bg"]} src={locationBg} alt="" loading="lazy" />
      <div className={[classes["wrap"], classes["place__inner"]].join(" ")}>
        <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
          <h2 className={classes["h2"]}>Агов.<br />Ти живеш<br />на високих обертах</h2>
          <p className={[classes["lead"], classes["muted"]].join(" ")}>
            Робота, новини, сирени, обмеження.<br />
            <strong className={classes["place__punch"]}>Час перемкнутися на наступну передачу!</strong>
          </p>
        </header>

        <div className={classes["signal"]}>
          <div className={classes["signal__head"]}>
            <p className={[classes["signal__label"], classes["black-italic"]].join(" ")} data-at={current.at} aria-live="polite">{current.label}</p>
            <div className={classes["signal__lamps"]} role="group" aria-label="Перемкнути світлофор">
              {SIGNAL_STATES.map((s, i) => <button key={s.at} type="button" className={classes["signal__lamp"]} data-on={i === index ? s.at : undefined} aria-label={s.label} aria-pressed={i === index} onClick={() => pick(i)} />)}
            </div>
          </div>
          <p className={[classes["body"], classes["muted"], classes["signal__text"]].join(" ")}>
            <span className={classes["sr-only"]}>{current.line}</span>
            <span className={classes["signal__line"]} data-done={done} aria-hidden="true">{typed}</span>
          </p>
        </div>
      </div>
    </section>;
}
