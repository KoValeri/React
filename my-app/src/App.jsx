import './App.css';
import { useState } from 'react';
import Header from './components/Header/Header.jsx';
import CardList from './components/CardList/CardList.jsx';
import SongContextProvider from './app_context/song-context.jsx';

function App() {
  const [viewOnly, setViewOnly] = useState(false);

  return (
    <div>
      <SongContextProvider>
        <Header setViewOnly={setViewOnly} />
        <main>
          <div>
            <CardList viewOnly={viewOnly} />
          </div>
        </main>
      </SongContextProvider>
    </div>
  );
}

export default App;
