import { cx } from '../../../../utils/classnames'
import EmployeeCard from '../../../Common/Employee/EmployeeCard/EmployeeCard'
import Header from '../../../UI/Text/Header/Header'
import classes from './EmployeeList.module.css'

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from 'react';

const EmployeeList = (props) => {
    const { employees, title, className, viewType = "about" } = props

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={cx(classes.main, className)} >
            {title && (
                <div data-aos="fade-down" data-aos-duration="2000">
                    <Header type="h3">{title}</Header>
                </div>
            )}
            <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                {employees.map (el => (
                    <EmployeeCard key={el._id} item={el} viewType={viewType}/> 
                ))}
            </div>
        </div>
    )
}

export default EmployeeList