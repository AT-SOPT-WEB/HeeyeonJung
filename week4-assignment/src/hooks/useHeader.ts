import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHeader = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);

  useEffect(() => {
    const savedNickname = localStorage.getItem('nickname');
    setNickname(savedNickname);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('nickname');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  return {
    nickname,
    handleLogout,
    navigate,
  };
};