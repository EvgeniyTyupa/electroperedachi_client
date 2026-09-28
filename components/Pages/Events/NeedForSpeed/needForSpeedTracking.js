import { trackApi } from "../../../../api/api"
import { getFbCookies } from "../../../../utils/getFbCookies"
import { FB_PIXEL, TIKTOK_PIXEL } from "../../../../utils/constants"
import { v4 as uuidv4 } from "uuid"

// Analytics must never prevent creation of an order or a payment redirect.
export async function trackAddToCart() {
    try {
        const eventId = uuidv4()
        const { fbp, fbc } = getFbCookies()
        await Promise.allSettled([
            trackApi.trackEvent('add_to_cart', { url: window.location.href, fbp, fbc, ua: navigator.userAgent, event_id: eventId }),
            import('react-facebook-pixel').then(({ default: pixel }) => {
                pixel.init(FB_PIXEL)
                pixel.track('AddToCart', {}, { eventID: eventId })
            }),
            import('tiktok-pixel').then(({ default: pixel }) => { pixel.init(TIKTOK_PIXEL); pixel.track('AddToCart') })
        ])
    } catch (error) { console.warn('AddToCart tracking failed', error) }
}

export async function trackCheckout({ eventId, total, count, email, phone, fbp, fbc }) {
    const payload = { value: total, currency: 'UAH', num_items: count }
    return Promise.allSettled([
        Promise.resolve().then(() => trackApi.trackEvent('initiate_checkout', {
            ...payload, url: window.location.href, email, phone, fbp, fbc, ua: navigator.userAgent, event_id: eventId
        })),
        import('react-facebook-pixel').then(({ default: pixel }) => {
            pixel.init(FB_PIXEL)
            pixel.track('InitiateCheckout', payload, { eventID: eventId })
        }),
        import('tiktok-pixel').then(({ default: pixel }) => { pixel.init(TIKTOK_PIXEL); pixel.track('InitiateCheckout', payload) })
    ])
}
