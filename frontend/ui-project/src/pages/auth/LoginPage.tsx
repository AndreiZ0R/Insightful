import {useNavigate} from "react-router-dom";
import {ChangeEvent, useState} from "react";
import AppInput from "../../components/input/AppInput.tsx";
import AuthCard from "./AuthCard.tsx";
import {useLogin, useUpdateLoggedUser} from "../../hooks/useCustomQuery.ts";
import {AuthUser, UserModel} from "../../models/response.ts";


export default function LoginPage() {
    const navigate = useNavigate();
    const loginMutation = useLogin();
    const setLoggedUser = useUpdateLoggedUser();

    const [loginForm, setLoginForm] = useState<AuthUser>({
        email: "",
        password: ""
    })

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setLoginForm({
            ...loginForm,
            [e.target.name]: e.target.value
        })
    }

    const doLogin = () => {
        loginMutation.mutate(loginForm, {
            onSuccess: (data: UserModel) => {
                setLoggedUser.mutate(data);
                navigate("/");
            }
        });
    }

    return (
        <>
            <AuthCard
                title="Log In"
                content={
                    <form>
                        <AppInput type="text" name="email" label="Email" onChange={handleChange}/>
                        <AppInput type="password" name="password" label="Password" onChange={handleChange}/>
                    </form>}
                buttons={
                    <>
                        <button className="primary-action-btn" onClick={doLogin}>Log In</button>
                        <button className="switch-card-btn" onClick={() => {
                            navigate("/register");
                        }}>Need an account?
                        </button>
                    </>
                }
            />
        </>
    )
}