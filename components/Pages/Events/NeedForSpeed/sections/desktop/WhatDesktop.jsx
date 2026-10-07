import { useNfsCopy } from "../../useNfsCopy";
import { CurrentPrice } from "../../NeedForSpeedContext";
import classes from "../../NeedForSpeed.module.css";
import { cx } from "../../needForSpeedClasses";
const entrance = "/images/need_for_speed/what-entrance-desktop.webp";
const scene = "/images/need_for_speed/hero-bg-desktop.webp";
const hozho = "/images/need_for_speed/rail-hozho.webp";
import { PhotoStory } from "../../components/PhotoStory";
import { FactList } from "../../components/FactList";
import { TicketCta } from "../../components/TicketCta";
import { LINKS } from "../../content";
const getFRAMES = nfsCopy => [{
  src: entrance,
  alt: nfsCopy("Вхід у паркінг: перевірка квитків і браслети")
}, {
  src: scene,
  alt: nfsCopy("Танцпол у підземному паркінгу в червоному світлі")
}, {
  src: hozho,
  alt: nfsCopy("Натовп на HOZHO 2025")
}];
/* Desktop list (Figma 1246:951): lineup is still TBA, no dress-code row. */
const getFACTS = nfsCopy => [{
  mark: nfsCopy("Дата та час"),
  value: nfsCopy("14 листопада, субота 16:00 до 00:30")
}, {
  mark: nfsCopy("Лайнап"),
  value: "TBA"
}, {
  mark: nfsCopy("Локація"),
  value: nfsCopy("Підземний паркінг — це укриття")
}, {
  mark: nfsCopy("Expo зона"),
  value: <span className={classes["facts__flag"]}>{" " + nfsCopy("Можна заїхати своєю тачкою. Місць обмежено") + " "}</span>
}, {
  mark: "FC",
  value: nfsCopy("Фейс-контроль на вході. 18+, документ при собі")
}, {
  mark: nfsCopy("Квитки"),
  value: nfsCopy("Вхід за сканом QR Коду та списками.")
}, {
  mark: nfsCopy("Про нас"),
  value: <>{" " + nfsCopy("Атмосферні івенти електронної музики в особливих локаціях. 10 років. Одна спільнота") + " "}<br />
        <a className={classes["textlink"]} href={LINKS.about}>{" " + nfsCopy("→ Детальніше про electroperedachi") + " "}</a>
      </>
}];
/** 2 · Що це — Figma 1071:296: main column + sticky price aside. */
export function WhatDesktop() {
  const nfsCopy = useNfsCopy();
  return <section className={classes["section-d"]} id="what" data-theme="night">
      <div className={[classes["wrap-d"], classes["what-d"]].join(" ")}>
        <div className={[classes["stack"], classes["stack--32"], classes["what-d__main"]].join(" ")}>
          <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
            <p className={classes["kicker"]}>{" " + nfsCopy("Що це") + " "}</p>
            <h2 className={classes["h2"]}>{" " + nfsCopy("Тачки, ритм,") + " "}<br />{" " + nfsCopy("безпечна локація") + " "}</h2>
          </header>
          <div className={classes["what-d__photo"]}>
            <PhotoStory frames={getFRAMES(nfsCopy)} caption={nfsCopy("Одна сцена · танцпол без лімітів і правил")} />
          </div>
          <FactList items={getFACTS(nfsCopy)} />
        </div>

        <aside className={[classes["phase"], classes["what-d__aside"]].join(" ")} aria-label={nfsCopy("Квитки продажу")}>
          <p className={classes["kicker"]}>{" " + nfsCopy("Квитки") + " "}</p>
          <p className={classes["readout"]}><CurrentPrice /></p>
          <p className={[classes["body-d"], classes["muted"]].join(" ")}>{" " + nfsCopy("Ціна змінюється протягом продажу.") + " "}<br />{" " + nfsCopy("Актуальна вартість — у формі нижче.") + " "}</p>
          <hr className={classes["rule"]} />
          <TicketCta href={LINKS.tickets} size="lg" arrow>{" " + nfsCopy("Купити квиток") + " "}</TicketCta>
          <p className={[classes["hud-tag"], classes["dim"]].join(" ")}>{" " + nfsCopy("18+ · вхід за квитком") + " "}</p>
        </aside>
      </div>
    </section>;
}
