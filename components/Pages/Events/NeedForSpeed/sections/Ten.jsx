import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
import { Rail } from '../components/Rail';
/** 4 · 10 років — Daylight register. */
export function Ten() {
  return <section className={[classes["section"], classes["ten"]].join(" ")} id="ten" data-theme="daylight">
      <div className={[classes["wrap"], classes["stack"], classes["stack--48"]].join(" ")}>
        <div className={[classes["stack"], classes["stack--32"]].join(" ")}>
          <header className={[classes["stack"], classes["stack--20"]].join(" ")}>
            <p className={[classes["kicker"], classes["ten__kicker"]].join(" ")}>святкуємо ювілей</p>
            <h2 className={classes["h2"]}>14 листопада —<br />десятиріччя<br />electroperedachi</h2>
          </header>

          <p className={[classes["lead"], classes["muted"]].join(" ")}>
            Від першої андеграундної вечірки у Дніпрі в 2016-му{' '}
            <strong className={classes["accent"]}>вже десять років ми експериментуємо</strong>{' '}
            заради виняткового досвіду та емоцій, від яких мурахи по шкірі!
          </p>

          <Rail />

          <div className={classes["lead"]}>
            <p>Національний цирк України.  Депо УКЗ. Корабель. Жовтневий палац.  Рейв Опера. Х-Парк і ще 20+ локацій у Дніпрі, Запоріжжі, Харкові, Києві.</p>
            <p><strong className={classes["accent"]}>Наступні “передачі” — у паркінгу!</strong></p>
            <p>Ми подумали, а <strong>може це буде</strong><br /><strong>Need for Speed?</strong> - <strong className={classes["accent"]}>Так!</strong></p>
          </div>
        </div>

        <p className={classes["lead"]}>Це спільний шлях, і ми пройшли вже стільки всього... І це тільки початок!</p>

        <p className={[classes["h2"], classes["accent"]].join(" ")}>14.11 ближче,<br />ніж здається!</p>
      </div>
    </section>;
}
