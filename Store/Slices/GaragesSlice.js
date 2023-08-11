import {createSlice} from '@reduxjs/toolkit';
const GaragesSlice = createSlice({
  name: 'Garages',
  initialState: [],
  reducers: {
    fetchGarages(state, action) {
      return [...action.payload];
    },
  },
});
export {GaragesSlice};
export const {fetchGarages} = GaragesSlice.actions;
