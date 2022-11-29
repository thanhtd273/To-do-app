import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {useSelector} from 'react-redux';

import SubjectBar from '../SubjectBar';

const Category = () => {
  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.text}>Choose category</Text>
      <SubjectBar isContainedAll={false} />
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
  text: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
});
