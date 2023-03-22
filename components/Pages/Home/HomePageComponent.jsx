import UpcomingEventHome from "./UpcomingEventHome/UpcomingEventHome"
import classes from "./HomePageComponent.module.css"
import HomeNewsSection from "./HomeNewsSection/HomeNewsSection"
import HomeEventsSection from "./HomeEventsSection/HomeEventsSection"
import OrganisationStatistic from "./OrganisationStatistic/OrganisationStatistic"
import HomeBookArtist from "./HomeBookArtist/HomeBookArtist"
import HomePartnership from "./HomePartnership/HomePartnership"
import HomePartners from "./HomePartners/HomePartners"

const HomePageComponent = (props) => {
    const { upcomingEvent, news, events, partners, listeningsCount } = props

    return (
        <div className={classes.main}>
            <UpcomingEventHome event={upcomingEvent}/>
            <HomeNewsSection news={news}/>
            <OrganisationStatistic listeningsCount={listeningsCount}/>
            <HomeEventsSection events={events}/>
            <HomeBookArtist/>
            <HomePartnership/>
            <HomePartners partners={partners}/>
        </div>
    )
}

export default HomePageComponent