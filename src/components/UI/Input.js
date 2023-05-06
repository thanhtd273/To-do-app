import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Colors from '../../utils/Colors';

const Input = ({label, placeholder, containerStyle, inputProps}) => {
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <TextInput
        style={styles.input}
        placeholder={placeholder}
        placeholderTextColor={Colors.textTheme}
        {...inputProps}
      />
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 100,
    marginVertical: 6,
  },
  label: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
  input: {
    width: '100%',
    height: 50,
    marginVertical: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1b1a39',
    borderRadius: 8,
    color: '#fff',
  },
});
