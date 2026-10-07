import { useNfsCopy } from "../useNfsCopy";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { useRef } from "react";
import { useSnapSlider } from "../motion/hooks";
import { DriverCard } from "../components/DriverCard";
import { SliderNav } from "../components/SliderNav";
import { useNfsContent } from "../content";
/** 5 · Лайнап — native scroll-snap slider (MOTION.md §6), arrows scroll one card. */
export function Lineup() {
  const {
    LINEUP
  } = useNfsContent();
  const nfsCopy = useNfsCopy();
  const trackRef = useRef(null);
  const {
    at,
    canPrev,
    canNext,
    step
  } = useSnapSlider(trackRef, LINEUP.length);
  return <section className={[classes["section"], classes["lineup"]].join(" ")} id="lineup" data-theme="night">
      <div className={[classes["wrap"], classes["stack"], classes["stack--32"]].join(" ")}>
        <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
          <p className={classes["kicker"]}>{" " + nfsCopy("Лайнап") + " "}</p>
          <h2 className={classes["h2"]}>{" " + nfsCopy("зустрічай, хто сидить за кермом") + " "}</h2>
          <p className={[classes["body-m"], classes["muted"]].join(" ")}>{" " + nfsCopy("Це музична подорож з 14:00 до 23:30. Кожен артист проведе нас крізь ..") + " "}</p>
        </header>

        <div className={[classes["stack"], classes["stack--16"]].join(" ")}>
          <div className={classes["lineup__track"]} ref={trackRef} tabIndex={0} aria-label={nfsCopy("Артисти лайнапу")}>
            {LINEUP.map((d, i) => <DriverCard key={d.name} d={d} n={i + 1} total={LINEUP.length} />)}
          </div>
          <SliderNav label={nfsCopy("Гортати лайнап")} at={at} total={LINEUP.length} canPrev={canPrev} canNext={canNext} onPrev={() => step(-1)} onNext={() => step(1)} />
        </div>
      </div>
    </section>;
}
