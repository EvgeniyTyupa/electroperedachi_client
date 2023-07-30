import Head from "next/head"
import { useIntl } from "react-intl"
import Cooperate from "../../components/Pages/Cooperate/Cooperate"

const CooperatePage = (props) => {
    const { id } = props

    const intl = useIntl()

    return (
        <>
            <Head>
                <title>{intl.formatMessage({ id: "cooperate.title" })}</title>
                <meta name="description" content={`${intl.formatMessage({ id: "contacts.text1" })} ${intl.formatMessage({ id: "contacts.text2" })} ${intl.formatMessage({ id: "contacts.text3" })}`}/>
                <link
                    rel="canonical"
                    href={`https://electroperedachi.com/contacts/${id}`}
                    key="canonical"
                />
            </Head>
            <Cooperate theme={id}/>
        </>
    )
}

export const getStaticPaths = ({ locales }) => {
    const form_kind = [
        "brands-mergin",
        "art-exhibition",
        "lighting",
        "promoter"
    ]

    const paths = []

    form_kind.forEach(kind => {
        for (const locale of locales) {
            paths.push({
                params: { id: kind },
                locale
            })
        }
    })

    return {
        paths: paths,
        fallback: true
    }
}

export function getStaticProps(context) {
    return {
        props: {
            id: context.params.id
        }
    }
}


export default CooperatePage