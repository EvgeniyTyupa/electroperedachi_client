import classes from "./CooperateForm.module.css"
import { Controller, useForm } from "react-hook-form"
import CustomInput from "../../../UI/Form/CustomInput"
import { useIntl } from "react-intl"
import ActionButton from "../../../UI/Buttons/ActionButton/ActionButton"

const CooperateForm = (props) => {
    const { theme } = props

    const { control, handleSubmit, reset } = useForm()

    const intl = useIntl()

    const onSubmit = (data) => {
        console.log(data)
    }

    return (
        <form onSubmit={handleSubmit(onSubmit)} className={classes.main}>
            <div className={classes.fields}>
                <Controller
                    name="contact_person_name"
                    control={control}
                    defaultValue=""
                    rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomInput
                            onChange={onChange}
                            value={value}
                            placeholder=""
                            error={error}
                            inputColor="white"
                            label={intl.formatMessage({ id: "cooperate.name" }) + "*"}
                        />
                    )}
                />
                <Controller
                    name="email"
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
                            inputColor="white"
                            label={intl.formatMessage({ id: "booking.email" })}
                        />
                    )}
                />
                <Controller
                    name="phone"
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
                            inputColor="white"
                            startAdornment={true}
                            startAdornmentContent="+"
                        />
                    )}
                />
                <ActionButton type="submit">{intl.formatMessage({ id: "booking.submit" })}</ActionButton>
            </div>
            <div className={classes.textField}>
                <Controller
                    name="message"
                    control={control}
                    defaultValue=""
                    rules={{ required: intl.formatMessage({ id: "form.error.required" }) }}
                    render={({ field: { onChange, value }, fieldState: { error } }) => (
                        <CustomInput
                            onChange={onChange}
                            value={value}
                            error={error}
                            multiline={true}
                            inputColor="white"
                            withHelperText={false}
                            placeholder={intl.formatMessage({ id: "cooperate.placeholderMessage" })}
                        />
                    )}
                />
            </div>
        </form>
    )
}

export default CooperateForm