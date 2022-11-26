import {createSlice} from '@reduxjs/toolkit';

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
export const subjectReducer = subjectSlice.reducer;
