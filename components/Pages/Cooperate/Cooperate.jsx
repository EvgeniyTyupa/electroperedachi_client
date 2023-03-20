import { useIntl } from "react-intl"
import CircleLinesGradient from "../../UI/Animation/CircleLines/CircleLinesGradient"
import Container from "../../UI/Container/Container"
import Header from "../../UI/Text/Header/Header"
import classes from "./Cooperate.module.css"
import CooperateForm from "./CooperateForm/CooperateForm"

const Cooperate = (props) => {
    const { theme } = props

    const intl = useIntl()

    return (
        <div className={classes.main}>
            <CircleLinesGradient/>
            <div className={classes.formBlock}>
                <Container className={classes.container}>
                    <Header type="h3">{intl.formatMessage({ id: "cooperate.title" })}</Header>
                    <CooperateForm theme={theme}/>
                </Container>
            </div>
        </div>
    )
}

export default Cooperate