import { v4 as uuidv4 } from 'uuid';
import './App.css';
import { useState } from 'react';
import Header from './components/Header.jsx';
import CardList from './components/CardList.jsx';
import { songCards } from './data.js';

function App() {
  const [viewOnly, setViewOnly] = useState(false);
  const [selectedCards, setSelectedCards] = useState([]);
  const [songs, setSongs] = useState(songCards);

  function checkView(event) {
    setViewOnly(event.target.checked);
  }

  function getSelectedCards(id, isChecked) {
    setSelectedCards(prev => {
      return isChecked ? [id, ...prev] : prev.filter(cardID => cardID !== id);
    });
  }

  function deleteSelectedCards() {
    setSongs(prevSongs => prevSongs.filter(song => !selectedCards.includes(song.id)));
    setSelectedCards([]);
  }

  function addCard() {
    const newCard = {
      id: uuidv4(),
      title: 'Song tittle... ',
      text: `Song text... `,
    };
    setSongs(prevSongs => [newCard, ...prevSongs]);
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
        <div className="cards">
          <CardList songs={songs} viewOnly={viewOnly} getSelectedCards={getSelectedCards} />
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
