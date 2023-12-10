import {AuthUser, Registration, UserLoggedIn} from "../models/response.ts";
import axios, {AxiosResponse} from "axios";

const baseSpring = "http://192.168.35.228:8080/api";
const userEndpoint = "/user";
const registerEndpoint = `${baseSpring}${userEndpoint}/userProfile`;
const loginEndpoint = `${baseSpring}/login`;


const register = (registration: Registration): Promise<UserLoggedIn> =>
    axios.post(registerEndpoint, registration).then((res: AxiosResponse<UserLoggedIn>): UserLoggedIn => res.data)


// const buildAuthConfig = (): AxiosRequestConfig => {
//     const token: string = localStorage.getItem(Queries.TOKEN) ?? "";
//     return {
//         headers: {
//             [Constants.AUTHORIZATION_HEADER]: Constants.BUILD_AUTHORIZATION_HEADER(token),
//         }
//     };
// }

const login = (authUser: AuthUser): Promise<UserLoggedIn> =>
    axios.post(loginEndpoint, authUser)
        .then((res: AxiosResponse<UserLoggedIn>): UserLoggedIn => res.data)

export {register, login}
