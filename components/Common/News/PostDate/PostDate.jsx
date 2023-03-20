import { useRouter } from "next/router"
import classes from "./PostDate.module.css"
import moment from "moment";

const PostDate = (props) => {
    const { date } = props
    const { locale } = useRouter()

    let dateString = locale === "ua" 
    ? moment(date).locale('uk').format("DD MMM YYYY")
    : moment(date).locale('en').format("DD MMM YYYY")

    return (
        <span className={classes.date}>{dateString}</span>
    )
}

export default PostDate