import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { Marquee } from '../motion/Marquee';
/** READY · STEADY · GO · NEED FOR SPEED — 26s cycle (MOTION.md §3). */
export function RunningLine({
  variant
}) {
  const group = k => <span key={k}>
      <span className={classes["run__ready"]}>READY</span> · <span className={classes["run__steady"]}>STEADY</span> ·{' '}
      <span className={classes["run__go"]}>GO</span> · NEED FOR SPEED ·{' '}
    </span>;
  return <div className={cx(`run run--${variant}`)} data-theme="night">
      <Marquee seconds={26} label="Ready, steady, go — Need for Speed">
        <p className={[classes["run__text"], classes["black-italic"]].join(" ")}>{[0, 1, 2].map(group)}</p>
      </Marquee>
    </div>;
}
