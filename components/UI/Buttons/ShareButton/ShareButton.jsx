import { Button } from "@mui/material"
import { useState } from "react"
import classes from './ShareButton.module.css'
import { FacebookShareButton, FacebookIcon } from 'next-share';
import { Modal, IconButton } from "@mui/material";
import { useEffect } from "react";
import { AiOutlineClose } from "react-icons/ai"
import { BiShareAlt } from "react-icons/bi"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { cx } from "../../../../utils/classnames";
import { useIntl } from "react-intl";

const ShareButton = (props) => {
    const { className } = props

    const intl = useIntl()

    const [isOpen, setIsOpen] = useState(false)
    const [url, setUrl] = useState("")

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    useEffect(() => {
        setUrl(window.location.href)
        Aos.init({duration: 1000})
    }, [])

    return (
        <div className={cx(classes.main, className)}>
            <Button onClick={handleOpen} className={classes.shareBut}>
                <span>{intl.formatMessage({ id: "shareBut.button" })}</span>
                <BiShareAlt/>
            </Button>
            <Modal
                className={classes.overflow}
                open={isOpen}
                onClose={handleOpen}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <div className={classes.modal} data-aos="zoom-in" data-aos-duration="300">
                    <div className={classes.header}>
                        <p>{intl.formatMessage({ id: "shareBut.titleModal" })}</p>
                        <IconButton onClick={handleOpen} className={classes.closeButt}>
                            <AiOutlineClose/>
                        </IconButton>
                    </div>
                    <div className={classes.content}>
                        <Button className={classes.shareButSocial}>
                            <FacebookShareButton
                                className={classes.shareButSocial}
                                url={url}
                                quote={""}
                                hashtag={"#electroperedachi"}
                            >
                                <FacebookIcon size={32} round />
                                <span>{intl.formatMessage({ id: "shareBut.shareWith" })} Facebook</span>
                            </FacebookShareButton>
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    )
}

export default ShareButton