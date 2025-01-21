import api from './axiosInstance';

export const UploadService ={
    uploadFile : async (data:any)=>{
        try{
        const token = localStorage.getItem('userKey');
        console.log('Data being sent to the backend:', data); // Debugging log
        const response = await api.post(`api/media`, data,{
            headers:{
                Authorization: `Bearer ${token}`
            },
        } );    
        console.log('Upload successful:', response.data); // Log successful response
        return response.data; 
    } catch (error) {
        console.error('Erro ao realizar o upload', error);
        throw error;
    }

         

    }
    
}
