import { useIntl } from "react-intl"
import ExploreButton from "../../../../../UI/Buttons/ExploreButton/ExploreButton"
import Header from "../../../../../UI/Text/Header/Header"
import classes from "./RedirectToAlbum.module.css"

const RedirectToAlbum = (props) => {
    const { albumUrl } = props

    const intl = useIntl()

    return (
        <div className={classes.main}>
            <div className={classes.info}>
                <Header type="h4">
                    {intl.formatMessage({
                        id: "event.how_it_was.fullAlbumTitle"
                    })}
                </Header>
            </div>
            <ExploreButton
                target="_blank"
                href={albumUrl}
                className={classes.redirectBut}
                text={intl.formatMessage({
                    id: "button.album"
                })}
            />
        </div>
    )
}

export default RedirectToAlbum
