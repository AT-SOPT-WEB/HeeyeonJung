import styled from '@emotion/styled';

function AttemptList({ history }) {
  if (history.length === 0) return null;

  return (
    <ListWrapper>
      {history.map((entry, index) => (
        <ListItem key={index}>
          <strong>{entry.guess}</strong> → {entry.result}
        </ListItem>
      ))}
    </ListWrapper>
  );
}

export default AttemptList;

const ListWrapper = styled.div`
  margin-top: 1rem;
  margin-bottom: 3.2rem;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 100%;
  max-width: 360px;
`;

const ListItem = styled.div`
  background-color: #EED3D9;
  border: 1px solid #e6ccb2;
  border-radius: 1rem;
  padding: 0.6rem 1rem;
  text-align: center;
`;
