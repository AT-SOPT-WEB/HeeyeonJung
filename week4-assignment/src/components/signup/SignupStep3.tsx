import TextInput from '../common/TextInput';
import Button from '../common/Button';

interface Props {
  userNickname: string;
  onChange: (val: string) => void;
  onNext: () => void;
}

const SignupStep3 = ({ userNickname, onChange, onNext }: Props) => {
  return (
    <>
      <h3 className="text-lg font-bold mb-3">닉네임</h3>
      <TextInput
        placeholder="닉네임을 입력해주세요."
        value={userNickname}
        onChange={(e) => onChange(e.target.value)}
      />
      <Button text="회원가입하기" onClick={onNext} disabled={!userNickname} />
    </>
  );
};

export default SignupStep3;