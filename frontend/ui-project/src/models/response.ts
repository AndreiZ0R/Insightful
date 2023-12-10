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

interface Study {
    studyId: bigint,
    studyUserId: bigint,
    startDate: string,
    endDate: string,
    degree: string,
    studyLocation: string
}

interface Skill {
    skillId: bigint,
    userSkillId: bigint,
    skillName: string
}

interface Experience {
    experienceId: bigint,
    experienceUserId: bigint,
    startDate: string,
    endDate: string,
    company: string,
    position: string,
    skills: Skill[]
}

interface Profile extends Model {
    profileId: bigint,
    currentTitle: string,
    currentWorkplace: string,
    description: string,
    studies: Study[],
    experiences: Experience[]
}

interface UserModel extends UserRegister {
    userId: number,
    profile: Profile,
}

interface UserLoggedIn extends Model {
    user: UserModel,
    token: string
}

export type SkillCreate = {
    skillName: string;
};

export type StudyCreate = {
    startDate: string,
    endDate: string,
    degree: string,
    studyLocation: string
}

export type ExperienceCreate = {
    startDate: string;
    endDate: string;
    company: string;
    position: string;
    skills: SkillCreate[];
};

export type ProfileCreate = {
    currentTitle: string;
    currentWorkplace: string;
    description: string;
    experiences: ExperienceCreate[];
    studies: StudyCreate[]
};

export type Registration = {
    name: string,
    password: string,
    email: string,
    birthDate: string,
    phoneNumber: string,
    partialBlindness: boolean,
    fullBlindness: boolean,
    userType: UserType,
    profile: ProfileCreate
}

export type JobPost = {
    jobPostingId: bigint,
    userId: bigint,
    title: string,
    description: string,
    requirements: string,
    location: string,
    jobType: string,
    postedDate: string,
    applicationDeadLine: string,
    acceptedDisability: string
}

type AppResponse = BaseResponse | BaseResponse[]

export type {Model, AppResponse, UserRegister, UserModel, Profile, AuthUser, UserLoggedIn, Study, Experience, Skill}