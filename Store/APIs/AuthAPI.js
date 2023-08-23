import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/dist/query/react';
const AuthAPI = createApi({
  reducerPath: 'AuthAPI',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://fda5-109-107-242-57.ngrok-free.app',
  }), //replace ipv4 with the host machine
  endpoints(builder) {
    return {
      postAuth: builder.mutation({
        query: logInData => {
          return {
            url: '/auth',
            // body: {email: logInData.email, password: logInData.password},
            credentials: 'include',
            method: 'POST',
          };
        },
      }),
      postLogin: builder.mutation({
        query: logInData => {
          return {
            url: '/users/validate',
            body: {...logInData},
            method: 'POST',
          };
        },
      }),
      postSignup: builder.mutation({
        query: logInData => {
          return {
            url: '/users',
            body: {...logInData},
            method: 'POST',
          };
        },
      }),
      putUser: builder.mutation({
        query: putData => {
          return {
            url: '/users',
            body: {...putData},
            method: 'PUT',
          };
        },
      }),
    };
  },
});
export {AuthAPI};
export const {
  usePostAuthMutation,
  usePostLoginMutation,
  usePostSignupMutation,
  usePutUserMutation,
} = AuthAPI;
