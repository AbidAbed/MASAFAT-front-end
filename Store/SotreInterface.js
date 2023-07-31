import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {
  ConfigSlice,
  changePath,
  puchHistory,
  popHistory,
} from './Slices/ConfigSlice';

import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
} from './APIs/AuthAPI';
const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(AuthAPI.middleware),
});
setupListeners(Store.dispatch);
export {
  Store,
  changePath,
  puchHistory,
  popHistory,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
};
