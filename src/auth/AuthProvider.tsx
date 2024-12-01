import { useEffect, useState } from "react"
import { AuthContext } from "./AuthContext"
import { User } from "../types/User"
import { authService } from '../api/authService'; 
export const AuthProvider=({children}:{children: JSX.Element})=>{
    const [user,setUser]=useState<User| null>(null);

    useEffect(()=>{
        const validateToken = async ()=>{
            const token = localStorage.getItem('userKey');//Pegando o token
            if(token){
                try{
                    const response = await authService.validateToken(token);            
                    if(response?.payload){
                        setUser(response.payload)
                    }
                    else{
                        logout(); // Remove dados inválidos
                    } 
                }catch (error){
                    console.error('Erro ao validar token:', error);
                    logout(); // Remove dados inválidos
                    }
            }
        }
        validateToken();

    },[]);


    //Função de Login
    const signin = async(email: string, password: string)=>{//Requisição ao backend e irá receber a resposta positiva ou não
        console.log("Senha e email",email,password)
        try {
            const data = await authService.signin(email,password);
            console.log(data)
                   
             if(data.payload && data.token){
               // localStorage.setItem('user',JSON.stringify(data.user))//Armazenar as informações do usuário no localStorage
               localStorage.setItem("userToken", data.token); 
               setUser(data.payload);
                setToken(data.token)
                return true;
             }
        } catch (error) {
            console.error("Erro ao fazer login:", error);    
        }   
        return false;       
    }

    const logout= ()=>{
        localStorage.removeItem('userKey')
        setUser(null);
       ;
    }

    const setToken=(token: string)=>{//Salvar o token no localStorage
        localStorage.setItem('userKey',token)
    }


return(
    <AuthContext.Provider value={{user, signin, logout }}>
        {children}
    </AuthContext.Provider>
)
}