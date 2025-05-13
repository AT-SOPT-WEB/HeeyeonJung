import TextInput from '../common/TextInput';
import Button from '../common/Button';

interface Props {
  password: string;
  confirmPassword: string;
  onChange: (key: 'password' | 'confirmPassword', value: string) => void;
  onNext: () => void;
}

const SignupStep2 = ({ password, confirmPassword, onChange, onNext }: Props) => {
  return (
    <>
      <h1 className="text-lg font-bold mb-3">비밀번호</h1>
      <TextInput
        type="password"
        placeholder="비밀번호를 입력해주세요"
        value={password}
        onChange={(e) => onChange('password', e.target.value)}
        showToggleIcon={true}
      />
      <TextInput
        type="password"
        placeholder="비밀번호 확인"
        value={confirmPassword}
        onChange={(e) => onChange('confirmPassword', e.target.value)}
      />
       {password && confirmPassword && password !== confirmPassword && (
          <p className="text-red-500 text-sm mb-2">비밀번호가 일치하지 않습니다.</p>
       )}
       {password.length > 20 && (
          <p className="text-red-500 text-sm mb-1">최대 길이는 20자 이하로 입력해주세요.</p>
       )}
      <Button 
        text="다음" 
        onClick={onNext} 
        disabled={!password || !confirmPassword || password !== confirmPassword || password.length > 20} />
      </>
  );
};

export default SignupStep2;