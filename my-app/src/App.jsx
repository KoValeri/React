import './App.css';
import Header from './components/Header/Header.jsx';
import CardList from './components/CardList/CardList.jsx';
import SongContextProvider from './app_context/song-context.jsx';

function App() {
  return (
    <div>
      <SongContextProvider>
        <Header />
        <main>
          <div className="cards-block">
            <CardList />
          </div>
        </main>
      </SongContextProvider>
    </div>
  );
}

export default App;
