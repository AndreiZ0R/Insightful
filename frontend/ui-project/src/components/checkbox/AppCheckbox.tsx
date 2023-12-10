import {ChangeEventHandler} from "react";
import "./checkbox.scss"

type CheckboxProps = {
    label: string,
    name: string
    checked: boolean,
    onChange: ChangeEventHandler<HTMLInputElement>,
    id: string,
}

export default function AppCheckbox({label, name, checked, onChange, id}: CheckboxProps) {


    return (
        <div className="checkbox-wrapper">
            <label htmlFor={id}>{label}</label>
            <input id={id} type="checkbox" name={name} checked={checked} onChange={onChange}/>
        </div>
    )
}