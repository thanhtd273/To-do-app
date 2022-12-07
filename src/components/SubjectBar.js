import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';

import Colors from '../utils/Colors';
import {DATA} from '../utils/data';
import SubjectItem from './UI/SubjectItem';
import {changeSubject} from './redux/subject';

const SubjectBar = ({isContainedAll}) => {
  const subjectState = useSelector(state => state.subject);

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
