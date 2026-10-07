import { useNfsCopy } from "../../useNfsCopy";
import classes from "../../NeedForSpeed.module.css";
import { cx } from "../../needForSpeedClasses";
const tenBg = "/images/need_for_speed/ten-bg-desktop.webp";
import { Rail, RAIL_DESKTOP } from "../../components/Rail";
/** 4 · 10 років — Figma 1247:591: Night on desktop, photo band behind the copy. */
export function TenDesktop() {
  const nfsCopy = useNfsCopy();
  return <section className={classes["ten-d"]} id="ten" data-theme="night">
      <div className={classes["ten-d__bg"]} aria-hidden="true">
        <img src={tenBg} alt="" loading="lazy" />
        <span className={classes["ten-d__scrim"]} />
      </div>
      <div className={[classes["wrap-d"], classes["ten-d__inner"]].join(" ")}>
        <p className={[classes["kicker"], classes["ten-d__kicker"]].join(" ")}>{" " + nfsCopy("святкуємо ювілей") + " "}</p>
        <h2 className={[classes["h2"], classes["ten-d__title"]].join(" ")}>{" " + nfsCopy("14 листопада — десятиріччя electroperedachi") + " "}</h2>
        <div className={[classes["ten-d__cols"], classes["lead-d"]].join(" ")}>
          <p className={classes["ten-d__left"]}>{" " + nfsCopy("Від першої андеграундної вечірки у Дніпрі в 2016-му") + " "}<strong className={classes["ten-d__hi"]}>{" " + nfsCopy("вже десять років ми експериментуємо") + " "}</strong>{" " + nfsCopy("заради виняткового досвіду та емоцій, від яких мурахи по шкірі!") + " "}</p>
          <div>
            <p>{" " + nfsCopy("Національний цирк України. Депо УКЗ. Корабель. Жовтневий палац. Рейв Опера. Х-Парк і ще 20+ локацій у Дніпрі, Запоріжжі, Харкові, Києві.") + " "}</p>
            <p>
              <strong className={classes["ten-d__hi"]}>{" " + nfsCopy("Наступні “передачі” — у паркінгу!") + " "}</strong>{" " + nfsCopy("Ми подумали, а") + " "}<strong>{" " + nfsCopy("може це буде Need for Speed?") + " "}</strong> - <strong className={classes["ten-d__hi"]}>{" " + nfsCopy("Так!") + " "}</strong>
            </p>
          </div>
        </div>
        <div className={classes["ten-d__show"]}>
          <Rail cards={RAIL_DESKTOP} />
        </div>
      </div>
    </section>;
}
