import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../types/User"
import { authService } from '../api/authService'; 
export const AuthProvider=({children}:{children: JSX.Element})=>{
    const [user,setUser]=useState<User| null>(null);

    useEffect(()=>{
        const validateToken = async ()=>{
            const storageData = localStorage.getItem('userKey');//Pegando o token
            if(storageData){
                try{
                    const data = await authService.validateToken(storageData);            
                    if(data && data.user){
                        setUser(data.user)
                    }
                    else{
                        handleLogout(); // Remove dados inválidos
                    } 
                }catch (error){
                    console.error('Erro ao validar token:', error);
                    handleLogout(); // Remove dados inválidos
                    }
            }
        }
        validateToken();

    },[]);


    //Função de Login
    const signin = async(email: string, password: string)=>{//Requisição ao backend e irá receber a resposta positiva ou não
        try {
            const data = await authService.signin(email,password);
                   
             if(data.user && data.token){
               // localStorage.setItem('user',JSON.stringify(data.user))//Armazenar as informações do usuário no localStorage
                setUser(data.user);
                setToken(data.token)
                return true;
             }
        } catch (error) {
            console.error("Erro ao fazer login:", error);    
        }   
        return false;       
    }

    const handleLogout= ()=>{
        localStorage.removeItem('userKey')
        setUser(null);
       ;
    }

    const setToken=(token: string)=>{//Salvar o token no localStorage
        localStorage.setItem('userKey',token)
    }


return(
    <AuthContext.Provider value={{user, signin, logout: handleLogout }}>
        {children}
    </AuthContext.Provider>
)
}