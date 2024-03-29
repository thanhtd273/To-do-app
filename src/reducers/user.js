import {createSlice} from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    user: {},
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    removeUser: (state, action) => {
      state.user = {id: null, token: null, data: {}};
    },
  },
});

export default userSlice.reducer;
export const {setUser, removeUser} = userSlice.actions;
