import {createSlice} from '@reduxjs/toolkit';
const GaragesSlice = createSlice({
  name: 'Garages',
  initialState: {
    mapGarages: [],
    searchGarages: [],
    favoriteGarages: [],
  },
  reducers: {
    changeMapGarages(state, action) {
      const mergedGarages = state.mapGarages.filter(
        existingGarage =>
          !action.payload.find(newGarage => newGarage.id === existingGarage.id),
      );
      console.log('mergedGarages', mergedGarages);
      return {...state, mapGarages: [...mergedGarages, ...action.payload]};
    },
    fetchSearchGarages(state, action) {
      return {...state, searchGarages: [...action.payload]};
    },
    fetchFavoriteGarages(state, action) {
      return {...state, favoriteGarages: [...action.payload]};
    },
    addToFavorite(state, action) {
      console.log(222222222222222222222221, action.payload);
      return {
        ...state,
        favoriteGarages: [...state.favoriteGarages, action.payload],
      };
    },
    deleteFavorite(state, action) {
      const fnewFavoriteGarages = state.favoriteGarages.filter(fGarage => {
        console.log(fGarage.id, action.payload);
        return fGarage.id !== action.payload;
      });
      return {...state, favoriteGarages: [...fnewFavoriteGarages]};
    },
    addBulkFavoriteGarages(state, action) {
      const mergedGarages = state.favoriteGarages.filter(
        existingGarage =>
          !action.payload.find(newGarage => newGarage.id === existingGarage.id),
      );
      return {...state, favoriteGarages: [...mergedGarages, ...action.payload]};
    },
    addBulkSearchGarages(state, action) {
      const mergedGarages = state.searchGarages.filter(
        existingGarage =>
          !action.payload.find(newGarage => newGarage.id === existingGarage.id),
      );
      return {...state, searchGarages: [...mergedGarages, ...action.payload]};
    },
  },
});
export {GaragesSlice};
export const {
  changeMapGarages,
  fetchSearchGarages,
  fetchFavoriteGarages,
  addToFavorite,
  deleteFavorite,
  addBulkFavoriteGarages,
  addBulkSearchGarages,
} = GaragesSlice.actions;
