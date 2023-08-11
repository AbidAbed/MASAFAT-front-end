import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {
  ConfigSlice,
  changePath,
  pushHistory,
  popHistory,
  changeIsLocationGranted,
} from './Slices/ConfigSlice';

import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
} from './APIs/AuthAPI';
import {GaragesSlice, fetchGarages} from './Slices/GaragesSlice';
const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    garages: GaragesSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(AuthAPI.middleware),
});
setupListeners(Store.dispatch);
export {
  Store,
  changePath,
  pushHistory,
  popHistory,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
  fetchGarages,
  changeIsLocationGranted,
};
