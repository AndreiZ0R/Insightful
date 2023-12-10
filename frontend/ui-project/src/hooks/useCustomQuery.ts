import {QueryClient, QueryFunction, useMutation, useQuery, useQueryClient, UseQueryResult} from "react-query";
import {
    AppResponse,
    AuthUser, JobPost,
    Model,
    Registration,
    UserLoggedIn,
    UserModel,
    UserRegister
} from "../models/response.ts";
import {useState} from "react";
import {Queries} from "../constants/constants.ts";
import {getCv, getJobPosts, login, register} from "../api/api.ts";

type TransformerFunction = <T extends Model>(response: AppResponse) => T;

const defaultTransformer: TransformerFunction = <T extends Model>(response: AppResponse) => response as T;

const useCustomQuery = <T extends Model>(
    key: string,
    queryFunction: QueryFunction<AppResponse>,
    enabledByDefault: boolean = true,
    transformFunction: TransformerFunction = defaultTransformer) => {
    const [enabledQuery, setEnabledQuery] = useState<boolean>(enabledByDefault);
    const query: UseQueryResult = useQuery<AppResponse, Error, T>({
        queryKey: key,
        queryFn: queryFunction,
        select: transformFunction,
        enabled: enabledQuery
    });

    const castedData: T = query.data as T;
    return {...query, setEnabledQuery, data: castedData};
}

const retrieveBigLayout = (): boolean => {
    return JSON.parse(localStorage.getItem(Queries.BIG_LAYOUT) ?? "false");
}

const useBigLayout = () => {
    return useQuery<boolean, Error>({
        queryKey: Queries.BIG_LAYOUT,
        queryFn: retrieveBigLayout
    });
}
const setBigLayout = (big: boolean) => {
    const bigJson = JSON.stringify(big);
    localStorage.setItem(Queries.BIG_LAYOUT, bigJson);
}

type LayoutChange = {
    bigLayout: boolean
};

const useChangeLayout = () => {
    const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: "d",
        mutationFn: async ({bigLayout}: LayoutChange) => setBigLayout(bigLayout),
        onSettled: () => queryClient.invalidateQueries(Queries.BIG_LAYOUT)
    });
}

const saveUserAfterLogin = (data: UserLoggedIn) => {
    const token: string = data.token;
    const userJson: string = JSON.stringify(data.user);

    localStorage.setItem(Queries.TOKEN, token);
    localStorage.setItem(Queries.LOGGED_USER, userJson)
}

const useRegister = () => {
    // const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: Queries.REGISTER,
        mutationFn: (registration: Registration) => register(registration),
        onSuccess: (data: UserLoggedIn) => saveUserAfterLogin(data)
    })
}

const useLogin = () => {
    // const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: Queries.LOGIN,
        mutationFn: (authUser: AuthUser) => login(authUser),
        onSuccess: (data: UserLoggedIn) => saveUserAfterLogin(data)
    })
}

const retrieveStoredUser = (): UserRegister => {
    const user = localStorage.getItem(Queries.STORED_USER);
    return JSON.parse(user ?? "");
}

const setStoredUser = (user: UserRegister) => {
    const userJson = JSON.stringify(user);
    localStorage.setItem(Queries.STORED_USER, userJson);
}

const useStoredUser = () => {
    return useQuery<UserRegister, Error>({
        queryKey: Queries.STORED_USER,
        queryFn: () => retrieveStoredUser()
    })
}

const useUpdateStoredUser = () => {
    const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: "dd",
        mutationFn: async (user: UserRegister) => setStoredUser(user),
        onSettled: () => queryClient.invalidateQueries(Queries.STORED_USER)
    })
}

const retrieveLoggedUser = (): UserModel => {
    const loggedUser = localStorage.getItem(Queries.LOGGED_USER);
    return JSON.parse(loggedUser ?? "");
}

const useLoggedUser = () => {
    return useQuery<UserModel, Error>({
        queryKey: Queries.LOGGED_USER,
        queryFn: () => retrieveLoggedUser()
    })
}


const useGetCv = () => {
    return useQuery({
        queryKey: Queries.GET_CV,
        queryFn: () => getCv(1)
    })
}

const useJobs = () => {
    return useQuery<JobPost[], Error>({
        queryKey: Queries.GET_JOB_POSTS,
        queryFn: () => getJobPosts()
    })
}

export {
    useCustomQuery,
    useBigLayout,
    useChangeLayout,
    useRegister,
    useLogin,
    useStoredUser,
    useUpdateStoredUser,
    useLoggedUser,
    useGetCv,
    useJobs
}