import { useIntl } from "react-intl"
import Container from "../../UI/Container/Container"
import Header from "../../UI/Text/Header/Header"
import EmployeeList from "../About/EmployeeList/EmployeeList"
import ArtistBookingForm from "./Artist/ArtistBookingForm/ArtistBookingForm"
import classes from "./ArtistsPageComponent.module.css"

const ArtistsPageComponent = (props) => {
    const { employees = [] } = props

    const residents = employees.filter(el => el.role === "artist")
    const invited = employees.filter(el => el.role === "invited")

    const intl = useIntl()

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <Header type="h2">{intl.formatMessage({ id: "artists.title" })}</Header>
                <p className={classes.welcome}>{intl.formatMessage({ id: "artists.welcome" })}</p>
                <EmployeeList
                    employees={residents}
                    title={"electroperedachi residents"}
                    className={classes.residents}
                    viewType="artists"
                />
            </Container>
            <div className={classes.invited}>
                <Container>
                    <EmployeeList
                        employees={invited}
                        title={"invited artists"}
                        className={classes.residents}
                        viewType="artists"
                    />
                </Container>
            </div>
            <ArtistBookingForm/>
        </div>
    )
}

export default ArtistsPageComponent