// 깃허브 유저 검색 로직
import { useState } from 'react';
import styled from '@emotion/styled';
import { useGithubUserInfo } from '../../hooks/useGithubUserInfo';
import StyledInput from '../common/StyledInput';
import GithubUserCard from './GithubUserCard';

function GithubSearch() {
  const [input, setInput] = useState('');
  const { userInfo, getUserInfo } = useGithubUserInfo();

  const handleSearch = () => {
    if (input.trim()) {
      getUserInfo(input.trim());
    }
  };

  return (
    <Container>
      <StyledInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
        placeholder="깃허브 아이디를 입력하세요"
      />

      {userInfo.status === 'pending' && <p>검색 중...</p>}
      {userInfo.status === 'rejected' && <ErrorText>사용자를 찾을 수 없습니다.</ErrorText>}

      {userInfo.status === 'resolved' && userInfo.data && (
        <GithubUserCard user={userInfo.data} onClose={() => getUserInfo('')} />
      )}
    </Container>
  );
}

export default GithubSearch;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const ErrorText = styled.p`
  color: red;
`;
