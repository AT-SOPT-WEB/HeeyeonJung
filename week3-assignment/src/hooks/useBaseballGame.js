import { useEffect, useState } from 'react';

export function useBaseballGame() {
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    generateAnswer();
  }, []);

  const generateAnswer = () => {
    const digits = [];
    while (digits.length < 3) {
      const rand = Math.floor(Math.random() * 9) + 1;
      if (!digits.includes(rand)) {
        digits.push(rand);
      }
    }
    const newAnswer = digits.join('');
    setAnswer(newAnswer);
    console.log('정답:', newAnswer);
  };

  const resetGame = () => {
    setInput('');
    setHistory([]);
    setMessage('');
    generateAnswer();
  };

  const handleInputChange = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    setInput(onlyNumbers);
  };

  const handleSubmit = () => {
    if (input.length !== 3 || new Set(input).size !== 3) {
      setMessage('⚠️ 서로 다른 숫자 3자리를 입력해주세요!');
      return;
    }

    let strike = 0;
    let ball = 0;

    for (let i = 0; i < 3; i++) {
      if (input[i] === answer[i]) {
        strike++;
      } else if (answer.includes(input[i])) {
        ball++;
      }
    }

    const resultText = `${strike} 스트라이크 ${ball} 볼`;
    const shortResult = `${strike}S ${ball}B`;

    const updatedHistory = [...history, { guess: input, result: shortResult }];
    setHistory(updatedHistory);
    setInput('');

    if (strike === 3) {
      setMessage('🎉 정답입니다! 3초 뒤에 게임이 리셋됩니다.');
      setTimeout(resetGame, 3000);
    } else if (updatedHistory.length >= 10) {
      setMessage('💥 게임 오버! 10번을 넘겨서 실패하였습니다. 게임이 초기화됩니다.');
      setTimeout(resetGame, 5000);
    } else {
      setMessage(resultText);
    }
  };

  return {
    input,
    history,
    message,
    handleInputChange,
    handleSubmit,
  };
}