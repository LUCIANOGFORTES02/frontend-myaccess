import { User } from "../types/User"
import { createContext } from "react"

export type AuthContextType ={ //Criando um tipo para o contexto
       user: User | null;
       saveUserInfos: (user: User) => void;
       signin : (email: string, password: string)=>Promise<boolean|undefined>;
       logout : () => void;
}

export const AuthContext = createContext<AuthContextType>(
      { user:null,
       saveUserInfos: ()=>{},
       signin: async()=>false,
       logout:()=>{}}
);