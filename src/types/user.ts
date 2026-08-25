export interface LoginUserData {
    username: string ,
    password: string ,
}

export interface RegisterUserData extends LoginUserData {
    email: string 
}

export interface LoginResponse {
    message : string ,
    token : string
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