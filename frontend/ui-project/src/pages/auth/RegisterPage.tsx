// import {useBigLayout, useChangeLayout} from "../../hooks/useCustomQuery.ts";
import "./authentication.scss"
import {ChangeEvent, useEffect, useState} from "react";
import AppInput from "../../components/input/AppInput.tsx";
import {useNavigate} from "react-router-dom";
import AuthCard from "./AuthCard.tsx";
import {useChangeLayout, useUpdateStoredUser} from "../../hooks/useCustomQuery.ts";
import AppCheckbox from "../../components/AppCheckbox/AppCheckbox.tsx";
import AppDatePicker from "../../components/date-picker/AppDatePicker.tsx";
import {UserRegister} from "../../models/response.ts";

export default function RegisterPage() {
    // const {data: bigLayout} = useBigLayout();
    const changeLayout = useChangeLayout();
    const navigate = useNavigate();
    // const registerMutation = useRegister();
    const updateUser = useUpdateStoredUser();

    const [partialBlindness, setPartialBlindness] = useState<boolean>(false)
    const [fullBlindness, setFullBlindness] = useState<boolean>(false)
    const [recruiter, setRecruiter] = useState<boolean>(false)


    const [registerForm, setRegisterForm] = useState<UserRegister>({
        name: "",
        email: "",
        password: "",
        phoneNumber: "",
        partialBlindness: false,
        fullBlindness: false,
        userType: "jobSeeker",
        birthDate: ""
    })

    useEffect(() => {
        setRegisterForm({
            ...registerForm,
            partialBlindness: partialBlindness,
            fullBlindness: fullBlindness,
            userType: recruiter ? "recruiter" : "jobSeeker"
        })
    }, [partialBlindness, fullBlindness, recruiter])

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setRegisterForm({
            ...registerForm,
            [e.target.name]: e.target.value
        })
    }

    const togglePartialBlindness = () => {
        setPartialBlindness(!partialBlindness);
        if (fullBlindness) toggleFullBlindness();
    }

    const toggleFullBlindness = () => {
        setFullBlindness(!fullBlindness);
        if (partialBlindness) togglePartialBlindness();
    }

    const toggleRecruiter = () => {
        setRecruiter(!recruiter);
    }

    const doRegister = () => {
        changeLayout.mutate({bigLayout: registerForm.partialBlindness});
        updateUser.mutate(registerForm, {
            onSuccess: () => {
                navigate("/create-profile");
            }
        })
    }

    return (
        <>
            <AuthCard
                title="Sign In"
                content={
                    <form>
                        <AppInput type="text" name="name" label="Full Name" onChange={handleChange}/>
                        <AppInput type="text" name="email" label="Email" onChange={handleChange}/>
                        <AppInput type="text" name="phoneNumber" label="Phone" onChange={handleChange}/>
                        <AppInput type="password" name="password" label="Password" onChange={handleChange}/>
                        <AppDatePicker id="bD" label="Birth Date" name="birthDate" onChange={handleChange}/>
                        <div className="checkboxes-wrapper">
                            <AppCheckbox
                                id="pB"
                                name="partialBlindness"
                                checked={partialBlindness}
                                label="Partial Blindness"
                                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                                onChange={(_) => togglePartialBlindness()}/>
                            <AppCheckbox
                                id="fB"
                                name="fullBlindness"
                                checked={fullBlindness}
                                label="Full Blindness"
                                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                                onChange={(_) => toggleFullBlindness()}/>
                            <AppCheckbox
                                id="uT"
                                name="userType"
                                checked={recruiter}
                                label="Recruiter"
                                /* eslint-disable-next-line @typescript-eslint/no-unused-vars */
                                onChange={(_) => toggleRecruiter()}/>
                        </div>
                    </form>
                }
                buttons={
                    <>
                        <button className="primary-action-btn" onClick={doRegister}>Sign In</button>
                        <button className="switch-card-btn" onClick={() => {
                            navigate("/login");
                        }}>Already have an account?
                        </button>

                        {/*<button onClick={() => {*/}
                        {/*    const data: UserRegister = {*/}
                        {/*        name: "Test test",*/}
                        {/*        email: "test",*/}
                        {/*        password: "test",*/}
                        {/*        phoneNumber: "0727752379",*/}
                        {/*        partialBlindness: true,*/}
                        {/*        fullBlindness: false,*/}
                        {/*        userType: "jobSeeker",*/}
                        {/*        birthDate: new Date().getTime()*/}
                        {/*    };*/}

                        {/*    console.log(data);*/}

                        {/*registerMutation.mutate(data, {*/}
                        {/*    onSuccess: () => {*/}
                        {/*        const token = localStorage.getItem(Queries.TOKEN) ?? "";*/}
                        {/*        console.log("token: " + token);*/}
                        {/*    }*/}
                        {/*})*/}
                        {/*}}>Send Register call*/}
                        {/*</button>*/}
                    </>
                }
            />
        </>
    )
}