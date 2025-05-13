import { useState } from 'react';
import { updateNickname } from '../apis/userApi'; 
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';

export const useMyInfoForm = () => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();

const handleUpdate = async () => {
  if (!nickname) return;

  try {
    const userId = localStorage.getItem('userToken');
    if (!userId) throw new Error('로그인이 필요합니다.');

    await updateNickname(userId, nickname);

    localStorage.setItem('nickname', nickname);
    window.dispatchEvent(new Event('nicknameUpdated'));

    alert('정보 변경에 성공했어요.');
    navigate('/mypage/info');
  } catch (error) {
    const err = error as AxiosError<{ message: string }>;
    alert(err.response?.data?.message || '요청 데이터가 유효하지 않아요.');
  }
};

  return {
    nickname,
    setNickname,
    handleUpdate,
  };
};