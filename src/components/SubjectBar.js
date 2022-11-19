import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';
import Colors from '../utils/Colors';
import {TEMPLATE} from '../utils/data';
import SubjectItem from './UI/SubjectItem';

const SubjectBar = () => {
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
