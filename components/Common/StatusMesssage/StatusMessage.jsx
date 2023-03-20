import { Alert } from "@mui/material"
import { useContext } from "react"
import { useEffect, useState } from "react"
import AppContext, { useAppContext } from "../../../context/AppContext"
import classes from './StatusMessage.module.css'

const TYPES = ["error", "success"]

const StatusMessage = () => {
    const context = useAppContext(AppContext)

    const { serverError, setServerError, serverResponse, setServerResponse } = context

    const [type, setType] = useState(TYPES[1])
    const [isShow, setIsShow] = useState(false)

    useEffect(() => {
        const TEXT_TIMER = 4000
        const SHOW_TIMER = 3000

        if (serverError) {
            setType(TYPES[0])
            setIsShow(true)
        }
        if (serverResponse) {
            setType(TYPES[1])
            setIsShow(true)
        }

        const showTimer = setTimeout(() => {
            setIsShow(false)
        }, SHOW_TIMER)

        const timer = setTimeout(() => {
            setServerResponse(null)
            setServerError(null)
        }, TEXT_TIMER)

        return () => { 
            clearTimeout(showTimer)
            clearTimeout(timer)
        }
    }, [serverError, serverResponse])

    return (
        <Alert
            severity={type}
            className={classes.main}
            sx={{
                bottom: `${isShow ? "2rem" : "-4rem"}`
            }}
        >
        {type === "success" && (
            <p>{serverResponse}</p>
        )}
        {type === "error" && (
            <p>{serverError}</p>
        )}
        </Alert>
    )
}

export default StatusMessage