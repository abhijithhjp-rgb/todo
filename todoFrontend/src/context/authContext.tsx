import { createContext, useContext ,useState } from "react";
import { saveAccessToken , clearAccessToken } from "../services/tokenStore";

interface AuthContextType {
    accessToken : string ,
    isAuthenticated : boolean ,
    login : (accessToken :string ) => void ,
    logout : () => void
}

const UserContext = createContext<AuthContextType | undefined >(undefined)


export function UserProvider({children} : {children : React.ReactNode} ){
    const [accessToken , setAccessToken] = useState<string>("");
    const [isAuthenticated , setIsAuthenticated] = useState<boolean>(false);

    function login(accessToken : string){
            setAccessToken(accessToken);
            saveAccessToken(accessToken);
            setIsAuthenticated(true)  ;
    };

    function logout(){
        setAccessToken("");
        setIsAuthenticated(false);
        clearAccessToken();
    }

    return(<UserContext.Provider
          value = {{
            accessToken ,
            isAuthenticated ,
            login ,
            logout
          }}>
            {children}
          </UserContext.Provider>)

}

export function useAuth(){
    const context = useContext(UserContext);
    if(!context){
       throw new Error ("useAuth must be used inside UserProvider")
    }
    return context;
}

export default UserContext ;