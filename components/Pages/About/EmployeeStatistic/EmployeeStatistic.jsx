import { useIntl } from 'react-intl'
import Container from '../../../UI/Container/Container'
import Header from '../../../UI/Text/Header/Header'
import classes from './EmployeeStatistic.module.css'
import CountUp from 'react-countup';
import moment from 'moment'
import { cx } from '../../../../utils/classnames';
import useWindowDimensions from '../../../../hooks/useWindowDimension';
import AboutLines from '../../../UI/Animation/About/AboutLines';

const EmployeeStatistic = (props) => {
    const { employees } = props

    const intl = useIntl()

    const birthdate = moment("11/16/2016")
    const today = moment();

    const { width } = useWindowDimensions()

    const years_count = today.diff(birthdate, "years")

    return (
        <div className={classes.container}>
            <div className={classes.lines}>
                <AboutLines />
            </div>
            <Container className={classes.main}>
                <div data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                    <Header type="h2">{intl.formatMessage({ id: "about.whoWeAre" })}</Header>
                </div>
                <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                    <div className={classes.stat}>
                        <p className={classes.label}>{intl.formatMessage({ id: "statistic.members" })}</p>
                        <CountUp
                            end={employees.length}
                            duration={2}
                            useEasing
                            enableScrollSpy
                            scrollSpyOnce
                            className={classes.number}
                        />
                    </div>
                    <div className={classes.circle}/>
                    <div className={classes.stat}>
                        <p className={classes.label}>{intl.formatMessage({ id: "statistic.residents" })}</p>
                        <CountUp
                            end={employees.filter(el => el.role === "artist").length}
                            duration={2}
                            useEasing
                            enableScrollSpy
                            scrollSpyOnce
                            className={classes.number}
                        />
                    </div>
                    <div className={classes.circle}/>
                    <div className={cx(classes.stat, classes.statList)}>
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
                </div>
            </Container>
        </div>
    )
}

export default EmployeeStatistic