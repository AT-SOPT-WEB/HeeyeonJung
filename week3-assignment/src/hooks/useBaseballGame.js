import { useEffect, useState } from 'react';

export function useBaseballGame() {
  const [answer, setAnswer] = useState('');
  const [input, setInput] = useState('');
  const [history, setHistory] = useState([]);

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
    setAnswer(digits.join(''));
  };

  const handleInputChange = (value) => {
    const onlyNumbers = value.replace(/[^0-9]/g, '');
    setInput(onlyNumbers);
  };

  const handleSubmit = () => {
    if (input.length !== 3 || new Set(input).size !== 3) {
      alert('중복되지 않는 3자리 숫자를 입력하세요!');
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

    const resultText = `${strike}S ${ball}B`;
    setHistory((prev) => [...prev, { guess: input, result: resultText }]);
    setInput('');

    if (strike === 3) {
      alert('🎉 정답입니다! 게임을 다시 시작합니다.');
      generateAnswer();
      setHistory([]);
    }
  };

  return {
    input,
    history,
    handleInputChange,
    handleSubmit,
  };
}
