import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
/* ------------------------------------------------------------------ *
 * Бігучий рядок.
 *
 * Уся хитрість в одному: всередину кладуться ДВІ ідентичні копії вмісту,
 * трек має width: max-content, і зсув рівно на -50% — тобто на довжину
 * однієї копії. Тому шва не видно ніколи.
 *
 * Якщо покласти один набір і гнати на -100%, у кінці циклу відкриється
 * порожнеча. Це найчастіша помилка в такому компоненті.
 * ------------------------------------------------------------------ */
import React from 'react';
import { usePrefersReducedMotion } from './hooks';
export function Marquee({
  seconds = 26,
  label,
  className,
  children
}) {
  const calm = usePrefersReducedMotion();
  return <div className={cx(`marquee ${className ?? ''}`)} aria-label={label} role={label ? 'marquee' : undefined}>
      <div className={classes["marquee__track"]} style={{
      animationDuration: `${seconds}s`,
      animationPlayState: calm ? 'paused' : 'running'
    }}>
        <div className={classes["marquee__run"]}>{children}</div>
        <div className={classes["marquee__run"]} aria-hidden="true">{children}</div>
      </div>
    </div>;
}
