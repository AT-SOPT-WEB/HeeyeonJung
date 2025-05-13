import { AxiosError } from 'axios';
import api from './apiClient';

export const fetchMyNickname = async (userId: string) => {
  try {
    const response = await api.get('/api/v1/users/me', {
      headers: {
        userId,
      },
    });
    console.log('✅ 닉네임 조회 응답:', response);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '닉네임 조회 중 오류가 발생했습니다.');
  }
};

export const updateNickname = async (userId: string, newNickname: string) => {
  try {
    const response = await api.patch(
      '/api/v1/users',
      { nickname: newNickname },
      {
        headers: {
          userId,
        },
      }
    ); 
    console.log('✅ 닉네임 수정 응답:', response);
    return response.data.data;
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '닉네임 수정 중 오류가 발생했습니다.');
  }
};