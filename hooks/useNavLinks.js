import { useIntl } from "react-intl";
import { routes } from "../utils/routes";

const useNavLinks = () => {
    const intl = useIntl();

    const links = [
        { text: intl.formatMessage({ id: "navbar.main" }), href: routes.home },
        { text: intl.formatMessage({ id: "navbar.about" }), href: routes.about },
        { text: intl.formatMessage({ id: "navbar.artists" }), href: routes.artists },
        { text: intl.formatMessage({ id: "navbar.events" }), href: routes.events },
        { text: intl.formatMessage({ id: "navbar.news" }), href: routes.news },
        { text: intl.formatMessage({ id: "navbar.contacts" }), href: routes.contacts },
    ]

    return links
}

export default useNavLinks