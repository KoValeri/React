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
