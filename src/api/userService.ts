import api from './axiosInstance';

export const userService = {

    updateUserProfile: async ( data:any )=>{

        try {
            const token = localStorage.getItem('userKey');
            const response = await api.patch(`api/user/update`, data,{
                headers:{
                    Authorization: `Bearer ${token}`
                },
            } );    
            return response.data;        
        } catch (error) {
            console.error('Erro ao atualizar o perfil:', error);
            throw error;
            
        }

        
    },
}