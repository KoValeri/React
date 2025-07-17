import { createContext, useState } from 'react';
import { songCards } from '../data.js';
import { v4 as uuidv4 } from 'uuid';

export const SongContext = createContext({
  songs: [],
  count: 0,
  getSelectedCards: () => {},
  deleteSelectedCards: () => {},
  addCard: () => {},
});

export default function SongContextProvider({ children }) {
  const [selectedCards, setSelectedCards] = useState([]);
  const [songs, setSongs] = useState(songCards);

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

  const count = songs.length;

  const ctxValue = {
    getSelectedCards,
    deleteSelectedCards,
    addCard,
    count,
    songs,
  };

  return <SongContext.Provider value={ctxValue}>{children}</SongContext.Provider>;
}
