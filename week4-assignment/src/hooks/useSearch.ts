import { useState } from 'react';
import { fetchAllMembers } from '../apis/memberApi';

export const useSearch = () => {
  const [nickname, setNickname] = useState('');
  const [results, setResults] = useState<string[]>([]);

  const handleSearch = async () => {
    try {
      const data = await fetchAllMembers(nickname.trim() === '' ? undefined : nickname);
      setResults(data.map((item: { nickname: string }) => item.nickname));
    } catch {
      alert('회원 조회 중 오류가 발생했습니다.');
    }
  };

  return {
    nickname,
    setNickname,
    handleSearch,
    results,
  };
};