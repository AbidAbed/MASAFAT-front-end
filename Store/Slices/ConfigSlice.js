import {createSlice} from '@reduxjs/toolkit';
const ConfigSlice = createSlice({
  name: 'Config',
  initialState: {path: '/login', history: ['/login'], isLocationGranted: false},
  reducers: {
    changePath(state, action) {
      return {...state, path: action.payload};
    },
    puchHistory(state, action) {
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
  },
});
export {ConfigSlice};
export const {changePath, puchHistory, popHistory, changeIsLocationGranted} =
  ConfigSlice.actions;
