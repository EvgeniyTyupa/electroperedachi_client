import classes from "./EventBuyTicketForm.module.css"
import { useForm, Controller } from "react-hook-form"
import { useIntl } from "react-intl"
import { cx } from "../../../../../../utils/classnames"

import visa from "/public/images/visa.png"
import mastercard from "/public/images/mastercard.png"
import preloader from "/public/images/mini_preloader.svg"
import {
    TextField,
    InputAdornment,
    FormControlLabel,
    Checkbox,
    Button
} from "@mui/material"
import { eventApi, userApi } from "../../../../../../api/api"
import { useAppContext } from "../../../../../../context/AppContext"
import { logEvent } from "../../../../../../utils/gtag"
import { useRouter } from "next/router"
import moment from "moment"
import { useState } from "react"
import { useEffect } from "react"
import Link from "next/link"

const EventBuyTicketForm = (props) => {
    const { totalPrice, count, event, price, setDiscount, totalPriceDiscount } = props

    const { setIsFetchingContext, setServerError, setServerResponse } = useAppContext()

    const [isLoadingPromocode, setIsLoadingPromocode] = useState(false)
    const [checkPromocodeError, setCheckPromocodeError] = useState(false)
    const [isAppliedPromo, setIsAppliedPromo] = useState(false)

    const [isHaveActualPromocode, setIsHaveActualPromocode] = useState(false)

    const router = useRouter()
    const { query } = router

    const currentURL = router.asPath;

    const { control, handleSubmit, reset, getValues } = useForm()

    const intl = useIntl()

    const onSubmit = async (data) => {
        setIsFetchingContext(true)
        try {
            const response = await userApi.add(
                data.email,
                data.phone,
                (isAppliedPromo || event.is_multi_buy) ? totalPriceDiscount : totalPrice,
                count,
                query.promo || "",
                event._id,
                isAppliedPromo ? data.promocode : ""
            )

            logEvent("Purchase", "Buy Ticket", event.title, isAppliedPromo ? totalPriceDiscount : totalPrice)

            import("react-facebook-pixel")
                .then((module) => module.default)
                .then((ReactPixel) => {
                    // ReactPixel.init("573414703062456")
                    ReactPixel.init("1667954890675870")
                    ReactPixel.track("InitiateCheckout", {
                        value: isAppliedPromo ? totalPriceDiscount : totalPrice,
                        currency: "UAH"
                    })
                })

            // await eventApi.saveDataToGoogleSheet({
            //     date: moment().format('DD/MM/YYYY HH:mm'),
            //     email: data.email,
            //     phone: data.phone,
            //     totalPrice: "",
            //     userURL: currentURL
            // }, 1)

            window.location.replace(response.url)
        } catch (err) {
            setServerError("Server Error, try again")
        }
        setIsFetchingContext(false)

        reset({
            email: "",
            phone: ""
        })
    }

    const checkPromocode = async () => {
        if (getValues().promocode) {
            setIsLoadingPromocode(true)
            const response = await eventApi.checkPromocode(
                getValues().promocode,
                event._id
            )

            if (response !== "not valid") {
                setCheckPromocodeError(false)
                setServerResponse("Promocode applied!")
                const discount = (price / 100) * Number(response.promocode.discount)
                setDiscount(discount)
                setIsAppliedPromo(true)
            } else {
                setCheckPromocodeError(true)
            }
            setIsLoadingPromocode(false)
        }
    }

    useEffect(() => {
        if (event && event.promocodes.length > 0) {
            event.promocodes.forEach(el => {
                if (moment() >= moment(el.start) && moment() <= moment(el.end)) {
                    setIsHaveActualPromocode(true)
                }
            })
        }
    }, [event])

    const material = {
        width: "100%",
        "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "black"
            },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            borderTopRightRadius: "50px",
            borderBottomRightRadius: "50px"
        },
        "& .MuiFormLabel-root": {
            color: "black",
            borderColor: "black",
            "@media screen and (max-width: 468px)": {
                fontSize: "14px"
            }
        },
        "& .MuiInputLabel-root.Mui-focused": {
            color: "black"
        },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "black"
        },
        "& .MuiInputBase-root": {
            color: "black",
            "@media screen and (max-width: 468px)": {
                height: "50px"
            }
        },
        "& .MuiFormHelperText-contained": {
            marginLeft: 0,
            marginTop: "5px",
            "@media screen and (max-width: 468px)": {
                fontSize: "12px"
            }
        },
        "& .MuiTypography-colorTextSecondary": {
            color: "black"
        }
    }

    return (
        <form className={classes.main} onSubmit={handleSubmit(onSubmit)}>
            <p className={classes.title}>
                {intl.formatMessage({ id: "event.form.title" })}
            </p>
            <div className={cx(classes.field, classes.phoneInput)}>
                <Controller
                    name="phone"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: intl.formatMessage({
                            id: "form.error.required"
                        }),
                        pattern: {
                            value: /^[0-9]\d{9}$/,
                            message: intl.formatMessage({
                                id: "form.error.invalid_phone"
                            })
                        }
                    }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error }
                    }) => (
                        <TextField
                            error={!!error}
                            helperText={error ? error.message : null}
                            sx={material}
                            label={intl.formatMessage({
                                id: "event.form.phone"
                            })}
                            variant="outlined"
                            onChange={onChange}
                            value={value}
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment
                                        classes={{ root: classes.adornment }}
                                        position="start"
                                    >
                                        +38
                                    </InputAdornment>
                                )
                            }}
                        />
                    )}
                />
            </div>
            <div className={classes.field}>
                <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{
                        required: intl.formatMessage({
                            id: "form.error.required"
                        }),
                        pattern: {
                            value: /^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                            message: intl.formatMessage({
                                id: "form.error.invalid_email"
                            })
                        }
                    }}
                    render={({
                        field: { onChange, value },
                        fieldState: { error }
                    }) => (
                        <TextField
                            error={!!error}
                            helperText={error ? error.message : null}
                            sx={material}
                            label={"E-mail"}
                            variant="outlined"
                            onChange={onChange}
                            value={value}
                        />
                    )}
                />
            </div>
            {(!event.is_multi_buy && isHaveActualPromocode && !isAppliedPromo) && (
                <div className={classes.field}>
                    <Controller
                        name="promocode"
                        control={control}
                        defaultValue=""
                        render={({
                            field: { onChange, value }
                        }) => (
                            <TextField
                                error={checkPromocodeError}
                                helperText={checkPromocodeError ? intl.formatMessage({ id: "form.error.promocode" }) : null}
                                sx={{
                                    ...material,
                                    "& .MuiInputBase-root": {
                                        paddingRight: 0
                                    }
                                }}
                                label={intl.formatMessage({ id: "event.form.promocode" })}
                                variant="outlined"
                                onChange={onChange}
                                value={value}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position='end'>
                                            <Button
                                                className={classes.promoBut}
                                                onClick={checkPromocode}
                                                disabled={isLoadingPromocode}
                                            >
                                                {isLoadingPromocode ? (
                                                    <img src={preloader.src} alt="preloader" className={classes.miniPreloader}/>
                                                ) : (
                                                    intl.formatMessage({ id: "button.promocode" })
                                                )}
                                            </Button>
                                        </InputAdornment>
                                    )
                                }}
                            />
                        )}
                    />
                </div>
            )}
            <div className={cx(classes.field, classes.confirm)}>
                <FormControlLabel
                    sx={{
                        fontFamily: "Helvetica"
                    }}
                    control={<Checkbox required={true} onChange={() => ""} />}
                    label={
                        <>
                            {intl.formatMessage({
                                id: "event.form.confirm_text"
                            })}
                            &nbsp;
                            <Link
                                className={classes.rulesLink}
                                target="_blank"
                                href="/terms-of-use"
                            >
                                {intl.formatMessage({
                                    id: "event.form.confirm_text1"
                                })}
                            </Link>
                            &nbsp;
                            {intl.formatMessage({
                                id: "event.form.confirm_text2"
                            })}
                            &nbsp;
                            <Link
                                className={classes.rulesLink}
                                target="_blank"
                                href="/privacy-policy"
                            >
                                {intl.formatMessage({
                                    id: "event.form.confirm_text1"
                                })}
                            </Link>
                        </>
                    }
                />
            </div>
            <div className={cx(classes.field, classes.confirm)}>
                <FormControlLabel
                    sx={{
                        fontFamily: "Helvetica"
                    }}
                    control={<Checkbox required={true} onChange={() => ""} />}
                    label={
                        <>
                            {intl.formatMessage({
                                id: "event.form.confirm_rules"
                            })}
                            &nbsp;
                            <a
                                className={classes.rulesLink}
                                target="_blank"
                                href="/Terms_and_rules_at_electroperedachi_events.pdf"
                            >
                                {intl.formatMessage({
                                    id: "event.form.confirm_rules_link"
                                })}
                            </a>
                        </>
                    }
                />
            </div>
            <div className={classes.form_footer}>
                <Button type={"submit"} className={classes.buyBut}>
                    {intl.formatMessage({ id: "button.buyTicket" })}
                </Button>
                <div className={classes.payment_sources}>
                    <img src={mastercard.src} alt="Mastercard" />
                    <img src={visa.src} alt="Visa" />
                </div>
            </div>
        </form>
    )
}

export default EventBuyTicketForm
