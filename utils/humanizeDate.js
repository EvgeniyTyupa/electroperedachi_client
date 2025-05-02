import moment from "moment"

export const humanizeDates = (dts) => {
    let dates

    if (Array.isArray(dts)) {
        dates = dts
    } else {
        dates = [{ date: dts }]
    }
    
    if (dates.length > 1) {
        const firstDate = moment(dates[0].date).format("D")
        const lastDate = moment(dates[dates.length - 1].date).format(`D.MM.YYYY`)

        return `${firstDate}-${lastDate}`
    } else {
        return moment(dates[0].date).format(`DD.MM.YYYY`)
    }
}

export const humanizeDatesWithDay = (dts, locale) => {
    const loc = locale === "ua" ? "uk" : "en"

    let dates

    if (Array.isArray(dts)) {
        dates = dts
    } else {
        dates = [{ date: dts }]
    }
    
    if (dates.length > 1) {
        const firstDayOfWeek = moment(dates[0].date).locale(loc).format('ddd')
        const lastDayOfWeek = moment(dates[dates.length - 1].date).locale(loc).format('ddd')

        return `${firstDayOfWeek}-${lastDayOfWeek}`
    } else {
        return moment(dates[0].date).locale(loc).format('ddd')
    }
}