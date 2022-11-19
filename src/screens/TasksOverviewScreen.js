import React from 'react';
import {StyleSheet, View} from 'react-native';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import {TEMPLATE} from '../utils/data';

const TasksOverviewScreen = () => {
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
