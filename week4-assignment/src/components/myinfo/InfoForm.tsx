import TextInput from '../common/TextInput';
import Button from '../common/Button';
import { useMyInfoForm } from '../../hooks/useMyInfoForm';

const InfoForm = () => {
  const { nickname, setNickname, handleUpdate } = useMyInfoForm(); 

  return (
    <>
      <h1 className="text-lg font-bold mb-3 text-left">새 닉네임</h1>
      <TextInput
        placeholder="새 닉네임을 입력하세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button text="저장" onClick={handleUpdate} disabled={!nickname} />
    </>
  );
};

export default InfoForm;