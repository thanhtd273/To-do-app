import {createSlice} from '@reduxjs/toolkit';
import produce from 'immer';

const subjectSlice = createSlice({
  name: 'subject',
  initialState: {
    subject: 'All',
  },
  reducers: {
    changeSubject: (state, action) => {
      return action.payload.subject;
    },
  },
});

export const changeSubject = subjectSlice.actions.changeSubject;
export default subjectSlice.reducer;
