import { cx } from '../../../../../utils/classnames';
import { routes } from '../../../../../utils/routes';
import ExploreButton from '../../../../UI/Buttons/ExploreButton/ExploreButton';
import Header from '../../../../UI/Text/Header/Header'
import classes from './PartnershipItem.module.css'

const PartnershipItem = (props) => {
    const { item } = props

    const texts = Object.keys(item).map(function(key, index) {
        if(key.includes("text")) {
            return item[key]
        }
    }).filter(el => el != undefined);

    const textHtml = texts.map((el, index) => {
        if (index === 1) {
            return (
                <a key={item.url} href={item.url} target="_blank" rel="noopener noreferrer">{el}</a>
            )
        } else if (texts.length > 3 && index === 3) {
            return <span key={el} className={cx(classes.text, classes.underlined)}>{el}</span>
        } else {
            return <span key={el} className={classes.text}>{index !== 0 && <>&nbsp;</>}{el}&nbsp;</span>
        }
    })

    return (
        <div className={classes.main}>
            <div className={classes.info}>
                <Header type="h3">{item.title}</Header>
                <div className={classes.textBlock}>
                    {textHtml}
                </div>
            </div>
            <ExploreButton
                href={`${routes.contacts}/${item.code}`}
                className={classes.redirectBut}
                text={item.redirectButtText}
            />
        </div>
    )
}

export default PartnershipItem