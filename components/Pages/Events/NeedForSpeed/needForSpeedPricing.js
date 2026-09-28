// Same event.price / ticketCart contract as TechnoFashion. No demo ticket IDs.
export function getTicketTypes(event, now = Date.now()) {
    return (event?.price || []).flatMap(type => {
        const windows = (type.price || []).filter(item => {
            const start = item.start ? new Date(item.start).getTime() : -Infinity
            const end = item.end ? new Date(item.end).getTime() : Infinity
            return start <= now && now <= end && Number.isFinite(Number(item.price)) && Number(item.price) > 0
        })
        const active = windows[0]
        return active && type._id ? [{ ...type, unitPrice: Number(active.price) }] : []
    })
}

export function getCartTotals(ticketCart, isMultiBuy, promoDiscount = 0) {
    const count = ticketCart.reduce((sum, item) => sum + item.count, 0)
    const full = ticketCart.reduce((sum, item) => sum + item.price * item.count, 0)
    const groupDiscount = isMultiBuy ? (count >= 4 ? 20 : count === 3 ? 15 : count === 2 ? 10 : 0) : (count >= 5 ? 15 : 0)
    // The original form applies a promo to unit prices, then the group discount.
    const promo = Math.min(100, Math.max(0, Number(promoDiscount) || 0))
    const cart = ticketCart.map(item => ({ ...item, price: Math.round(item.price * (1 - promo / 100)) }))
    const subtotal = cart.reduce((sum, item) => sum + item.price * item.count, 0)
    return { count, full, total: Number((subtotal * (1 - groupDiscount / 100)).toFixed(2)), ticketCart: cart, groupDiscount }
}

export function hasEventEnded(event, now = Date.now()) {
    const last = event?.dates?.[event.dates.length - 1]
    if (!last?.date || !last?.end) return false
    const date = new Date(last.date)
    const [hours, minutes] = last.end.split(':').map(Number)
    date.setUTCHours(hours, minutes, 0, 0)
    return Number.isFinite(date.getTime()) && now > date.getTime()
}
