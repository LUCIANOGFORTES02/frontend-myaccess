import axios from "axios"
import {baseApiUrl} from "../../global"
// import {  useNavigate } from "react-router-dom";
//import { User } from "@/types/User"

const api = axios.create({
    baseURL: baseApiUrl,
})
// const navigate = useNavigate()

//Interceptores de requisição
// api.interceptors.request.use(
    
//     (config)=>{
//         const token = localStorage.getItem("token");
//         if(token){
//             config.headers.Authorization = `Bearer ${token}`;
//         }
//         return config
//     },
//     (error) => Promise.reject(error)
// );
api.interceptors.request.use(
    (config) => {
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);


// Lidar com erros antes de enviar a requisição
api.interceptors.response.use(
    (response)=>{
        return response

    },
    (error)=>{
        if(error.response?.status === 401){
            console.error("Não autorizado. Faça login novamente");
            window.location.href="/login";
        }
        return Promise.reject(error)
    }

)

export default api