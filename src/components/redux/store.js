import {configureStore} from '@reduxjs/toolkit';
import {setupListeners} from '@reduxjs/toolkit/dist/query';

import {subjectReducer} from './subject';
import tasksReducer from './tasks';
import {pokemonApi} from './pokemon';

export const store = configureStore({
  reducer: {
    subject: subjectReducer,
    tasks: tasksReducer,
    [pokemonApi.reducerPath]: pokemonApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware().concat(pokemonApi.middleware),
});
