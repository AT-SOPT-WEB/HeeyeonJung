import { useState } from 'react';
import Header from './components/Header/Header'
import GithubSearch from './components/GithubSearch/GithubSearch';
import BaseballGame from './components/BaseballGame/BaseballGame';

function App() {
  const [selectedTab, setSelectedTab] = useState('github');

  return (
    <div>
      <Header selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      
      <main>
        {selectedTab === 'github' ? <GithubSearch /> : <BaseballGame />}
      </main>
    </div>
  );
}

export default App;
