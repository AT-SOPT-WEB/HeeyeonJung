/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';

function Header({ selectedTab, setSelectedTab }) {
  return (
    <HeaderWrapper>
      <HeaderInner>
        <Title>⚾ 숫자야구 || 깃허브 검색 🐱</Title>
        <TabWrapper>
          <TabButton
            isActive={selectedTab === 'github'}
            onClick={() => setSelectedTab('github')}
          >
            깃허브 검색 🔍
          </TabButton>
          <TabButton
            isActive={selectedTab === 'baseball'}
            onClick={() => setSelectedTab('baseball')}
          >
            숫자야구 ⚾
          </TabButton>
        </TabWrapper>
      </HeaderInner>
    </HeaderWrapper>
  );
}

export default Header;

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: #f4e1a7;
  background-color: #E1EACD;
  padding: 1.5rem 0;
`;

const HeaderInner = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const Title = styled.h1`
  color: #5c513b;
  font-size: 1.6rem;
  font-weight: bold;
  margin-bottom: 1rem;
`;

const TabWrapper = styled.nav`
  display: flex;
  gap: 0.75rem;
`;

const TabButton = styled.button`
  padding: 0.5rem 1.1rem;
  font-size: 0.95rem;
  border: none;
  border-radius: 6rem;
  background-color: ${({ isActive }) => (isActive ? '#D0DDD0' : '#fffef4')};
  color: ${({ isActive }) => (isActive ? '#5c513b' : '#7c6b50')};
  font-weight: ${({ isActive }) => (isActive ? 'bold' : 'normal')};
  cursor: pointer;
  box-shadow: ${({ isActive }) =>
    isActive ? 'inset 0 0 0 2px #D0DDD0' : 'inset 0 0 0 1px #ddd8c4'};

  &:hover {
    background-color: ${({ isActive }) =>
      isActive ? '#D0DDD0' : '#fdf6e3'};
  }
`;
