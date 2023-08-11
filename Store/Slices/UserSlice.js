import {createSlice} from '@reduxjs/toolkit';
const UserSlice = createSlice({
  name: 'User',
  initialState: {},
  reducers: {
    fetchUser(state, action) {
      return {...action.payload};
    },
  },
});

export {UserSlice};
export const {fetchUser} = UserSlice.actions;
