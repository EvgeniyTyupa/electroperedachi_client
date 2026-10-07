import { useNfsCopy } from "./useNfsCopy";
import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { getTicketTypes, hasEventEnded } from "./needForSpeedPricing";
const Context = createContext(null);
export function NeedForSpeedProvider({
  event,
  sales = {},
  children
}) {
  const [now, setNow] = useState(() => Date.now());
  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 30000);
    return () => window.clearInterval(id);
  }, []);
  const value = useMemo(() => {
    const ended = hasEventEnded(event, now);
    const ticketTypes = ended ? [] : getTicketTypes(event, now);
    const price = ticketTypes.length ? Math.min(...ticketTypes.map(item => item.unitPrice)) : null;
    return {
      event,
      ticketTypes,
      price,
      ended,
      sales
    };
  }, [event, sales, now]);
  return <Context.Provider value={value}>{children}</Context.Provider>;
}
export const useNeedForSpeed = () => useContext(Context);
export function CurrentPrice() {
  const nfsCopy = useNfsCopy();
  const {
    price
  } = useNeedForSpeed();
  return price === null ? nfsCopy("Продаж закрито") : `${price.toLocaleString("uk-UA")} ₴`;
}
