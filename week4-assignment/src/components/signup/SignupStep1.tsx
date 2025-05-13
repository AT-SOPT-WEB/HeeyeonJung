import TextInput from '../common/TextInput';
import Button from '../common/Button';

interface Props {
  userId: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

const SignupStep1 = ({ userId, onChange, onNext }: Props) => {
  return (
    <>
      <h1 className="text-lg font-bold mb-3">아이디</h1>
      <TextInput
        placeholder="아이디를 입력해주세요 (8~20자, 대소문자/숫자만 가능)"
        value={userId}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button text="다음" onClick={onNext} disabled={!userId} />
    </>
  );
};

export default SignupStep1;