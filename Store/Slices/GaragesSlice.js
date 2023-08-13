import {createSlice} from '@reduxjs/toolkit';
const GaragesSlice = createSlice({
  name: 'Garages',
  initialState: {
    mapGarages: [],
    searchGarages: [],
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
    changeSearchGarages(state, action) {
      return {...state, searchGarages: [...action.payload]};
    },
  },
});
export {GaragesSlice};
export const {changeMapGarages, changeSearchGarages} = GaragesSlice.actions;
