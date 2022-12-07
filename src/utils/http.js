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
  const response = await axios.get(`${BACKEND_URL}/tasks.json`);
  const tasks = [];
  for (const key in response.data) {
    const item = response.data[key];
    const taskObj = {
      id: key,
      subject: item.subject,
      icon: item.icon,
      iconColor: item.iconColor,
      tasks: item.tasks,
    };
    tasks.push(taskObj);
  }
  return tasks;
};

export {storeTask, fetchTasks};
