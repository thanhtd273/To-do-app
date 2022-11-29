import {NavigationContainer} from '@react-navigation/native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {Icon} from '@rneui/themed';
import {Provider} from 'react-redux';
import axios from 'axios';

import TasksOverviewScreen from './src/screens/TasksOverviewScreen';
import TaskEditionScreen from './src/screens/TaskEditionScreen';
import {store} from './src/components/redux/store';
import ManageTask from './src/screens/ManageTask';
import {DATA} from './src/utils/data';

const BottomTabs = createBottomTabNavigator();
const Stack = createStackNavigator();

const TasksOverview = () => {
  return (
    <BottomTabs.Navigator>
      <BottomTabs.Screen
        name="TasksOverview"
        component={TasksOverviewScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="format-align-left" color={color} size={size} />
          ),
          headerShown: true,
        }}
      />
      <BottomTabs.Screen
        name="AddTask"
        component={TaskEditionScreen}
        options={{
          tabBarIcon: ({color, size}) => (
            <Icon name="add" color={color} size={size} />
          ),
        }}
      />
    </BottomTabs.Navigator>
  );
};

const App = () => {
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
