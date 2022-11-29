import {configureStore} from '@reduxjs/toolkit';

import {subjectReducer} from './subject';
import tasksReducer from './tasks';

export const store = configureStore({
  reducer: {
    subject: subjectReducer,
    tasks: tasksReducer,
  },
});
