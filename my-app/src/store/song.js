import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';

export const fetchSongs = createAsyncThunk('songs/fetchSongs', async () => {
  try {
    const response = await axios.get(
      'https://raw.githubusercontent.com/KoValeri/Data/main/SongData.json'
    );
    return response.data;
  } catch (error) {
    console.log('Problem with getting list of songs', error);
  }
});

const initialSongState = { songs: [], count: 0 };

const songSlice = createSlice({
  name: 'songs',
  initialState: initialSongState,
  reducers: {
    updateSelectedCard(state, action) {
      const { id, isChecked } = action.payload;
      state.songs = state.songs.map(song => (id === song.id ? { ...song, isChecked } : song));
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
    },
  },
  extraReducers: builder => {
    builder.addCase(fetchSongs.fulfilled, (state, action) => {
      state.songs = action.payload;
      state.count = action.payload.length;
    });
  },
});

export const songActions = songSlice.actions;

export default songSlice.reducer;
