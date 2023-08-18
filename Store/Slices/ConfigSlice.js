import {createSlice} from '@reduxjs/toolkit';
const ConfigSlice = createSlice({
  name: 'Config',
  initialState: {
    path: '/login',
    history: ['/login'],
    isLocationGranted: false,
    userLocation: {
      longitude: 35.94400120899081,
      latitude: 31.99020511580862,
    },
    searchTerm: null,
    renderedGarageId: null,
  },
  reducers: {
    changePath(state, action) {
      return {...state, path: action.payload};
    },
    pushHistory(state, action) {
      return {...state, history: [action.payload, ...state.history]};
    },
    popHistory(state, action) {
      if (state.history !== 0) {
        state = {...state, history: [...state.history.slice(1)]};
        return {...state, path: state.history[0]};
      } else return state;
    },
    changeIsLocationGranted(state, action) {
      return {...state, isLocationGranted: action.payload};
    },
    changeUserLocation(state, action) {
      return {...state, userLocation: {...action.payload}};
    },
    changeSearchTerm(state, action) {
      return {...state, searchTerm: action.payload};
    },
    changeRenderedGarageId(state, action) {
      return {...state, renderedGarageId: action.payload};
    },
  },
});
export {ConfigSlice};
export const {
  changePath,
  pushHistory,
  popHistory,
  changeIsLocationGranted,
  changeUserLocation,
  changeSearchTerm,
  changeRenderedGarageId,
} = ConfigSlice.actions;
