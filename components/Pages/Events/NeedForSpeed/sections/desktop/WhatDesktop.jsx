import { CurrentPrice } from '../../NeedForSpeedContext'
import classes from "../../NeedForSpeed.module.css";
import { cx } from "../../needForSpeedClasses";
const entrance = "/images/need_for_speed/what-entrance-desktop.webp";
const scene = "/images/need_for_speed/hero-bg-desktop.webp";
const hozho = "/images/need_for_speed/rail-hozho.webp";
import { PhotoStory } from '../../components/PhotoStory';
import { FactList } from '../../components/FactList';
import { TicketCta } from '../../components/TicketCta';
import { LINKS } from '../../content';
const FRAMES = [{
  src: entrance,
  alt: 'Вхід у паркінг: перевірка квитків і браслети'
}, {
  src: scene,
  alt: 'Танцпол у підземному паркінгу в червоному світлі'
}, {
  src: hozho,
  alt: 'Натовп на HOZHO 2025'
}];
/* Desktop list (Figma 1246:951): lineup is still TBA, no dress-code row. */
const FACTS = [{
  mark: 'Дата та час',
  value: '14 листопада, субота 16:00 до 00:30'
}, {
  mark: 'Лайнап',
  value: 'TBA'
}, {
  mark: 'Локація',
  value: 'Підземний паркінг — це укриття'
}, {
  mark: 'Expo зона',
  value: <span className={classes["facts__flag"]}>Можна заїхати своєю тачкою. Місць обмежено</span>
}, {
  mark: 'FC',
  value: 'Фейс-контроль на вході. 18+, документ при собі'
}, {
  mark: 'Квитки',
  value: 'Вхід за сканом QR Коду та списками.'
}, {
  mark: 'Про нас',
  value: <>
        Атмосферні івенти електронної музики в особливих локаціях. 10 років. Одна спільнота<br />
        <a className={classes["textlink"]} href={LINKS.about}>→ Детальніше про electroperedachi</a>
      </>
}];
/** 2 · Що це — Figma 1071:296: main column + sticky price aside. */
export function WhatDesktop() {
  return <section className={classes["section-d"]} id="what" data-theme="night">
      <div className={[classes["wrap-d"], classes["what-d"]].join(" ")}>
        <div className={[classes["stack"], classes["stack--32"], classes["what-d__main"]].join(" ")}>
          <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
            <p className={classes["kicker"]}>Що це</p>
            <h2 className={classes["h2"]}>Тачки, ритм,<br />безпечна локація</h2>
          </header>
          <div className={classes["what-d__photo"]}>
            <PhotoStory frames={FRAMES} caption="Одна сцена · танцпол без лімітів і правил" />
          </div>
          <FactList items={FACTS} />
        </div>

        <aside className={[classes["phase"], classes["what-d__aside"]].join(" ")} aria-label="Квитки продажу">
          <p className={classes["kicker"]}>Квитки</p>
          <p className={classes["readout"]}><CurrentPrice /></p>
          <p className={[classes["body-d"], classes["muted"]].join(" ")}>
            Ціна змінюється протягом продажу.<br />Актуальна вартість — у формі нижче.
          </p>
          <hr className={classes["rule"]} />
          <TicketCta href={LINKS.tickets} size="lg" arrow>Купити квиток</TicketCta>
          <p className={[classes["hud-tag"], classes["dim"]].join(" ")}>18+ · вхід за квитком</p>
        </aside>
      </div>
    </section>;
}
