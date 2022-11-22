import React, {useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useSelector} from 'react-redux';

import Colors from '../utils/Colors';
import {TEMPLATE} from '../utils/data';
import SubjectItem from './UI/SubjectItem';

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
      {TEMPLATE.map(item => (
        <SubjectItem
          key={item.id}
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
