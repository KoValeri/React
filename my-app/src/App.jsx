import './App.css';
import { useState, useContext } from 'react';
import Header from './components/Header.jsx';
import CardList from './components/CardList.jsx';
import { SongContext } from './app_context/song-context.jsx';

function App() {
  const { deleteSelectedCards, addCard } = useContext(SongContext);

  const [viewOnly, setViewOnly] = useState(false);

  function checkView(event) {
    setViewOnly(event.target.checked);
  }

  return (
    <div>
      <Header />
      <div className="view-only">
        <input type="checkbox" onChange={checkView} />
        <label>View only</label>
      </div>
      <div>
        <button className="add-card" onClick={addCard}>
          Add card
        </button>
      </div>
      <main>
        <div>
          <CardList viewOnly={viewOnly} />
        </div>
        <div>
          <button className="delete-button" onClick={deleteSelectedCards}>
            Delete
          </button>
        </div>
      </main>
    </div>
  );
}

export default App;
