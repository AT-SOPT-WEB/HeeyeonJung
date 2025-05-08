import { useState } from 'react';
import styled from '@emotion/styled';
import { useGithubUserInfo } from '../../hooks/useGithubUserInfo';
import { useRecentSearches } from '../../hooks/useRecentSearches';
import StyledInput from '../common/StyledInput';
import GithubUserCard from './GithubUserCard';
import ClipLoader from 'react-spinners/ClipLoader';
import RecentSearches from './RecentSearches';

function GithubSearch() {
  const [input, setInput] = useState('');
  const { userInfo, getUserInfo } = useGithubUserInfo();
  const { recentSearches, handleSearch, handleDelete } = useRecentSearches(getUserInfo);

  return (
    <Container>
      <StyledInput
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => e.key === 'Enter' && handleSearch(input.trim())}
        placeholder="Github 프로필을 검색해보세요."
      />

      {userInfo.status === 'pending' && (
        <SpinnerWrapper>
          <ClipLoader color="#a3b18a" size={200} />
        </SpinnerWrapper>
      )}

      <RecentSearches
        items={[...recentSearches].reverse()}
        onClickKeyword={(keyword) => handleSearch(keyword)}
        onDeleteKeyword={handleDelete}
      />

      {userInfo.status === 'rejected' && (
        <ErrorText>사용자를 찾을 수 없습니다. 다시 시도해주세요.</ErrorText>
      )}

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