import {ChangeEventHandler} from "react";
import "./date-picker.scss"

type DatePickerProps = {
    name: string,
    label: string,
    id: string,
    onChange: ChangeEventHandler<HTMLInputElement>
}

export default function AppDatePicker({label, name, onChange, id}: DatePickerProps) {
    return (
        <>
            <label htmlFor={id}>{label}</label>
            <input id={id} type="date" onChange={onChange} name={name}/>
        </>
    )
}