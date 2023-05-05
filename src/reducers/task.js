import {createSlice} from '@reduxjs/toolkit';

const taskSlice = createSlice({
  name: 'task',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload;
    },
    addTask: (state, action) => {
      state.tasks.push(action.payload);
    },
    updateTask: (state, action) => {
      const index = state.tasks.findIndex(
        item => item.id === action.payload.id,
      );
      state.tasks[index].data = action.payload.data;
    },
    updateTaskStatus: (state, action) => {
      const index = state.tasks.findIndex(
        item => item.id === action.payload.id,
      );
      state.tasks[index].data.status = 'done';
    },
    deleteTask: (state, action) => {
      const index = state.tasks.findIndex(
        item => item.id === action.payload.id,
      );
      state.tasks.splice(index, 1);
    },
  },
});

export default taskSlice.reducer;
export const {setTasks, updateTask, updateTaskStatus, addTask, deleteTask} =
  taskSlice.actions;
