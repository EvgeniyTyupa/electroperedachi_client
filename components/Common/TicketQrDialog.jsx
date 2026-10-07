import { useEffect, useRef, useState } from 'react'
import { passportApi } from '../../api/passport'
import styles from '../../styles/Passport.module.css'

export default function TicketQrDialog({ ticket, text, onClose }) {
    const dialog = useRef(null)
    const [image, setImage] = useState(''), [error, setError] = useState(''), [attempt, setAttempt] = useState(0)
    useEffect(() => {
        const element = dialog.current
        element.showModal()
        return () => element.close()
    }, [])
    useEffect(() => {
        let active = true, objectUrl
        setImage(''); setError('')
        passportApi.qr(ticket._id).then(blob => {
            if (!active) return
            objectUrl = URL.createObjectURL(blob)
            setImage(objectUrl)
        }).catch(() => { if (active) setError(text.qrError) })
        return () => { active = false; if (objectUrl) URL.revokeObjectURL(objectUrl) }
    }, [ticket._id, attempt, text.qrError])
    return <dialog ref={dialog} className={styles.qrDialog} aria-labelledby="ticket-qr-title" onCancel={e => { e.preventDefault(); onClose() }} onClick={e => { if (e.target === e.currentTarget) onClose() }}>
        <h2 id="ticket-qr-title">{ticket.eventId?.title || 'electroperedachi'}</h2>
        <p>{ticket.ticketTypeId?.name}</p>
        {error ? <div role="alert"><p>{error}</p><button type="button" onClick={() => setAttempt(attempt + 1)}>{text.retry}</button></div> : image ? <div className={styles.qrFrame}><img src={image} alt={text.qr} width="280" height="280" onError={() => setError(text.qrError)} /></div> : <p role="status">{text.loading}</p>}
        <button type="button" autoFocus onClick={onClose}>{text.hide}</button>
    </dialog>
}
