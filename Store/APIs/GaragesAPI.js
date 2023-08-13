import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
const GaragesAPI = createApi({
  reducerPath: 'GaragesAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://172.19.112.1:8080',
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
    };
  },
});
export {GaragesAPI};
export const {useGetNearbyGaragesMutation, useGetSearchGaragesQuery} =
  GaragesAPI;
