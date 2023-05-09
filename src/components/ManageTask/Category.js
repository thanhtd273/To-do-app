import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import Colors from '../../utils/Colors';

import {SUBJECTS} from '../../utils/data';
import {changeSubject} from '../redux/subject';
import SubjectBar from '../SubjectBar';

const Category = ({onPress, category}) => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.title}>Choose category</Text>
      <SubjectBar
        focusedCategory={category}
        isContainedAll={false}
        onPress={name => {
          onPress(name);
        }}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 0.2,
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomColor: Colors.textTheme,
    borderBottomWidth: 1,
  },
  title: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
  subjectContainer: {
    height: 48,
    width: 72,
    marginRight: 8,
    borderRadius: 6,
  },
  subjectItem: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  subjectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
});
