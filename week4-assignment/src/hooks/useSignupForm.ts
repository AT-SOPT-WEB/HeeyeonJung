import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../apis/authApi';
import { AxiosError } from 'axios';

export const useSignupForm = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    userId: '',
    password: '',
    confirmPassword: '',
    nickname: '', 
  });

  const goToNextStep = () => setStep((prev) => prev + 1);

  const updateForm = (
    key: 'userId' | 'password' | 'confirmPassword' | 'nickname',
    value: string
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      alert('비밀번호가 일치하지 않습니다.');
      return false;
    }
    return true;
  };

  const handleSignup = async () => {
  try {
    const res = await signup(form.userId, form.password, form.nickname); 
    const token = res.token || res.accessToken || res.userId;

    localStorage.setItem('userToken', token);
    localStorage.setItem('nickname', form.nickname);
    alert(`${form.nickname}님 반갑습니다! 회원가입에 성공했어요.`);

    navigate('/login');
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      alert(err.response?.data?.message || '회원가입에 실패했습니다.');
    }
  };

  return {
    step,
    form,
    goToNextStep,
    updateForm,
    validate,
    handleSignup, 
    navigate,
  };
};