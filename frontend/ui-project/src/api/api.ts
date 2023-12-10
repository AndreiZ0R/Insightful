import {AuthUser, JobPost, Registration, UserLoggedIn} from "../models/response.ts";
import axios, {AxiosRequestConfig, AxiosResponse} from "axios";
import {Constants, Queries} from "../constants/constants.ts";

// const baseSpring = "http://192.168.35.228:8080/api";
const baseSpring = "/api";
const userEndpoint = "/user";
const registerEndpoint = `${baseSpring}${userEndpoint}/userProfile`;
const loginEndpoint = `${baseSpring}/login`;
const cvEndpoint = `${baseSpring}/user/cv/generate`;
const jobPostsEndpoint = `${baseSpring}/user/allJobs`;

const buildAuthConfig = (): AxiosRequestConfig => {
    const token: string = localStorage.getItem(Queries.TOKEN) ?? "";
    return {
        headers: {
            [Constants.AUTHORIZATION_HEADER]: Constants.BUILD_AUTHORIZATION_HEADER(token),
        }
    };
}

const register = (registration: Registration): Promise<UserLoggedIn> =>
    axios.post(registerEndpoint, registration).then((res: AxiosResponse<UserLoggedIn>): UserLoggedIn => res.data)

const login = (authUser: AuthUser): Promise<UserLoggedIn> =>
    axios.post(loginEndpoint, authUser)
        .then((res: AxiosResponse<UserLoggedIn>): UserLoggedIn => res.data)

const getCv = (id: number) => {
    axios.get(`${cvEndpoint}/${id}`, {
        ...buildAuthConfig(),
        responseType: "blob"
    }).then((res) => {
        console.log(res.data);
        const file = new Blob([res.data], {type: "application/pdf"});
        const fileUrl = URL.createObjectURL(file);
        window.open(fileUrl);
    });
}

const getJobPosts = (): Promise<JobPost[]> =>
    axios.get(jobPostsEndpoint, buildAuthConfig())
        .then((res: AxiosResponse<JobPost[]>): JobPost[] => res.data)

export {register, login, getCv, getJobPosts}


