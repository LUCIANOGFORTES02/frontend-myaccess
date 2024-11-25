import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../types/User"
import { useApi } from "../hooks/useApi"

export const AuthProvider=({children}:{children: JSX.Element})=>{
    const [user,setUser]=useState<User| null>(null);
    const api = useApi();

    useEffect(()=>{
        const validateToken = async ()=>{
            const storageData = localStorage.getItem('userKey');//Pegando o token
            if(storageData){
                const data = await api.validateToken(storageData);            
                if(data && data.user){
                    setUser(data.user)
                }
                else{
                    //localStorage.removeItem('userKey');
                }
            }
        }
        validateToken();

    },[api]);


    
    const signin = async(email: string, password: string)=>{//Requisição ao backend e irá receber a resposta positiva ou não
        try {
            const data = await api.signin(email,password);
                   
             if(data.user && data.token){
               // localStorage.setItem('user',JSON.stringify(data.user))//Armazenar as informações do usuário no localStorage
                setUser(data.user);
                setToken(data.token)
                return true;
             }
        } catch (error) {
            console.error("Erro ao fazer login:", error);
            return false;
        }          
    }

    const signup= async ()=>{
       
        localStorage.removeItem('userKey')
        setUser(null);
       ;
    }

    const setToken=(token: string)=>{//Salvar o token no localStorage
        localStorage.setItem('userKey',token)
    }


return(
    <AuthContext.Provider value={{user, signin, signup}}>
        {children}
    </AuthContext.Provider>
)
}