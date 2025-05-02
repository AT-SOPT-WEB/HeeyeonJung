import styled from '@emotion/styled';
import { useBaseballGame } from '../../hooks/useBaseballGame';
import StyledInput from '../common/StyledInput';
import GameMessage from './GameMessage';
import AttemptList from './AttemptList';

function BaseballGame() {
  const {
    input,
    history,
    message,
    handleInputChange,
    handleSubmit,
  } = useBaseballGame();

  return (
    <Container>
      <StyledInput
        value={input}
        onChange={(e) => handleInputChange(e.target.value)}
        maxLength={3}
        placeholder="3자리 숫자를 입력해주세요."
        onKeyDown={(e) => e.key === 'Enter' && handleSubmit()}
      />
      <GameMessage message={message} />
      <AttemptList history={history} />
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