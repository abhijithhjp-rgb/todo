export interface LoginUserData {
    email: string ,
    password: string ,
}

export interface RegisterUserData extends LoginUserData {
    username: string 
}

export interface LoginResponse {
    message : string ,
    accessToken : string
}

export interface RegisterResponse {
    message:string ,
    user : {
        _id: string ,
        username:string ,
        email:string ,
        createdAt:string
    }
}