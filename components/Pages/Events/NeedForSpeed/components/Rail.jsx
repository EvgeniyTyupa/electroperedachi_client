import { useNfsCopy } from "../useNfsCopy";
import { useEffect, useRef, useState } from "react";
import classes from "../NeedForSpeed.module.css";
import { useSectionAutoplay } from "../motion/useSectionAutoplay";
import { SliderNav } from "./SliderNav";
const techno = "/images/need_for_speed/rail-techno-fashion.webp";
const technoDesk = "/images/need_for_speed/rail-techno-fashion-desktop.webp";
const hozho = "/images/need_for_speed/rail-hozho.webp";
const f1 = "/images/need_for_speed/f1.webp";
const f2 = "/images/need_for_speed/f2.webp";
const f3 = "/images/need_for_speed/f3.webp";
const f4 = "/images/need_for_speed/f4.webp";
const f5 = "/images/need_for_speed/f5.webp";
const f6 = "/images/need_for_speed/f6.webp";
const getVIDEOS = nfsCopy => [{
  kind: "youtube",
  videoId: "SWeMV1zZiY0",
  title: nfsCopy("electroperedachi — відео 1")
}, {
  kind: "youtube",
  videoId: "sYX-_g1Yhs0",
  title: nfsCopy("electroperedachi — відео 2")
}, {
  kind: "youtube",
  videoId: "EnycnmK-GiM",
  title: nfsCopy("electroperedachi — відео 3")
}, {
  kind: "youtube",
  videoId: "oW21H7l6cwo",
  title: nfsCopy("electroperedachi — відео 4")
}];
export const RAIL_MOBILE = [{
  kind: "photo",
  src: techno,
  alt: "Techno fashion 2026",
  cap: "Techno fashion 2026"
}, {
  kind: "photo",
  src: hozho,
  alt: "HOZHO 2025 · Dovzhenko studio",
  cap: "HOZHO 2025 · Dovzhenko studio"
}, {
  kind: "photo",
  src: f1,
  alt: "VICE CITY 2026 · X-Park",
  cap: "VICE CITY 2026 · X-Park"
}, {
  kind: "photo",
  src: f2,
  alt: "VICE CITY 2026 · X-Park",
  cap: "VICE CITY 2026 · X-Park"
}, {
  kind: "photo",
  src: f3,
  alt: "Vampire Halloween 2024 · Mala Opera",
  cap: "Vampire Halloween 2024 · Mala Opera"
}, {
  kind: "photo",
  src: f4,
  alt: "Khortytsia Island 2019 · Historical Museum",
  cap: "Khortytsia Island 2019 · Historical Museum"
}, {
  kind: "photo",
  src: f5,
  alt: "Sedova 2018 · Factory",
  cap: "Sedova 2018 · Factory"
}];
export const RAIL_DESKTOP = [{
  kind: "photo",
  src: hozho,
  alt: "HOZHO 2025 · Dovzhenko studio",
  cap: "HOZHO 2025 · Dovzhenko studio"
}, {
  kind: "photo",
  src: technoDesk,
  alt: "Techno fashion 2026",
  cap: "Techno fashion 2026"
}, {
  kind: "photo",
  src: f1,
  alt: "VICE CITY 2026 · X-Park",
  cap: "VICE CITY 2026 · X-Park"
}, {
  kind: "photo",
  src: f2,
  alt: "VICE CITY 2026 · X-Park",
  cap: "VICE CITY 2026 · X-Park"
}, {
  kind: "photo",
  src: f3,
  alt: "Vampire Halloween 2024 · Mala Opera",
  cap: "Vampire Halloween 2024 · Mala Opera"
}, {
  kind: "photo",
  src: f4,
  alt: "Khortytsia Island 2019 · Historical Museum",
  cap: "Khortytsia Island 2019 · Historical Museum"
}, {
  kind: "photo",
  src: f5,
  alt: "Sedova 2018 · Factory",
  cap: "Sedova 2018 · Factory"
}];
const GAP = 16;
const STEP_MS = 2200;
export function Rail({
  cards = RAIL_MOBILE
}) {
  const nfsCopy = useNfsCopy();
  const blockRef = useRef(null);
  const trackRef = useRef(null);
  const downX = useRef(null);
  const swiped = useRef(false);
  const [activeVideo, setActiveVideo] = useState(null);
  const [geo, setGeo] = useState({
    step: 0,
    max: 0
  });
  useEffect(() => {
    const track = trackRef.current;
    const box = track?.parentElement;
    if (!track || !box) return;
    const measure = () => {
      const card = track.firstElementChild;
      if (!card) return;
      setGeo({
        step: card.getBoundingClientRect().width + GAP,
        max: Math.max(0, track.scrollWidth - box.clientWidth)
      });
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(box);
    return () => observer.disconnect();
  }, [cards]);
  const stops = geo.step ? Math.max(1, Math.ceil(geo.max / geo.step - 0.02) + 1) : 1;
  const {
    at,
    go,
    hold,
    running
  } = useSectionAutoplay(blockRef, stops, STEP_MS);

  // Не возобновляем автопрокрутку, пока открыт плеер,
  // даже после ухода из секции и возвращения к ней.
  useEffect(() => {
    if (activeVideo && running) hold();
  }, [activeVideo, running, hold]);
  const offset = Math.min(at * geo.step, geo.max);
  const changeSlide = next => {
    setActiveVideo(null);
    go(next);
  };
  const onDown = e => {
    hold();
    downX.current = e.clientX;
    swiped.current = false;
  };
  const onUp = e => {
    if (downX.current === null) return;
    const dx = e.clientX - downX.current;
    downX.current = null;
    if (Math.abs(dx) >= 40) {
      swiped.current = true;
      changeSlide(at + (dx < 0 ? 1 : -1));
    }
  };
  const onEnter = e => {
    if (e.pointerType === "mouse") hold();
  };
  const playVideo = videoId => {
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    hold();
    setActiveVideo(videoId);
  };
  return <div className={[classes.stack, classes["stack--32"], classes["rail-block"]].join(" ")} ref={blockRef}>
      <div className={classes.rail} data-theme="night" onPointerEnter={onEnter} onPointerDown={onDown} onPointerUp={onUp} onPointerCancel={() => {
      downX.current = null;
      swiped.current = false;
    }}>
        <div className={classes["rail__track"]} ref={trackRef} style={{
        transform: `translateX(${-offset}px)`
      }}>
          {cards.map((card, index) => <figure key={card.videoId || card.src} className={classes["rail__card"]}>
              {card.kind === "youtube" ? activeVideo === card.videoId ? <>
                    <iframe className={classes.railYoutube} src={`https://www.youtube.com/embed/${card.videoId}?autoplay=1&playsinline=1`} title={card.title} allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />

                    <button type="button" className={classes.railVideoClose} aria-label={nfsCopy("Закрити відео")} onClick={() => setActiveVideo(null)}>
                      ×
                    </button>
                  </> : <button type="button" className={classes.railVideoPreview} aria-label={`${nfsCopy("Watch")}: ${card.title}`} onClick={() => playVideo(card.videoId)}>
                    <img src={`https://i.ytimg.com/vi/${card.videoId}/hqdefault.jpg`} alt={card.title} loading="lazy" draggable={false} />

                    <span className={classes.railVideoPlay} aria-hidden="true">
                      ▶
                    </span>
                  </button> : <>
                  <img src={card.src} alt={card.alt} loading={index ? "lazy" : "eager"} draggable={false} />

                  {card.cap && <figcaption className={[classes["rail__cap"], classes["hud-tag"]].join(" ")}>
                      {card.cap}
                    </figcaption>}
                </>}
            </figure>)}
        </div>
      </div>

      <SliderNav label={nfsCopy("Гортати кадри")} at={at} total={stops} playing={running && !activeVideo} onPrev={() => changeSlide(at - 1)} onNext={() => changeSlide(at + 1)} />
    </div>;
}
