import React from "react"
import { InputAdornment, TextField } from "@mui/material"

const CustomInput = (props) => {
    const {
        value,
        placeholder = "",
        onChange,
        label,
        error,
        multiline = false,
        rows = 5,
        type = "text",
        variant = "outlined",
        endAdornment = false,
        startAdornment = false,
        startAdornmentContent = null,
        endAdornmentContent = null,
        regex = null,
        inputColor = "black",
        withHelperText = true
    } = props

    const classes = {
        // background: "#1A1A1A",
        width: "100%",
        "& input::placeholder": {
            color: "white"
        },
        "& label.Mui-focused": {
            color: "#FF5500",
            fontFamily: "Helvetica"
        },
        "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline":
            {
                borderColor: "#FF5500"
            },
        "& .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 85, 0, .3)"
        },
        "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "rgba(255, 85, 0, .6)"
        },
        "& .MuiFormHelperText-root.Mui-error": {
            margin: 0,
            marginTop: 5
        },
        "& .MuiInputLabel-root": {
            color: "gray",
            fontFamily: "Helvetica"
        },
        "& .MuiOutlinedInput-root": {
            borderRadius: 0,
            color: inputColor,
            fontFamily: "Helvetica"
        },
        "& .MuiFormHelperText-root.Mui-error": {
            marginTop: "8px",
            marginLeft: 0
        }
    }

    const handleChange = (e) => {
        if (regex === "number") {
            const onlyNums = e.target.value.replace(/[^0-9]/g, "")
            onChange(onlyNums)
        } else {
            onChange(e.target.value)
        }
    }

    return (
        <TextField
            value={value}
            placeholder={placeholder}
            helperText={(withHelperText && error) ? error.message : null}
            onChange={handleChange}
            label={label}
            error={!!error}
            multiline={multiline}
            rows={rows}
            type={type}
            variant={variant}
            sx={classes}
            InputProps={{
                startAdornment: startAdornment && (
                    <InputAdornment
                        position="start"
                        style={{
                            width: "fit-content",
                            marginRight: "10px",
                            color: "white"
                        }}
                        sx={{
                            "& p": {
                                color: inputColor,
                                opacity: .5
                            }
                        }}
                    >
                        {startAdornmentContent}
                    </InputAdornment>
                ),
                endAdornment: endAdornment && (
                    <InputAdornment
                        position="end"
                        style={{ width: "fit-content", marginRight: "10px" }}
                    >
                        {endAdornmentContent}
                    </InputAdornment>
                )
            }}
        />
    )
}

export default CustomInput
