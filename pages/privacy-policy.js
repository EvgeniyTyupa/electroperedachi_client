import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../components/UI/Container/Container"
import Header from "../components/UI/Text/Header/Header"
import classes from "../styles/Info.module.css"

const PrivacyPolicyPage = () => {
    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "footer.privacy" })}</title>
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, privacy policy`}/>
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/privacy-policy"
                    key="canonical"
                />
            </Head>
            <div className={classes.main}>
                <Container className={classes.container}>
                    <Header type="h2">{intl.formatMessage({ id: "footer.privacy" })}</Header>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.1" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.1.1.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.1.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.1.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.1.4" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.1.5" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.2" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.1.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.3.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.3.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.3.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.2.3.4" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.3" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.3.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.3.2" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.4" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.4.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.4" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.5" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.6" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.7" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.8" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.9" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.10" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.11" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.12" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.13" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.4.14" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.5" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.5.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.5.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.5.3" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.6" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.6.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.4" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "privacy.6" })}</Header>
                        <p>{intl.formatMessage({ id: "privacy.6.1" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.2" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.3" })}</p>
                        <p>{intl.formatMessage({ id: "privacy.6.4" })}</p>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default PrivacyPolicyPage