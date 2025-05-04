import React, { useLayoutEffect, useRef } from "react";
import anime from "animejs";
import AboutLines1 from "./AboutLines1";
import AboutLines2 from "./AboutLines2";
import AboutLines3 from "./AboutLines3";
import AboutLines4 from "./AboutLines4";

const AboutLines = () => {
  // четыре рефа для четырёх групп <path>
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);

  useLayoutEffect(() => {
    const g1 = ref1.current;
    const g2 = ref2.current;
    const g3 = ref3.current;
    const g4 = ref4.current;
    if (!g1 || !g2 || !g3 || !g4) return;

    // читаем d-атрибуты
    const shapes1 = Array.from(g1.children).map(el => el.getAttribute("d"));
    const shapes2 = Array.from(g2.children).map(el => el.getAttribute("d"));
    const shapes3 = Array.from(g3.children).map(el => el.getAttribute("d"));
    const shapes4 = Array.from(g4.children).map(el => el.getAttribute("d"));

    // убеждаемся, что все массивы одного минимального размера
    const count = Math.min(shapes1.length, shapes2.length, shapes3.length, shapes4.length);
    const paths = Array.from(g1.children).slice(0, count);

    // единый таймлайн для синхронной морфки
    const tl = anime.timeline({
      easing: "linear",
      direction: "alternate",
      duration: 30000,
      loop: true
    });

    paths.forEach((pathEl, i) => {
      tl.add({
        targets: pathEl,
        d: [
          { value: shapes2[i] },
          { value: shapes3[i] },
          { value: shapes4[i] },
          { value: shapes1[i] }
        ]
      }, 0); // все анимации стартуют одновременно
    });
  }, []);

  return (
    <>
      <AboutLines1 dnaRef={ref1} />
      <AboutLines2 dnaRef={ref2} />
      <AboutLines3 dnaRef={ref3} />
      <AboutLines4 dnaRef={ref4} />
    </>
  );
};

export default AboutLines;
