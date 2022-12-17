import {createSlice, current} from '@reduxjs/toolkit';

import {SUBJECTS} from '../../utils/data';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
  },
  reducers: {
    setTasks: (state, action) => {
      state.tasks = action.payload.tasks;
    },
    addTask: (state, action) => {
      const indexBySubject = state.tasks.findIndex(
        item => item.subject === action.payload.subject,
      );
      const currentSubject = SUBJECTS.find(
        item => item.subject === action.payload.subject,
      );
      if (indexBySubject < 0) {
        state.tasks.push({
          subject: action.payload.subject,
          icon: currentSubject.icon,
          iconColor: currentSubject.iconColor,
          tasks: [
            {
              title: action.payload.data.title,
              deadline: action.payload.data.deadline,
              reminders: action.payload.data.reminders,
              isCompleted: false,
            },
          ],
        });
      } else {
        state.tasks[indexBySubject].tasks.push({
          // subject: action.payload.subject,
          title: action.payload.data.title,
          deadline: action.payload.data.deadline,
          reminders: action.payload.data.reminders,
          isCompleted: false,
        });
      }
    },
    deleteTask: (state, action) => {
      const data = [...state.tasks];
      const tasks = data.find(
        item => item.id === action.payload.subjectId,
      ).tasks;
      const deletedItemIndex = tasks.findIndex(
        task => task.id === action.payload.id,
      );
      tasks.splice(deletedItemIndex, 1);
    },
    updateTask: (state, action) => {
      const tasksState = [...state.tasks];
      let updatedArray = [
        ...tasksState.find(item => item.id === action.payload.subjectId).tasks,
      ];
      updatedArray.forEach((item, index) => {
        if (item.id === action.payload.id) {
          const updatingData = action.payload.data;
          updatedArray[index].title = updatingData.title;
          updatedArray[index].isCompleted = updatingData.isCompleted;
          updatedArray[index].reminder = updatingData.reminder;
          updatedArray[index].deadline = updatingData.deadline;
        }
      });
    },
    updateCompletion: (state, action) => {
      const today = new Date();
      const updatedTask = state.tasks
        .find(item => item.id === action.payload.subjectId)
        .tasks.find(task => task.id === action.payload.id);

      if (new Date(updatedTask.deadline) < today)
        updatedTask.isCompleted = true;
    },
  },
});

export const setTasks = tasksSlice.actions.setTasks;
export const addTask = tasksSlice.actions.addTask;
export const deleteTask = tasksSlice.actions.deleteTask;
export const updateTask = tasksSlice.actions.updateTask;
export const updateCompletion = tasksSlice.actions.updateCompletion;
export default tasksSlice.reducer;
