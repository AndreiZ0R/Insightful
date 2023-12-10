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
    STORED_USER: "storedUser",
    LOGGED_USER: "loggedUser",
    GET_CV: "getCv",
    GET_JOB_POSTS: "getJobPosts"
}