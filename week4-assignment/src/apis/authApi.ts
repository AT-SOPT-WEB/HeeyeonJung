import { AxiosError } from 'axios';
import api from './apiClient';

export const signup = async (loginId: string, password: string, nickname: string) => {
  try {
    const response = await api.post('/api/v1/auth/signup', {
      loginId,
      password,
      nickname,
    });
     console.log('✅ 회원가입 응답:', response);
     return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '회원가입 중 오류가 발생했습니다.');
  }
};

export const login = async (loginId: string, password: string) => {
  try {
    const response = await api.post('/api/v1/auth/signin', {
      loginId,
      password,
    });
     console.log('✅ 로그인 응답:', response);
     return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '로그인 중 오류가 발생했습니다.');
  }
};