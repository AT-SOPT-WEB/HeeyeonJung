// App.jsx

import Card from './components/Card';
import Header from './components/Header';
import { members } from './member';
import Search from './components/Search';
import useSearch from './hooks/useSearch';

function App() {
  const { search, filteredMembers, handleSearchChange, handleSearch } =
    useSearch(members);

  return (
    <>
      <Header />
      <Search
        search={search}
        handleSearchChange={handleSearchChange}
        handleSearch={handleSearch}
      />
      <section style={{ display: 'flex', flexWrap: 'wrap' }}>
        {filteredMembers.map((member) => (
          <Card
            key={member.id}
            name={member.name}
            github={member.github}
            englishName={member.englishName}
          />
        ))}
      </section>
    </>
  );
}

export default App;