import { useNfsCopy } from "../useNfsCopy";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const left = "/images/need_for_speed/turn-left.svg";
const leftGlow = "/images/need_for_speed/turn-left-glow.svg";
const right = "/images/need_for_speed/turn-right.svg";
const rightGlow = "/images/need_for_speed/turn-right-glow.svg";
/* TurnArrow: three xenon chevrons, the outermost one glowing (Figma 1068:358). */
function TurnArrow({
  dir
}) {
  const plain = dir === "left" ? left : right;
  const glow = dir === "left" ? leftGlow : rightGlow;
  const glowAt = dir === "left" ? 0 : 2;
  return <span className={classes["turn"]} data-dir={dir} aria-hidden="true">
      {[0, 1, 2].map(k => <span key={k} className={classes["turn__chevron"]} style={{
      ["--k"]: dir === "left" ? 2 - k : k
    }}>
          {k === glowAt ? <img className={classes["turn__glow"]} src={glow} width={81.548} height={95.6523} alt="" /> : <img src={plain} width={20} height={34} alt="" />}
        </span>)}
    </span>;
}
const pad = n => String(n).padStart(2, "0");
export function SliderNav({
  at,
  total,
  onPrev,
  onNext,
  canPrev = at > 0,
  canNext = at < total - 1,
  playing,
  label
}) {
  const nfsCopy = useNfsCopy();
  return <div className={classes["slider-nav"]} role="group" aria-label={label}>
      <button type="button" className={classes["slider-nav__btn"]} onClick={onPrev} disabled={!canPrev} aria-label={nfsCopy("Назад")}>
        <TurnArrow dir="left" />
      </button>
      <p className={[classes["slider-nav__count"], classes["hud-tag"]].join(" ")} aria-live="polite">{pad(at + 1)} / {pad(total)}</p>
      <button type="button" className={classes["slider-nav__btn"]} data-playing={playing || undefined} onClick={onNext} disabled={!canNext} aria-label={nfsCopy("Далі")}>
        <TurnArrow dir="right" />
      </button>
    </div>;
}
