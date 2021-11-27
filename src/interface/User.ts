

export interface IUser {
    firstName: string
    lastName: string
    password: string
    email: string
    loginToken: string
    verifiedToken: string
    verified: boolean
}

export interface IError{
    firstName?: string
    lastName?: string
    password?: string
    confirmPassword?: string
    email?: string
}
