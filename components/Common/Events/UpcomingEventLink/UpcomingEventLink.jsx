import { routes } from "../../../../utils/routes"
import ExploreButton from "../../../UI/Buttons/ExploreButton/ExploreButton"
import Header from "../../../UI/Text/Header/Header"
import classes from "./UpcomingEventLink.module.css"
import { useIntl } from "react-intl"
import { useEffect } from "react"

import { humanizeDates } from "../../../../utils/humanizeDate"

const UpcomingEventLink = (props) => {
  const { event, type = "upcoming" } = props
  const intl = useIntl()

  // ✅ если это upcoming, но event нет — не рендерим карточку вообще
  if (type === "upcoming" && !event) return null

  useEffect(() => {
    let alive = true

    ;(async () => {
      try {
        // ✅ AOS грузим только на клиенте (export не трогаем)
        await import("aos/dist/aos.css")
        const AosModule = await import("aos")
        const Aos = AosModule.default || AosModule

        if (!alive) return
        Aos.init({ duration: 1000 })
      } catch (e) {
        // игнор — анимации не должны ломать страницу
      }
    })()

    return () => {
      alive = false
    }
  }, [])

  const dateValue =
    type === "upcoming" ? (event?.dates ? event.dates : event?.date) : null

  return (
    <div className={classes.event}>
      <div
        className={classes.eventInfoContainer}
        data-aos="fade-down"
        data-aos-duration="2000"
      >
        <Header type="h3">
          {type === "upcoming"
            ? intl.formatMessage({ id: "title.upcoming.title" })
            : intl.formatMessage({ id: "notfound.allEvents" })}
        </Header>

        <div className={classes.eventInfo}>
          {type === "upcoming" ? (
            <p>
              {event?.title} / {dateValue ? humanizeDates(dateValue) : ""} /{" "}
              {event?.address}
            </p>
          ) : (
            <p>{intl.formatMessage({ id: "notfound.viewMoreEvents" })}</p>
          )}
        </div>
      </div>

      <div data-aos="fade-left" data-aos-duration="2000">
        <ExploreButton
          href={
            type === "upcoming"
              ? `${routes.events}/${event?.title_code || ""}`
              : `${routes.events}`
          }
          className={classes.redirectBut}
        />
      </div>
    </div>
  )
}

export default UpcomingEventLink
