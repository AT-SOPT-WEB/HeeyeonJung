import { useHeader } from '../hooks/useHeader';

const Header = () => {
  const { nickname, handleLogout, goTo } = useHeader();

  return (
    <header className="flex items-center justify-between px-6 py-4 bg-pastelPink text-white">
      <div className="flex gap-6">
        <button onClick={() => goTo('/mypage/info')}>내 정보</button>
        <button onClick={() => goTo('/mypage/search')}>SOPT 회원 조회하기</button>
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