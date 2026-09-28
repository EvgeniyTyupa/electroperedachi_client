import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
/**
 * The "electroperedachi" wordmark from the hero: stacked copies (5 mobile, 3 desktop) in
 * mix-blend-mode: overlay, exactly as layered in Figma. The wrapper must stay
 * free of transforms/opacity so the blend reaches the photo underneath.
 */
export function Wordmark({
  className,
  copies = 5
}) {
  return <p className={cx(`wordmark ${className ?? ''}`)}>
      <span className={classes["sr-only"]}>electroperedachi</span>
      {Array.from({
      length: copies
    }, (_, i) => <span key={i} className={classes["wordmark__layer"]} aria-hidden="true">electroperedachi</span>)}
    </p>;
}
