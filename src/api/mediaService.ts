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
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    fetchAllMedia: async (filters: any, page = 1, limit = 10) =>{
        try {
            const token = localStorage.getItem("userKey");

            const response = await api.get(`api/media/search`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              params: {...filters, page, limit}, // Suporte para paginação (opcional)
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
    deleteMediaById: async ( id:string )=> { 
      try {
          const token = localStorage.getItem('userKey');
          const response = await api.delete(`api/media/${id}`,{
              headers:{
               Authorization: `Bearer ${token}`
              },
          } );    
          return response.data;        
      } catch (error) {
          console.error("Erro ao deletar a mídia:", error);
          throw error;
      }
    },
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    updateMediaById: async (mediaId: string, updatedData: any) =>{
      try {
          const token = localStorage.getItem("userKey");

          const response = await api.patch(`api/media/${mediaId}`, updatedData, {
            headers: {
              Authorization: `Bearer ${token}`,
            }
          });

          return response.data; 
        } catch (error) {
          console.error("Erro ao buscar atualizar a mídia:", error);
          throw error;
        }
    },
}