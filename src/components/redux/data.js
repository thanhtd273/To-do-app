import {createSlice} from '@reduxjs/toolkit';

const dataSlice = createSlice({
  name: 'tasks',
  initialState: {
    data: {
      subject: '',
      icon: '',
      iconColor: '',
      tasks: [],
    },
  },
  reducers: {
    chosenSubject: (state, action) => {
      return state.data.subject.toLowerCase() === action.payload.subject;
    },
  },
});

export const chosenSubject = dataSlice.actions.chosenSubject;
export default dataSlice.reducer;
