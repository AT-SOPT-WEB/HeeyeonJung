import LoginForm from '../components/login/LoginForm';
import PageTitle from '../components/common/PageTitle';

const LoginPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen px-4">
      <div className="bg-white text-center shadow-md rounded-lg p-10 max-w-lg w-full">
        <PageTitle>로그인</PageTitle>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;