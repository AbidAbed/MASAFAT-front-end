import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
const ReservationAPI = createApi({
  reducerPath: 'ReservationAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fda5-109-107-242-57.ngrok-free.app',
  }), //replace ipv4 with the host machine
  endpoints(builder) {
    return {
      postCheckReservation: builder.mutation({
        query: data => {
          return {
            url: '/reservations/validate',
            body: {...data},
            method: 'POST',
          };
        },
      }),
      postReserveGarage: builder.mutation({
        query: data => {
          return {
            url: '/reservations',
            body: {...data},
            method: 'POST',
          };
        },
      }),
      getReservations: builder.mutation({
        query: data => {
          return {
            url: '/reservations',
            params: {...data},
            method: 'GET',
          };
        },
      }),
    };
  },
});
export {ReservationAPI};
export const {
  usePostCheckReservationMutation,
  usePostReserveGarageMutation,
  useGetReservationsMutation,
} = ReservationAPI;
