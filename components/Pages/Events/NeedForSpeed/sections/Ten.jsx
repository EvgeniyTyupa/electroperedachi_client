import { useNfsCopy } from "../useNfsCopy";
import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { Rail } from "../components/Rail";
/** 4 · 10 років — Daylight register. */
export function Ten() {
  const nfsCopy = useNfsCopy();
  return <section className={[classes["section"], classes["ten"]].join(" ")} id="ten" data-theme="daylight">
      <div className={[classes["wrap"], classes["stack"], classes["stack--48"]].join(" ")}>
        <div className={[classes["stack"], classes["stack--32"]].join(" ")}>
          <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
            <p className={[classes["kicker"], classes["ten__kicker"]].join(" ")}>{" " + nfsCopy("святкуємо ювілей") + " "}</p>
            <h2 className={classes["h2"]}>{" " + nfsCopy("14 листопада —") + " "}<br />{" " + nfsCopy("десятиріччя") + " "}<br />electroperedachi</h2>
          </header>

          <p className={[classes["lead"], classes["muted"]].join(" ")}>{" " + nfsCopy("Від першої андеграундної вечірки у Дніпрі в 2016-му") + " "}{" "}
            <strong className={classes["accent"]}>{" " + nfsCopy("вже десять років ми експериментуємо") + " "}</strong>{" "}{" " + nfsCopy("заради виняткового досвіду та емоцій, від яких мурахи по шкірі!") + " "}</p>

          <Rail />

          <div className={classes["lead"]}>
            <p>{" " + nfsCopy("Національний цирк України. Депо УКЗ. Корабель. Жовтневий палац. Рейв Опера. Х-Парк і ще 20+ локацій у Дніпрі, Запоріжжі, Харкові, Києві.") + " "}</p>
            <p><strong className={classes["accent"]}>{" " + nfsCopy("Наступні “передачі” — у паркінгу!") + " "}</strong></p>
            <p>{" " + nfsCopy("Ми подумали, а") + " "}<strong>{" " + nfsCopy("може це буде") + " "}</strong><br /><strong>Need for Speed?</strong> - <strong className={classes["accent"]}>{" " + nfsCopy("Так!") + " "}</strong></p>
          </div>
        </div>

        <p className={classes["lead"]}>{" " + nfsCopy("Це спільний шлях, і ми пройшли вже стільки всього... І це тільки початок!") + " "}</p>

        <p className={[classes["h2"], classes["accent"]].join(" ")}>{" " + nfsCopy("14.11 ближче,") + " "}<br />{" " + nfsCopy("ніж здається!") + " "}</p>
      </div>
    </section>;
}
