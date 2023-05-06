import AsyncStorage from '@react-native-async-storage/async-storage';
import _BackgroundTimer from 'react-native-background-timer';
import {getTasks, getUserByEmail} from './communicateDatabase';
import {login} from '../../services/auth/auth';
import {calculateDayLeft} from './date';
import {pushNotification} from '../../services/notification/pushNotification';
import {Vibration} from 'react-native';

export const remindTask = async () => {
  const data = await AsyncStorage.getItem('auth');
  const {email, password} = JSON.parse(data);
  const token = await login(email, password);

  const user = await getUserByEmail(email, token);
  const tasks = await getTasks(user.id, token);

  const remindTasks = tasks.filter(task => {
    const status = task.data.status;
    return calculateDayLeft(task.data.reminder) >= 0 && status === 'doing';
  });

  console.log(remindTasks);

  remindTasks.forEach(task => {
    const target = new Date(task.data.reminder);
    // const target = new Date('2023-05-07T00:59');
    const today = new Date();
    const delay = target.getTime() - today.getTime();
    console.log(delay);

    _BackgroundTimer.setTimeout(() => {
      pushNotification({
        body: task.data.title,
        title: 'Deadline is upcoming!',
      });
      Vibration.vibrate(10000); // Vibrate 10s
    }, delay);
  });
};
