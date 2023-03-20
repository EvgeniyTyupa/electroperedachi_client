import "@uiw/react-md-editor/markdown-editor.css";
import "@uiw/react-markdown-preview/markdown.css";
import dynamic from "next/dynamic";
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from "./ArtistPageComponent.module.css"
import Image from "next/image"
import { useRouter } from "next/router";
import ArtistBookingForm from "./ArtistBookingForm/ArtistBookingForm";

const EditerMarkdown = dynamic(
    () =>
      import("@uiw/react-md-editor").then((mod) => {
        return mod.default.Markdown;
      }),
    { ssr: false }
);

const ArtistPageComponent = (props) => {
    const { artist } = props

    if (!artist) {
        return <div></div>
    }

    const { locale } = useRouter()

    const photo = artist.photos[1] || artist.photos[0]

    const bio = locale === "ua" ? artist.bio : artist.bio_en

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <Header type="h2">{artist.name}</Header>
                <div className={classes.mainInfo}>
                    <div className={classes.avatarContainer}>
                        <Image src={photo} alt={artist.name} fill/>
                    </div>
                    <div className={classes.bio}>
                        <EditerMarkdown
                            source={bio}
                            style={{
                                background: 'transparent', 
                                color: "white", 
                                fontFamily: "Helvetica",
                            }}
                        />
                        <div className={classes.links}>
                            {artist.links.facebook && (
                                <a href={artist.links.facebook} target="_blank" rel="noopener noreferrer">FACEBOOK</a>
                            )}
                            {artist.links.insta && (
                                <a href={artist.links.insta} target="_blank" rel="noopener noreferrer">INSTAGRAM</a>
                            )}
                            {artist.links.soundcloud && (
                                <a href={artist.links.soundcloud} target="_blank" rel="noopener noreferrer">SOUNDCLOUD</a>
                            )}
                        </div>
                    </div>
                </div>
                <div className={classes.soundcloudMusic}>
                    {artist.music.map(el => (
                        <EditerMarkdown
                            key={el}
                            source={el}
                            style={{
                                background: 'transparent', 
                                color: "white", 
                                fontFamily: "Helvetica",
                            }}
                        />
                    ))}
                </div>
                {artist.video && (
                    <div className={classes.youtube}>
                        <iframe src={artist.video}/>
                    </div>
                )}
            </Container>
            <ArtistBookingForm/>
        </div>
    )
}

export default ArtistPageComponent