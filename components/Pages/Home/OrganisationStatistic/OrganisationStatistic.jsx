import { useIntl } from 'react-intl'
import Container from '../../../UI/Container/Container'
import Header from '../../../UI/Text/Header/Header'
import classes from './OrganisationStatistic.module.css'
import CountUp from 'react-countup';
import moment from 'moment'
import { cx } from '../../../../utils/classnames';
import useWindowDimensions from '../../../../hooks/useWindowDimension';
import { nFormatter, parseNumber } from '../../../../utils/parseNumber';

const OrganisationStatistic = (props) => {
    const { listeningsCount } = props

    const intl = useIntl()

    const birthdate = moment("11/16/2016")
    const today = moment();

    const { width } = useWindowDimensions()

    const years_count = today.diff(birthdate, "years")

    return (
        <Container className={classes.main}>
            <div data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                <Header type="h2">{intl.formatMessage({ id: "statistic.title" })}</Header>
            </div>
            <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                <div className={classes.stat}>
                    <p className={classes.label}>{intl.formatMessage({ id: "statistic.years" })}</p>
                    <CountUp
                        end={years_count}
                        duration={2}
                        useEasing
                        enableScrollSpy
                        scrollSpyOnce
                        className={classes.number}
                    />
                </div>
                <div className={classes.circle}/>
                <div className={classes.stat}>
                    <p className={classes.label}>{intl.formatMessage({ id: "statistic.events" })}</p>
                    <CountUp
                        end={50}
                        duration={2}
                        useEasing
                        enableScrollSpy
                        scrollSpyOnce
                        className={classes.number}
                    />
                </div>
                <div className={classes.circle}/>
                <div className={cx(classes.stat, classes.statList)}>
                    <p className={classes.label}>
                        {intl.formatMessage({ id: "statistic.listenings" })}&nbsp;
                        <a href="https://soundcloud.com/electroperedachi" target="_blank" rel="noopener noreferrer">SoundCloud</a>
                    </p>
                    <p className={classes.number}>
                        {listeningsCount + 20000 > 100000 ? (
                            nFormatter(listeningsCount + 20000)
                        ) : (
                            parseNumber(listeningsCount + 20000)
                        )}
                    </p>
                    {/* <CountUp
                        end={}
                        duration={3}
                        useEasing
                        enableScrollSpy
                        scrollSpyOnce
                        className={classes.number}
                    /> */}
                </div>
            </div>
        </Container>
    )
}

export default OrganisationStatistic