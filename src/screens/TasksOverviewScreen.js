import React, {useEffect, useState} from 'react';
import {StyleSheet, View} from 'react-native';

import Content from '../components/Content';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Colors from '../utils/Colors';

const TasksOverviewScreen = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Header />
      <Content />
      <Footer />
    </View>
  );
};
export default TasksOverviewScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    justifyContent: 'center',
    backgroundColor: Colors.theme,
  },
  content: {
    flex: 1,
    backgroundColor: '#070717',
  },
});
