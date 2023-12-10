import "./input.scss"
import {ChangeEventHandler} from "react";

type InputProps = {
    label: string
    type: string,
    name: string
    onChange: ChangeEventHandler<HTMLInputElement>,
}

export default function AppInput({label, name, type, onChange}: InputProps) {
    return (
        <>
            <div className="input-wrapper">
                <label htmlFor="">{label} </label>
                <input type={type} name={name} onChange={onChange}/>
            </div>
        </>
    );
}