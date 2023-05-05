import {configureStore} from '@reduxjs/toolkit';

import task from './task';
import user from './user';

export const store = configureStore({
  reducer: {
    tasks: task,
    user: user,
  },
});
