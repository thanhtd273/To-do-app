import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {TextInput} from 'react-native';
import Colors from '../utils/Colors';
import SubjectBar from './SubjectBar';

import IconButton from './UI/IconButton';

const Header = () => {
  return (
    <View style={styles.container}>
      <View style={styles.topStyle}>
        <TextInput
          style={styles.input}
          placeholder="Search"
          placeholderTextColor="#48497b"
        />
        <IconButton
          icon="calendar"
          size={48}
          color="white"
          style={styles.pressedCalendar}
        />
      </View>
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
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
    color: 'white',
  },
  pressedCalendar: {
    backgroundColor: Colors.bluePurple,
  },
});
