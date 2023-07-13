import {createSlice} from '@reduxjs/toolkit';
const ConfigSlice = createSlice({
  name: 'Config',
  initialState: {path: '/login', history: ['/login']},
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
  },
});
export {ConfigSlice};
export const {changePath, puchHistory, popHistory} = ConfigSlice.actions;
