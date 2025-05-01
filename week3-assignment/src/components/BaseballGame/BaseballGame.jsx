import styled from '@emotion/styled';
import { useBaseballGame } from '../../hooks/useBaseballGame';
import StyledInput from '../common/StyledInput';

function BaseballGame() {
  const {
    input,
    history,
    handleInputChange,
    handleSubmit,
  } = useBaseballGame();

  return (
    <Container>
      <StyledInput
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        maxLength={3}
        placeholder="3자리 숫자를 입력해주세요"
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
        />

      <History>
        {history.map((entry, index) => (
          <div key={index}>
            <strong>{entry.guess}</strong> → {entry.result}
          </div>
        ))}
      </History>
    </Container>
  );
}

export default BaseballGame;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 2rem;
  gap: 1rem;
`;

const History = styled.div`
  margin-top: 1rem;
  text-align: center;

  div {
    margin-bottom: 0.5rem;
  }
`;
