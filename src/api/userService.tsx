import api from './axiosInstance';

export const userService = {

    updateProfile: async (id: string, profileData:any)=>{
        const response = await api.put(`/users/${id}`, profileData )
        return response.data;
    },
    
    changePassword: async (id: string, passwordData: { oldPassword: string; newPassword: string }) => {
        const response = await api.put(`/users/${id}/change-password`, passwordData);
        return response.data;
    },


    getProfile: async (id: string) => {
        const response = await api.get(`/users/${id}`);
        return response.data;
  },
}