import axios from "axios"
import moment from "moment"

// export const baseURL = "http://localhost:3002/api"
export const baseURL = "https://api.electroperedachi.com/api"

const tgToken = "5778874040:AAG1rLGahhRsFoQc7iondvqYbMzUZUBFTiY"
const chatId = "-880574164"
const tgUrl = "https://api.telegram.org/bot" + tgToken + "/sendMessage"

const instance = axios.create({
    baseURL: baseURL
})

export const eventApi = {
    getUpcomingEvents() {
        return instance
            .get("/events/get/upcoming")
            .then((response) => response.data)
    },
    getEvents(pageNumber, pageSize) {
        return instance
            .get(`/events?limit=${pageSize}&count=${pageNumber}`)
            .then((response) => response.data)
    },
    getEvent(code) {
        return instance.get(`/events/${code}`).then((response) => response.data)
    },
    checkPaymentHash(paymentHash) {
        return instance
            .post(`/user/checkPaymentHash`, { paymentHash })
            .then((response) => response.data)
    },
    createTicket(userId, count, promo, eventId, totalPrice, promocode) {
        return instance
            .post("/ticket", {
                userId,
                count,
                promo,
                eventId,
                totalPrice,
                promocode
            })
            .then((response) => response.data)
    },
    scanTicket(ticketId, userId, eventId, currentEventId) {
        return instance
            .post(`/ticket/scan`, { ticketId, userId, eventId, currentEventId })
            .then((response) => response.data)
            .catch(function (err) {
                const data = {
                    status: "bad",
                    message: err.response.data.message
                }
                return data
            })
    },
    checkPromocode(promocode, event_id) {
        return instance
            .get(
                `/promocode/validation?promocode=${promocode}&event_id=${event_id}`
            )
            .then((response) => response.data)
            .catch(function (err) {
                return "not valid"
            })
    },
    getRandomPhotos() {
        return instance
            .get(`/events/get/randomPhotos`)
            .then((response) => response.data)
    },
    saveDataToGoogleSheet(formData, sheetNumber) {
        const googleTableURL = `https://v1.nocodeapi.com/electroperedachi/google_sheets/OksFLSIjVQXHDvOV?tabId=sheet${sheetNumber}`

        let date = formData.date
        let phone = formData.phone
        let email = formData.email
        let totalPrice = formData.totalPrice
        let url = formData.userURL

        return axios
            .post(googleTableURL, JSON.stringify([[date, email, phone, totalPrice, url]]), {
                headers: {
                    "Content-Type": "application/json"
                }
            })
            .then((response) => response.data)
    }
}

export const newsApi = {
    getNews(pageNumber, pageSize, from) {
        return instance
            .get(
                `/news?limit=${pageSize}&count=${pageNumber}&${
                    from ? `from=${from}` : ""
                }`
            )
            .then((response) => response.data)
    },
    getPost(code) {
        return instance.get(`/news/${code}`).then((response) => response.data)
    }
}

export const partnersApi = {
    getPartners(pageNumber, pageSize) {
        return instance
            .get(`/partner?limit=${pageSize}&count=${pageNumber}`)
            .then((response) => response.data)
    }
}

export const employeeApi = {
    getEmployees(pageNumber, pageSize) {
        return instance
            .get(`/employee?limit=${pageSize}&count=${pageNumber}`)
            .then((response) => response.data)
    },
    getEmployee(name_code) {
        return instance
            .get(`/employee/${name_code}`)
            .then((response) => response.data)
    }
}

export const bookingApi = {
    sendToTelegramMessage(booking_info) {
        const {
            artist,
            event_date,
            artist_fee_currency,
            artist_fee,
            is_buyer_pays,
            requester_name,
            requester_email,
            requester_phone,
            requester_organisation,
            venue,
            venue_country,
            venue_city
        } = booking_info

        let message = `
        -----------------------------
            <strong>New Booking Request!</strong>
            <strong>Artist</strong>: ${artist}
            <strong>Event Date</strong>: ${moment(event_date).format(
                "DD/MM/YYYY"
            )}
            <strong>Offer</strong>: ${artist_fee} ${artist_fee_currency}
            <strong>Buyer pay transfer and etc.</strong>: ${
                is_buyer_pays ? "Yes" : "No"
            }\n
            <strong>Venue</strong>: ${venue}
            <strong>Venue Country</strong>: ${venue_country}
            <strong>Venue City</strong>: ${venue_city}\n
            <strong>Requester Name</strong>: ${requester_name}
            <strong>Requester Emil</strong>: ${requester_email}
            <strong>Requester Phone</strong>: ${requester_phone}
            <strong>Requester Organisation</strong>: ${requester_organisation}\n
        `
        const data = {
            chat_id: chatId,
            text: message,
            parse_mode: "HTML"
        }
        return axios.post(tgUrl, data).then((response) => response.data)
    }
}

export const userApi = {
    add(email, phoneNumber, totalPrice, count, promo, eventId, promocode) {
        return instance
            .post("/user", {
                email,
                phoneNumber,
                totalPrice,
                count,
                promo,
                eventId,
                promocode
            })
            .then((response) => response.data)
    }
}

export const contactApi = {
    sendCoopOffer(data) {
        return instance
            .post("/common/coop_offer", data)
            .then((response) => response.data)
    }
}
