import React, {useEffect, useReducer, useState} from 'react';
import {
  View,
  Text,
  StyleSheet,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';

import Colors from '../utils/Colors';
import Input from '../components/UI/Input';
import FlatButton from '../components/UI/FlatButton';
import PressableText from '../components/UI/PressableText';
import Checkbox from '../components/UI/Checkbox';
import {login} from '../services/auth/auth';
import TasksOverviewScreen from './TasksOverviewScreen';
import {useDispatch, useSelector} from 'react-redux';
import {setUser} from '../reducers/user';
import {getAuthData, storeAuthData} from '../services/auth/getAuthToken';
import {createPlainErrorLog} from '../components/error/ErrorLog';
import LoadingOverlay from '../components/error/LoadingOverlay';
import {useNavigation} from '@react-navigation/native';

const LoginScreen = () => {
  const navigation = useNavigation();

  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputs, setInputs] = useState({email: '', password: ''});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const unsubcribe = () =>
      navigation.addListener('focus', () => {
        console.log('focus');
        setInputs({});
      });
    return unsubcribe;
  }, [navigation]);

  const fillWithLocalData = async () => {
    if (!inputs.email) {
      const data = await getAuthData();
      if (data) {
        Alert.alert(`Fill with ${data.email}`, '', [
          {
            text: 'Cancel',
            style: 'cancel',
          },
          {
            text: 'OK',
            onPress: () => {
              setInputs({email: data.email, password: data.password});
              Keyboard.dismiss();
            },
          },
        ]);
      }
    }
  };

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
  const signIn = async () => {
    checkInvalidCredentials({type: 'email'});
    checkInvalidCredentials({type: 'password'});
    if (
      !invalidCredentialsChecker.email &&
      !invalidCredentialsChecker.password
    ) {
      setLoading(true);
      try {
        const token = await login(inputs.email, inputs.password);
        if (checked) storeAuthData(token, inputs.email, inputs.password);
        dispatch(setUser({token, data: {email: inputs.email}}));
        setAuthenticated(true);
      } catch (error) {
        const {status} = JSON.parse(JSON.stringify(error));
        if (status === 400)
          createPlainErrorLog(
            'Sign-in failed!',
            `${inputs.email} doesn't exist!`,
          );
        // else if (error.code )
      }

      setLoading(false);
    } else {
      createPlainErrorLog(
        'Wrong credentials!',
        `Please check your credentials!`,
      );
    }
  };
  if (loading) return <LoadingOverlay message="Loging in!" />;
  if (user.token && authenticated) return <TasksOverviewScreen />;
  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={styles.inputForm}>
          <Input
            label="Email"
            placeholder="Type your email"
            errorMessage={invalidCredentialsChecker.email && 'Invalid email!'}
            inputProps={{
              defaultValue: inputs.email ?? '',
              onChangeText: text => {
                setInputs({...inputs, email: text});
                // checkInvalidCredentials({type: 'email'});
              },
              onFocus: () => fillWithLocalData(),
              onEndEditing: () => checkInvalidCredentials({type: 'email'}),
            }}
          />
          <Input
            label="Password"
            placeholder="Type your password"
            errorMessage={
              invalidCredentialsChecker.password &&
              'Invalid password! Password must have more than 8 characteristics.'
            }
            secure={true}
            inputProps={{
              defaultValue: inputs.password ?? '',
              onChangeText: text => setInputs({...inputs, password: text}),
              onEndEditing: () => checkInvalidCredentials({type: 'password'}),
            }}
          />
        </View>

        <View style={styles.functionContainer}>
          <View style={styles.top}>
            <View style={{flexDirection: 'row'}}>
              <Checkbox
                checked={checked}
                onPress={() => setChecked(!checked)}
              />
              <Text style={[styles.text, {marginLeft: 8}]}>Remenber me</Text>
            </View>
            <PressableText>Reset password!</PressableText>
          </View>
          <FlatButton title="Login" onPress={signIn} />
        </View>

        <View style={styles.signupContainer}>
          <Text style={[styles.text, {marginHorizontal: 8}]}>
            Don't have account?
          </Text>
          <PressableText onPress={() => navigation.navigate('SignupScreen')}>
            Sign up
          </PressableText>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;

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
