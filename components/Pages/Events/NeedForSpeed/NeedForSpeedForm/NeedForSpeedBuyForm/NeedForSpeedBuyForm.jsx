import { useNfsCopy } from "../../useNfsCopy";
import LoyaltyCheckout from "../../../../../../components/Common/LoyaltyCheckout";
import { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import Link from "next/link";
import moment from "moment";
import { v4 as uuidv4 } from "uuid";
import { eventApi, userApi } from "../../../../../../api/api";
import { useAppContext } from "../../../../../../context/AppContext";
import { getFbCookies } from "../../../../../../utils/getFbCookies";
import { trackCheckout } from "../../needForSpeedTracking";
import { cx } from "../../needForSpeedClasses";
import classes from "./NeedForSpeedBuyForm.module.css";
const NeedForSpeedBuyForm = ({
  event,
  desktop,
  ticketCart,
  totalPrice,
  setDiscount,
  controls
}) => {
  const nfsCopy = useNfsCopy();
  const {
    register,
    handleSubmit,
    getValues,
    watch,
    setValue,
    formState: {
      errors
    }
  } = useForm();
  const router = useRouter();
  const {
    setIsFetchingContext,
    setServerError,
    setServerResponse
  } = useAppContext();
  const [loyaltyPoints, setLoyaltyPoints] = useState(0);
  const [loyaltyQuote, setLoyaltyQuote] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [checkingPromo, setCheckingPromo] = useState(false);
  const [appliedPromo, setAppliedPromo] = useState(null);
  const [promoError, setPromoError] = useState("");
  const [submitError, setSubmitError] = useState("");
  const payableTotal = loyaltyQuote?.payableKopecks !== undefined && !loyaltyQuote.pending ? loyaltyQuote.payableKopecks / 100 : totalPrice;
  const submitLock = useRef(false);
  const hasPromo = !event.is_multi_buy && (event.promocodes || []).some(promo => (!promo.start || moment().isSameOrAfter(promo.start)) && (!promo.end || moment().isSameOrBefore(promo.end)));
  // Expired promo codes must not leave discounted prices in the cart.
  useEffect(() => {
    if (appliedPromo && !hasPromo) {
      setAppliedPromo(null);
      setDiscount(0);
    }
  }, [hasPromo, appliedPromo, setDiscount]);
  const checkPromocode = async () => {
    const value = (getValues("promocode") || "").trim();
    if (!value || checkingPromo) return;
    setCheckingPromo(true);
    setPromoError("");
    try {
      const response = await eventApi.checkPromocode(value, event._id);
      const percent = Number(response?.promocode?.discount);
      if (response === "not valid" || !Number.isFinite(percent) || percent < 0 || percent > 100) {
        setPromoError(nfsCopy("Промокод недійсний"));
        return;
      }
      setAppliedPromo(value);
      setDiscount(percent);
      setServerResponse(nfsCopy("Промокод застосовано"));
    } catch (error) {
      setPromoError(nfsCopy("Не вдалося перевірити промокод. Спробуйте ще раз."));
    } finally {
      setCheckingPromo(false);
    }
  };
  const onSubmit = async data => {
    if (submitLock.current || loyaltyQuote?.pending || checkingPromo || !event._id || !ticketCart.length || totalPrice <= 0) return;
    submitLock.current = true;
    setSubmitting(true);
    setSubmitError("");
    setIsFetchingContext(true);
    try {
      const {
        fbp,
        fbc
      } = getFbCookies();
      const eventId = uuidv4();
      const phone = data.phone.replace(/\D/g, "").replace(/^380/, "0");
      const response = await userApi.add({
        phone,
        email: data.email.trim(),
        ticketCart,
        points: loyaltyPoints,
        promo: typeof router.query.promo === "string" ? router.query.promo : "",
        eventId: event._id,
        promocode: appliedPromo || "",
        fbp,
        fbc,
        ua: navigator.userAgent,
        event_id: eventId
      });
      if (!response?.url) throw new Error("Payment URL missing");
      const paymentUrl = new URL(response.url, window.location.origin);
      if (!["http:", "https:"].includes(paymentUrl.protocol)) throw new Error("Invalid payment URL");
      const tasks = [trackCheckout({
        eventId,
        total: payableTotal,
        count: ticketCart.reduce((sum, item) => sum + item.count, 0),
        email: data.email.trim(),
        phone,
        fbp,
        fbc
      })];
      if (event.google_table_id) tasks.push(Promise.resolve().then(() => eventApi.saveDataToGoogleSheet({
        date: moment().format("DD/MM/YYYY HH:mm"),
        email: data.email.trim(),
        phone,
        totalPrice: "",
        userURL: router.asPath
      }, event.google_table_id, "sheet1")));
      // Bound optional tracking to keep a slow pixel / sheet from blocking checkout.
      let timeout;
      await Promise.race([Promise.allSettled(tasks), new Promise(resolve => {
        timeout = window.setTimeout(resolve, 1200);
      })]);
      window.clearTimeout(timeout);
      window.location.replace(paymentUrl.href);
    } catch (error) {
      const message = nfsCopy("Не вдалося перейти до оплати. Спробуйте ще раз.");
      setSubmitError(message);
      setServerError(message);
      submitLock.current = false;
      setSubmitting(false);
      setIsFetchingContext(false);
    }
  };
  return <form className={cx(desktop ? "buy buy--d" : "buy")} id="buy" onSubmit={handleSubmit(onSubmit)} noValidate aria-busy={submitting}>
            <fieldset disabled={submitting} className={classes.fields}>
                <p className={cx("kicker")}>{" " + nfsCopy("Квитки") + " "}</p>
                <h3 className={cx("h3")}>{" " + nfsCopy("Купити квиток") + " "}</h3>
                <p className={cx(desktop ? "body-d dim" : "body-sm dim")}>{" " + nfsCopy("Після оплати квиток буде висланий на Ваш email, вказаний при заповненні форми.") + " "}<br /><br />
                    <span className={cx("buy__note")}>{" " + nfsCopy("Зверніть увагу:") + " "}</span>{" " + nfsCopy("для особи, яка не досягла повнолітнього віку, квиток втрачає свою важливість. Якщо у вас є якісь питання чи проблеми з придбанням/отриманням квитка/грошей — будь ласка, зв’яжіться з нами. Ми не повертаємо кошти внаслідок зміни рішення відвідувача, лише за умови змін від організатора.") + " "}</p>
                {typeof controls === "function" ? controls(payableTotal) : controls}
                <label className={cx("field")}>
                    <span className={cx("field__label hud-label")}>{" " + nfsCopy("Телефон") + " "}</span>
                    <input className={cx("field__input")} type="tel" autoComplete="tel" placeholder="+380" aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "nfs-phone-error" : undefined} {...register("phone", {
          required: nfsCopy("Вкажіть телефон"),
          validate: value => /^(?:380|0)\d{9}$/.test(value.replace(/\D/g, "")) || nfsCopy("Вкажіть номер у форматі 0XXXXXXXXX або +380XXXXXXXXX")
        })} />
                    {errors.phone && <span className={classes.error} id="nfs-phone-error">{errors.phone.message}</span>}
                </label>
                <label className={cx("field")}>
                    <span className={cx("field__label hud-label")}>Email</span>
                    <input className={cx("field__input")} type="email" autoComplete="email" placeholder="you@mail.com" aria-invalid={!!errors.email} aria-describedby={errors.email ? "nfs-email-error" : undefined} {...register("email", {
          required: nfsCopy("Вкажіть email"),
          pattern: {
            value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
            message: nfsCopy("Перевірте email")
          },
          setValueAs: value => value.trim()
        })} />
                    {errors.email && <span className={classes.error} id="nfs-email-error">{errors.email.message}</span>}
                </label>
                {hasPromo && <div className={cx("stack stack--16")}>
                        <div className={cx("field")}>
                            <label htmlFor="nfs-promocode" className={cx("field__label hud-label")}>{" " + nfsCopy("Промокод") + " "}</label>

                            <div className={classes.promoInputWrap}>
                                <input id="nfs-promocode" className={`${cx("field__input")} ${classes.promoInput}`} readOnly={!!appliedPromo || checkingPromo} aria-invalid={!!promoError} aria-describedby={promoError ? "nfs-promo-error" : undefined} {...register("promocode")} />

                                <button type="button" className={classes.promoInputButton} disabled={checkingPromo || submitting} onClick={appliedPromo ? () => {
              setAppliedPromo(null);
              setDiscount(0);
              setPromoError("");
            } : checkPromocode}>
                                    {checkingPromo ? nfsCopy("Перевіряємо…") : appliedPromo ? nfsCopy("Скасувати") : nfsCopy("Застосувати")}
                                </button>
                            </div>
                        </div>

                        {appliedPromo && <p role="status">{" " + nfsCopy("Промокод застосовано") + " "}</p>}

                        {promoError && <p id="nfs-promo-error" className={classes.error} role="alert">
                                {promoError}
                            </p>}
                    </div>}
                <p className={cx("body-sm muted")}>{" " + nfsCopy("Хочеш заїхати своєю тачкою в експо-зону? Місць обмежено — контакт разом із квитком.") + " "}</p>
                <label className={classes.consent}>
                    <input type="checkbox" {...register("terms", {
          required: true
        })} />
                    <span>{" " + nfsCopy("Погоджуюсь з") + " "}<Link href="/terms-of-use" target="_blank">{" " + nfsCopy("умовами користування") + " "}</Link>{" " + nfsCopy("та") + " "}<Link href="/privacy-policy" target="_blank">{" " + nfsCopy("політикою конфіденційності") + " "}</Link>.</span>
                </label>
                {errors.terms && <p role="alert" className={classes.error}>{" " + nfsCopy("Підтвердіть згоду з умовами.") + " "}</p>}
                <label className={classes.consent}>
                    <input type="checkbox" {...register("rules", {
          required: true
        })} />
                    <span>{" " + nfsCopy("Погоджуюсь з") + " "}<a href="/Terms_and_rules_at_electroperedachi_events.pdf" target="_blank" rel="noreferrer">{" " + nfsCopy("правилами заходів electroperedachi") + " "}</a>.</span>
                </label>
                {errors.rules && <p role="alert" className={classes.error}>{" " + nfsCopy("Підтвердіть згоду з правилами.") + " "}</p>}
                <LoyaltyCheckout eventId={event._id} ticketCart={ticketCart} promocode={appliedPromo || ""} points={loyaltyPoints} onChange={setLoyaltyPoints} email={watch("email") || ""} onEmailChange={value => setValue("email", value, {
        shouldValidate: true
      })} onQuoteChange={setLoyaltyQuote} />
                {submitError && <p role="alert" className={classes.error}>{submitError}</p>}
                <hr className={cx("rule")} />
                <p className={cx("lead muted")}>{" " + nfsCopy("Вмикай двигун — той, що в тебе в грудях!") + " "}</p>
                <button className={cx("cta cta--lg cta--block pay")} type="submit" disabled={submitting || loyaltyQuote?.pending || checkingPromo || !ticketCart.length || totalPrice <= 0}>
                    <span className={cx("cta__label")}>{submitting ? nfsCopy("Переходимо до оплати…") : `${nfsCopy("Купити квиток")} →`}</span>
                    <span>{payableTotal.toLocaleString("uk-UA", {
            maximumFractionDigits: 2
          })} ₴</span>
                </button>
            </fieldset>
        </form>;
};
export default NeedForSpeedBuyForm;
