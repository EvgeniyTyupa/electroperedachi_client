import { useEffect, useMemo, useRef, useState } from "react"
import classes from "./NeedForSpeedForm.module.css"
import { cx } from "../needForSpeedClasses"
import { RpmDial } from "../components/RpmDial"
import { useNeedForSpeed } from "../NeedForSpeedContext"
import { getCartTotals } from "../needForSpeedPricing"
import NeedForSpeedBuyForm from "./NeedForSpeedBuyForm/NeedForSpeedBuyForm"
import { trackAddToCart } from "../needForSpeedTracking"

const NeedForSpeedForm = ({ event, desktop, paymentBlockRef }) => {
    const { ticketTypes, ended, sales } = useNeedForSpeed()
    const [quantities, setQuantities] = useState({})
    const [discount, setDiscount] = useState(0)
    const formRef = useRef(null)
    const tracked = useRef(false)
    const initialized = useRef(false)
    // Preserve quantity and entered contacts across the desktop breakpoint.
    useEffect(() => {
        setQuantities({})
        setDiscount(0)
        initialized.current = false
        tracked.current = false
    }, [event._id])
    useEffect(() => {
        if (!initialized.current && ticketTypes.length) {
            setQuantities({ [ticketTypes[0]._id]: 1 })
            initialized.current = true
        }
    }, [ticketTypes])
    const ticketCart = useMemo(() => ticketTypes.flatMap(type => {
        const count = quantities[type._id] || 0
        return count ? [{ _id: type._id, price: type.unitPrice, count }] : []
    }), [ticketTypes, quantities])
    const totals = getCartTotals(ticketCart, event.is_multi_buy, discount)
    const changeCount = (id, delta) => setQuantities(current => ({
        ...current, [id]: Math.max(0, Math.min(20, (current[id] || 0) + delta))
    }))
    useEffect(() => {
        if (!formRef.current || !('IntersectionObserver' in window)) return
        const observer = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting || tracked.current) return
            tracked.current = true
            trackAddToCart()
        }, { threshold: 0.15 })
        observer.observe(formRef.current)
        return () => observer.disconnect()
    }, [event._id])
    const controls = (
        <div className={cx('stack stack--16')}>
            <p className={cx('body-sm buy__promo')}>
                {event.is_multi_buy ? 'Разом дешевше: 2 квитки −10%, 3 квитки −15%, від 4 квитків −20%.' : 'Бери собі і друзям! Від 5 квитків — знижка 15%'}
            </p>
            {ticketTypes.map(type => (
                <div className={cx('qty')} key={type._id}>
                    <div><p>{type.name}</p><span className={cx('hud-tag dim')}>{type.unitPrice.toLocaleString('uk-UA')} ₴ / квиток</span></div>
                    <div className={cx('qty__ctrl')} role="group" aria-label={`Кількість: ${type.name}`}>
                        <button className={cx('qty__btn')} type="button" onClick={() => changeCount(type._id, -1)} disabled={!quantities[type._id]} aria-label={`Менше: ${type.name}`}>−</button>
                        <output className={cx('qty__val readout')} aria-live="polite">{quantities[type._id] || 0}</output>
                        <button className={cx('qty__btn')} type="button" onClick={() => changeCount(type._id, 1)} disabled={totals.count >= 20} aria-label={`Більше: ${type.name}`}>+</button>
                    </div>
                </div>
            ))}
            <p className={classes.total} aria-live="polite">До сплати: {totals.full !== totals.total && <s>{totals.full.toLocaleString('uk-UA')} ₴ </s>}<strong>{totals.total.toLocaleString('uk-UA')} ₴</strong></p>
        </div>
    )
    return (
        <section className={cx(desktop ? 'section-d' : 'section tickets')} id="tickets" data-theme="night" ref={paymentBlockRef}>
            <div className={cx(desktop ? 'wrap-d tix-d' : 'wrap stack stack--48')}>
                <div className={cx('stack stack--32')}>
                    <header className={cx('stack stack--20')}>
                        <p className={cx('kicker')}>Квитки</p>
                        <h2 className={cx('h2')}>Ціна росте<br />разом з обертами</h2>
                        <p className={cx(desktop ? 'lead-d muted' : 'body-m muted')}>Що ближче до 14 листопада — то вищі оберти. Як на тахометрі: перемикайся вчасно на передачу!</p>
                    </header>
                    <RpmDial />
                    {Number.isFinite(sales.soldPct) && <div className={classes.sold}>
                        <label htmlFor="nfs-sold">Цю ціну викуплено на {Math.min(100, Math.max(0, sales.soldPct))}%</label>
                        <progress id="nfs-sold" max="100" value={sales.soldPct} />
                    </div>}
                </div>
                <div ref={formRef} className={classes.form}>
                    {ticketTypes.length ? <NeedForSpeedBuyForm
                        key={event._id}
                        event={event}
                        desktop={desktop}
                        ticketCart={totals.ticketCart}
                        totalPrice={totals.total}
                        setDiscount={setDiscount}
                        controls={controls}
                    /> : <div id="buy" className={cx('buy')}><h3 className={cx('h3')}>{ended ? 'Подія завершилася' : 'Продаж квитків зараз недоступний'}</h3></div>}
                </div>
            </div>
        </section>
    )
}
export default NeedForSpeedForm
