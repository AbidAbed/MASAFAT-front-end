import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';
import {
  ConfigSlice,
  changePath,
  pushHistory,
  popHistory,
  changeIsLocationGranted,
  changeUserLocation,
  changeSearchTerm,
} from './Slices/ConfigSlice';

import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
} from './APIs/AuthAPI';
import {
  GaragesSlice,
  changeMapGarages,
  changeSearchGarages,
} from './Slices/GaragesSlice';
import {
  GaragesAPI,
  useGetNearbyGaragesMutation,
  useGetSearchGaragesQuery,
} from './APIs/GaragesAPI';
const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    garages: GaragesSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [GaragesAPI.reducerPath]: GaragesAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthAPI.middleware)
      .concat(GaragesAPI.middleware),
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
  changeMapGarages,
  changeIsLocationGranted,
  useGetNearbyGaragesMutation,
  changeUserLocation,
  changeSearchTerm,
  useGetSearchGaragesQuery,
  changeSearchGarages
};
