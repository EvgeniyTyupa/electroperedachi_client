import { useNfsCopy } from "../useNfsCopy";
import { useNeedForSpeed } from "../NeedForSpeedContext";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { useRef } from "react";
const face = "/images/need_for_speed/dial-face.svg";
import { useFitScale } from "../lib/useFitScale";
/* Positions relative to the 240×240 face box, straight from Figma (node 1094:732). */
const getMARKS = nfsCopy => [{
  price: "1 350 ₴",
  phase: nfsCopy("Перша"),
  x: -61.5,
  y: 233.4,
  align: "end",
  tone: "next"
}, {
  price: "1 500 ₴",
  phase: nfsCopy("Друга"),
  x: -61.5,
  y: 0,
  align: "end",
  tone: "next"
}, {
  price: "1 800 ₴",
  phase: nfsCopy("Третя"),
  x: 76.55,
  y: -41,
  align: "center",
  tone: "next"
}, {
  price: "2 000 ₴",
  phase: nfsCopy("Четверта"),
  x: 206,
  y: -3.1,
  align: "start",
  tone: "next"
}, {
  price: nfsCopy("На вході"),
  phase: nfsCopy("Пʼята"),
  x: 206.5,
  y: 234,
  align: "start",
  tone: "last"
}];
/** Drawing width the marks need (the full 361px column in Figma). */
const NATURAL_W = 361;
const NATURAL_H = 288;
/**
 * Price tachometer. Static by design (MOTION.md §8). On columns narrower than
 * 361px the whole drawing scales down so the side marks never clip.
 */
export function RpmDial() {
  const nfsCopy = useNfsCopy();
  const {
    price
  } = useNeedForSpeed();
  const ref = useRef(null);
  const s = useFitScale(ref, NATURAL_W);
  return <div className={classes["dial"]} ref={ref} style={{
    height: NATURAL_H * s
  }} role="img" aria-label={nfsCopy("Орієнтовний план росту цін. Актуальна ціна — у центрі тахометра та формі покупки.")}>
      <div className={classes["dial__stage"]} style={{
      transform: `scale(${s})`
    }} aria-hidden="true">
        <div className={classes["dial__face"]}>
          <img className={classes["dial__svg"]} src={face} width={300} height={300} alt="" />
          <div className={classes["dial__centre"]}>
            <p className={classes["dial__value"]}>{price === null ? "—" : price}</p>
            <p className={[classes["hud-label"], classes["dim"]].join(" ")}>{" " + nfsCopy("₴ зараз") + " "}</p>
          </div>
          {getMARKS(nfsCopy).map(m => <div key={m.phase} className={cx(`dial__mark dial__mark--${m.tone}`)} data-align={m.align} style={{
          left: m.x,
          top: m.y
        }}>
              <p className={classes["dial__price"]}>{m.price}</p>
              <p className={classes["dial__phase-name"]}>{m.phase}</p>
            </div>)}
          <p className={[classes["dial__phase"], classes["hud-label"]].join(" ")}>{" " + nfsCopy("План цін") + " "}</p>
        </div>
      </div>
    </div>;
}
