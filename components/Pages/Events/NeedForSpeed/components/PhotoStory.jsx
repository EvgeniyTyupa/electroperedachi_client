import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { useEffect, useRef, useState } from 'react';
import { usePrefersReducedMotion } from '../motion/hooks';
const FRAME_MS = 4000;
/**
 * Photo with presentation-style progress segments (MOTION.md §4, moved here in
 * the final mobile design): frames crossfade .5s, the live segment fills
 * linearly for the frame's duration. Tap advances. Reduced motion: static first
 * frame, full segment, tap still works.
 */
export function PhotoStory({
  frames,
  caption
}) {
  const calm = usePrefersReducedMotion();
  const [at, setAt] = useState(0);
  useEffect(() => {
    if (calm) return;
    const id = window.setTimeout(() => setAt(i => (i + 1) % frames.length), FRAME_MS);
    return () => window.clearTimeout(id);
  }, [at, calm, frames.length]);
  return <figure className={classes["story"]} onClick={() => setAt(i => (i + 1) % frames.length)}>
      <div className={[classes["signal__photo"], classes["story__photo"]].join(" ")}>
        {frames.map((f, i) => <img key={i} src={f.src} alt={f.alt} data-on={i === at} loading={i ? 'lazy' : 'eager'} />)}
      </div>
      <div className={classes["story__bars"]} aria-hidden="true">
        {frames.map((_, i) => <Segment key={i} state={i < at ? 'done' : i === at ? 'live' : 'todo'} ms={FRAME_MS} calm={calm} />)}
      </div>
      <figcaption className={[classes["story__cap"], classes["hud-tag"]].join(" ")}>{caption}</figcaption>
    </figure>;
}
function Segment({
  state,
  ms,
  calm
}) {
  const fill = useRef(null);
  useEffect(() => {
    const el = fill.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.width = state === 'done' ? '100%' : '0%';
    if (state !== 'live') return;
    void el.offsetWidth; /* forced reflow — otherwise the two writes merge and the bar jumps */
    if (calm) {
      el.style.width = '100%';
      return;
    }
    el.style.transition = `width ${ms}ms linear`;
    el.style.width = '100%';
  }, [state, ms, calm]);
  return <span className={[classes["signal__bar"], classes["story__bar"]].join(" ")}><i ref={fill} /></span>;
}
