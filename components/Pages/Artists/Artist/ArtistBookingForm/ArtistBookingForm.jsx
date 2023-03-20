import React from 'react'
import { useRouter } from "next/router"
import { Controller, useForm } from "react-hook-form"
import { Button } from "@mui/material"
import Container from "../../../../UI/Container/Container"
import CustomDatePicker from "../../../../UI/Form/CustomDatePicker"
import CustomInput from "../../../../UI/Form/CustomInput"
import Header from "../../../../UI/Text/Header/Header"
import classes from './ArtistBookingForm.module.css'
import CustomSelect from '../../../../UI/Form/CustomSelect'
import { MenuItem } from '@mui/material'
import Toogle from '../../../../UI/Form/Toogle/Toogle'
import { useEffect } from 'react'
import { useState } from 'react'
import { bookingApi, employeeApi } from "../../../../../api/api"
import Preloader from "../../../../Common/Preloader/Preloader"

import Aos from 'aos';
import 'aos/dist/aos.css';
import { useIntl } from 'react-intl'
import { useAppContext } from '../../../../../context/AppContext'

const ArtistBookingForm = () => {
    const { setServerResponse, setServerError, setIsFetchingContext } = useAppContext()

    const [isFetching, setIsFetching] = useState(false)
    const [artistsList, setArtistsList] = useState([])

    const router = useRouter()

    const intl = useIntl()

    const defaultArtistNameCode = router.query.id ? router.query.id : null

    const { handleSubmit, reset, control } = useForm()

    const onSubmit = async (data) => {
        data.phone = "+" + data.phone

        try {
            setIsFetchingContext(true)
            await bookingApi.sendToTelegramMessage(data)
            setServerResponse("Booking Request successfully sended!")
            reset({})
        } catch (err) {
            setServerError("Server Error!")
        } finally {
            setIsFetchingContext(false)
        }
    }

    const fetchArtists = async () => {
        setIsFetching(true)
        let { employees } = await employeeApi.getEmployees(1, 10000)
        setArtistsList(employees.filter(el => el.role === "artist"))
        setIsFetching(false)
    }

    useEffect(() => {
        Aos.init({duration: 1000})
        fetchArtists()
    }, [])
    
    useEffect(() => {
        reset({
            artist: defaultArtistNameCode,
            artist_fee_currency: "usd",
        })
    }, [artistsList])
    
    return (
        <div className={classes.main}>
            {isFetching && <Preloader/>}
            <Container className={classes.container}>
                <Header type="h2">{intl.formatMessage({ id: "booking.title" })}</Header>
                <form onSubmit={handleSubmit(onSubmit)} className={classes.form} data-aos="fade-down" data-aos-duration="2000">
                    <div className={classes.column}>
                        <Controller
                            name="artist"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomSelect
                                    onChange={onChange}
                                    value={value}
                                    inputColor="black"
                                    label={intl.formatMessage({ id: "booking.artist" })}
                                >
                                    {artistsList.map(el => (
                                        <MenuItem value={el.name_code}>{el.name}</MenuItem>
                                    ))}
                                </CustomSelect>
                            )}
                        />
                        <Controller
                            name="event_date"
                            control={control}
                            defaultValue=""
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomDatePicker
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.event_date" })}
                                    disablePast={true} 
                                />
                            )}
                        />
                        <div className={classes.field}>
                            <div className={classes.currency}>
                                <Controller
                                    name="artist_fee_currency"
                                    control={control}
                                    defaultValue=""
                                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                                        <CustomSelect
                                            onChange={onChange}
                                            value={value}
                                            inputColor="black"
                                        >
                                            <MenuItem value="uah">₴ UAH</MenuItem>
                                            <MenuItem value="euro">€ EURO</MenuItem>
                                            <MenuItem value="usd">$ USD</MenuItem>
                                        </CustomSelect>
                                    )}
                                />
                            </div>
                            <Controller
                                name="artist_fee"
                                control={control}
                                defaultValue=""
                                render={({ field: { onChange, value }, fieldState: { error } }) => (
                                    <CustomInput
                                        onChange={onChange}
                                        value={value}
                                        placeholder=""
                                        label={intl.formatMessage({ id: "booking.fee" })}
                                        regex="number"
                                    />
                                )}
                            />
                        </div>
                        <Controller
                            name="is_buyer_pays"
                            control={control}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <Toogle
                                    onChange={onChange}
                                    checked={value}
                                    label={intl.formatMessage({ id: "booking.buyer_pay" })}
                                />
                            )}
                        />
                    </div>
                    <div className={classes.column}>
                        <Controller
                            name="requester_name"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.name" })}
                                />
                            )}
                        />
                        <Controller
                            name="requester_email"
                            control={control}
                            rules={{ 
                                required: {
                                    value: true,
                                    message: intl.formatMessage({ id: "form.error.required" })
                                },
                                pattern: {
                                    value: /^[A-Za-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}/,
                                    message: intl.formatMessage({ id: "form.error.invalid_email" })
                                }
                            }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.email" })}
                                />
                            )}
                        />
                        <Controller
                            name="requester_phone"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.phone" })}
                                    regex="number"
                                    startAdornment={true}
                                    startAdornmentContent="+"
                                />
                            )}
                        />
                        <Controller
                            name="requester_organisation"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.organisation" })}
                                />
                            )}
                        />
                    </div>
                    <div className={classes.column}>
                        <Controller
                            name="venue"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.venue.name" })}
                                />
                            )}
                        />
                        <Controller
                            name="venue_country"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.venue.country" })}
                                />
                            )}
                        />
                        <Controller
                            name="venue_city"
                            control={control}
                            rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                            defaultValue=""
                            render={({ field: { onChange, value }, fieldState: { error } }) => (
                                <CustomInput
                                    onChange={onChange}
                                    value={value}
                                    error={error}
                                    label={intl.formatMessage({ id: "booking.venue.city" })}
                                />
                            )}
                        />
                        <Button type="submit" className={classes.submitBut}>{intl.formatMessage({ id: "booking.submit" })}</Button>
                    </div>
                </form>
            </Container>
        </div>
    )
}

export default ArtistBookingForm