import { createContext, useEffect, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const SongContext = createContext({
  songs: [],
  count: 0,
  updateSelectedCard: () => {},
  deleteSelectedCards: () => {},
  addCard: () => {},
  checkView: () => {},
  saveEditedCard: () => {},
  viewOnly: false,
});

export default function SongContextProvider({ children }) {
  const [viewOnly, setViewOnly] = useState(false);
  const [songs, setSongs] = useState([]);

  useEffect(() => {
    async function fetchSongs() {
      try {
        const response = await axios.get(
          'https://raw.githubusercontent.com/KoValeri/Data/main/SongData.json'
        );
        setSongs(response.data);
      } catch (error) {
        console.log('Problem with getting list of songs', error);
      }
    }

    fetchSongs();
  }, []);

  function checkView(event) {
    setViewOnly(event.target.checked);
  }

  function updateSelectedCard(id, isChecked) {
    setSongs(prevSongs => prevSongs.map(prev => (id === prev.id ? { ...prev, isChecked } : prev)));
  }

  function deleteSelectedCards() {
    setSongs(prevSongs => prevSongs.filter(prev => !prev.isChecked));
  }

  function addCard() {
    const newCard = {
      id: uuidv4(),
      title: 'Song title... ',
      text: `Song text... `,
      isChecked: false,
    };
    setSongs(prevSongs => [newCard, ...prevSongs]);
  }

  const count = songs.length;

  function saveEditedCard(id, newTitle, newText) {
    setSongs(prevSongs =>
      prevSongs.map(prev => (id === prev.id ? { ...prev, title: newTitle, text: newText } : prev))
    );
  }

  const ctxValue = {
    updateSelectedCard,
    deleteSelectedCards,
    addCard,
    saveEditedCard,
    count,
    songs,
    checkView,
    viewOnly,
  };

  return <SongContext.Provider value={ctxValue}>{children}</SongContext.Provider>;
}
