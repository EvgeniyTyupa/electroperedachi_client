import dynamic from "next/dynamic";
import { useRouter } from "next/router"
import { useIntl } from "react-intl"
import Header from "../../../../UI/Text/Header/Header"
import classes from "./EventAbout.module.css"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";

const EditerMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
);

const EventAbout = (props) => {
    const { event } = props

    const { locale } = useRouter()
    const intl = useIntl()

    const description =
        locale === "ua" ? event.description : event.description_en

    const main_keys = locale === "ua" ? event.main_keys : event.main_keys_en

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main} data-aos="fade-down" data-aos-duration="2000">
            <Header type="h2">
                {intl.formatMessage({ id: "event.about" })}
            </Header>
            <div className={classes.textBlock}>
                <EditerMarkdown
                    source={description}
                    className={classes.markdown}
                    style={{
                        background: 'transparent', 
                        color: "white", 
                        fontFamily: "Helvetica",
                        whiteSpace: 'pre-wrap'
                    }}
                />
                <EditerMarkdown
                    source={main_keys}
                    className={classes.markdown}
                    style={{
                        background: 'transparent', 
                        color: "white", 
                        fontFamily: "Helvetica",
                        whiteSpace: 'pre-wrap'
                    }}
                />
            </div>
        </div>
    )
}

export default EventAbout
