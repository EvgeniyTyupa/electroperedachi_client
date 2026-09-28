import classes from "../NeedForSpeed.module.css";
import { cx } from "../needForSpeedClasses";
const nfsLogo = "/images/need_for_speed/nfs-logo.webp";
export function Footer() {
  return <footer className={classes["foot"]} data-theme="night">
      <img className={classes["foot__logo"]} src={nfsLogo} width={321} height={321} alt="Need for Speed · electroperedachi" loading="lazy" />
      <p className={classes["foot__mark"]}>electroperedachi</p>
    </footer>;
}
