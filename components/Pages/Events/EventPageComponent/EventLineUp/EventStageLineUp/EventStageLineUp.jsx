import classes from "./EventStageLineUp.module.css"

const EventStageLineUp = (props) => {
    const { lineup, stageNumber } = props

    return (
        <div className={classes.main}>
            <h4>STAGE {stageNumber}</h4>
            <div className={classes.wrapper}>
                {lineup.map(el => (
                    <a key={el.name} href={el.info_link} target="_blank">{el.name}</a>
                ))}
            </div>
        </div>
    )
}

export default EventStageLineUp