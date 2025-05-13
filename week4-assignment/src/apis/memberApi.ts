import { AxiosError } from 'axios';
import api from './apiClient';

export const fetchAllMembers = async (keyword?: string) => {
  try {
    const response = await api.get('/api/v1/users', {
      params: keyword ? { keyword } : {},
    });
    console.log('✅ 전체 닉네임 조회 응답:', response);
    return response.data.data.nicknameList.map((nickname: string) => ({ nickname }));
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    throw new Error(err.response?.data?.message || '닉네임 목록 조회 중 오류가 발생했습니다.');
  }
};