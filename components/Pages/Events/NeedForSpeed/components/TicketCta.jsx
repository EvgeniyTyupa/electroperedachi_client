import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const arrow = "/images/need_for_speed/arrow.svg";
/** The one transactional control. Glow is static on purpose. */
export function TicketCta({
  href,
  size = 'md',
  block,
  arrow: withArrow,
  type = 'button',
  className,
  children
}) {
  const cls = ['cta', `cta--${size}`, block && 'cta--block', className].filter(Boolean).join(' ');
  const inner = <>
      <span className={classes["cta__label"]}>{children}</span>
      {withArrow && <img className={classes["cta__arrow"]} src={arrow} width={19} height={12.8284} alt="" aria-hidden="true" />}
    </>;
  return href ? <a className={cx(cls)} href={href}>{inner}</a> : <button className={cx(cls)} type={type}>{inner}</button>;
}
