import TextInput from '../common/TextInput';
import Button from '../common/Button';
import { useSearch } from '../../hooks/useSearch';

const SearchForm = () => {
  const { nickname, setNickname, handleSearch, results } = useSearch();

  return (
    <>
      <h1 className="text-lg font-bold mb-3 text-left">닉네임</h1>
      <TextInput
        placeholder="검색할 닉네임을 입력하세요."
        value={nickname}
        onChange={(e) => setNickname(e.target.value)}
      />
      <Button text="확인" onClick={handleSearch} disabled={false} />

      {results.length > 0 && (
        <ul className="mt-4 text-left">
          {results.map((nickname, idx) => (
            <li key={idx} className="text-gray-700 py-1 border-b">
              {nickname}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default SearchForm;