import type {LoginUserData , RegisterUserData , LoginResponse , RegisterResponse} from "../types/user"
import api from "../services/api"

export async function registerUser(
    username : string ,
    email : string , 
    password : string ){

    const body : RegisterUserData = {
        username  ,
        email  ,
        password 
    }
console.log("5. About to send API request");

const response = await api.post<RegisterResponse>("/user", body);

console.log("6. API request finished");
    return response ;
} 

export async function login(
    username:string ,
    password:string
){

    const body: LoginUserData = {
        username ,
        password
    }

    const response = await api.post<LoginResponse>("/user/login" , body);

    return response
}