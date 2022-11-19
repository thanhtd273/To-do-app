import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TEMPLATE} from '../utils/data';
import TaskContentItem from './UI/TaskContentItem';

const Content = () => {
  return (
    <View style={styles.container}>
      <TaskContentItem
        title="Continue To-do-app"
        deadline="12.30"
        subjectIcon="sports-football"
        subjectIconColor="#6e83de"
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: '#ccc',
  },
});
