import "@uiw/react-md-editor/markdown-editor.css"
import "@uiw/react-markdown-preview/markdown.css"
import dynamic from "next/dynamic"
import Container from "../../../UI/Container/Container"
import Header from "../../../UI/Text/Header/Header"
import classes from "./ArtistPageComponent.module.css"
import Image from "next/image"
import { useRouter } from "next/router"
import ArtistBookingForm from "./ArtistBookingForm/ArtistBookingForm"
import { Tabs } from "@mui/material"
import { Tab } from "@mui/material"
import { useState } from "react"
import { useIntl } from "react-intl"

const EditerMarkdown = dynamic(
    () =>
        import("@uiw/react-md-editor").then((mod) => {
            return mod.default.Markdown
        }),
    { ssr: false }
)

const ArtistPageComponent = (props) => {
    const { artist } = props

    const intl = useIntl()

    const [tabIndex, setTabIndex] = useState(0)

    const handleChange = (event, newValue) => {
        setTabIndex(newValue)
    }

    if (!artist) {
        return <div></div>
    }

    const { locale } = useRouter()

    const photo = artist.photos[1] || artist.photos[0]

    const bio = locale === "ua" ? artist.bio : artist.bio_en

    const ArtistLinks = () => {
        return (
            <div className={classes.links}>
                {artist.links.facebook && (
                    <a
                        href={artist.links.facebook}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        FACEBOOK
                    </a>
                )}
                {artist.links.insta && (
                    <a
                        href={artist.links.insta}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        INSTAGRAM
                    </a>
                )}
                {artist.links.soundcloud && (
                    <a
                        href={artist.links.soundcloud}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        SOUNDCLOUD
                    </a>
                )}
            </div>
        )
    }

    return (
        <div className={classes.main}>
            <Container className={classes.container}>
                <Header type="h2">{artist.name}</Header>
                <div className={classes.tabs}>
                    <Tabs
                        value={tabIndex}
                        onChange={handleChange}
                        sx={{
                            width: "100%",
                            "& .MuiTabs-flexContainer": {
                                justifyContent: "center",
                                gap: "1rem",
                                width: "100%",
                                "@media screen and (max-width: 568px)": {
                                    gap: 0,
                                    justifyContent: "space-between !important"
                                }
                            },
                            "& .MuiTabs-indicator": {
                                backgroundColor: "#FF5500",
                                width: "14px !important",
                                height: "14px",
                                borderRadius: "50%",
                                top: "22px",
                                zIndex: 0,
                                transform:
                                    tabIndex === 0
                                        ? "tanslateX(5px)"
                                        : "translateX(-10px) !important",
                                "@media screen and (max-width: 568px)": {
                                    transform:
                                        tabIndex === 0
                                            ? "tanslateX(5px)"
                                            : "translateX(-6px) !important"
                                }
                            }
                        }}
                    >
                        <Tab
                            label={intl.formatMessage({ id: "artist.tab1" })}
                            disableRipple
                        />
                        <Tab
                            label={intl.formatMessage({ id: "artist.tab2" })}
                            disableRipple
                        />
                        <Tab
                            label={intl.formatMessage({ id: "artist.tab3" })}
                            disableRipple
                        />
                    </Tabs>
                </div>
                <div className={classes.mainInfo}>
                    <div className={classes.avatarContainer}>
                        <Image src={photo} alt={artist.name} fill />
                    </div>
                    {tabIndex === 0 && (
                        <div className={classes.bio}>
                            <EditerMarkdown
                                source={bio}
                                style={{
                                    background: "transparent",
                                    color: "white",
                                    fontFamily: "Helvetica"
                                }}
                            />
                            <ArtistLinks/>
                        </div>
                    )}
                    {tabIndex === 1 && (
                        <div className={classes.soundcloudMusic}>
                            {artist.music.map((el) => (
                                <EditerMarkdown
                                    key={el}
                                    source={el}
                                    style={{
                                        background: "transparent",
                                        color: "white",
                                        fontFamily: "Helvetica"
                                    }}
                                />
                            ))}
                            <ArtistLinks/>
                        </div>
                    )}
                    {tabIndex === 2 && artist.video && (
                        <div className={classes.youtube}>
                            <iframe src={artist.video} />
                            <ArtistLinks/>
                        </div>
                    )}
                </div>
            </Container>
            <ArtistBookingForm />
        </div>
    )
}

export default ArtistPageComponent
