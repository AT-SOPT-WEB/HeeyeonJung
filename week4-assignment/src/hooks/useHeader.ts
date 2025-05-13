import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export const useHeader = () => {
  const navigate = useNavigate();
  const [nickname, setNickname] = useState<string | null>(null);

  const syncNickname = () => {
    const stored = localStorage.getItem('nickname');
    setNickname(stored);
  };

  useEffect(() => {
    syncNickname();

    window.addEventListener('nicknameUpdated', syncNickname);
    return () => {
      window.removeEventListener('nicknameUpdated', syncNickname);
    };
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('userToken');
    localStorage.removeItem('nickname');
    localStorage.removeItem('userId');
    navigate('/login');
  };

  const goTo = (path: string) => {
    navigate(path);
  };

  return {
    nickname,
    handleLogout,
    goTo,
  };
};