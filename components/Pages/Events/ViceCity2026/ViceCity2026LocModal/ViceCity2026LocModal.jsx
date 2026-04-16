import classes from "./ViceCity2026LocModal.module.css"
import { IoCloseSharp } from "react-icons/io5";

const ViceCityLocModal = (props) => {
    const { onClose, item } = props

    return (
        <div className={classes.main}>
            <button className={classes.closeBut} onClick={onClose}>
                <IoCloseSharp/>
            </button>
            <div className={classes.modal}>
                <iframe src={item} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
            </div>
        </div>
    )
}

export default ViceCityLocModal