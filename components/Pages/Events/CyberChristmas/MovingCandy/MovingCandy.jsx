import { useEffect, useState } from 'react';
import { debounce } from 'lodash';
import classes from "./MovingCandy.module.css"

const MovingCandy = (props) => {
    const { img, side, index } = props

    const [scrollPosition, setScrollPosition] = useState(0);

    useEffect(() => {
        const handleScroll = debounce(() => {
            setScrollPosition(window.scrollY);
        }, 10); // Debounce for better performance

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

  return (
    <img
        src={img}
        alt="candy"
        className={classes.main}
        style={ side === "left" ? {
            top: 0,
            position: 'absolute',
            left: `${scrollPosition * 0.3}px`,
            transform: index === 2 ? 'translateX(-170%)' : 'translateX(-50%)',
            transition: 'top 0.1s ease-out',
        } : {
            top: 0,
            position: 'absolute',
            right: `${scrollPosition * 0.3}px`,
            transform: index === 2 ? 'translateX(170%)' : 'translateX(50%)',
            transition: 'top 0.1s ease-out',
        }}
    />
  );
}

export default MovingCandy