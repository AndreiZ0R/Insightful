import {QueryClient, QueryFunction, useMutation, useQuery, useQueryClient, UseQueryResult} from "react-query";
import {AppResponse, AuthUser, Model, UserLoggedIn, UserModel, UserRegister} from "../models/response.ts";
import {useState} from "react";
import {Queries} from "../constants/constants.ts";
import {login, register} from "../api/api.ts";

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

const useRegister = () => {
    // const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: Queries.REGISTER,
        mutationFn: (userRegister: UserRegister) => register(userRegister),
        // onSuccess: (data: UserModel) => {
        //TODO: this
        // const token: string = data.token;
        // localStorage.setItem(Queries.TOKEN, token);
        // }
    })
}

const useLogin = () => {
    // const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: Queries.LOGIN,
        mutationFn: (authUser: AuthUser) => login(authUser),
        onSuccess: (data: UserLoggedIn) => {
            const token: string = data.token;
            localStorage.setItem(Queries.TOKEN, token);
            // return queryClient.invalidateQueries(Queries.USERS);
        }
    })
}

const retrieveLoggedUser = (): UserModel => {
    const user = localStorage.getItem(Queries.LOGGED_USER);
    return JSON.parse(user ?? "");
}

const setLoggedUser = (loggedIn: UserLoggedIn) => {
    const userJson = JSON.stringify(loggedIn.user);
    localStorage.setItem(Queries.TOKEN, loggedIn.token);
    localStorage.setItem(Queries.LOGGED_USER, userJson);
}

const useLoggedUser = () => {
    return useQuery<UserModel, Error>({
        queryKey: Queries.LOGGED_USER,
        queryFn: () => retrieveLoggedUser()
    })
}

const useUpdateLoggedUser = () => {
    const queryClient: QueryClient = useQueryClient();
    return useMutation({
        mutationKey: "dd",
        mutationFn: async (user: UserLoggedIn) => setLoggedUser(user),
        onSettled: () => queryClient.invalidateQueries(Queries.LOGGED_USER)
    })
}


export {useCustomQuery, useBigLayout, useChangeLayout, useRegister, useLogin, useLoggedUser, useUpdateLoggedUser}