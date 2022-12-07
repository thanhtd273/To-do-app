import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

export const pokemonApi = createApi({
  reducerPath: 'pokemonApi',
  baseQuery: fetchBaseQuery({
    baseUrl:
      'https://to-do-app-11762-default-rtdb.asia-southeast1.firebasedatabase.app/',
  }),
  endpoints: builder => ({
    getPokemonByName: builder.query({
      query: name => `${name}`,
    }),
  }),
});

export const {useGetPokemonByNameQuery} = pokemonApi;
