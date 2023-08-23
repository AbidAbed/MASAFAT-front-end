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
  changeAvailableSlots,
  changeReservation,
} from './Slices/ConfigSlice';

import {
  AuthAPI,
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
  usePutUserMutation,
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
  useGetFavoriteGaragesMutation,
  useDeleteFavoriteGarageMutation,
  useGetGarageByIdQuery,
} from './APIs/GaragesAPI';
import {UserSlice, fetchUser} from './Slices/UserSlice';
import {
  ReservationAPI,
  usePostCheckReservationMutation,
  usePostReserveGarageMutation,
  useGetReservationsMutation,
} from './APIs/ReservationAPI';
import {
  ReservationSlice,
  fetchHistory,
  addHistory,
} from './Slices/ReservationSlice';
const Store = configureStore({
  reducer: {
    config: ConfigSlice.reducer,
    garages: GaragesSlice.reducer,
    reservation: ReservationSlice.reducer,
    user: UserSlice.reducer,
    [AuthAPI.reducerPath]: AuthAPI.reducer,
    [GaragesAPI.reducerPath]: GaragesAPI.reducer,
    [ReservationAPI.reducerPath]: ReservationAPI.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(AuthAPI.middleware)
      .concat(GaragesAPI.middleware)
      .concat(ReservationAPI.middleware),
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
  useGetFavoriteGaragesMutation,
  useDeleteFavoriteGarageMutation,
  addBulkFavoriteGarages,
  addBulkSearchGarages,
  changeRenderedGarageId,
  fetchFavoriteGarages,
  addToFavorite,
  deleteFavorite,
  usePostCheckReservationMutation,
  changeAvailableSlots,
  usePostReserveGarageMutation,
  changeReservation,
  fetchHistory,
  useGetReservationsMutation,
  addHistory,
  usePutUserMutation,
};
