import {configureStore} from '@reduxjs/toolkit';

import subjectReducer from './subject';

export const store = configureStore({
  reducer: {
    subject: subjectReducer,
  },
});
