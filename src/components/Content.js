import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {StyleSheet, View} from 'react-native';

import SubjectBar from './SubjectBar';
import {
  getTasks,
  getTasksByCategory,
  getUserByEmail,
  queryStructure,
} from '../utils/functions/communicateDatabase';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../reducers/task';
import {sortTasksByDayLeft} from '../utils/functions/date';
import {setUser} from '../reducers/user';
import {
  NotificationListener,
  getFCMToken,
  requestUserPermission,
} from '../services/notification/configueNotification';
import {createPlainErrorLog, createErrorLog} from './error/ErrorLog';
import LoadingOverlay from './error/LoadingOverlay';
import {Alert} from 'react-native';
import ListOfTasks from './ListOfTasks';

const Content = () => {
  const navigation = useNavigation();
  const {tasks} = useSelector(state => state.tasks);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [category, setCategory] = useState('All');
  const [loading, setLoading] = useState(false);
  const [count, setCount] = useState(0);

  // useEffect(() => {
  //   getFCMToken();
  //   requestUserPermission();
  //   NotificationListener();
  // }, []);

  useEffect(() => {
    setLoading(true);
    try {
      if (user.data.email && user.token) {
        getUserByEmail(user.data.email, user.token)
          .then(res => {
            dispatch(setUser({token: user.token, id: res.id, data: res.data}));
          })
          .catch(err => {
            console.log('Error: 💥💥💥', err);
            // createPlainErrorLog(
            //   `Get user information failed! ${user.data.email} ${user.id}`,
            //   "Wrong email or email doesn't exist in server",
            // );
            createPlainErrorLog(
              `Get user information failed! ${user.data.email} ,
              )}`,
              `${err}`,
            );
          });
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    setCategory('All');
  }, []);
  useEffect(() => {
    try {
      if (user.id)
        getTasks(user.id, user.token)
          .then(res => dispatch(setTasks(res)))
          .catch(err => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, [user.id]);

  const filterByCategory = async category => {
    setLoading(true);
    try {
      if (category === 'All') {
        const res = await getTasks(user.id, user.token);
        dispatch(setTasks(res));
      } else {
        const response = await getTasksByCategory(
          category,
          user.id,
          user.token,
        );
        dispatch(setTasks(response));
      }
    } catch (error) {
      setCount(count + 1);
      if (count <= 3) {
        createErrorLog({
          title: 'Cannot get the task!',
          message: 'Try again!',
          onAgree: () => {
            filterByCategory(category);
          },
        });
      } else {
        createPlainErrorLog('Sorry!', 'Cannot get the task');
      }
    }
    setLoading(false);
  };
  return (
    <View style={styles.container}>
      <SubjectBar
        isAll={true}
        focusedCategory={category}
        onPress={name => {
          filterByCategory(name);
          setCategory(name);
        }}
        containerStyle={{top: 0, position: 'absolute'}}
      />
      {loading ? (
        <LoadingOverlay message="Loading" />
      ) : (
        <ListOfTasks data={tasks && sortTasksByDayLeft(tasks)} />
      )}
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    marginVertical: 8,
  },
});
