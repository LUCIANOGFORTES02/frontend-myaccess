import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../types/User"
import { authService } from '../api/authService'; 

export const AuthProvider=({children}:{children: JSX.Element})=>{
    const [user,setUser]=useState<User| null>(null);

   // Persistir os dados ao carregar a página
   useEffect(() => {
    const userData = localStorage.getItem("userData");
    if (userData) {
        setUser(JSON.parse(userData)); // Restaurar dados do usuário
    }
    }, []);

    const saveUserInfos = (user: User) => {
        localStorage.setItem("userData", JSON.stringify(user));
        setUser(user);
    }

    //Função de Login
    const signin = async(email: string, password: string)=>{//Requisição ao backend e irá receber a resposta positiva ou não
        try {
            const data = await authService.signin(email,password);
            console.log(data)
                   
             if(data.payload && data.token){
                console.log("Payload",data.token)
               // localStorage.setItem('user',JSON.stringify(data.user))//Armazenar as informações do usuário no localStorage
               localStorage.setItem("userKey", data.token); 
               localStorage.setItem("userData", JSON.stringify(data.payload)); 
               setUser(data.payload);
                // setToken(data.token)
                return true;
             }
        } catch (error) {
            console.error("Erro ao fazer login:", error);    
        }   
        return false;       
    }

    const logout= ()=>{
        localStorage.removeItem('userKey')
        localStorage.removeItem("userData");
        setUser(null);
       ;
    }

    // const setToken=(token: string)=>{//Salvar o token no localStorage
    //     localStorage.setItem('userKey',token)
    // }


return(
    <AuthContext.Provider value={{user, signin, logout, saveUserInfos }}>
        {children}
    </AuthContext.Provider>
)
}