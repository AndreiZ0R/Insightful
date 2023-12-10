interface Model {
}

interface BaseResponse {
}

type UserType = "jobSeeker" | "recruiter";
type AuthUser = {
    email: string,
    password: string
}

interface UserRegister extends Model {
    name: string,
    password: string,
    email: string,
    birthDate: string,
    phoneNumber: string,
    partialBlindness: boolean,
    fullBlindness: boolean,
    userType: UserType
}

interface Profile extends Model {
    profileId: bigint,
    currentTitle: string,
    currentWorkplace: string,
//TODO: add
}

interface UserModel extends UserRegister {
    profile: Profile,
}

interface UserLoggedIn extends Model {
    user: UserModel,
    token: string
}

type AppResponse = BaseResponse | BaseResponse[]

export type {Model, AppResponse, UserRegister, UserModel, Profile, AuthUser, UserLoggedIn}

/*
    {
        name: "..",
        profile: ".."
        token: "..."
    }


    {
    user: UserModel{},
    token: "..."
    }
 */