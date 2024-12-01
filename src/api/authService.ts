import api from './axiosInstance'



export const authService = {
    validateToken: async (token: string): Promise<any> => {
      const response = await api.post('api/auth/validateToken', { token });
      return response.data;
    },
  
    signin: async (usernameOrEmail: string, password: string): Promise<any> => {
      const response = await api.post('api/auth/login', { usernameOrEmail, password });
      console.log("Login Response:", response);
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
      return response;
    },
  };