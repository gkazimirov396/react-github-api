import { createSlice, PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '../store';

const LS_FAV_KEY = 'rfk';

interface GithubState {
  favourites: string[];
}

const initialState: GithubState = {
  favourites: JSON.parse(localStorage.getItem(LS_FAV_KEY) ?? '[]'),
};

export const githubSlice = createSlice({
  name: 'github',
  initialState,
  reducers: {
    addFavorite(state, action: PayloadAction<string>) {
      state.favourites.push(action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
    removeFavorite(state, action: PayloadAction<string>) {
      state.favourites = state.favourites.filter(f => f !== action.payload);
      localStorage.setItem(LS_FAV_KEY, JSON.stringify(state.favourites));
    },
  },
});

export const selectFavourites = (state: RootState) => state.github.favourites;

export const { addFavorite, removeFavorite } = githubSlice.actions;

export default githubSlice.reducer;
