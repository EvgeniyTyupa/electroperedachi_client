import { FAQ } from '../content'
import { useNeedForSpeed } from '../NeedForSpeedContext'
import NeedForSpeedFaqItem from '../NeedForSpeedFaqItem/NeedForSpeedFaqItem'
import { cx } from '../needForSpeedClasses'
export function FaqSection() {
    const { event } = useNeedForSpeed()
    const items = event.faq?.length ? event.faq : FAQ.map(([title, text]) => ({ title, text, plain: true }))
    return <section className={cx('faq-section')} id="faq" data-theme="daylight">
        <div className={cx('wrap stack stack--32')}>
            <header className={cx('stack stack--20')}><p className={cx('kicker faq-section__kicker')}>Питання</p><h2 className={cx('h2')}>FAQ</h2></header>
            <div className={cx('qa')}>{items.map((item, index) => <NeedForSpeedFaqItem key={item._id || item.title} item={item} defaultOpen={index === 0} />)}</div>
        </div>
    </section>
}
