import React, {useEffect, useState} from 'react';
import {View, Text, StyleSheet} from 'react-native';

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

const LoginScreen = ({navigation}) => {
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [checked, setChecked] = useState(false);
  const [authenticated, setAuthenticated] = useState(false);
  const [inputs, setInputs] = useState({});
  const [localData, setLocalData] = useState({});

  useEffect(() => {
    getAuthData().then(response => {
      setLocalData(response);
    });
  }, []);
  useEffect(() => {
    if (localData?.token) {
      setInputs({email: localData.email, password: localData.password});
    }
  }, [localData]);
  // if (!user.token) setAuthenticated(false);

  const signIn = async () => {
    const token = await login(inputs.email, inputs.password);
    if (checked) storeAuthData(token, inputs.email, inputs.password);
    dispatch(setUser({token, data: {email: inputs.email}}));
    setAuthenticated(true);
  };

  if (user.token && authenticated) return <TasksOverviewScreen />;
  return (
    <View style={styles.container}>
      <View style={styles.inputForm}>
        <Input
          label="Email"
          placeholder="Type your email"
          inputProps={{
            defaultValue: inputs.email ?? '',
            onChangeText: text => setInputs({...inputs, email: text}),
          }}
        />
        <Input
          label="Password"
          placeholder="Type your password"
          inputProps={{
            defaultValue: inputs.password ?? '',
            secureTextEntry: true,
            onChangeText: text => setInputs({...inputs, password: text}),
          }}
        />
      </View>

      <View style={styles.functionContainer}>
        <View style={styles.top}>
          <View style={{flexDirection: 'row'}}>
            <Checkbox checked={checked} onPress={() => setChecked(!checked)} />
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
