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
    },
    fetchAllMedia: async (type="", page=1, limit =10) =>{
        try {
            const token = localStorage.getItem("userKey");
            const params: any = { page, limit };
            if (type) params.type = type; // Adiciona o filtro de tipo se fornecido
            const response = await api.get(`api/media`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params, // Suporte para paginação (opcional)
            });
            console.log(response)
            return response.data || { data: [], total: 0 }; // Retorna o formato esperado
          } catch (error) {
            console.error("Erro ao buscar todas as mídias:", error);
            throw error;
          }
    },
    async getUserMediaCount() {
      try { 
        const token = localStorage.getItem("userKey");

        const response = await api.get(`api/media/count`, {
          headers: {
            Authorization: `Bearer ${token}`,
          }
        });

        return response.data || { video: 0, audio: 0, image: 0 }; // Retorna o formato esperado
      } catch (error) {
        console.error("Erro ao quantidade de midias:", error);
        throw error;
      }
    },
    deleteMediaById: async ( id:string )=>{ //Buscar a mídia pelo ide
      try {
          console.log(id);
          const token = localStorage.getItem('userKey');
          const response = await api.delete(`api/media/${id}`,{
              headers:{
               Authorization: `Bearer ${token}`
              },
          } );    
          return response.data;        
      } catch (error) {
          console.error("Erro ao deletar a mídia:", error);
          throw error; // Lança o erro para ser tratado no componente
        }
  },
}