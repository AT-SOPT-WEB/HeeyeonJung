import PageTitle from '../components/common/PageTitle';
import InfoForm from '../components/myinfo/InfoForm';
import Header from '../layouts/Header';

const MyInfoPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white text-center shadow-md rounded-lg p-10 max-w-lg w-full">
          <PageTitle>내 정보 수정하기</PageTitle>
          <InfoForm /> 
        </div>
      </div>
    </div>
  );
};

export default MyInfoPage;