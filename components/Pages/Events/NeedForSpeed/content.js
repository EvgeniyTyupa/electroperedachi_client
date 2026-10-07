import { useMemo } from 'react'
import { useNfsCopy } from './useNfsCopy'
/* ------------------------------------------------------------------ *
 * Copy and data for the page. Text is taken verbatim from the Figma
 * mobile frame; FAQ answers and signal lines 2–3 come from the Claude
 * Design prototype (reference/landing.html), which the frame doesn't show.
 * ------------------------------------------------------------------ */
const nadai = "/images/need_for_speed/lineup-nadai.webp";
export const LINKS = {
  tickets: '#tickets',
  about: '#ten',
  /* No dress-code section on mobile yet — point this at it once it exists. */
  lineup: '#lineup',
  dressCode: '#faq',
  /* Aftermovie video URL for the rail's video card — empty until there is one. */
  aftermovie: '',
  /* The three YouTube cards in the rail — empty until the videos are chosen. */
  videos: ['', '', '']
};
/* Figma (1073:574) only fills in Nadai; the rest reuse the placeholder photo
   until their cards are designed. */
export const LINEUP = [{
  name: 'Nadai',
  role: 'Засновник electroperedachi',
  time: '21:00 — 22:30',
  tags: ['Techno', 'Live'],
  img: nadai
}, {
  name: 'Paul Meise',
  img: nadai
}, {
  name: 'Noff',
  img: nadai
}, {
  name: 'Staylen',
  img: nadai
}, {
  name: 'Lorenzo Raganzini',
  img: nadai
}];
export const SIGNAL_STATES = [{
  at: 'stop',
  label: 'Нагорі',
  line: 'Смуги, світлофори і правила. Сирени, обмеження, черга.'
}, {
  at: 'ready',
  label: 'На вході',
  line: 'Квиток, браслет, гардероб. Хвилина — і ти всередині. Далі правил уже немає.'
}, {
  at: 'go',
  label: 'У паркінгу',
  line: 'Танцпол без лімітів. Бетон, колони, фари і саунд, що проходить крізь тіло.'
}];
export const FAQ = [['Де саме це буде?', 'Підземний паркінг, центр міста, Київ. Точна адреса і схема заїзду прийдуть у день події.'], ['Чи це безпечно?', 'Паркінг сам по собі є укриттям. Саме тому ми обрали цей формат.'], ['Як це працює вдень?', 'Стартуємо о 16:00 і граємо до 00:30.'], ['Чи можна купити квиток на вході?', 'Так, але це буде найдорожча ціна вечора.'], ['Як заїхати своєю машиною в експо-зону?', 'Разом із квитком прийде контакт — напиши, і ми розкажемо умови. Місць обмежена кількість.'], ['Чи є паркування для гостей?', 'Назовні є великий паркінг.'], ['Дрес-код обовʼязковий?', 'Ні. Архетипи — це підказка, а не вимога. Але вечір виглядатиме так, як ви його вдягнете.'], ['Чи буде бар і їжа?', 'Так, працюють весь вечір.'], ['Гардероб?', 'Так. Листопад, без цього ніяк.'], ['Я не отримав квиток на пошту.', 'Перевір спам. Якщо за 10 хвилин не прийшов — напиши нам, контакти внизу сторінки.']];
export const formatUah = n => n.toLocaleString('uk-UA').replace(/\s/g, ' ');

export function useNfsContent() {
  const copy = useNfsCopy()
  return useMemo(() => ({
    LINEUP: LINEUP.map(item => ({ ...item, role: item.role ? copy(item.role) : undefined })),
    SIGNAL_STATES: SIGNAL_STATES.map(item => ({ ...item, label: copy(item.label), line: copy(item.line) })),
    FAQ: FAQ.map(([question, answer]) => [copy(question), copy(answer)])
  }), [copy])
}
