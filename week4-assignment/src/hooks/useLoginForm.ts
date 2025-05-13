import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login } from '../apis/authApi';
import { AxiosError } from 'axios';

export const useLoginForm = () => {
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!userId || !password) {
      alert('아이디와 비밀번호를 입력해주세요.');
      return;
    }

    try {
      const res = await login(userId, password);
      const token = res.token || res.accessToken || res.userId;

      localStorage.setItem('userToken', token); 
      localStorage.setItem('userId', userId);  
      window.dispatchEvent(new Event('nicknameUpdated'));

      navigate('/mypage/info');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>; 
      alert(err.response?.data?.message || '로그인에 실패했습니다.');
    }
  };

  return {
    userId,
    password,
    setUserId,
    setPassword,
    handleLogin,
    navigate,
  };
};