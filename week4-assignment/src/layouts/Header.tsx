import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const Header = () => {
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

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-pastelPink text-white">
      <div className="flex gap-6">
        <button onClick={() => navigate('/mypage/info')}>내 정보</button>
        <button onClick={() => navigate('/mypage/search')}>SOPT 회원 조회하기</button>
        <button onClick={handleLogout}>로그아웃</button>
      </div>
      <div className="font-semibold flex items-center gap-2">
        <i className="fas fa-user text-white"></i>
        {nickname ? `${nickname}님` : ''}
      </div> 
    </header>
  );
};

export default Header;