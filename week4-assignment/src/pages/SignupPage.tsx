import SignupForm from '../components/signup/SignupForm';
import PageTitle from '../components/common/PageTitle';

const SignupPage = () => {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded-lg p-10 max-w-lg w-full">
        <PageTitle>회원가입</PageTitle>
        <SignupForm />
      </div>
    </div>
  );
};

export default SignupPage;
