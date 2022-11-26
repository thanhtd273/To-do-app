import React from 'react';
import {Pressable, StyleSheet, Text, View} from 'react-native';
import {Icon} from '@rneui/themed';

import Colors from '../../utils/Colors';

const Timing = ({title, onPress, time}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>{title}</Text>
      <Pressable
        style={({pressed}) => pressed && {opacity: 0.75}}
        onPress={onPress}>
        <View style={styles.settingTimeContainer}>
          <Icon name="calendar-today" size={24} color={Colors.bluePurple} />
          <Text style={styles.timeText}>{time}</Text>
        </View>
      </Pressable>
    </View>
  );
};

export default Timing;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    color: Colors.textTheme,
    fontSize: 16,
    fontWeight: '400',
  },
  settingTimeContainer: {
    width: '80%',
    height: 48,
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginTop: 16,
    borderWidth: 2,
    borderStyle: 'dashed',
    borderRadius: 6,
    borderColor: Colors.textTheme,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  timeText: {
    color: Colors.bluePurple,
    fontSize: 16,
  },
});
