import {configureStore} from '@reduxjs/toolkit';
import task, {setTasks} from './task';

export const store = configureStore({
  reducer: {
    tasks: task,
  },
});
