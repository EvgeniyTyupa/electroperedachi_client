/* ------------------------------------------------------------------ *
 * Хуки руху для лендінгу Need for Speed.
 *
 * Тайминги збігаються з MOTION.md. Кожен хук сам поважає
 * prefers-reduced-motion і повертає коректний СТАТИЧНИЙ стан, коли рух
 * вимкнено, — не «нічого», а кінцевий кадр.
 * ------------------------------------------------------------------ */
import { useCallback, useEffect, useRef, useState } from 'react';
/* ---------------------------------------------------------------- *
 * Базовий: чи просить людина прибрати рух
 * ---------------------------------------------------------------- */
export function usePrefersReducedMotion() {
  const [calm, setCalm] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const on = () => setCalm(mq.matches);
    on();
    mq.addEventListener('change', on);
    return () => mq.removeEventListener('change', on);
  }, []);
  return calm;
}
/* ---------------------------------------------------------------- *
 * 1 · Sticky HUD bar — показати, коли герой пішов з екрана
 * ---------------------------------------------------------------- */
export function useHeroPassed(heroRef) {
  const [passed, setPassed] = useState(false);
  useEffect(() => {
    const node = heroRef.current;
    if (!node) return;
    if (!('IntersectionObserver' in window)) {
      setPassed(true);
      return;
    }
    const io = new IntersectionObserver(([entry]) => setPassed(!entry.isIntersecting), {
      rootMargin: '-72px 0px 0px 0px'
    });
    io.observe(node);
    return () => io.disconnect();
  }, [heroRef]);
  return passed;
}
export const START_SEQUENCE = [['stop', 'READY'], ['ready', 'STEADY'], ['go', 'GO!']];
const START_STEP_MS = 1100;
export function useStartLights() {
  const calm = usePrefersReducedMotion();
  const [i, setI] = useState(0);
  useEffect(() => {
    if (calm) return; /* при reduce стоїть на READY */
    const id = window.setInterval(() => setI(n => (n + 1) % START_SEQUENCE.length), START_STEP_MS);
    return () => window.clearInterval(id);
  }, [calm]);
  const [state, word] = START_SEQUENCE[i];
  return {
    state,
    word,
    index: i
  };
}
/* ---------------------------------------------------------------- *
 * 3 · Секція «Локація» — автотайп, кросфейд, прогрес
 *
 * Найтонший вузол. Три таймери, які мають вмирати разом:
 * набір тексту, пауза перед наступним станом і скидання прогресу.
 * ---------------------------------------------------------------- */
/* Прискорено на запит (27.09): швидший набір і коротша пауза.
   Тап по лампі тримає обраний стан RESUME_MS, потім автопрогін іде далі. */
const TYPE_MS = 12; /* на символ */
const HOLD_MS = 1400; /* пауза після набору */
const RESUME_MS = 4000; /* пауза після ручного вибору */
export function useSignal(states) {
  const calm = usePrefersReducedMotion();
  const [index, setIndex] = useState(0);
  const [typed, setTyped] = useState(calm ? states[0].line : '');
  const [done, setDone] = useState(calm);
  /* manual = цей кадр обрала людина: тримаємо довше, потім автопрогін. */
  const [manual, setManual] = useState(false);
  /* Лічильник тапів — щоб повторний тап по тій самій лампі теж перезапускав паузу. */
  const [taps, setTaps] = useState(0);
  const typer = useRef(undefined);
  const holder = useRef(undefined);
  const clear = () => {
    if (typer.current) window.clearTimeout(typer.current);
    if (holder.current) window.clearTimeout(holder.current);
  };
  const pick = useCallback(i => {
    clear();
    setManual(true);
    setTaps(t => t + 1);
    setIndex(i);
  }, []);
  useEffect(() => {
    clear();
    const line = states[index].line;
    if (calm) {
      setTyped(line);
      setDone(true);
      return;
    }
    setTyped('');
    setDone(false);
    let n = 0;
    const step = () => {
      n += 1;
      setTyped(line.slice(0, n));
      if (n < line.length) {
        typer.current = window.setTimeout(step, TYPE_MS);
      } else {
        setDone(true);
        holder.current = window.setTimeout(() => {
          setManual(false);
          setIndex(k => (k + 1) % states.length);
        }, manual ? RESUME_MS : HOLD_MS);
      }
    };
    step();
    return clear;
  }, [index, taps, manual, calm, states]);
  /* Скільки триває цей кадр — стільки й повзе смужка. */
  const frameMs = states[index].line.length * TYPE_MS + (manual ? RESUME_MS : HOLD_MS);
  return {
    index,
    typed,
    done,
    manual,
    pick,
    frameMs,
    current: states[index]
  };
}
/**
 * Прогрес-смужка кадру. Щоб перезапустити анімацію ширини, треба зняти
 * transition, поставити 0, ПРОЧИТАТИ offsetWidth (форсований reflow) і
 * лише тоді ставити тривалість і 100%. Без цього читання браузер склеїть
 * два присвоєння і смужка стрибне.
 */
export function useProgressBar(ref, active, durationMs) {
  const calm = usePrefersReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = 'none';
    el.style.width = active ? '0%' : '';
    if (!active) return;
    void el.offsetWidth; /* саме тут і ламається */
    if (calm) {
      el.style.width = '100%';
      return;
    }
    el.style.transition = `width ${durationMs}ms linear`;
    el.style.width = '100%';
  }, [ref, active, durationMs, calm]);
}
/* ---------------------------------------------------------------- *
 * 4 · Showcase-рейка — їде сама, клік зупиняє назавжди
 * ---------------------------------------------------------------- */
const RAIL_STEP_MS = 3600;
const RAIL_GAP = 16;
export function useRail(total, trackRef) {
  const calm = usePrefersReducedMotion();
  const [at, setAt] = useState(0);
  const [auto, setAuto] = useState(!calm);
  useEffect(() => {
    if (!auto || calm) return;
    const id = window.setInterval(() => setAt(i => (i + 1) % total), RAIL_STEP_MS);
    return () => window.clearInterval(id);
  }, [auto, calm, total]);
  /* Зсув упирається в кінець стрічки, далі не їде. */
  const offset = (() => {
    const track = trackRef.current;
    if (!track) return 0;
    const card = track.firstElementChild;
    if (!card) return 0;
    const step = card.getBoundingClientRect().width + RAIL_GAP;
    const max = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
    return Math.min(at * step, max);
  })();
  /* Людина взяла керування — не відбирай його назад. */
  const pick = useCallback(i => {
    setAuto(false);
    setAt(i);
  }, []);
  return {
    at,
    offset,
    pick,
    auto
  };
}
/* ---------------------------------------------------------------- *
 * 5 · Слайдер на scroll-snap — без каруселі, нативною прокруткою
 * ---------------------------------------------------------------- */
export function useSnapSlider(trackRef, total) {
  const calm = usePrefersReducedMotion();
  const [at, setAt] = useState(0);
  const [canPrev, setCanPrev] = useState(false);
  const [canNext, setCanNext] = useState(true);
  const sync = useCallback(() => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.firstElementChild;
    if (!card) return;
    const step = card.getBoundingClientRect().width + RAIL_GAP;
    setAt(Math.min(total - 1, Math.round(t.scrollLeft / step)));
    setCanPrev(t.scrollLeft > 8);
    setCanNext(t.scrollLeft + t.clientWidth < t.scrollWidth - 8);
  }, [trackRef, total]);
  useEffect(() => {
    const t = trackRef.current;
    if (!t) return;
    sync();
    t.addEventListener('scroll', sync, {
      passive: true
    });
    window.addEventListener('resize', sync);
    return () => {
      t.removeEventListener('scroll', sync);
      window.removeEventListener('resize', sync);
    };
  }, [trackRef, sync]);
  const step = useCallback(dir => {
    const t = trackRef.current;
    if (!t) return;
    const card = t.firstElementChild;
    if (!card) return;
    t.scrollBy({
      left: dir * (card.getBoundingClientRect().width + RAIL_GAP),
      behavior: calm ? 'auto' : 'smooth'
    });
  }, [trackRef, calm]);
  return {
    at,
    canPrev,
    canNext,
    step
  };
}
