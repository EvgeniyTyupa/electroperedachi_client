import { useEffect, useRef, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Head from 'next/head'
import { passportApi as api } from '../../api/passport'
import { baseURL } from '../../api/api'
import { copy } from './copy'
import s from '../../styles/Passport.module.css'

const SHOW_PASSPORT_LEVEL = false

const paths = { home: 'M3 10 12 3l9 7v11h-6v-7H9v7H3z', passport: 'M3 6h18v4a2 2 0 0 0 0 4v4H3v-4a2 2 0 0 0 0-4z', exchange: 'M13 2 4 14h7l-1 8 9-12h-7l1-8z', content: 'M4 3h16v18H4z M10 8l6 4-6 4z', profile: 'M20 21v-2a8 8 0 0 0-16 0v2 M16 7a4 4 0 1 1-8 0 4 4 0 0 1 8 0', arrow: 'M5 12h14 M13 6l6 6-6 6', back: 'M19 12H5 M11 6l-6 6 6 6', history: 'M3 12a9 9 0 1 0 3-7 M3 3v5h5 M12 7v5l3 2', share: 'M12 16V3 M7 8l5-5 5 5 M5 13v8h14v-8' }
function Icon({ name, size = 24 }) { return <svg width={size} height={size} viewBox="0 0 24 24" fill={name === 'exchange' ? 'currentColor' : 'none'} stroke={name === 'exchange' ? 'none' : 'currentColor'} strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d={paths[name] || paths.arrow} /></svg> }
function asset(url) {
    if (!url) return ''
    try { const result = new URL(url, `${baseURL.replace(/\/api\/?$/, '')}/`); return ['http:', 'https:'].includes(result.protocol) ? result.href : '' } catch (_) { return '' }
}
function Card({ children, className = '' }) { return <section className={`${s.card} ${className}`}>{children}</section> }
function Qr({ ticket, t, onSessionExpired }) {
    const [src, setSrc] = useState(''), [error, setError] = useState(false), [attempt, setAttempt] = useState(0)
    useEffect(() => {
        let active = true, url
        setSrc(''); setError(false)
        api.qr(ticket._id).then(blob => { if (active) { url = URL.createObjectURL(blob); setSrc(url) } }).catch(e => { if (active) { if (e.response?.status === 401) onSessionExpired(); setError(true) } })
        return () => { active = false; if (url) URL.revokeObjectURL(url) }
    }, [ticket._id, attempt])
    return <div className={s.qr}>{error ? <><p role="alert">{t.qrError}</p><button onClick={() => setAttempt(attempt + 1)}>{t.retry}</button></> : src ? <img src={src} alt={t.qr} width="280" height="280" /> : <p role="status">{t.loading}</p>}<p>{t.qrHint}</p></div>
}
function LineChart({ points, label }) {
    if (!points?.length) return null
    const min = Math.min(0, ...points.map(p => p.balance)), max = Math.max(1, ...points.map(p => p.balance)), span = max - min || 1
    const coords = points.map((p, i) => `${12 + i * 336 / Math.max(1, points.length - 1)},${110 - (p.balance - min) / span * 94}`).join(' ')
    return <svg className={s.lineChart} viewBox="0 0 360 130" role="img" aria-label={label}><path d="M12 110H348 M12 63H348 M12 16H348" stroke="var(--ep-line)" fill="none" /><polyline points={coords} fill="none" stroke="var(--ep-accent)" strokeWidth="3" strokeLinejoin="round" /><text x="12" y="128" fill="var(--ep-text-3)" fontSize="10">{points[0].date}</text><text x="348" y="128" textAnchor="end" fill="var(--ep-text-3)" fontSize="10">{points[points.length - 1].date}</text></svg>
}

export default function Cabinet() {
    const router = useRouter(), locale = router.locale || 'ua', t = copy[locale] || copy.ua, en = locale === 'en'
    const screen = typeof router.query.screen === 'string' ? router.query.screen : 'home'
    const href = name => name === 'home' ? '/account' : `/account/${name}`
    const [account, setAccount] = useState(null), [checking, setChecking] = useState(true), [summary, setSummary] = useState(null), [next, setNext] = useState(null)
    const [error, setError] = useState(''), [notice, setNotice] = useState(''), [busy, setBusy] = useState(false), [refreshKey, setRefreshKey] = useState(0)
    const [email, setEmail] = useState(''), [code, setCode] = useState(''), [sent, setSent] = useState(false), [resendAt, setResendAt] = useState(0), [seconds, setSeconds] = useState(0)
    const [tickets, setTickets] = useState([]), [entries, setEntries] = useState([]), [submissions, setSubmissions] = useState([]), [page, setPage] = useState(1), [total, setTotal] = useState(0), [loading, setLoading] = useState(false), [filter, setFilter] = useState('all'), [qr, setQr] = useState(null)
    const [url, setUrl] = useState(''), [note, setNote] = useState(''), [pct, setPct] = useState(30), [typeId, setTypeId] = useState(''), [quote, setQuote] = useState(null), [quoting, setQuoting] = useState(false), [quoteError, setQuoteError] = useState('')
    const [selected, setSelected] = useState([]), [form, setForm] = useState('був'), [story, setStory] = useState(null), [storyLoading, setStoryLoading] = useState(false), [storyError, setStoryError] = useState(false), [storyAttempt, setStoryAttempt] = useState(0)
    const actionBusy = useRef(false), selectionStarted = useRef(false)
    const date = value => value && Number.isFinite(+new Date(value)) ? new Date(value).toLocaleDateString(en ? 'en-GB' : 'uk-UA', { day: '2-digit', month: '2-digit', year: 'numeric' }) : '—'
    const num = value => Number(value || 0).toLocaleString(en ? 'en-GB' : 'uk-UA')
    const money = kopecks => `${num(Number(kopecks || 0) / 100)} ₴`
    const expired = () => { setAccount(null); setSummary(null); setSent(false); setCode(''); setNotice(t.expiredSession); router.push(href('login')) }
    const message = e => e.response?.status === 429 ? t.tooMany : e.response?.status === 401 ? t.expiredSession : /code/i.test(e.response?.data?.message || '') ? t.codeError : t.connection
    useEffect(() => {
        let active = true
        setChecking(true); setError('')
        api.me().then(value => { if (active) setAccount(value) }).catch(e => { if (active) { setAccount(null); if (e.response?.status !== 401) setError(t.connection) } }).finally(() => { if (active) setChecking(false) })
        return () => { active = false }
    }, [refreshKey])
    useEffect(() => {
        let active = true
        api.nextEvent().then(value => { if (active) setNext(value.event) }).catch(() => {})
        return () => { active = false }
    }, [refreshKey])
    useEffect(() => { setSummary(null); setSelected([]); selectionStarted.current = false; setStory(null) }, [account?.user.id])
    useEffect(() => {
        if (!account) return
        let active = true
        api.summary().then(value => { if (active) setSummary(value) }).catch(e => { if (active) { if (e.response?.status === 401) expired(); else setError(t.connection) } })
        return () => { active = false }
    }, [account])
    useEffect(() => { setPage(1); setTotal(0); setTickets([]); setEntries([]); setQr(null); setError(''); setNotice('') }, [screen, filter])
    useEffect(() => {
        if (!account || !['passport', 'history', 'content'].includes(screen)) return
        let active = true
        setLoading(true)
        const request = screen === 'passport' ? api.tickets(page) : screen === 'history' ? api.history(page, filter) : api.submissions()
        request.then(result => {
            if (!active) return
            const append = (old, items) => page === 1 ? items : [...new Map([...old, ...items].map(item => [item._id, item])).values()]
            if (screen === 'passport') setTickets(old => append(old, result.tickets))
            if (screen === 'history') setEntries(old => append(old, result.entries))
            if (screen === 'content') setSubmissions(result.submissions)
            setTotal(result.total || 0)
        }).catch(e => { if (active) { if (e.response?.status === 401) expired(); else setError(message(e)) } }).finally(() => { if (active) setLoading(false) })
        return () => { active = false }
    }, [account, screen, page, filter])
    useEffect(() => {
        const tick = () => setSeconds(Math.max(0, Math.ceil((resendAt - Date.now()) / 1000)))
        tick(); const id = setInterval(tick, 1000); return () => clearInterval(id)
    }, [resendAt])
    const ticketType = next?.ticketTypes?.find(type => type._id === typeId) || next?.ticketTypes?.[0]
    const requiredPoints = Math.floor(Number(ticketType?.price || 0) * pct / (account?.rules.pointValueKopecks || 100))
    useEffect(() => {
        setQuote(null); setQuoteError('')
        if (!account || screen !== 'exchange' || !next || !ticketType || !account.rules.enabled || pct > account.rules.maxRedemptionPercent || requiredPoints > account.wallet.available) { setQuoting(false); return }
        let active = true
        setQuoting(true)
        api.quote({ eventId: next._id, ticketCart: [{ _id: ticketType._id, count: 1 }], points: requiredPoints }).then(value => { if (active) setQuote(value) }).catch(e => { if (active) { if (e.response?.status === 401) expired(); else setQuoteError(message(e)) } }).finally(() => { if (active) setQuoting(false) })
        return () => { active = false }
    }, [account, screen, next, ticketType?._id, pct, requiredPoints])
    useEffect(() => { try { const stored = window.localStorage.getItem('ep-story-form'); if (stored === 'був' || stored === 'була') setForm(stored) } catch (_) {} }, [])
    useEffect(() => { if (summary && !selectionStarted.current) { setSelected(summary.attended.slice(0, 3).map(event => event._id)); selectionStarted.current = true } }, [summary])
    useEffect(() => {
        setStory(null); setStoryError(false); setStoryLoading(false)
        if (screen !== 'share' || !account || !selected.length) return
        let active = true, objectUrl
        setStoryLoading(true)
        const id = setTimeout(() => api.story(selected, form, locale).then(blob => { if (active) { objectUrl = URL.createObjectURL(blob); setStory({ url: objectUrl, blob }) } }).catch(e => { if (active) { if (e.response?.status === 401) expired(); else setStoryError(true) } }).finally(() => { if (active) setStoryLoading(false) }), 350)
        return () => { active = false; clearTimeout(id); if (objectUrl) URL.revokeObjectURL(objectUrl) }
    }, [selected.join(','), form, locale, screen, account, storyAttempt])
    async function run(fn) {
        if (actionBusy.current) return
        actionBusy.current = true; setBusy(true); setError(''); setNotice('')
        try { await fn() } catch (e) { if (e.response?.status === 401 && account) expired(); else setError(message(e)) } finally { actionBusy.current = false; setBusy(false) }
    }
    async function requestCode() { await api.requestCode(email.trim()); setSent(true); setCode(''); setResendAt(Date.now() + 60000); setNotice(t.sent) }
    const balance = account?.wallet.available || 0, rules = account?.rules, level = summary?.level
    const levelName = level ? en ? level.nameEn : level.name : ''
    const eventLink = next?.title_code ? `/events/${encodeURIComponent(next.title_code)}` : '/events'
    const dayCount = next?.date ? Math.max(0, Math.ceil((+new Date(next.date) - Date.now()) / 86400000)) : 0
    const eventImage = asset(next?.poster?.image)
    const statTiles = (guest = false) => <div className={`${s.stats} ${guest ? s.locked : ''}`} aria-hidden={guest || undefined}><div><b>{guest ? '4' : summary ? num(summary.years) : '—'}</b><span>{t.years}</span></div><div><b>{guest ? '9' : summary ? num(summary.visits) : '—'}</b><span>{t.visits}</span></div>{SHOW_PASSPORT_LEVEL && <div><b className={s.accent}>{guest ? '4 / 5' : level ? `${level.number} / 5` : '—'}</b><span>{t.level}</span></div>}</div>
    const energyHero = (guest = false) => <section className={s.hero}><div className={s.heroTop}><span>{t.available}</span><small>{t.reserved}: {guest ? '—' : num(account.wallet.reserved)}</small></div><div className={`${s.balance} ${guest ? s.locked : ''}`} aria-hidden={guest || undefined}><span className={s.bolt}><Icon name="exchange" size={30} /></span>{guest ? '1 240' : num(balance)}<small>E</small></div><p>{guest ? t.guestBody : `${money(balance * rules.pointValueKopecks)} · ${rules.maxRedemptionPercent}% ${t.discount}`}</p><div className={s.twoButtons}><Link className={s.light} href={href(guest ? 'login' : 'exchange')}>{t.exchange}</Link><Link className={s.ghost} href={href(guest ? 'login' : 'content')}>{t.earn}</Link></div></section>
    const eventCard = () => <section className={s.nextSection}><div className={s.sectionTitle}><h2>{t.nextEvent}</h2>{next && <span>{dayCount} {t.days}</span>}</div>{next ? <div className={s.eventCard}>{eventImage && <img className={s.poster} src={eventImage} alt={next.title} />}<div className={s.eventBody}><div className={s.eyebrow}>{date(next.date)} · {en ? next.city_en || next.city : next.city} · {next.venue}</div><h2>{next.title}</h2>{rules?.enabled && <div className={s.perks}><span><b>−{rules.maxRedemptionPercent}%</b>{t.discount}</span><span><b>+{rules.purchasePercent}%</b>{t.cashback}</span></div>}<Link className={s.primary} href={eventLink}>{t.buy}</Link></div></div> : <Card><p>{t.noNext}</p></Card>}</section>
    const stamps = (selectable = false) => <div className={s.stamps}>{summary?.attended.map(event => { const image = asset(event.coverPhoto || event.poster?.image), index = selected.indexOf(event._id), chosen = index >= 0; const child = <>{image && <img src={image} alt="" loading="lazy" />}<div><b>{event.title}</b><small>{new Date(event.date).getFullYear()}</small></div>{selectable && chosen && <span className={s.selectionNumber}>{index + 1}</span>}</>; return selectable ? <button type="button" className={`${s.stamp} ${chosen ? s.chosen : ''}`} key={event._id} aria-pressed={chosen} disabled={!chosen && selected.length >= 3} onClick={() => setSelected(chosen ? selected.filter(id => id !== event._id) : [...selected, event._id])}>{child}</button> : <div className={s.stamp} key={event._id}>{child}</div> })}</div>
    const canApply = !!quote && !quoting && !quoteError && rules?.enabled && pct <= rules.maxRedemptionPercent && requiredPoints > 0 && requiredPoints <= balance
    const isPast = ticket => (ticket.eventId?.dates || []).length && (ticket.eventId.dates || []).every(d => +new Date(d.date) + 86400000 < Date.now())
    const activeTickets = tickets.filter(ticket => !ticket.isChecked && !isPast(ticket))
    const otherTickets = tickets.filter(ticket => ticket.isChecked || isPast(ticket))

    return <div className={s.shell}><Head><title>{`${t[screen] || t.passport} | electroperedachi`}</title><meta name="robots" content="noindex,nofollow" /></Head><div className={s.main}>
        {account && screen !== 'login' && (
            <nav className={s.sections} aria-label={en ? 'Account sections' : 'Розділи кабінету'}>
                {['home', 'passport', 'exchange', 'content', 'profile'].map(name => (
                    <Link key={name} href={href(name)} aria-current={screen === name ? 'page' : undefined}>
                        <Icon name={name} size={17} />
                        <span>{t[name]}</span>
                    </Link>
                ))}
            </nav>
        )}
        {error && <div className={s.notice} role="alert">{error}<button onClick={() => setRefreshKey(value => value + 1)}>{t.retry}</button></div>}{notice && <div className={s.notice} role="status">{notice}</div>}
        {checking ? <div className={s.skeleton} role="status">{t.loading}</div> : !account ? screen === 'login' ? <>
            <Link href={href('home')} className={s.back}><Icon name="back" />{t.back}</Link><div className={s.loginArt}><div className={s.eyebrow}>ENERGY PASSPORT</div><h1>{t.login}</h1><p>{t.guestBody}</p></div>
            <Card><form onSubmit={e => { e.preventDefault(); run(async () => { if (!sent) return requestCode(); await api.verifyCode(email.trim(), code); setCode(''); setSent(false); setRefreshKey(value => value + 1); await router.push(href('home')) }) }}><label htmlFor="ep-email">{t.email}</label><input id="ep-email" type="email" autoComplete="email" required value={email} onChange={e => setEmail(e.target.value)} disabled={sent || busy} />{sent && <><label htmlFor="ep-code">{t.code}</label><input className={s.codeInput} id="ep-code" autoComplete="one-time-code" inputMode="numeric" pattern="[0-9]{6}" maxLength={6} required value={code} onChange={e => setCode(e.target.value.replace(/\D/g, ''))} autoFocus /></>}<button className={s.primary} disabled={busy}>{busy ? t.loading : sent ? t.verify : t.request}</button></form>{sent && <div className={s.loginExtras}><button disabled={busy || seconds > 0} onClick={() => run(requestCode)}>{seconds ? `${t.waitCode} ${seconds} с` : t.resend}</button><button disabled={busy} onClick={() => { setSent(false); setCode(''); setNotice('') }}>{t.change}</button><small>{t.cooldownHint}</small></div>}<p className={s.caption}>{t.recover} <Link href="/contacts">{t.contact}</Link></p></Card>
        </> : <>
            <div className={s.eyebrow}>ENERGY PASSPORT</div><h1>{t.guestTitle}</h1><p className={s.intro}>{t.guestBody}</p>{energyHero(true)}{statTiles(true)}<Card><h2>{t.exchangeRules}</h2><div className={s.featureRow}><Icon name="exchange" /><div><b>{t.ticketDiscount}</b><p>{t.earnedByPurchase}</p></div></div><div className={s.featureRow}><Icon name="passport" /><div><b>{t.stamps}</b><p>{t.firstVisit}</p></div></div><div className={s.featureRow}><Icon name="content" /><div><b>{t.contentTitle}</b><p>{t.contentBody}</p></div></div></Card>{eventCard()}<div className={s.guestCta}><Link className={s.primary} href={href('login')}>{t.login}<Icon name="arrow" /></Link></div>
        </> : <>
        {screen === 'home' && <>
            <h1>{t.welcome}</h1><div className={s.badges}>{SHOW_PASSPORT_LEVEL && <span className={s.levelBadge}>{level ? `${t.level} ${level.number} ${t.of} 5 · ${levelName}` : 'ENERGY PASSPORT'}</span>}<span>{summary?.sinceYear ? `${t.since} ${summary.sinceYear}` : t.newRaver}</span></div>{energyHero()}{!rules.enabled && <p className={s.notice}>{t.rulesOff}</p>}{statTiles()}
            <Link className={s.shareBanner} href={href('share')}><span className={s.shareArt}><Icon name="share" size={30} /></span><span><b>{t.share}</b><small>{t.shareHint}</small></span><Icon name="arrow" /></Link>
            {SHOW_PASSPORT_LEVEL && (
                <Card>{level ? <div className={s.levelCard}><div className={s.ring} style={{ '--progress': `${Math.min(100, summary.visits / (level.next || 11) * 100)}%` }}><span>{summary.visits}<small>/{level.next || '11+'}</small></span></div><div><div className={s.eyebrow}>{t.level} {level.number} {t.of} 5</div><h2>{level.next ? t.nextLevel : t.finalLevel}</h2><p>{summary.visits === 0 ? t.levelZero : level.next ? `${t.moreVisits}: ${level.next - summary.visits}` : levelName}</p></div></div> : <p role="status">{t.loading}</p>}</Card>
            )}
            <Card><div className={s.sectionTitle}><h2>{t.eventEnergy}</h2><Link href={href('history')}>{t.allHistory} →</Link></div>{summary?.energyByEvent.length ? <div className={s.bars} role="img" aria-label={summary.energyByEvent.map(event => `${event.title}: ${event.energy} E`).join(', ')}>{summary.energyByEvent.map(event => <div key={event.id}><small>{num(event.energy)}</small><span style={{ height: `${Math.max(3, event.energy / Math.max(1, ...summary.energyByEvent.map(e => e.energy)) * 120)}px` }} /><p>{event.title}</p></div>)}</div> : <p>{summary ? t.firstVisit : t.loading}</p>}</Card>{eventCard()}<p className={s.caption}>{t.earnedByPurchase}</p>
        </>}
        {screen === 'passport' && <>
            <h1>{t.passport}</h1><p className={s.intro}>{summary ? `${summary.visits} · ${t.stamps.toLowerCase()}` : t.loading}</p>
            {!loading && !activeTickets.length && <Card><div className={s.eyebrow}>NEXT CHAPTER</div><h2>{t.noTicket}</h2><p>{t.noTicketBody}</p><Link className={s.primary} href={eventLink}>{t.buy}</Link></Card>}
            <h2>{t.activeTickets}</h2>{activeTickets.map((ticket, index) => <Card key={ticket._id} className={s.ticketCard}><div className={s.ticketHeading}><Icon name="passport" /><div><div className={s.ticketNumber}>{en ? `Ticket ${index + 1}` : `Квиток ${index + 1}`}</div><h2>{ticket.eventId?.title || 'electroperedachi'}</h2><p>{ticket.ticketTypeId?.name} · {date(ticket.eventId?.dates?.[0]?.date)}<br />{ticket.eventId?.city} · {ticket.eventId?.venue}</p></div></div>{qr === ticket._id ? <><Qr ticket={ticket} t={t} onSessionExpired={expired} /><button onClick={() => setQr(null)}>{t.hide}</button></> : <button className={s.primary} onClick={() => setQr(ticket._id)}>{t.qr}</button>}</Card>)}
            <div className={s.sectionTitle}><h2>{t.stamps}</h2>{SHOW_PASSPORT_LEVEL && level && <small>{t.level} {level.number} / 5</small>}</div>{summary?.attended.length ? stamps() : <Card><p>{summary ? t.noStamps : t.loading}</p></Card>}
            <h2>{t.usedTickets}</h2><Card>{otherTickets.map(ticket => <div className={s.row} key={ticket._id}><div><b>{ticket.eventId?.title || 'electroperedachi'}</b><p>{ticket.ticketTypeId?.name} · {date(ticket.eventId?.dates?.[0]?.date)}</p></div><span className={s.caption}>{ticket.isChecked ? t.used : t.past}</span></div>)}{!otherTickets.length && <p>{loading ? t.loading : t.empty}</p>}</Card>{tickets.length < total && <button className={s.wide} disabled={loading} onClick={() => setPage(page + 1)}>{t.more}</button>}
        </>}
        {screen === 'exchange' && <>
            <div className={s.eyebrow}>BURN ENERGY</div><div className={s.titleRow}><h1>{t.exchange}</h1><span className={s.energyPill}><Icon name="exchange" />{num(balance)} E</span></div><Card>{eventImage && <img className={s.exchangePoster} src={eventImage} alt="" />}<h2>{t.ticketDiscount}</h2><p>{next?.title || t.noNext}</p>{ticketType ? <><label htmlFor="ep-ticket-type">{t.ticketType}</label><select id="ep-ticket-type" value={ticketType._id} onChange={e => setTypeId(e.target.value)}>{next.ticketTypes.map(type => <option key={type._id} value={type._id}>{type.name} · {num(type.price)} ₴</option>)}</select><p>{t.chooseEnergy}</p><div className={s.segments}>{[10, 20, 30].map(value => <button key={value} aria-pressed={pct === value} disabled={!rules.enabled || value > rules.maxRedemptionPercent || Math.floor(Number(ticketType.price) * value / rules.pointValueKopecks) > balance} onClick={() => setPct(value)}>−{value}%</button>)}</div><div className={s.calculation}><div><span>{t.ticketPrice}</span><b>{money(Number(ticketType.price) * 100)}</b></div><div><span>{t.burn}</span><b className={s.accent}>{quote ? `−${num(requiredPoints)} E` : '—'}</b></div><div><strong>{t.pay}</strong><b>{quote ? money(quote.payableKopecks) : '—'}</b></div><div><span>{t.return}</span><b className={s.volt}>{quote ? `+${num(quote.earnedPoints)} E` : '—'}</b></div></div>{quoting && <p role="status">{t.loading}</p>}{quoteError && <p role="alert">{quoteError}</p>}{!rules.enabled ? <p>{t.rulesOff}</p> : !canApply && !quoting && <p>{t.insufficient}</p>}{canApply ? <Link className={s.primary} href={`${eventLink}?energyPercent=${pct}`}>{t.applyBuy}<Icon name="arrow" /></Link> : <button className={s.primary} disabled>{t.applyBuy}</button>}</> : <p>{t.noSale}</p>}</Card><Card><div className={s.eyebrow}>{t.soon}</div><h2>{t.merchTitle}</h2><p>{t.merchBody}</p></Card><Card><h2>{t.exchangeRules}</h2><p>01 · {rules.maxRedemptionPercent}% {t.discount}</p><p>02 · 1 E = {money(rules.pointValueKopecks)}</p><p>03 · {t.freeRule}</p><p>{t.earnedByPurchase}</p></Card>
        </>}
        {screen === 'content' && <>
            <div className={s.eyebrow}>CREATE ENERGY</div><h1>{t.contentTitle}</h1><p className={s.intro}>{t.contentBody}</p><Card><ol className={s.steps}>{t.steps.map(step => <li key={step}>{step}</li>)}</ol></Card><Card><form onSubmit={e => { e.preventDefault(); let valid = false; try { const u = new URL(url); valid = u.protocol === 'https:' && ['instagram.com', 'www.instagram.com'].includes(u.hostname) && !u.port && !u.username && !u.password && /^\/(p|reel)\/[A-Za-z0-9_-]+\/?$/.test(u.pathname) } catch (_) {} if (!valid) { setError(t.invalidUrl); return } run(async () => { await api.submit(url, note); setSubmissions((await api.submissions()).submissions); setUrl(''); setNote(''); setNotice(t.submitted) }) }}><label htmlFor="ep-url">{t.url}</label><input id="ep-url" type="url" required placeholder="https://www.instagram.com/reel/…" value={url} onChange={e => setUrl(e.target.value)} /><label htmlFor="ep-note">{t.note}</label><textarea id="ep-note" maxLength={500} value={note} onChange={e => setNote(e.target.value)} /><button className={s.primary} disabled={busy}>{busy ? t.loading : t.submit}</button></form></Card><h2>{t.myContent}</h2><Card>{!submissions.length && <p>{loading ? t.loading : t.empty}</p>}{submissions.map(item => <div className={s.row} key={item._id}><div><a href={item.url} target="_blank" rel="noopener noreferrer">Instagram ↗</a><p>{date(item.createdAt)} · {t[item.status]}</p>{item.reason && <p>{item.reason}</p>}</div>{item.status === 'approved' && <b className={s.volt}>+{num(item.points)} E</b>}</div>)}</Card>
        </>}
        {screen === 'history' && <>
            <Link href={href('home')} className={s.back}><Icon name="back" />{t.home}</Link><h1>{t.history}</h1><Card><div className={s.eyebrow}>{t.balanceHistory}</div><LineChart points={summary?.balanceLine} label={t.balanceHistory} />{!summary?.balanceLine.length && <p>{summary ? t.empty : t.loading}</p>}</Card><div className={s.segments}>{[['all', t.all], ['earn', t.earned], ['burn', t.spent]].map(([value, label]) => <button key={value} aria-pressed={filter === value} onClick={() => setFilter(value)}>{label}</button>)}</div><Card>{entries.map(entry => <div className={s.row} key={entry._id}><div><b>{entry.kind === 'content' ? t.contentReward : t[entry.kind] || entry.kind}</b><p>{date(entry.sourceDate || entry.createdAt)}</p>{entry.kind === 'adjustment' && entry.reason && <p>{entry.reason}</p>}</div><strong className={entry.points > 0 ? s.volt : ''}>{entry.points > 0 ? '+' : ''}{num(entry.points)} E</strong></div>)}{!entries.length && <p>{loading ? t.loading : t.empty}</p>}</Card>{entries.length < total && <button className={s.wide} disabled={loading} onClick={() => setPage(page + 1)}>{t.more}</button>}
        </>}
        {screen === 'profile' && <>
            <h1>{t.profile}</h1><Card><div className={s.profileIcon}><Icon name="profile" size={36} /></div><h2 className={s.email}>{account.user.email}</h2><p>{account.user.phone}</p>{SHOW_PASSPORT_LEVEL && level && <span className={s.energyPill}>{t.level} {level.number} {t.of} 5 · {levelName}</span>}<div className={s.profileBalance}>{num(balance)} <small>E</small></div></Card><Card><Link className={s.menuRow} href={href('history')}><Icon name="history" />{t.history}<Icon name="arrow" /></Link><Link className={s.menuRow} href={href('share')}><Icon name="share" />{t.share}<Icon name="arrow" /></Link></Card><Card><h2>{t.settings}</h2><label className={s.checkbox}><input type="checkbox" checked={!!account.user.marketingConsent} disabled={busy} onChange={e => { const value = e.target.checked; run(async () => { await api.preferences(value); setAccount(old => ({ ...old, user: { ...old.user, marketingConsent: value } })); setNotice(t.saved) }) }} /><span>{t.subscribe}</span></label></Card><button className={s.wide} disabled={busy} onClick={() => run(async () => { await api.logout(); setAccount(null); setSummary(null); setTickets([]); setEntries([]); setSubmissions([]); setSent(false); setCode(''); setSelected([]); selectionStarted.current = false; await router.push(href('home')) })}>{t.logout}</button>
        </>}
        {screen === 'share' && <>
            <Link href={href('home')} className={s.back}><Icon name="back" />{t.back}</Link><h1>{t.share}</h1><p className={s.intro}>{t.shareBody}</p><h2>{t.selectEvents}</h2>{summary?.attended.length ? <>{stamps(true)}<p className={s.caption}>{t.selected}: {selected.length} / 3</p><div className={s.segments}>{[['був', t.wasMale], ['була', t.wasFemale]].map(([value, label]) => <button key={value} aria-pressed={form === value} onClick={() => { setForm(value); try { window.localStorage.setItem('ep-story-form', value) } catch (_) {} }}>{label}</button>)}</div><Card>{storyLoading ? <p role="status">{t.loading}</p> : story ? <img className={s.storyPreview} src={story.url} alt={t.preview} width="270" height="480" /> : <p>{storyError ? t.connection : t.selectEvents}</p>}{storyError && <button onClick={() => setStoryAttempt(storyAttempt + 1)}>{t.retry}</button>}</Card><button className={s.primary} disabled={!story || busy || storyLoading} onClick={() => run(async () => { const file = new File([story.blob], 'electroperedachi-passport.png', { type: 'image/png' }); if (navigator.canShare?.({ files: [file] })) { try { await navigator.share({ files: [file] }) } catch (e) { if (e.name !== 'AbortError') throw e } } else { const link = document.createElement('a'); link.href = story.url; link.download = file.name; link.click(); setNotice(t.storyReady) } })}>{t.shareStory}<Icon name="share" /></button>{story && <a className={s.wide} href={story.url} download="electroperedachi-passport.png">{t.download}</a>}</> : <Card><p>{summary ? t.noStamps : t.loading}</p></Card>}
        </>}
        {!['home', 'passport', 'exchange', 'content', 'history', 'profile', 'share', 'login'].includes(screen) && <><h1>{t.unavailablePage}</h1><Link href={href('home')}>{t.home}</Link></>}
        {screen === 'login' && <><h1>{t.welcome}</h1><Link className={s.primary} href={href('home')}>{t.home}</Link></>}
        </>}
    </div></div>
}
