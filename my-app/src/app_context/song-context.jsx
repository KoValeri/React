import { createContext, useState } from 'react';
import { songCards } from '../data.js';
import { v4 as uuidv4 } from 'uuid';

export const SongContext = createContext({
  songs: [],
  count: 0,
  updateSelectedCard: () => {},
  deleteSelectedCards: () => {},
  addCard: () => {},
  checkView: () => {},
  viewOnly: false,
});

export default function SongContextProvider({ children }) {
  const [viewOnly, setViewOnly] = useState(false);
  const [songs, setSongs] = useState(songCards);

  function checkView(event) {
    setViewOnly(event.target.checked);
  }

  function updateSelectedCard(id, isChecked) {
    setSongs(prev => {
      return prev.map(pr => (id === pr.id ? { ...pr, isChecked } : pr));
    });
  }

  function deleteSelectedCards() {
    setSongs(prev => prev.filter(song => !song.isChecked));
  }

  function addCard() {
    const newCard = {
      id: uuidv4(),
      title: 'Song tittle... ',
      text: `Song text... `,
      isChecked: false,
    };
    setSongs(prevSongs => [newCard, ...prevSongs]);
  }

  const count = songs.length;

  const ctxValue = {
    updateSelectedCard,
    deleteSelectedCards,
    addCard,
    count,
    songs,
    checkView,
    viewOnly,
  };

  return <SongContext.Provider value={ctxValue}>{children}</SongContext.Provider>;
}
