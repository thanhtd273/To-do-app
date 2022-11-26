import {createSlice} from '@reduxjs/toolkit';

const calendarSlice = createSlice({
  name: 'disabledCalendar',
  initialState: {
    disabled: false,
  },
  reducers: {
    mountCalendar: () => {},
  },
});
