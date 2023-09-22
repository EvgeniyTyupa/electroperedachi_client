import { useRouter } from "next/router"
import { Fragment } from "react"
import { useAppContext } from "../../../context/AppContext"
import { cx } from "../../../utils/classnames"
import { routes } from "../../../utils/routes"
import Footer from "../../Common/Footer/Footer"
import Navbar from "../../Common/Navbar/Navbar"
import Preloader from "../../Common/Preloader/Preloader"
import StatusMessage from "../../Common/StatusMesssage/StatusMessage"
import classes from "./Layout.module.css"

const Layout = (props) => {
    const { children } = props

    const { isFetchingContext } = useAppContext()

    const router = useRouter()

    return (
        <Fragment>
            <Navbar />
            {isFetchingContext && <Preloader />}
            <main
                className={cx(
                    (router.pathname === "/404" || router.pathname.includes(routes.thankyou))
                        ? classes.fitContentHeight
                        : classes.main,
                    
                )}
            >
                {children}
            </main>
            <StatusMessage />
            {router.pathname !== "/events/circus" && (
                <Footer />
            )}
        </Fragment>
    )
}

export default Layout
