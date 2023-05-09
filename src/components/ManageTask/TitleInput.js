import React from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import ErrorOverlay from '../error/ErrorOverlay';

const TitleInput = ({textInputConfig, errorMessage}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput {...textInputConfig} style={styles.input} multiline={false} />
      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default TitleInput;

const styles = StyleSheet.create({
  inputContainer: {
    flex: 0.15,
    marginHorizontal: 4,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textTheme,
    // alignItems: 'center',
    justifyContent: 'center',
    zIndex: -1,
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 12,
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
    // borderWidth: 1,
    // borderColor: 'red',
  },
  error: {
    color: 'red',
  },
});
