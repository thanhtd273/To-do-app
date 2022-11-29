import React from 'react';
import {View, TextInput, StyleSheet} from 'react-native';

const TitleInput = ({textInputConfig}) => {
  return (
    <View style={styles.inputContainer}>
      <TextInput {...textInputConfig} style={styles.input} multiline={false} />
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
  },
  input: {
    flex: 1,
    paddingVertical: 0,
    marginTop: 12,
    color: '#fff',
    fontSize: 24,
    fontWeight: '500',
  },
});
