import React from 'react';
import {StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {DATA, TEMPLATE} from '../utils/data';

const TasksOverviewScreen = () => {
  const subjectState = useSelector(state => state.subject);
  let data = DATA.find(
    item =>
      item.subject === subjectState || item.subject === subjectState.subject,
  );
  if (typeof data === 'undefined') data = DATA;
  // console.log(data);
  return (
    <View style={styles.container}>
      <Header />
      <Content data={data} />
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
