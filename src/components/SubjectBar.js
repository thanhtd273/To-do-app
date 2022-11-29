import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../utils/Colors';
import {DATA} from '../utils/data';
import {fetchTasks} from '../utils/http';
import SubjectItem from './UI/SubjectItem';
import {setTasks} from './redux/tasks';

const SubjectBar = ({isContainedAll}) => {
  const subjectState = useSelector(state => state.subject);
  const tasks = useSelector(state => state.tasks);
  const dispatch = useDispatch();

  useEffect(() => {
    const getTasksFromFirebase = async () => {
      const data = await fetchTasks();
      dispatch(setTasks({tasks: data}));
    };
    getTasksFromFirebase();
  }, []);

  console.log(tasks);

  return (
    <ScrollView contentContainerStyle={styles.container} horizontal={true}>
      {isContainedAll && (
        <SubjectItem
          subject="All"
          style={
            (subjectState === 'All' || subjectState.subject === 'All') && {
              backgroundColor: Colors.bluePurple,
            }
          }
        />
      )}
      {DATA.map((item, index) => (
        <SubjectItem
          key={index}
          icon={item.icon}
          subject={item.subject}
          color={item.iconColor}
          style={
            subjectState === item.subject && {
              backgroundColor: Colors.bluePurple,
            }
          }
        />
      ))}
    </ScrollView>
  );
};

export default SubjectBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
