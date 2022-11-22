import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {DATA, TEMPLATE} from '../utils/data';

const TasksOverviewScreen = () => {
  const subjectState = useSelector(state => state.subject);
  const data = DATA.find(
    item =>
      item.subject === subjectState || item.subject === subjectState.subject,
  );
  // console.log(data);
  return (
    <View style={styles.container}>
      <Header />
      <Content data={TEMPLATE[0]} />
      <Footer />
    </View>
  );
};

export default TasksOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#070717',
  },
});
