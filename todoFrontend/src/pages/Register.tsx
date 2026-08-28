import { useState } from "react";
import { registerUser } from "../services/authService";
import axios from "axios";

function Register(){
    const [username ,setUsername] = useState<string>("") ;
    const [password , setPassword] = useState<string>("") ;
    const [email , setEmail] = useState<string>("") ;

    const handleSubmit = async (e : React.FormEvent) =>{
                        e.preventDefault();
                        console.log("Register button clicked");
                        try{
                            const response = await registerUser(username , email , password );
                            alert(response.data.message);
                                    console.log("REGISTER RESPONSE:", response);

                        }
 catch (error) {
    console.log("REGISTER ERROR:", error);

    if (axios.isAxiosError(error)) {
        console.log("STATUS:", error.response?.status);
        console.log("DATA:", error.response?.data);
    }
}
    }


    return (
        <div>
            <form 
                onSubmit = {handleSubmit} >
                <label htmlFor = "email">email</label>
                <input
                    id = "email"
                    value = {email}
                    type = "email"
                    onChange = { (e : React.ChangeEvent<HTMLInputElement>) =>{
                        setEmail(e.target.value)
                    }
                    }></input>
                <label htmlFor = "username" >username</label>
                <input
                    id = "username"
                    type ="text" 
                    value = {username}
                    onChange ={ (e : React.ChangeEvent<HTMLInputElement>) => {
                            setUsername(e.target.value)
                }} ></input>
                
                <label htmlFor = "password" >password</label>
                <input 
                id = "password"
                type = "password"
                value = {password}
                onChange = {(e : React.ChangeEvent<HTMLInputElement>) => {
                    setPassword(e.target.value)
                }}></input>
                <button 
                    id = "register"
                    type = "submit" >Register</button>
            </form>
        </div>
    )
}

export default Register ;