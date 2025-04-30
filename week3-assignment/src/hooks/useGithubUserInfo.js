import { useState } from 'react';

export function useGithubUserInfo() {
  const [userInfo, setUserInfo] = useState({ status: 'idle', data: null });

  const getUserInfo = async (user) => {
    if (!user) {
      setUserInfo({ status: 'idle', data: null });
      return;
    }

    setUserInfo({ status: 'pending', data: null });
    try {
      const response = await fetch(`https://api.github.com/users/${user}`);
      if (!response.ok) throw new Error('Network error');
      const data = await response.json();
      setUserInfo({ status: 'resolved', data });
    } catch {
      setUserInfo({ status: 'rejected', data: null });
    }
  };

  return { userInfo, getUserInfo };
}