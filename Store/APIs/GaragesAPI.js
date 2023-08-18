import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
const GaragesAPI = createApi({
  reducerPath: 'GaragesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://172.24.80.1:8080',
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
            body: {...data},
          };
        },
      }),
      getFavoriteGarages: builder.query({
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
  useGetFavoriteGaragesQuery,
  useDeleteFavoriteGarageMutation,
  useGetGarageByIdQuery,
} = GaragesAPI;
