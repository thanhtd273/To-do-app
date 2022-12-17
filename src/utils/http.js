import axios from 'axios';

import {DATA} from './data';

const BACKEND_URL =
  'https://to-do-app-11762-default-rtdb.asia-southeast1.firebasedatabase.app';

const storeTask = async () => {
  const response = await axios.post(`${BACKEND_URL}/tasks.json`, DATA);

  const id = response.data.id;
  return id;
};

const fetchTasks = async () => {
  const response = await axios.get(`${BACKEND_URL}/data.json`);
  const tasks = [];
  for (const key in response.data) {
    const item = response.data[key];
    const data = [];
    for (const i in item.tasks) {
      data.push({id: i, ...item.tasks[i]});
    }

    const taskObj = {
      id: key,
      subject: item.subject,
      icon: item.icon,
      iconColor: item.iconColor,
      tasks: data,
    };
    tasks.push(taskObj);
  }
  return tasks;
};

const storeNewTask = async (subjectId, taskData) => {
  try {
    const response = await axios.post(
      `${BACKEND_URL}/data/${subjectId}/tasks.json`,
      taskData,
    );
    const id = response.data.name;
  } catch (error) {
    console.log(error);
  }
};

const updateTaskToBackend = async (subjectId, id, data) => {
  axios.put(`${BACKEND_URL}/data/${subjectId}/tasks/${id}.json`, data);
};

const updateCompletionToBackend = async (subjectId, id) => {
  const response = await axios(
    `${BACKEND_URL}/data/${subjectId}/tasks/${id}.json`,
  );
  const data = {...response.data, isCompleted: true};
  // console.log(data);
  await axios.put(`${BACKEND_URL}/data/${subjectId}/tasks/${id}.json`, data);
};

const deleteTaskToBackend = (subjectId, id) => {
  axios.delete(`${BACKEND_URL}/data/${subjectId}/tasks/${id}.json`);
};

export {
  storeTask,
  fetchTasks,
  storeNewTask,
  updateTaskToBackend,
  updateCompletionToBackend,
  deleteTaskToBackend,
};
