import { useEffect, useRef, useState } from "react"
import { useForm } from "react-hook-form"
import { useRouter } from "next/router"
import Link from "next/link"
import moment from "moment"
import { v4 as uuidv4 } from "uuid"
import { eventApi, userApi } from "../../../../../../api/api"
import { useAppContext } from "../../../../../../context/AppContext"
import { getFbCookies } from "../../../../../../utils/getFbCookies"
import { trackCheckout } from "../../needForSpeedTracking"
import { cx } from "../../needForSpeedClasses"
import classes from "./NeedForSpeedBuyForm.module.css"

const NeedForSpeedBuyForm = ({ event, desktop, ticketCart, totalPrice, setDiscount, controls }) => {
    const { register, handleSubmit, getValues, formState: { errors } } = useForm()
    const router = useRouter()
    const { setIsFetchingContext, setServerError, setServerResponse } = useAppContext()
    const [submitting, setSubmitting] = useState(false)
    const [checkingPromo, setCheckingPromo] = useState(false)
    const [appliedPromo, setAppliedPromo] = useState(null)
    const [promoError, setPromoError] = useState('')
    const [submitError, setSubmitError] = useState('')
    const submitLock = useRef(false)
    const hasPromo = !event.is_multi_buy && (event.promocodes || []).some(promo =>
        (!promo.start || moment().isSameOrAfter(promo.start)) && (!promo.end || moment().isSameOrBefore(promo.end))
    )
    // Expired promo codes must not leave discounted prices in the cart.
    useEffect(() => {
        if (appliedPromo && !hasPromo) { setAppliedPromo(null); setDiscount(0) }
    }, [hasPromo, appliedPromo, setDiscount])
    const checkPromocode = async () => {
        const value = (getValues('promocode') || '').trim()
        if (!value || checkingPromo) return
        setCheckingPromo(true)
        setPromoError('')
        try {
            const response = await eventApi.checkPromocode(value, event._id)
            const percent = Number(response?.promocode?.discount)
            if (response === 'not valid' || !Number.isFinite(percent) || percent < 0 || percent > 100) {
                setPromoError('Промокод недійсний')
                return
            }
            setAppliedPromo(value)
            setDiscount(percent)
            setServerResponse('Promocode applied!')
        } catch (error) {
            setPromoError('Не вдалося перевірити промокод. Спробуйте ще раз.')
        } finally { setCheckingPromo(false) }
    }
    const onSubmit = async data => {
        if (submitLock.current || checkingPromo || !event._id || !ticketCart.length || totalPrice <= 0) return
        submitLock.current = true
        setSubmitting(true)
        setSubmitError('')
        setIsFetchingContext(true)
        try {
            const { fbp, fbc } = getFbCookies()
            const eventId = uuidv4()
            const phone = data.phone.replace(/\D/g, '').replace(/^380/, '0')
            const response = await userApi.add({
                phone, email: data.email.trim(), ticketCart,
                promo: typeof router.query.promo === 'string' ? router.query.promo : '',
                eventId: event._id, promocode: appliedPromo || '',
                fbp, fbc, ua: navigator.userAgent, event_id: eventId
            })
            if (!response?.url) throw new Error('Payment URL missing')
            const paymentUrl = new URL(response.url, window.location.origin)
            if (!['http:', 'https:'].includes(paymentUrl.protocol)) throw new Error('Invalid payment URL')
            const tasks = [trackCheckout({ eventId, total: totalPrice, count: ticketCart.reduce((sum, item) => sum + item.count, 0), email: data.email.trim(), phone, fbp, fbc })]
            if (event.google_table_id) tasks.push(Promise.resolve().then(() => eventApi.saveDataToGoogleSheet({
                date: moment().format('DD/MM/YYYY HH:mm'), email: data.email.trim(), phone,
                totalPrice: '', userURL: router.asPath
            }, event.google_table_id, 'sheet1')))
            // Bound optional tracking to keep a slow pixel / sheet from blocking checkout.
            let timeout
            await Promise.race([Promise.allSettled(tasks), new Promise(resolve => { timeout = window.setTimeout(resolve, 1200) })])
            window.clearTimeout(timeout)
            window.location.replace(paymentUrl.href)
        } catch (error) {
            const message = 'Не вдалося перейти до оплати. Спробуйте ще раз.'
            setSubmitError(message)
            setServerError(message)
            submitLock.current = false
            setSubmitting(false)
            setIsFetchingContext(false)
        }
    }
    return (
        <form className={cx(desktop ? 'buy buy--d' : 'buy')} id="buy" onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting}>
            <fieldset disabled={submitting} className={classes.fields}>
                <p className={cx('kicker')}>Квитки</p>
                <h3 className={cx('h3')}>Купити квиток</h3>
                <p className={cx(desktop ? 'body-d dim' : 'body-sm dim')}>
                    Після оплати квиток буде висланий на Ваш email, вказаний при заповненні форми.<br /><br />
                    <span className={cx('buy__note')}>Зверніть увагу: </span>
                    для особи, яка не досягла повнолітнього віку, квиток втрачає свою важливість. Якщо у вас є якісь питання чи проблеми з придбанням/отриманням квитка/грошей — будь ласка, зв’яжіться з нами. Ми не повертаємо кошти внаслідок зміни рішення відвідувача, лише за умови змін від організатора.
                </p>
                {controls}
                <label className={cx('field')}>
                    <span className={cx('field__label hud-label')}>Телефон</span>
                    <input className={cx('field__input')} type="tel" autoComplete="tel" placeholder="+380" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'nfs-phone-error' : undefined} {...register('phone', {
                        required: 'Вкажіть телефон',
                        validate: value => /^(?:380|0)\d{9}$/.test(value.replace(/\D/g, '')) || 'Вкажіть номер у форматі 0XXXXXXXXX або +380XXXXXXXXX'
                    })} />
                    {errors.phone && <span className={classes.error} id="nfs-phone-error">{errors.phone.message}</span>}
                </label>
                <label className={cx('field')}>
                    <span className={cx('field__label hud-label')}>Email</span>
                    <input className={cx('field__input')} type="email" autoComplete="email" placeholder="you@mail.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? 'nfs-email-error' : undefined} {...register('email', {
                        required: 'Вкажіть email', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Перевірте email' }, setValueAs: value => value.trim()
                    })} />
                    {errors.email && <span className={classes.error} id="nfs-email-error">{errors.email.message}</span>}
                </label>
                {hasPromo && (
                    <div className={cx('stack stack--16')}>
                        <div className={cx('field')}>
                            <label
                                htmlFor="nfs-promocode"
                                className={cx('field__label hud-label')}
                            >
                                Промокод
                            </label>

                            <div className={classes.promoInputWrap}>
                                <input
                                    id="nfs-promocode"
                                    className={`${cx('field__input')} ${classes.promoInput}`}
                                    readOnly={!!appliedPromo || checkingPromo}
                                    aria-invalid={!!promoError}
                                    aria-describedby={promoError ? 'nfs-promo-error' : undefined}
                                    {...register('promocode')}
                                />

                                <button
                                    type="button"
                                    className={classes.promoInputButton}
                                    disabled={checkingPromo || submitting}
                                    onClick={
                                        appliedPromo
                                            ? () => {
                                                setAppliedPromo(null)
                                                setDiscount(0)
                                                setPromoError('')
                                            }
                                            : checkPromocode
                                    }
                                >
                                    {checkingPromo
                                        ? 'Перевіряємо…'
                                        : appliedPromo
                                            ? 'Скасувати'
                                            : 'Застосувати'}
                                </button>
                            </div>
                        </div>

                        {appliedPromo && (
                            <p role="status">Промокод застосовано</p>
                        )}

                        {promoError && (
                            <p
                                id="nfs-promo-error"
                                className={classes.error}
                                role="alert"
                            >
                                {promoError}
                            </p>
                        )}
                    </div>
                )}
                <p className={cx('body-sm muted')}>Хочеш заїхати своєю тачкою в експо-зону? Місць обмежено — контакт разом із квитком.</p>
                <label className={classes.consent}>
                    <input type="checkbox" {...register('terms', { required: true })} />
                    <span>Погоджуюсь з <Link href="/terms-of-use" target="_blank">умовами користування</Link> та <Link href="/privacy-policy" target="_blank">політикою конфіденційності</Link>.</span>
                </label>
                {errors.terms && <p role="alert" className={classes.error}>Підтвердіть згоду з умовами.</p>}
                <label className={classes.consent}>
                    <input type="checkbox" {...register('rules', { required: true })} />
                    <span>Погоджуюсь з <a href="/Terms_and_rules_at_electroperedachi_events.pdf" target="_blank" rel="noreferrer">правилами заходів electroperedachi</a>.</span>
                </label>
                {errors.rules && <p role="alert" className={classes.error}>Підтвердіть згоду з правилами.</p>}
                {submitError && <p role="alert" className={classes.error}>{submitError}</p>}
                <hr className={cx('rule')} />
                <p className={cx('lead muted')}>Вмикай двигун — той, що в тебе в грудях!</p>
                <button className={cx('cta cta--lg cta--block pay')} type="submit" disabled={submitting || checkingPromo || !ticketCart.length || totalPrice <= 0}>
                    <span className={cx('cta__label')}>{submitting ? 'Переходимо до оплати…' : 'BUY TICKETS →'}</span>
                    <span>{totalPrice.toLocaleString('uk-UA')} ₴</span>
                </button>
            </fieldset>
        </form>
    )
}
export default NeedForSpeedBuyForm
