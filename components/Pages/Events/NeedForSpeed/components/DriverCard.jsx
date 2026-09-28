import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
/** DriverCard (Figma 1069:330): photo, stamp, name, rule, role, set time, tags. */
export function DriverCard({
  d,
  n,
  total
}) {
  const pad = x => String(x).padStart(2, '0');
  return <article className={classes["driver"]}>
      <div className={classes["driver__media"]}>
        <img src={d.img} alt={d.name} loading={n > 1 ? 'lazy' : 'eager'} draggable={false} />
        <span className={[classes["driver__stamp"], classes["hud-tag"]].join(" ")}>{pad(n)} / {pad(total)}</span>
      </div>
      <div className={classes["driver__body"]}>
        <h3 className={classes["driver__name"]}>{d.name}</h3>
        <hr className={classes["rule"]} />
        {d.role && <p className={[classes["body-sm"], classes["muted"]].join(" ")}>{d.role}</p>}
        {d.time && <p className={classes["driver__time"]}>{d.time}</p>}
        {d.tags && <ul className={classes["driver__tags"]}>
            {d.tags.map(t => <li key={t} className={[classes["driver__tag"], classes["hud-tag"]].join(" ")}>{t}</li>)}
          </ul>}
      </div>
    </article>;
}
