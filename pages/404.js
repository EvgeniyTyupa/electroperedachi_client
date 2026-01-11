import Head from "next/head"
import { useEffect, useState } from "react"
import { useIntl } from "react-intl"

import { eventApi } from "../api/api"
import NotFound from "../components/Pages/NotFound/NotFound"

export default function NotFoundPage() {
  const intl = useIntl()

  const [upcomingEvent, setUpcomingEvent] = useState(null)
  const [loadingEvent, setLoadingEvent] = useState(true)

  useEffect(() => {
    let alive = true

    async function loadUpcomingEvent() {
      try {
        setLoadingEvent(true)

        const { upcomingEvents } = await eventApi.getUpcomingEvents()
        const first = upcomingEvents?.[0] ?? null

        if (alive) setUpcomingEvent(first)
      } catch (e) {
        if (alive) setUpcomingEvent(null)
      } finally {
        if (alive) setLoadingEvent(false)
      }
    }

    loadUpcomingEvent()

    return () => {
      alive = false
    }
  }, [])

  return (
    <>
      <Head>
        <title>{intl.formatMessage({ id: "notfound.title" })}</title>
        <meta
          name="description"
          content={intl.formatMessage({ id: "notfound.text1" })}
        />
      </Head>

      <NotFound
        upcomingEvent={upcomingEvent}
        loadingEvent={loadingEvent}
      />
    </>
  )
}
