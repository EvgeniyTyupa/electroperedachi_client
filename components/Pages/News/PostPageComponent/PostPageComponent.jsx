import Image from "next/image"
import { useRouter } from "next/router"
import Container from "../../../UI/Container/Container"
import classes from "./PostPageComponent.module.css"
import dynamic from "next/dynamic";

import default_post_img from "/public/images/post_img.svg"

import ShareButton from "../../../UI/Buttons/ShareButton/ShareButton";

const EditerMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
);

const PostPageComponent = (props) => {
    const { post } = props

    const { locale } = useRouter()

    const title = locale === "ua" ? post.title : post.title_en
    const text = locale === "ua" ? post.text : post.text_en
    
    return (
        <div className={classes.main}>
            <img src={default_post_img.src} alt="electroperedachi" className={classes.defaultImg}/>
            <Container className={classes.container}>
                <h2 className={classes.title}>{title}</h2>
                <div className={classes.imageContainer}>
                    <Image src={post.image} alt={title} fill className={classes.postImage}/>
                </div>
                <ShareButton className={classes.shareButMobile}/>
                {text && <div className={classes.textBlock}>
                    <EditerMarkdown
                        source={text}
                        style={{
                            background: 'transparent', 
                            color: "black", 
                            fontFamily: "Helvetica",
                        }}
                    />
                </div>}
                <div className={classes.embed}>
                    {post.embedLink.includes("youtube.com/embed") ? (
                        <iframe src={post.embedLink}/>
                    ) : (
                        <EditerMarkdown
                            source={post.embedLink}
                            style={{
                                background: 'transparent', 
                                color: "black", 
                                fontFamily: "Helvetica",
                            }}
                        />
                    )}
                </div>
                <ShareButton className={classes.shareBut}/>
            </Container>
        </div>
    )
}

export default PostPageComponent