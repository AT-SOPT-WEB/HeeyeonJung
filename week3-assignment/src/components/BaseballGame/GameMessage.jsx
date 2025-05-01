import styled from '@emotion/styled';

function GameMessage({ message }) {
  if (!message) return null;

  return <Message>{message}</Message>;
}

export default GameMessage;

const Message = styled.p`
  font-size: 1.3rem;
  font-weight: bold;
  color: #697565;
  margin-top: 1rem;
`;