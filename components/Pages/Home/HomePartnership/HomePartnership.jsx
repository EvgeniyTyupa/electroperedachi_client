import Container from "../../../UI/Container/Container"
import classes from './HomePartnership.module.css'
import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react"
import Header from "../../../UI/Text/Header/Header";
import { useIntl } from "react-intl";
import usePartnershipItems from "../../../../hooks/usePartnershipItems"
import PartnershipItem from "./PartnershipItem/PartnershipItem"

import Dna from "../../../UI/Animation/Dna/Dna";
import useWindowDimensions from "../../../../hooks/useWindowDimension";

const HomePartnership = () => {
    const intl = useIntl()

    const partnershipItems = usePartnershipItems()

    const { width } = useWindowDimensions()

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.container}>
            {/* <div className={classes.whiteGradient}/> */}
            {/* <div className={classes.blueGradient}/> */}
            <Container className={classes.main}>
                <div data-aos={width > 468 ? "fade-down" : "fade-up"} data-aos-duration="2000">
                    <Header type="h2">{intl.formatMessage({ id: "partnership.title" })}</Header>
                </div>
                <div className={classes.wrapper} data-aos="fade-up" data-aos-duration="2000">
                    {partnershipItems.map(el => (
                        <PartnershipItem key={el.code} item={el}/>
                    ))}
                </div>
            </Container>
            <div className={classes.dna_img}>
                <Dna/>
            </div>
        </div>
    )
}

export default HomePartnership