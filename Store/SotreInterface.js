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
  changeRenderedGarageId,
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
  fetchSearchGarages,
  fetchFavoriteGarages,
  addToFavorite,
  deleteFavorite,
  addBulkFavoriteGarages,
  addBulkSearchGarages,
} from './Slices/GaragesSlice';
import {
  GaragesAPI,
  useGetNearbyGaragesMutation,
  useGetSearchGaragesQuery,
  usePostFavoriteGarageMutation,
  useGetFavoriteGaragesQuery,
  useDeleteFavoriteGarageMutation,
  useGetGarageByIdQuery,
} from './APIs/GaragesAPI';
import {UserSlice, fetchUser} from './Slices/UserSlice';
const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    garages: GaragesSlice.reducer,
    user: UserSlice.reducer,
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
  fetchSearchGarages,
  fetchUser,
  useGetGarageByIdQuery,
  usePostFavoriteGarageMutation,
  useGetFavoriteGaragesQuery,
  useDeleteFavoriteGarageMutation,
  addBulkFavoriteGarages,
  addBulkSearchGarages,
  changeRenderedGarageId,
  fetchFavoriteGarages,
  addToFavorite,
  deleteFavorite,
};
