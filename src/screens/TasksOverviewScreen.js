import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Colors from '../utils/Colors';
import {fetchTasks} from '../utils/http';
import {setTasks} from '../components/redux/tasks';

const TasksOverviewScreen = () => {
  const subjectState = useSelector(state => state.subject);
  let tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const getDataFromFirebase = async () => {
      const data = await fetchTasks();
      dispatch(setTasks({tasks: data}));
    };
    getDataFromFirebase();
  }, []);
  let data = [];

  if (!Array.isArray(tasks)) tasks = tasks.tasks;
  data = tasks.find(
    item =>
      item.subject === subjectState || item.subject === subjectState.subject,
  );

  if (typeof data === 'undefined') data = tasks;

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Header />
        <Content argument={data} />
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
