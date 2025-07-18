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
  const [songs, setSongs] = useState(
    songCards.map(songCard => ({ ...songCard, isChecked: false }))
  );

  function getSelectedCards(id, isChecked) {
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
    getSelectedCards,
    deleteSelectedCards,
    addCard,
    count,
    songs,
  };

  return <SongContext.Provider value={ctxValue}>{children}</SongContext.Provider>;
}
