import { createSlice } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

function typeAndParametres(typeOfAction, actionParams) {
  console.log(`Redux action - ${typeOfAction};`, 'Parameters passed to the action:', actionParams);
}
const initialSongState = { songs: [], count: 0 };

const songSlice = createSlice({
  name: 'songs',
  initialState: initialSongState,
  reducers: {
    setSongs(state, action) {
      state.songs = action.payload;
      state.count = action.payload.length;
      typeAndParametres(action.type, action.payload);
    },
    updateSelectedCard(state, action) {
      const { id, isChecked } = action.payload;
      state.songs = state.songs.map(song => (id === song.id ? { ...song, isChecked } : song));
      typeAndParametres(action.type, action.payload);
    },
    deleteSelectedCards(state) {
      state.songs = state.songs.filter(song => !song.isChecked);
      state.count = state.songs.length;
    },
    addCard(state) {
      const newCard = {
        id: uuidv4(),
        title: 'Song title... ',
        text: `Song text... `,
        isChecked: false,
      };
      state.songs.unshift(newCard);
      state.count = state.songs.length;
    },
    saveEditedCard(state, action) {
      const { id, newTitle, newText } = action.payload;
      state.songs = state.songs.map(song =>
        id === song.id ? { ...song, title: newTitle, text: newText } : song
      );
      typeAndParametres(action.type, action.payload);
    },
  },
});

export const songActions = songSlice.actions;

export const fetchSongs = () => async dispatch => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/KoValeri/Data/main/SongData.json'
    );
    dispatch(songActions.setSongs(response.data));
  } catch (error) {
    console.log('Problem with getting list of songs', error);
  }
};

export default songSlice.reducer;
