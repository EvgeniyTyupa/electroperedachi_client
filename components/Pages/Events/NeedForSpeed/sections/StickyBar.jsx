import { CurrentPrice } from '../NeedForSpeedContext'
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { useEffect, useRef, useState } from 'react';
import { TicketCta } from '../components/TicketCta';
import { LINKS } from '../content';
/**
 * Sticky HUD bar (Figma 1075:902, MOTION.md §1): slides up from the bottom once
 * the hero has left the screen (.22s ease-out). It steps aside while the buy
 * form is on screen so it never covers the pay button.
 */
export function StickyBar({
  desktop = false
}) {
  const [heroGone, setHeroGone] = useState(false);
  const [atForm, setAtForm] = useState(false);
  useEffect(() => {
    /* Mobile: after the hero. Desktop (Figma 1248:633): once "10 років" is reached. */
    const trigger = document.getElementById(desktop ? 'ten' : 'hero');
    const form = document.getElementById('buy');
    if (!('IntersectionObserver' in window)) {
      setHeroGone(true);
      return;
    }
    const heroIo = desktop ? new IntersectionObserver(([e]) => setHeroGone(e.isIntersecting || e.boundingClientRect.top < 0), {
      rootMargin: '0px 0px -30% 0px'
    }) : new IntersectionObserver(([e]) => setHeroGone(!e.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px'
    });
    const formIo = new IntersectionObserver(([e]) => setAtForm(e.isIntersecting));
    if (trigger) heroIo.observe(trigger);
    if (form) formIo.observe(form);
    return () => {
      heroIo.disconnect();
      formIo.disconnect();
    };
  }, [desktop]);
  const shown = heroGone && !atForm;
  const barRef = useRef(null);
  /* Hidden bar: out of the tab order too. */
  useEffect(() => {
    barRef.current?.toggleAttribute('inert', !shown);
  }, [shown]);
  return <div className={cx(`hudbar${desktop ? ' hudbar--desk' : ''}`)} data-theme="night" data-shown={shown} ref={barRef}>
      <div className={classes["hudbar__rail"]} aria-hidden="true">
        <span data-state="sold" /><span data-state="now" /><span /><span /><span />
      </div>
      <div className={classes["hudbar__inner"]}>
        <div className={[classes["stack"], classes["hudbar__left"]].join(" ")}>
          <p className={[classes["hud-label"], classes["hudbar__phase"]].join(" ")}>Квитки на 14 листопада</p>
          <p className={[classes["hud-tag"], classes["dim"]].join(" ")}><a className={classes["hudbar__link"]} href={LINKS.tickets}>До форми покупки</a></p>
        </div>
        {desktop && <div className={[classes["stack"], classes["hudbar__mid"], classes["hud-tag"]].join(" ")}>
            <p className={classes["hudbar__deal"]}>Діє знижка для компаній</p>
            <p className={classes["dim"]}>Від 5 квитків — 15%</p>
          </div>}
        <div className={classes["hudbar__right"]}>
          {desktop ? <div className={[classes["stack"], classes["hudbar__price"]].join(" ")}>
              <p className={[classes["hud-tag"], classes["dim"]].join(" ")}>Ціна зараз</p>
              <p className={classes["readout"]}><CurrentPrice /></p>
            </div> : <p className={classes["readout"]}><CurrentPrice /></p>}
          <TicketCta href={LINKS.tickets} size={desktop ? 'lg' : 'md'} arrow>Купити квиток</TicketCta>
        </div>
      </div>
    </div>;
}
