import { IconButton } from "@mui/material"
import { AiOutlineClose } from "react-icons/ai"
import classes from "./Modal.module.css"

const CustomModal = (props) => {
    const { children, title, onClose } = props
    
    return (
        <div
            className={classes.overflow}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <div className={classes.modal}>
                <div className={classes.header}>
                    <p>{title}</p>
                    <IconButton onClick={onClose} className={classes.closeButt}>
                        <AiOutlineClose/>
                    </IconButton>
                </div>
                <div className={classes.content}>
                    {children}
                </div>
            </div>
        </div>
    )
}

export default CustomModal