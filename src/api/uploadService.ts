import api from './axiosInstance';

export const UploadService ={
    uploadFile : async (data:any)=>{
        try{
        const token = localStorage.getItem('userKey');
        const response = await api.post(`api/media`, data,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        } );    
        return response.data; 
    } catch (error) {
        console.error('Erro ao realizar o upload', error);
        throw error;
    }

         

    }
    
}
