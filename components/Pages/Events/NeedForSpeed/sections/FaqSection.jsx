import { useNfsCopy } from "../useNfsCopy";
import { useNfsContent } from "../content";
import { useNeedForSpeed } from "../NeedForSpeedContext";
import NeedForSpeedFaqItem from "../NeedForSpeedFaqItem/NeedForSpeedFaqItem";
import { cx } from "../needForSpeedClasses";
export function FaqSection() {
  const {
    FAQ
  } = useNfsContent();
  const nfsCopy = useNfsCopy();
  const {
    event
  } = useNeedForSpeed();
  const existingItems = event.faq?.length ? event.faq : FAQ.map(([title, text]) => ({
    title,
    text,
    plain: true
  }));
  const transferItems = [
    {
      title: 'Що робити, якщо нова дата мені не підходить?',
      text: 'Якщо ти не можеш відвідати подію 12 грудня, твій квиток буде дійсний для відвідування будь-якої іншої події electroperedachi.',
      title_en: 'What if I cannot attend on the new date?',
      text_en: 'If you cannot attend on 12 December, your ticket will be valid for any other electroperedachi event.',
      plain: true
    }
  ];
  const items = [...transferItems, ...existingItems.filter(item =>
    item.title !== 'Чи дійсні раніше придбані квитки?' &&
    item.title_en !== 'Are previously purchased tickets still valid?' &&
    !transferItems.some(transfer => transfer.title === item.title)
  )];
  return <section className={cx("faq-section")} id="faq" data-theme="daylight">
        <div className={cx("wrap stack stack--32")}>
            <header className={cx("stack stack--20")}><p className={cx("kicker faq-section__kicker")}>{" " + nfsCopy("Питання") + " "}</p><h2 className={cx("h2")}>FAQ</h2></header>
            <div className={cx("qa")}>{items.map((item, index) => <NeedForSpeedFaqItem key={item._id || item.title} item={item} defaultOpen={index === 0} />)}</div>
        </div>
    </section>;
}
