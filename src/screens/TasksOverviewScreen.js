import React from 'react';
import {Pressable, StyleSheet, View} from 'react-native';
import {useSelector} from 'react-redux';

import Content from '../components/Content';
import CustomizedCalendar from '../components/CustomizedCalendar';
import Footer from '../components/Footer';
import Header from '../components/Header';
import Colors from '../utils/Colors';
import {DATA, TEMPLATE} from '../utils/data';

const TasksOverviewScreen = () => {
  const subjectState = useSelector(state => state.subject);
  let data = DATA.find(
    item =>
      item.subject === subjectState || item.subject === subjectState.subject,
  );
  if (typeof data === 'undefined') data = DATA;
  return (
    <View style={styles.container}>
      {/* <CustomizedCalendar /> */}
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
    // opacity: 0.1,
  },
});
