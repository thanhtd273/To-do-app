import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect} from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {Provider} from 'react-redux';

import TasksOverviewScreen from './src/screens/TasksOverviewScreen';
import TaskEditionScreen from './src/screens/TaskEditionScreen';
import {store} from './src/reducers/store';
import ManageTask from './src/screens/ManageTask';
import LoginScreen from './src/screens/LoginScreen';
import SignupScreen from './src/screens/SignupScreen';
import {remindTask} from './src/utils/functions/others';
import {NotificationListener} from './src/services/notification/configueNotification';

const Stack = createStackNavigator();

const App = () => {
  useEffect(() => {
    remindTask();
    NotificationListener();
  }, []);
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {backgroundColor: '#070717'},
            headerTintColor: '#48497b',
            headerTitleAlign: 'center',
            contentStyle: {backgroundColor: '#070717'},
          }}>
          <Stack.Screen
            name="LoginScreen"
            component={LoginScreen}
            ks
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="SignupScreen"
            component={SignupScreen}
            options={{headerShown: false}}
          />
          <Stack.Screen
            name="Overview"
            component={TasksOverviewScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen name="EditTask" component={TaskEditionScreen} />
          <Stack.Screen
            name="ManageTask"
            component={ManageTask}
            options={{
              title: 'New task',
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
};

export default App;
