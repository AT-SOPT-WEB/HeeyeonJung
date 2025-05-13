import SignupStep1 from './SignupStep1';
import SignupStep2 from './SignupStep2';
import SignupStep3 from './SignupStep3';
import { useSignupForm } from '../../hooks/useSignupForm';

const SignupForm = () => {
  const {
    step,
    form,
    goToNextStep,
    updateForm,
    validate,
    handleSignup,
    navigate,
  } = useSignupForm();

  return (
    <>
      {/* 1단계: 아이디 입력 */}
      {step === 1 && (
        <SignupStep1
          userId={form.userId}
          onChange={(val) => updateForm('userId', val)}
          onNext={goToNextStep}
        />
      )}

      {/* 2단계: 비밀번호 & 확인 */}
      {step === 2 && (
        <SignupStep2
          password={form.password}
          confirmPassword={form.confirmPassword}
          onChange={(key, val) => updateForm(key, val)}
          onNext={() => {
            if (!validate()) return;
            goToNextStep(); 
          }}
        />
      )}

      {/* 3단계: 닉네임 입력 + 회원가입 완료 */}
      {step === 3 && (
        <SignupStep3
          userNickname={form.nickname}
          onChange={(val) => updateForm('nickname', val)}
          onNext={handleSignup}
        />
      )}

      <div className="flex items-center justify-center gap-3 mt-2">
        <p className="text-sm">이미 회원이신가요?</p>
        <button
          onClick={() => navigate('/login')}
          className="text-textPrimary hover:underline"
        >
          로그인
        </button>
      </div>
    </>
  );
};

export default SignupForm;