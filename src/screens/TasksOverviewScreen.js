import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Colors from '../utils/Colors';
import {
  deleteTaskToBackend,
  fetchTasks,
  updateCompletionToBackend,
} from '../utils/http';
import {
  deleteTask,
  setTasks,
  updateCompletion,
} from '../components/redux/tasks';
import axios from 'axios';

const TasksOverviewScreen = ({navigation}) => {
  const subjectState = useSelector(state => state.subject);
  const {tasks} = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchApi = async () => {
      const data = await fetchTasks();
      dispatch(setTasks({tasks: data}));
    };
    fetchApi();
  }, [navigation, subjectState]);
  let data = [];
  console.log('re-render');
  // Updating isCompleted in state and Realtime database
  tasks.forEach(item => {
    const subjId = item.id;
    item.tasks.forEach(task => {
      const id = task.id;
      dispatch(updateCompletion({subjectId: subjId, id: id}));
      const today = new Date();
      const deadline = new Date(task.deadline);
      const calculateDateLeft = (date1, date2) => {
        const result = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
        if (result === -0) return 0;
        return result;
      };
      const dayPassed = calculateDateLeft(today, deadline);
      if (deadline < today && dayPassed >= -7 && dayPassed <= 0)
        updateCompletionToBackend(subjId, id);

      if (dayPassed < -7) {
        dispatch(deleteTask({id: id, subjectId: subjId}));
        deleteTaskToBackend(subjId, id);
      }
    });
  });
  data = tasks.find(
    item =>
      item.subject === subjectState || item.subject === subjectState.subject,
  );
  if (typeof data === 'undefined') {
    data = tasks;
  }

  console.log(tasks);
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Content data={data} />
        <Footer />
      </View>
    </View>
  );
};
export default TasksOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.theme,
  },
  content: {
    flex: 1,
    backgroundColor: '#070717',
  },
});
