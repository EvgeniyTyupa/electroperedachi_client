import axios from 'axios'
import { baseURL } from './api'
const http = axios.create({ baseURL, withCredentials: true })
const data = promise => promise.then(r => r.data)
export const passportApi = {
    me: () => data(http.get('/passport/me', { timeout: 5000 })),
    requestCode: email => data(http.post('/passport/auth/request', { email })),
    verifyCode: (email, code) => data(http.post('/passport/auth/verify', { email, code })),
    logout: () => data(http.post('/passport/auth/logout')),
    tickets: page => data(http.get('/passport/tickets', { params: { page } })),
    history: page => data(http.get('/passport/history', { params: { page } })),
    submissions: () => data(http.get('/passport/submissions')),
    submit: (url, note) => data(http.post('/passport/submissions', { url, note })),
    preferences: marketingConsent => data(http.patch('/passport/preferences', { marketingConsent })),
    quote: order => data(http.post('/passport/quote', order, { timeout: 8000 })),
    qr: id => http.get(`/passport/tickets/${id}/qr`, { responseType: 'blob' }).then(r => r.data)
}
