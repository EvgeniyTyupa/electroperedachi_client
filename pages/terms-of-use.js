import Head from "next/head"
import { useIntl } from "react-intl"
import Container from "../components/UI/Container/Container"
import Header from "../components/UI/Text/Header/Header"
import classes from "../styles/Info.module.css"

const TermsOfUsePage = () => {
    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "footer.terms" })}</title>
                <meta name="keywords" content={`electroperedachi, techno, rave, ukraine, music, techno music, dj, label, terms of use`}/>
                <link
                    rel="canonical"
                    href="https://electroperedachi.com/terms-of-use"
                    key="canonical"
                />
            </Head>
            <div className={classes.main}>
                <Container className={classes.container}>
                    <Header type="h2">{intl.formatMessage({ id: "footer.terms" })}</Header>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.1" })}</Header>
                        <p><strong>{intl.formatMessage({ id: "terms.1.1.bold" })}</strong>{intl.formatMessage({ id: "terms.1.1" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.2.bold" })}</strong>{intl.formatMessage({ id: "terms.1.2" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.3.bold" })}</strong>{intl.formatMessage({ id: "terms.1.3" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.4.bold" })}</strong>{intl.formatMessage({ id: "terms.1.4" })} <a href="mailto:electroperedachi@gmail.com">electroperedachi@gmail.com</a></p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.5.bold" })}</strong>{intl.formatMessage({ id: "terms.1.5" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.6.bold" })}</strong>{intl.formatMessage({ id: "terms.1.6" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.7.bold" })}</strong>{intl.formatMessage({ id: "terms.1.7.1" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.8.bold" })}</strong>{intl.formatMessage({ id: "terms.1.8" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.1.9.bold" })}</strong>{intl.formatMessage({ id: "terms.1.9" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.2" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.2.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.2.3" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.3" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.3.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.2.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.4" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.5" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.6" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.7" })}</p>
                        <p>{intl.formatMessage({ id: "terms.3.8" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.4" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.4.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.4.2" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.5" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.5.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.1.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.1.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.1.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.4" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.6" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.2.7" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.5.3.1" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.6" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.6.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.4" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.5" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.1.6" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.2.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.6.2.3" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.7" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.7.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.7.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.7.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.7.4" })}</p>
                        <p>{intl.formatMessage({ id: "terms.7.5" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.8" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.8.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.8.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.8.3" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.9" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.9.1" })}</p>
                        <p><strong>{intl.formatMessage({ id: "terms.9.1.bold" })}</strong></p>
                        <p>{intl.formatMessage({ id: "terms.9.1.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.1.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.1.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.1.4" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.1.5" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.1.6" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.2.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.9.3" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.10" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.10.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.10.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.10.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.10.4" })}</p>
                    </div>
                    <div className={classes.section}>
                        <Header type="h5">{intl.formatMessage({ id: "terms.11" })}</Header>
                        <p>{intl.formatMessage({ id: "terms.11.1" })}</p>
                        <p>{intl.formatMessage({ id: "terms.11.2" })}</p>
                        <p>{intl.formatMessage({ id: "terms.11.3" })}</p>
                        <p>{intl.formatMessage({ id: "terms.11.4" })}</p>
                    </div>
                </Container>
            </div>
        </>
    )
}

export default TermsOfUsePage