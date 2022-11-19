import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native';
import SubjectBar from './SubjectBar';

import IconButton from './UI/IconButton';
import SubjectItem from './UI/SubjectItem';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topStyle}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#48497b"
        />
        <IconButton icon="calendar-today" size={48} color="white" />
      </View>
      <SubjectBar />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 0.3,
  },
  topStyle: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: 8,
    marginTop: 16,
  },
  input: {
    width: '80%',
    height: 48,
    backgroundColor: '#121230',
    borderRadius: 12,
    paddingLeft: 12,
  },
});
