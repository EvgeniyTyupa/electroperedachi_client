import { IconButton } from "@mui/material"
import { Modal } from "@mui/material"
import { useState } from "react"
import { AiOutlineClose } from "react-icons/ai"
import classes from "./Modal.module.css"

const CustomModal = (props) => {
    const { children, title, open } = props

    const [isOpen, setIsOpen] = useState(open)

    console.log(open)

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }
    
    return (
        <Modal
            className={classes.overflow}
            open={isOpen}
            onClose={handleOpen}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes.modal}>
                <div className={classes.header}>
                    <p>{title}</p>
                    <IconButton onClick={handleOpen} className={classes.closeButt}>
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </Modal>
    )
}

export default CustomModal