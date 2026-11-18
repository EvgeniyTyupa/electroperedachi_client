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

    const account = router.pathname === "/account" || router.pathname.startsWith("/account/")
    const eventLanding = router.pathname.startsWith("/events/")
    const themed = !eventLanding && !router.pathname.startsWith(routes.thankyou) && !router.pathname.startsWith("/qrReader")
    const Wrapper = themed ? "div" : Fragment

    return (
        <Wrapper {...(themed ? { className: "site-theme" } : {})}>
            <Navbar themed={themed} />
            {!account && isFetchingContext && <Preloader />}
            <main
                className={cx(
                    (account || router.pathname === "/404" || router.pathname.includes(routes.thankyou))
                        ? classes.fitContentHeight
                        : classes.main,
                    
                )}
            >
                {children}
            </main>
            {!account && <StatusMessage />}
            {(!account && router.pathname !== "/events/circus" && router.pathname !== "/events/cyberpunk") && (
                <Footer />
            )}
        </Wrapper>
    )
}

export default Layout
