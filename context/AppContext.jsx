import { useState } from "react"
import { useEffect } from "react"
import { useContext } from "react"
import { createContext } from "react"
import Router from "next/router"

const AppContext = createContext()

export const AppContextProvider = (props) => {
    const { children } = props

    const [isFetchingContext, setIsFetchingContext] = useState(false)
    const [serverResponse, setServerResponse] = useState(null)
    const [serverError, setServerError] = useState(null)

    const shared = {
        isFetchingContext,
        setIsFetchingContext,
        serverResponse,
        setServerResponse,
        serverError,
        setServerError,
    }

    useEffect(() => {
        const start = () => {
            setIsFetchingContext(true)
        }
        const end = () => {
            setIsFetchingContext(false)
        }
        Router.events.on("routeChangeStart", start)
        Router.events.on("routeChangeComplete", end)
        Router.events.on("routeChangeError", end)
        return () => {
            Router.events.off("routeChangeStart", start)
            Router.events.off("routeChangeComplete", end)
            Router.events.off("routeChangeError", end)
        }
    }, [])

    return <AppContext.Provider value={shared}>{children}</AppContext.Provider>
}

export const useAppContext = () => useContext(AppContext)
