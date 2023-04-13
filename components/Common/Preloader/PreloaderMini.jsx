import preloader from "/public/images/preloader_e.png"
import classes from './Preloader.module.css'

const PreloaderMini = () => {
    return (
        <div className={classes.mainMini}>
            <img src={preloader.src} className={classes.imgMini}/>
        </div>
    )
}

export default PreloaderMini