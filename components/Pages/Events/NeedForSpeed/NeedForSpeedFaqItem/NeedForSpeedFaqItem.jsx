import { useNfsCopy } from '../useNfsCopy'
import dynamic from "next/dynamic"
import { useRouter } from "next/router"
import classes from "./NeedForSpeedFaqItem.module.css"
import { cx } from "../needForSpeedClasses"
const Markdown = dynamic(() => import('@uiw/react-md-editor').then(module => module.default.Markdown), { ssr: false })
const NeedForSpeedFaqItem = ({ item, defaultOpen = false }) => {
    const { locale } = useRouter()
    const copy = useNfsCopy()
    const isEnglish = locale === 'en'
    const title = isEnglish ? item.title_en || copy(item.title) : item.title
    const text = isEnglish ? item.text_en || copy(item.text || "") : item.text
    return (
        <details className={cx('qa__item')} open={defaultOpen}>
            <summary className={cx('qa__q')}><span>{title}</span><span className={cx('qa__iconbox')} aria-hidden="true"><img className={cx('qa__icon')} src="/images/need_for_speed/chevron-closed.svg" width="15" height="13" alt="" /></span></summary>
            <div className={cx('qa__a body muted')}><div className={classes.answer}>{item.plain ? text : <Markdown source={text || ''} style={{ background: 'transparent', color: 'inherit', fontFamily: 'inherit' }} />}</div></div>
        </details>
    )
}
export default NeedForSpeedFaqItem
