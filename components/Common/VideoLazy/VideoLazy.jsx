import React, { useRef, useEffect, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import { cx } from '../../../utils/classnames';
import classes from "./VideoLazy.module.css"
import { FaPlayCircle } from "react-icons/fa";
import { IconButton } from '@mui/material';

const VideoLazy = ({ src, className, classNameMain, classNameFrame, frame, preview, isPlayVideo }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isPlay, setIsPlay] = useState(false)
  const { ref, inView } = useInView({ triggerOnce: true });
  const videoRef = useRef(null);

    const onClick = () => {
        videoRef.current.play()
        setIsPlay(true)
    }

  useEffect(() => {
    if (inView && !isLoaded) {
      const video = videoRef.current;
      const source = video.querySelector('source');
      if (source) {
        source.src = source.dataset.src;
        video.load();
        setIsLoaded(true);
      }
    }
  }, [inView, isLoaded]);

  useEffect(() => {
    if (isPlayVideo) {
      setIsPlay(true)
    }
  }, [isPlayVideo])

  return (
      <div className={cx(classes.main, classNameMain)}>
            {(frame && !isPlay) && (
                <img onClick={onClick} className={cx(classes.frame, classNameFrame)} src={frame} alt="frame"/>
            )}
            {(preview && !isPlay) && (
                <img onClick={onClick} className={classes.preview} src={preview} alt="preview"/>
            )}
            {!isPlay && (
                <IconButton onClick={onClick} className={classes.play}>
                    <FaPlayCircle/>
                </IconButton>
            )}
            <video
                ref={(el) => {
                    ref(el);
                    videoRef.current = el;
                }}
                controls
                className={cx(classes.video, className)}
            >
                <source data-src={src} type="video/mp4" />
            </video>
      </div>
  );
};

export default VideoLazy;
