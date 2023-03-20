import React from 'react'
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { TextField } from '@mui/material';

const CustomDatepicker = (props) => {
    const { 
        value,
        onChange,
        label,
        error,
        disablePast = false,
        inputColor = "black"
    } = props

    const classes = {
        width: "100%",
        color: "black",
        '& input::placeholder': {
            color: "black"
        },
        '& label.Mui-focused': {
            color: '#FF5500'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF5500' 
        },
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: "rgba(255, 85, 0, .3)"
        },
        '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: "rgba(255, 85, 0, .6)"
        },
        '& .MuiFormHelperText-root.Mui-error': {
            margin: 0,
            marginTop: 5,
        },
        '& .MuiInputLabel-root': {
            color: "gray"
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            color: inputColor,
        }
    }

    const handleChange = (newValue) => {
        onChange(newValue)
    }

    return (
        <MobileDatePicker
            label={label}
            inputFormat="DD/MM/yyyy"
            value={value}
            disablePast={disablePast}
            onChange={handleChange}
            renderInput={(params) => (
                <TextField
                    {...params}
                    error={!!error}
                    sx={classes}
                />
            )}
        />
    )
}

export default CustomDatepicker