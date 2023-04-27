import { useEffect } from "react"
import Image from "next/image"
import { useRouter } from "next/router"
import classes from "./LastPost.module.css"
import ExploreButton from "../../../UI/Buttons/ExploreButton/ExploreButton"
import { useIntl } from "react-intl"
import PostDate from "../PostDate/PostDate"
import { routes } from "../../../../utils/routes"

import Aos from 'aos';
import 'aos/dist/aos.css';
import Header from "../../../UI/Text/Header/Header"

const LastPost = (props) => {
    const { post } = props
    const { locale } = useRouter()

    const intl = useIntl()

    let title = locale === "ua" ? post.title : post.title_en
    let description = locale === "ua" ? post.description : post.description_en

    useEffect(() => {
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={classes.main} data-aos="fade-up" data-aos-duration="2000">
            <div className={classes.imageBlock}>
                <Image src={post.image} alt={post.title} fill />
                <ExploreButton
                    href={`${routes.news}/${post.code}`}
                    text={intl.formatMessage({ id: "button.readMore" })}
                    className={classes.readMoreBut}
                />
            </div>
            <div className={classes.info}>
                <PostDate date={post.created_at}/>
                <Header type="h2" className={classes.title}>{title}</Header>
                <p>{description.trim()}</p>
            </div>
        </div>
    )
}

export default LastPost
