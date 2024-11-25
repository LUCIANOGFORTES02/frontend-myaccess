import { useContext } from "react";
import { AuthContext } from "./AuthContext";
import Login from "../pages/Login/Login";

export const RequireAuth = ({children}: {children: JSX.Element} )=>{//Componente para permitir acesso apenas de pessoas logadas
    
    const auth = useContext(AuthContext);

    if(!auth.user){//Se não tiver um usuário salvo no contexto significa que não está logado
        return <Login/>;
    }
    

    return children;//Só é retornada se estiver logado
}