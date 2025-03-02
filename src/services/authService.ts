import { api } from './api';

interface LoginResponse {
  isAdmin: boolean;
}

export const authService = {
  login: async (email: string, password: string): Promise<LoginResponse> => {
    const response = await api.post<LoginResponse>('/auth/login', { email, password });
    return response.data;
  },

  logout: async (): Promise<void> => {
    await api.post('/auth/logout');
  },

  checkAuth: async (): Promise<LoginResponse> => {
    const response = await api.get<LoginResponse>('/auth/check');
    return response.data;
  }
}; 