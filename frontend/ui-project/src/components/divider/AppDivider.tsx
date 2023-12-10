import {CSSProperties} from "react";

type DividerProps = {
    color: string
}

export default function AppDivider({color}: DividerProps) {
    const style: CSSProperties = {
        backgroundColor: color,
        height: "2px"
    }

    return (
        <>
            <div style={style}></div>
        </>
    )
}