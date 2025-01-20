import api from './axiosInstance';

export const mediaService = {
    fetchMediaById: async ( id:string )=>{ //Buscar a mídia pelo ide
        try {
            const token = localStorage.getItem('userKey');
            const response = await api.get(`api/media/${id}`,{
                headers:{
                 Authorization: `Bearer ${token}`
                },
            } );    
            return response.data;        
        } catch (error) {
            console.error("Erro ao buscar a mídia:", error);
            throw error; // Lança o erro para ser tratado no componente
          }
    }
}