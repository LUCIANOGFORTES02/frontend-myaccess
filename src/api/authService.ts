import api from './axiosInstance'



export const authService = {
    validateToken: async (token: string): Promise<any> => {
      const response = await api.post('/validateToken', { token });
      return response.data;
    },
  
    signin: async (email: string, password: string): Promise<any> => {
      const response = await api.post('/signin', { email, password });
      return response.data;
    },
  
    register: async (
      name: string,
      username:string,
      email: string,
      password: string,
    ): Promise<any> => {
      const response = await api.post('api/auth/register', {
        
        name,
        username,
        email,
        password,
        
      });
      console.log(response.data)

      return response.data;
    },
  };