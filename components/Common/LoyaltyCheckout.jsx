import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { passportApi } from '../../api/passport'
import styles from './LoyaltyCheckout.module.css'

export default function LoyaltyCheckout({ eventId, ticketCart, promocode = '', points, onChange, email = '', onEmailChange, onQuoteChange }) {
    const { locale } = useRouter(), en = locale === 'en'
    const [account, setAccount] = useState(null), [quote, setQuote] = useState(null), [loading, setLoading] = useState(false)
    const [checked, setChecked] = useState(false)
    const [applied, setApplied] = useState(false), [error, setError] = useState('')
    const cartKey = JSON.stringify(ticketCart)
    const differentEmail = !!account && !!email.trim() && email.trim().toLowerCase() !== account.user.email.trim().toLowerCase()
    useEffect(() => {
        let active = true
        passportApi.me().then(value => { if (active) setAccount(value) }).catch(() => { if (active) setAccount(null) }).finally(() => { if (active) setChecked(true) })
        return () => { active = false }
    }, [])
    useEffect(() => {
        let active = true
        if (!account?.rules.enabled || (!account.wallet.available && !points) || !ticketCart?.length) { setQuote(null); setLoading(false); onChange(0); onQuoteChange?.(null); return }
        if (applied && differentEmail) { setApplied(false); onChange(0); onQuoteChange?.(null); return }
        setLoading(true); setError(''); onQuoteChange?.({ pending: applied || points > 0 })
        const order = { eventId, ticketCart, promocode, points: 0 }
        const calculate = async () => {
            try {
                const baseline = await passportApi.quote(order)
                if (!active) return
                const selected = applied ? baseline.maxPoints : 0
                const result = selected ? await passportApi.quote({ ...order, points: selected }) : baseline
                if (!active) return
                setQuote(result); onChange(selected); onQuoteChange?.({ ...result, pending: false })
                if (applied && !selected) setApplied(false)
            } catch (e) {
                if (!active) return
                setQuote(null); onChange(0); onQuoteChange?.(null)
                setError(en ? 'Could not apply points. You can continue without them.' : 'Не вдалося застосувати бали. Можна продовжити без них.')
                if (applied) setApplied(false)
            } finally { if (active) setLoading(false) }
        }
        calculate()
        return () => { active = false }
    }, [account, eventId, cartKey, promocode, applied, differentEmail])
    const apply = () => { onQuoteChange?.({ pending: true }); onEmailChange?.(account.user.email.trim()); setApplied(true) }
    if (!checked || !account) return null
    if (!account.rules.enabled || (!account.wallet.available && !points) || !ticketCart?.length || (quote && !loading && !quote.maxPoints && !points)) return null
    const money = kopecks => (kopecks / 100).toLocaleString(en ? 'en-GB' : 'uk-UA', { maximumFractionDigits: 2 })
    return <>
        <label className={`${styles.row} ${applied ? styles.selected : ''}`}>
            <span className={styles.copy}>
                <span className={styles.title}>{en ? 'Use reward points' : 'Використати бонуси'}</span>
                <span className={styles.hint} role="status">{loading ? (en ? 'Calculating discount…' : 'Рахуємо знижку…') : points > 0 && quote ? `${points} ${en ? 'points applied' : 'балів застосовано'}` : `${account.wallet.available} ${en ? 'points available' : 'балів доступно'}`}</span>
                {differentEmail && <span className={styles.hint}>{account.user.email}</span>}
            </span>
            <span className={styles.controls}>
                {quote && !loading && <span className={styles.saving}>−{money(points > 0 ? quote.discountKopecks : quote.maxPoints * account.rules.pointValueKopecks)} ₴</span>}
                <span className={styles.switch}>
                    <input type="checkbox" role="switch" aria-label={en ? 'Use reward points' : 'Використати бонуси'} checked={applied} disabled={loading || (!applied && !quote?.maxPoints)} onChange={e => {
                        if (e.target.checked) apply()
                        else { onQuoteChange?.({ pending: true }); setApplied(false); onChange(0) }
                    }} />
                    <span className={styles.track} aria-hidden="true" />
                </span>
            </span>
        </label>
        {error && <p className={styles.error} role="status">{error}</p>}
    </>
}
