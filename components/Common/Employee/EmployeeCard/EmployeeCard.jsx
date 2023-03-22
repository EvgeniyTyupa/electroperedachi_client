import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useIntl } from "react-intl";
import { cx } from "../../../../utils/classnames";
import { routes } from "../../../../utils/routes";
import ExploreButton from "../../../UI/Buttons/ExploreButton/ExploreButton";
import classes from "./EmployeeCard.module.css";

const EmployeeCard = (props) => {
  const { item, viewType = "about" } = props;

  const intl = useIntl();
  const router = useRouter()

  const photoSrc = item.photos[0]

  const onClick = () => {
    router.push(`${routes.artists}/${item.name_code}`)
  }

  return (
    <>
      {item.role === "artist" && (
        <div
          onClick={onClick}
          className={cx(classes.main, classes.artistMain)}
        >
          <div className={classes.imageContainer}>
            <Image src={photoSrc} alt={item.name} fill />
          </div>
          <div className={classes.shortInfo}>
            <p className={viewType === "artists" ? classes.name : classes.realName}>
              {viewType === "artists" ? ("DJ " + item.name) : item.real_name}
            </p>
            {viewType === "about" && <span className={classes.spec}>{item.spec}</span>}
          </div>
          <div className={classes.readMoreButContainer}>
            <ExploreButton
              href={`${routes.artists}/${item.name_code}`}
              className={classes.readMoreBut}
              text={intl.formatMessage({ id: "button.readMore" })}
            />
          </div>
        </div>
      )}

      {item.role === "invited" && (
        <a
          href={item.links.facebook || item.links.insta || item.links.soundcloud}
          className={cx(classes.main, classes.invited)}
          target="_blank"
          rel="noopener noreferrer"
        >
          <div className={classes.imageContainer}>
            <Image src={photoSrc} alt={item.name} fill />
          </div>
          <p className={classes.name}>
            {viewType === "artists" ? item.name : item.real_name}
          </p>
        </a>
      )}

      {item.role === "soft" && (
        <div className={classes.main}>
          <div className={classes.imageContainer}>
            <Image src={photoSrc} alt={item.name} fill />
          </div>
          <div className={classes.shortInfo}>
            <p className={classes.realName}>{item.name}</p>
            <span className={classes.spec}>{item.spec}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default EmployeeCard;
