import React, {useState} from 'react';
import {View, TextInput, StyleSheet, Text} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Colors from '../../utils/Colors';

const Input = ({
  label,
  placeholder,
  containerStyle,
  errorMessage,
  secure,
  inputProps,
}) => {
  const [hidden, setHidden] = useState(secure);
  return (
    <View style={[styles.container, containerStyle]}>
      <Text style={styles.label}>{label}</Text>
      <View
        style={[
          styles.inputContainer,
          errorMessage && {borderWidth: 1, borderColor: 'red'},
        ]}>
        <TextInput
          style={[styles.input, secure ? {width: '90%'} : {width: '100%'}]}
          placeholder={placeholder}
          placeholderTextColor={Colors.textTheme}
          secureTextEntry={hidden}
          {...inputProps}
        />

        {secure && (
          <Icon
            name={hidden ? 'eye-off' : 'eye'}
            size={18}
            color={'white'}
            onPress={() => setHidden(!hidden)}
          />
        )}
      </View>

      {errorMessage && <Text style={styles.error}>{errorMessage}</Text>}
    </View>
  );
};

export default Input;

const styles = StyleSheet.create({
  container: {
    width: '90%',
    height: 120,
    marginVertical: 6,
  },
  label: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
  inputContainer: {
    width: '100%',
    height: 50,
    marginTop: 8,
    paddingHorizontal: 8,
    backgroundColor: '#1b1a39',
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    color: '#fff',
  },
  error: {
    color: 'red',
    marginLeft: 8,
  },
});
