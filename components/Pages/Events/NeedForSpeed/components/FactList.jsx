import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
export function FactList({
  items
}) {
  return <dl className={classes["facts"]}>
      {items.map((f, i) => <div key={f.mark} className={cx(`facts__row${f.tight ? ' facts__row--tight' : ''}`)} data-first={i === 0 || undefined}>
          <dt className={classes["facts__mark"]}>{f.mark}</dt>
          <dd className={[classes["facts__value"], classes["body-sm"]].join(" ")}>{f.value}</dd>
        </div>)}
    </dl>;
}
