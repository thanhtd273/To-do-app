import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../utils/Colors';
import {Pressable} from 'react-native';

const Checkbox = ({checked, onPress}) => {
  return (
    <Pressable onPress={onPress}>
      <View style={styles.container}>
        {checked && (
          <Icon name="check-bold" size={20} color={Colors.bluePurple} />
        )}
      </View>
    </Pressable>
  );
};

export default Checkbox;

const styles = StyleSheet.create({
  container: {
    width: 24,
    height: 24,
    padding: 0,
    backgroundColor: Colors.theme2,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: Colors.textTheme,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
