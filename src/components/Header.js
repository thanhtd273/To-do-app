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
          // onSubmitEditing={({nativeEvent}) => console.log(nativeEvent.text)}
        />
        <IconButton
          icon="calendar-today"
          size={48}
          color="white"
          style={styles.pressedCalendar}
        />
      </View>
      <SubjectBar isContainedAll={true} />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
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
