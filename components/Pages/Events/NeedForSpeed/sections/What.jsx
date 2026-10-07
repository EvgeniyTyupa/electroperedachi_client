import { useNfsCopy } from "../useNfsCopy";
import { CurrentPrice } from "../NeedForSpeedContext";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const entrance1 = "/images/need_for_speed/what-entrance-desktop.webp";
const scene = "/images/need_for_speed/what-scene.webp";
const entrance = "/images/need_for_speed/what-entrance.webp";
import { PhotoStory } from "../components/PhotoStory";
import { FactList } from "../components/FactList";
import { TicketCta } from "../components/TicketCta";
import { LINKS } from "../content";
const getFRAMES = nfsCopy => [{
  src: entrance1,
  alt: nfsCopy("Танцпол у підземному паркінгу: натовп, дві автівки і діджей-пульт у червоному світлі")
}, {
  src: entrance,
  alt: nfsCopy("Вхід у паркінг")
}, {
  src: scene,
  alt: nfsCopy("Танцпол у підземному паркінгу")
}];
const getFACTS = nfsCopy => [{
  mark: nfsCopy("Дата та час"),
  value: nfsCopy("14 листопада, субота 16:00 до 00:30")
}, {
  mark: nfsCopy("Лайнап"),
  value: "TBA"
  //  <>
  //       Nadai · Paul Meise · Noff · Staylen<br />
  //       🇮🇹<strong>Lorenzo Raganzini</strong>{' '}
  //       <a className={classes["textlink"]} href={LINKS.lineup}>→ Дізнайся про них</a>
  //     </>
}, {
  mark: nfsCopy("Локація"),
  value: nfsCopy("Підземний паркінг — це укриття")
}, {
  mark: nfsCopy("Expo зона"),
  value: <span className={classes["facts__flag"]}>{" " + nfsCopy("Можна заїхати своєю тачкою. Місць обмежено") + " "}</span>
}, {
  mark: nfsCopy("Дрес-код"),
  value: <>{" " + nfsCopy("Рейв або гонка. Не обовʼязковий") + " "}<a className={classes["textlink"]} href={LINKS.dressCode}>{" " + nfsCopy("→ Обрати образ") + " "}</a></>
}, {
  mark: "FC",
  value: nfsCopy("Фейс-контроль на вході. 18+, документ при собі")
}, {
  mark: nfsCopy("Квитки"),
  value: nfsCopy("Вхід за сканом QR Коду та списками."),
  tight: true
}, {
  mark: nfsCopy("Про нас"),
  tight: true,
  value: <>{" " + nfsCopy("Атмосферні івенти електронної музики в особливих локаціях. 10 років. Одна спільнота") + " "}<br />
        <a className={classes["textlink"]} href={LINKS.about}>{" " + nfsCopy("→ Детальніше про electroperedachi") + " "}</a>
      </>
}];
/** 2 · Що це */
export function What() {
  const nfsCopy = useNfsCopy();
  return <section className={classes["section"]} id="what" data-theme="night">
      <div className={[classes["wrap"], classes["stack"], classes["stack--32"]].join(" ")}>
        <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
          <p className={classes["kicker"]}>{" " + nfsCopy("Що це") + " "}</p>
          <h2 className={classes["h2"]}>{" " + nfsCopy("Тачки, ритм,") + " "}<br />{" " + nfsCopy("безпечна локація") + " "}</h2>
        </header>

        <PhotoStory frames={getFRAMES(nfsCopy)} caption={nfsCopy("Одна сцена · танцпол без лімітів і правил")} />

        <FactList items={getFACTS(nfsCopy)} />

        <aside className={classes["phase"]} aria-label={nfsCopy("Квитки продажу")}>
          <p className={classes["kicker"]}>{" " + nfsCopy("Квитки") + " "}</p>
          <p className={classes["readout"]}><CurrentPrice /></p>
          <p className={[classes["body-sm"], classes["muted"]].join(" ")}>{" " + nfsCopy("Ціна змінюється протягом продажу. Актуальна вартість — у формі нижче.") + " "}</p>
          <hr className={classes["rule"]} />
          <TicketCta href={LINKS.tickets} block>{" " + nfsCopy("Купити квиток") + " "}</TicketCta>
        </aside>
      </div>
    </section>;
}
