import PageTitle from '../components/common/PageTitle';
import SearchForm from '../components/search/SearchForm'
import Header from '../layouts/Header';

const SearchPage = () => {
  return (
    <div>
      <Header />
      <div className="flex flex-col items-center justify-center min-h-screen px-4">
        <div className="bg-white text-center shadow-md rounded-lg p-10 max-w-lg w-full">
          <PageTitle>SOPT 회원 조회하기</PageTitle>
          <SearchForm /> 
        </div>
      </div>
    </div>
  );
};

export default SearchPage;