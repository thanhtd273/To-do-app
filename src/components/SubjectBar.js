import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../utils/Colors';
import {TEMPLATE} from '../utils/data';
import SubjectItem from './UI/SubjectItem';

const SubjectBar = () => {
  const data = useSelector(state => state.data.data);
  const dispatch = useDispatch();
  return (
    <ScrollView contentContainerStyle={styles.container} horizontal={true}>
      <SubjectItem subject="ALL" style={{backgroundColor: Colors.bluePurple}} />
      {TEMPLATE.map(subject => (
        <SubjectItem
          key={subject.id}
          icon={subject.icon}
          subject={subject.subject}
          color={subject.iconColor}
          style={{backgroundColor: Colors.bluePurple}}
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
