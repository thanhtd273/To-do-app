import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

import Colors from '../utils/Colors';
import Input from '../components/UI/Input';
import FlatButton from '../components/UI/FlatButton';
import PressableText from '../components/UI/PressableText';
import Checkbox from '../components/UI/Checkbox';
import {createUser} from '../services/auth/auth';
import {createNewUser} from '../utils/functions/communicateDatabase';

const SignupScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({});

  const signup = async () => {
    console.log(inputs);
    const token = await createUser(inputs.email, inputs.password);
    createNewUser({email: inputs.email, name: inputs.name, token});
    navigation.goBack();
  };
  return (
    <View style={styles.container}>
      <View style={styles.inputForm}>
        <Input
          label="Name"
          placeholder="Enter your name"
          inputProps={{
            onChangeText: text => setInputs({...inputs, name: text}),
          }}
        />
        <Input
          label="Email"
          placeholder="Enter your email"
          inputProps={{
            onChangeText: text => setInputs({...inputs, email: text}),
          }}
        />
        <Input
          label="Password"
          placeholder="Enter your password"
          inputProps={{
            secureTextEntry: true,
            onChangeText: text => setInputs({...inputs, password: text}),
          }}
        />
      </View>

      <View style={styles.functionContainer}>
        <FlatButton title="Sign up" onPress={signup} />
      </View>

      <View style={styles.signupContainer}>
        <Text style={[styles.text, {marginHorizontal: 8}]}>
          Don't have account?
        </Text>
        <PressableText>Sign up</PressableText>
      </View>
    </View>
  );
};

export default SignupScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 8,
    backgroundColor: Colors.theme,
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputForm: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  functionContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 12,
  },
  top: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 12,
  },
  text: {
    color: Colors.textTheme,
    fontSize: 18,
  },
  signupContainer: {
    flexDirection: 'row',
    bottom: 20,
    position: 'absolute',
  },
});
