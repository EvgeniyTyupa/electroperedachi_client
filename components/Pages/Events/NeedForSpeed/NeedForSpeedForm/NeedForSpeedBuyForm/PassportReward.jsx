import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { passportApi } from '../../../../../../api/passport'
import classes from './NeedForSpeedBuyForm.module.css'

export default function PassportReward({ payableTotal, quote }) {
  const { locale } = useRouter(), en = locale === 'en'
  const [rules, setRules] = useState(null)
  const [expanded, setExpanded] = useState(false)
  useEffect(() => {
    let active = true
    passportApi.purchaseRules().then(value => { if (active) setRules(value) }).catch(() => {})
    return () => { active = false }
  }, [])
  if (rules?.enabled === false) return null
  const canEstimate = rules?.enabled && Number.isFinite(rules.purchasePercent) && rules.pointValueKopecks > 0
  const earned = quote && !quote.pending && Number.isSafeInteger(quote.earnedPoints) ? quote.earnedPoints : canEstimate ? Math.floor(Math.round(payableTotal * 100) * rules.purchasePercent / 100 / rules.pointValueKopecks) : null
  const pending = quote?.pending
  return <div className={classes.passportReward}>
    <div className={classes.passportHeading}>
      <p role="status"><strong>{!pending && earned !== null ? `+${earned.toLocaleString(en ? 'en-GB' : 'uk-UA')} ⚡` : '⚡'}</strong>{en ? ' for your passport' : ' у твій паспорт'}</p>
      <button type="button" className={classes.passportHelp} aria-expanded={expanded} aria-controls="nfs-passport-reward-help" aria-label={en ? 'About passport energy' : 'Про енергію у паспорті'} onClick={() => setExpanded(value => !value)}>?</button>
    </div>
    {expanded && <p id="nfs-passport-reward-help" className={classes.passportExplanation}>{en ? 'Earn energy after paying for your tickets. Turn it into a discount on future electroperedachi events.' : 'Енергія за покупку квитків. Конвертуй її у знижку на наступні події electroperedachi.'}</p>}
  </div>
}
