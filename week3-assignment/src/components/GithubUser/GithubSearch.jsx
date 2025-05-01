// 깃허브 유저 검색 로직
import { useState } from 'react';
import styled from '@emotion/styled';
import { useGithubUserInfo } from '../../hooks/useGithubUserInfo';
import StyledInput from '../common/StyledInput';
import GithubUserCard from './GithubUserCard';
import ClipLoader from 'react-spinners/ClipLoader';

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

      {userInfo.status === 'pending' && (
        <SpinnerWrapper>
          <ClipLoader color="#a3b18a" size={200} />
        </SpinnerWrapper>
      )}

      {userInfo.status === 'rejected' && <ErrorText>사용자를 찾을 수 없습니다. 다시 시도해주세요.</ErrorText>}

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
  margin-top: 2rem;
`;

const SpinnerWrapper = styled.div`
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
`;