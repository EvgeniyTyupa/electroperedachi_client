export const ttqInit = () => {
    if (typeof window !== "undefined" && window.ttq) {
        window.ttq.load("D08U1CRC77U9CBHGPIKG")
        window.ttq.page()
    }
}

export const ttqPageView = () => {
    if (typeof window !== "undefined" && window.ttq) {
        window.ttq.page()
    }
}

export const ttqAddToCart = () => {
    if (typeof window !== "undefined" && window.ttq) {
        window.ttq.track("AddToCart")
    }
}

export const ttqPurchase = ({ value, currency = "USD" }) => {
    if (typeof window !== "undefined" && window.ttq) {
        // у TikTok стандартное событие для покупки называется CompletePayment
        window.ttq.track("CompletePayment", { value, currency })
    }
}
