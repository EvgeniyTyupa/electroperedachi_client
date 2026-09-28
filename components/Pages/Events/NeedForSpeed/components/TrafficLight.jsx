import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const LENSES = ['stop', 'ready', 'go'];
/** Horizontal TrafficLight: three lenses, exactly one lit. */
export function TrafficLight({
  lit,
  label
}) {
  return <div className={classes["traffic"]} role="img" aria-label={label}>
      <div className={classes["traffic__housing"]}>
        {LENSES.map(s => <span key={s} className={[classes["lens"], classes["traffic__lens"]].join(" ")} data-lit={s === lit ? s : undefined} />)}
      </div>
    </div>;
}
