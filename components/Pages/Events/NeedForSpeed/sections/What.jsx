import { CurrentPrice } from '../NeedForSpeedContext'
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const scene = "/images/need_for_speed/what-scene.webp";
const entrance = "/images/need_for_speed/what-entrance.webp";
import { PhotoStory } from '../components/PhotoStory';
import { FactList } from '../components/FactList';
import { TicketCta } from '../components/TicketCta';
import { LINKS } from '../content';
const FRAMES = [{
  src: scene,
  alt: 'Танцпол у підземному паркінгу: натовп, дві автівки і діджей-пульт у червоному світлі'
}, {
  src: entrance,
  alt: 'Вхід у паркінг'
}, {
  src: scene,
  alt: 'Танцпол у підземному паркінгу'
}];
const FACTS = [{
  mark: 'Дата та час',
  value: '14 листопада, субота 16:00 до 00:30'
}, {
  mark: 'Лайнап',
  value: <>
        Nadai · Paul Meise · Noff · Staylen<br />
        🇮🇹<strong>Lorenzo Raganzini</strong>{' '}
        <a className={classes["textlink"]} href={LINKS.lineup}>→ Дізнайся про них</a>
      </>
}, {
  mark: 'Локація',
  value: 'Підземний паркінг — це укриття'
}, {
  mark: 'Expo зона',
  value: <span className={classes["facts__flag"]}>Можна заїхати своєю тачкою. Місць обмежено</span>
}, {
  mark: 'Дрес-код',
  value: <>Рейв або гонка. Не обовʼязковий <a className={classes["textlink"]} href={LINKS.dressCode}>→ Обрати образ</a></>
}, {
  mark: 'FC',
  value: 'Фейс-контроль на вході. 18+, документ при собі'
}, {
  mark: 'Квитки',
  value: 'Вхід за сканом QR Коду та списками.',
  tight: true
}, {
  mark: 'Про нас',
  tight: true,
  value: <>
        Атмосферні івенти електронної музики в особливих локаціях. 10 років. Одна спільнота<br />
        <a className={classes["textlink"]} href={LINKS.about}>→ Детальніше про electroperedachi</a>
      </>
}];
/** 2 · Що це */
export function What() {
  return <section className={classes["section"]} id="what" data-theme="night">
      <div className={[classes["wrap"], classes["stack"], classes["stack--32"]].join(" ")}>
        <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
          <p className={classes["kicker"]}>Що це</p>
          <h2 className={classes["h2"]}>Тачки, ритм,<br />безпечна локація</h2>
        </header>

        <PhotoStory frames={FRAMES} caption="Одна сцена · танцпол без лімітів і правил" />

        <FactList items={FACTS} />

        <aside className={classes["phase"]} aria-label="Квитки продажу">
          <p className={classes["kicker"]}>Квитки</p>
          <p className={classes["readout"]}><CurrentPrice /></p>
          <p className={[classes["body-sm"], classes["muted"]].join(" ")}>
            Ціна змінюється протягом продажу. Актуальна вартість — у формі нижче.
          </p>
          <hr className={classes["rule"]} />
          <TicketCta href={LINKS.tickets} block>Купити квиток</TicketCta>
        </aside>
      </div>
    </section>;
}
