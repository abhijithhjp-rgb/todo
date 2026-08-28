import React from "react";
import { loginUser } from "../services/authService"
import axios from "axios";
import { useState  } from "react";
import { useAuth } from "../context/authContext";

function Login(){

    const [email , setEmail] = useState<string>("");
    const [password ,setPassword] = useState<string>("");
    const { login  } = useAuth();


    const handleLogin = async (e : React.FormEvent) => {
         e.preventDefault();
         try{ 
           const response = await loginUser(email , password) ;
           alert(response.data.message);
           login(response.data.accessToken)
        }
        catch(error){
            if (axios.isAxiosError(error)){
                alert(error.response?.data?.message)
            }
            else {
                alert("an error occured")
            }
        }
        }

    return (
        <div>
            <form
            onSubmit = {handleLogin}>
                <label htmlFor="email">email</label>
                <input type="email" 
                       id = "email"
                       value = {email}
                       onChange = {(e : React.ChangeEvent<HTMLInputElement>)=>{
                        setEmail(e.target.value)
                       }}></input>
                <label htmlFor="password">password</label>
                <input type="password"
                       id = "password"
                       value = {password}
                       onChange={(e : React.ChangeEvent<HTMLInputElement>) => {
                       setPassword(e.target.value)
                       }}
                       ></input>
                <button id="login"
                        type="submit">login</button>
            </form>
        </div>
    )
}

export default Login;