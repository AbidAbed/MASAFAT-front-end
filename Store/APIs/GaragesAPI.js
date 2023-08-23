import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
const GaragesAPI = createApi({
  reducerPath: 'GaragesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fda5-109-107-242-57.ngrok-free.app',
  }), //replace 192.168.56.1 with the host machine
  endpoints(builder) {
    return {
      getNearbyGarages: builder.mutation({
        query: data => {
          return {
            url: '/garages/search',
            method: 'GET',
            params: {...data},
          };
        },
      }),
      getSearchGarages: builder.query({
        query: data => {
          return {
            url: '/garages/search',
            method: 'GET',
            params: {...data},
          };
        },
      }),
      postFavoriteGarage: builder.mutation({
        query: data => {
          return {
            url: '/users/favorites',
            method: 'POST',
            body: {garage: {id: data.garage_id}, user: {id: data.user_id}},
          };
        },
      }),
      getFavoriteGarages: builder.mutation({
        query: data => {
          return {
            url: `/users/${data.user_id}/favorites`,
            method: 'GET',
            params: {size: data.size, page: data.page},
          };
        },
      }),
      deleteFavoriteGarage: builder.mutation({
        query: data => {
          return {
            url: `/users/${data.user_id}/favorites`,
            method: 'DELETE',
            params: {garageID: data.garage_id},
          };
        },
      }),
      getGarageById: builder.query({
        query: data => {
          return {
            url: `/garages/${data}`,
            method: 'GET',
          };
        },
      }),
    };
  },
});
export {GaragesAPI};
export const {
  useGetNearbyGaragesMutation,
  useGetSearchGaragesQuery,
  usePostFavoriteGarageMutation,
  useGetFavoriteGaragesMutation,
  useDeleteFavoriteGarageMutation,
  useGetGarageByIdQuery,
} = GaragesAPI;
