import React, {useReducer, useState} from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  KeyboardAvoidingView,
  Keyboard,
} from 'react-native';

import Colors from '../utils/Colors';
import Input from '../components/UI/Input';
import FlatButton from '../components/UI/FlatButton';
import {createUser} from '../services/auth/auth';
import {createNewUser} from '../utils/functions/communicateDatabase';
import {createPlainErrorLog} from '../components/error/ErrorLog';
import LoadingOverlay from '../components/error/LoadingOverlay';

const SignupScreen = ({navigation}) => {
  const [inputs, setInputs] = useState({email: '', password: '', name: ''});
  const [loading, setLoading] = useState(false);
  const initialChecker = {email: false, password: false};
  const reducer = (state, action) => {
    switch (action.type) {
      case 'email':
        if (!(inputs.email.includes('@') && inputs.email.includes('.')))
          return {...state, email: true};
        else return {...state, email: false};

      case 'password':
        if (inputs.password === '' || inputs.password.length < 8)
          return {...state, password: true};
        return {...state, password: false};
      default:
        return state;
    }
  };
  const [invalidCredentialsChecker, checkInvalidCredentials] = useReducer(
    reducer,
    initialChecker,
  );

  const signup = async () => {
    checkInvalidCredentials({type: 'email'});
    checkInvalidCredentials({type: 'password'});
    if (
      !invalidCredentialsChecker.email &&
      !invalidCredentialsChecker.password
    ) {
      setLoading(true);
      try {
        const token = await createUser(inputs.email, inputs.password);
        createNewUser({email: inputs.email, name: inputs.name, token});
      } catch (error) {
        createPlainErrorLog('Sign-up failed!', 'Check your credentials');
      }
      setLoading(false);
      navigation.goBack();
    } else {
      createPlainErrorLog('Wrong inputs!', 'Check your inputs.');
    }
  };
  if (loading) return <LoadingOverlay message="Signing up!" />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <KeyboardAvoidingView behavior="height" style={{flex: 1}}>
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
              errorMessage={invalidCredentialsChecker.email && 'Invalid email!'}
              inputProps={{
                onChangeText: text => setInputs({...inputs, email: text}),
                onEndEditing: () => checkInvalidCredentials({type: 'email'}),
              }}
            />
            <Input
              label="Password"
              placeholder="Enter your password"
              errorMessage={
                invalidCredentialsChecker.password &&
                'Invalid password! Password must have more than 8 characteristics.'
              }
              secure={true}
              inputProps={{
                onChangeText: text => setInputs({...inputs, password: text}),
                onEndEditing: () => checkInvalidCredentials({type: 'password'}),
              }}
            />
          </View>

          <View style={styles.functionContainer}>
            <FlatButton title="Sign up" onPress={signup} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
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
