export const Constants = {
    AUTHORIZATION_HEADER: "Authorization",
    BUILD_AUTHORIZATION_HEADER: (token: string): string => `Bearer ${token}`
}

export const Queries = {
    BIG_LAYOUT: "bigLayout",
    MUTATE_BIG_LAYOUT: "mBigLayout",
    REGISTER: "register",
    TOKEN: "token",
    LOGIN: "login",
    LOGGED_USER: "loggedUser"
}