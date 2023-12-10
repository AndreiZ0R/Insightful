import AppDivider from "../../components/divider/AppDivider.tsx";
import {PRIMARY_COLOR} from "../../constants/theming.ts";

type AuthCardProps = {
    title: string,
    content: JSX.Element,
    buttons: JSX.Element
}

export default function AuthCard({title, content, buttons}: AuthCardProps) {
    return (
        <>
            <div className="auth-wrapper">
                <div className="auth-card">
                    <div className="auth-card-title"> {title}
                        <AppDivider color={PRIMARY_COLOR}/>
                    </div>
                    <div className="auth-card-content">
                        {content}
                        {buttons}
                    </div>
                </div>
            </div>
        </>
    )
}