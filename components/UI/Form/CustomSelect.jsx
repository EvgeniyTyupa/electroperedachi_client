import { TextField } from "@mui/material";
import { MdKeyboardArrowDown } from "react-icons/md"

const CustomSelect = (props) => {
    const {
        value,
        onChange,
        label,
        error,
        children,
        variant = "outlined",
        inputColor
    } = props

    const classes = {
        // background: "#1A1A1A",
        width: "100%",
        color: inputColor,
        fontFamily: "Helvetica",
        "& svg": {
            color: inputColor ? inputColor : "rgba(255, 255, 255, .4)"
        },
        '& .MuiMenuItem-root .MuiMenuItem-gutters .MuiButtonBase-root': {
            display: "flex !important",
        },
        '& .MuiMenuItem-root': {
            display: "flex",
            fontFamily: "Helvetica"
        },
        '& label': {
            color: inputColor,
            fontFamily: "Helvetica"
        },
        '& label.Mui-focused': {
            color: '#FF5500'
        },
        '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#FF5500' 
        },
        '& .MuiOutlinedInput-root': {
            borderRadius: 0,
            color: inputColor,
            fontFamily: "Helvetica"
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
        '& .MuiList-root .MuiList-padding .MuiMenu-list': {
            display: "flex",
            flexDirection: "column"
        }
    }

    return (
        <TextField
            value={value}
            label={label}
            onChange={onChange}
            error={!!error}
            helperText={error ? error.message : null}
            variant={variant}
            sx={classes}
            select
            SelectProps={{
                IconComponent: MdKeyboardArrowDown
            }}
        >
          {children}
        </TextField>
    )
}

export default CustomSelect