import { useIntl } from "react-intl"

const usePartnershipItems = () => {
    const intl = useIntl()

    const items = [
        {
            title: intl.formatMessage({ id: "partnership.mergin.title" }),
            text: intl.formatMessage({ id: "partnership.mergin.text" }),
            redirectButtText: intl.formatMessage({ id: "button.submitOffer" }),
            code: "brands-mergin"
        },
        {
            title: intl.formatMessage({ id: "partnership.joinArt.title" }),
            text: intl.formatMessage({ id: "partnership.joinArt.text" }),
            redirectButtText: intl.formatMessage({ id: "button.submitOffer" }),
            code: "art-exhibition",
            url: "https://google.com"
        },
        {
            title: intl.formatMessage({ id: "partnership.lighting.title" }),
            text: intl.formatMessage({ id: "partnership.lighting.text" }),
            redirectButtText: intl.formatMessage({ id: "button.submitOffer" }),
            code: "lighting"
        },
        {
            title: intl.formatMessage({ id: "partnership.promouter.title" }),
            text: intl.formatMessage({ id: "partnership.promouter.text" }),
            redirectButtText: intl.formatMessage({ id: "button.submitEvent" }),
            code: "promoter"
        },
        {
            title: intl.formatMessage({ id: "partnership.dj.title" }),
            text: intl.formatMessage({ id: "partnership.dj.text" }),
            redirectButtText: intl.formatMessage({ id: "button.sendMusicProposal" }),
            code: "djs"
        },
        {
            title: intl.formatMessage({ id: "partnership.materials.title" }),
            text: intl.formatMessage({ id: "partnership.materials.text" }),
            redirectButtText: intl.formatMessage({ id: "button.getMaterials" }),
            code: "materials",
            url: "https://google.com"
        }
    ]

    return items
}

export default usePartnershipItems