import { useLoginForm } from '../../hooks/useLoginForm';
import TextInput from '../common/TextInput';
import LoginButton from '../common/Button';

const LoginForm = () => {
  const { userId, password, setUserId, setPassword, handleLogin, navigate } = useLoginForm();

  return (
    <div className="flex flex-col items-center w-full">
      <TextInput
        type="text"
        placeholder="아이디"
        value={userId}
        onChange={(e) => setUserId(e.target.value)}
      />
      <TextInput
        type="password"
        placeholder="비밀번호"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <LoginButton
      text="로그인"
      onClick={handleLogin}
      disabled={!userId || !password}
      />
      <button
        onClick={() => navigate('/signup')}
        className="text-textPrimary hover:underline mt-2"
      >
        회원가입
      </button>
    </div>
  );
};

export default LoginForm;