import axios from 'axios'
import { baseURL } from './api'
const http = axios.create({ baseURL, withCredentials: true })
const data = promise => promise.then(r => r.data)
export const passportApi = {
    purchaseRules: () => data(http.get('/passport/purchase-rules', { timeout: 5000 })),
    nextEvent: () => data(http.get('/passport/next-event', { timeout: 8000 })),
    summary: () => data(http.get('/passport/summary', { timeout: 15000 })),
    story: (events, form, locale) => http.get('/passport/share-card', { params: { events: events.join(','), form, locale }, responseType: 'blob', timeout: 30000 }).then(r => r.data),
    me: () => data(http.get('/passport/me', { timeout: 5000 })),
    requestCode: email => data(http.post('/passport/auth/request', { email })),
    verifyCode: (email, code) => data(http.post('/passport/auth/verify', { email, code })),
    logout: () => data(http.post('/passport/auth/logout')),
    tickets: page => data(http.get('/passport/tickets', { params: { page } })),
    history: (page, type = 'all') => data(http.get('/passport/history', { params: { page, type, limit: 20 } })),
    submissions: () => data(http.get('/passport/submissions')),
    submit: (url, note) => data(http.post('/passport/submissions', { url, note })),
    preferences: marketingConsent => data(http.patch('/passport/preferences', { marketingConsent })),
    quote: order => data(http.post('/passport/quote', order, { timeout: 8000 })),
    qr: id => http.get(`/passport/tickets/${id}/qr`, { responseType: 'blob' }).then(r => r.data)
}
