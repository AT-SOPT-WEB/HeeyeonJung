import styled from '@emotion/styled';

function GithubUserCard({ user, onClose }) {
  return (
    <Card>
      <CloseButton onClick={onClose}>×</CloseButton>

      <a href={user.html_url} target="_blank" rel="noreferrer">
        <Avatar src={user.avatar_url} alt="avatar" />
      </a>

      <a href={user.html_url} target="_blank" rel="noreferrer">
          <UserName>{user.name}</UserName>
      </a>
      <UserIdBio>{user.login}</UserIdBio>
      <UserIdBio>{user.bio}</UserIdBio>

      <StatBoxWrapper>
        <StatBox>
          <span>Followers</span>
          <strong>{user.followers}</strong>
        </StatBox>
        <StatBox>
          <span>Following</span>
          <strong>{user.following}</strong>
        </StatBox>
      </StatBoxWrapper>
    </Card>
  );
}

export default GithubUserCard;

const Card = styled.div`
  background-color: #4b3e37;
  color: #fefae0;
  border-radius: 1.5rem;
  padding: 1.5rem 2rem;
  position: relative;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.2);
  margin-top: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-color: #a3b18a;
  border: none;
  border-radius: 50%;
  width: 2rem;
  height: 2rem;
  color: white;
  font-size: 1.2rem;
  cursor: pointer;
`;

const Avatar = styled.img`
  width: 8rem;
  height: 8rem;
  border-radius: 50%;
  border: 4px solid #e6ccb2;     
  margin: 0 auto 1.5rem;
  display: block;
  transition: transform 0.3s ease; 

  &:hover {
    transform: scale(1.08); 
  }
`;

const UserName = styled.h2`
  font-size: 1.3rem;
  margin-bottom: 0.3rem;
`;

const UserIdBio = styled.p`
  font-size: 0.95rem;
  color: #dcd7c9;
  margin-bottom: 0.3rem;
`;

const StatBoxWrapper = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 1.5rem;
  justify-content: center;
`;

const StatBox = styled.div`
  background-color: #a3b18a;
  padding: 0.3rem 3.3rem;
  border-radius: 0.8rem;
  text-align: center;
  min-width: 100px;

  span {
    font-size: 0.9rem;
    color: #fefae0;
    display: block;
    margin-bottom: 0.3rem;
  }

  strong {
    font-size: 1.1rem;
    font-weight: bold;
    color: #ffffff;
  }
`;
