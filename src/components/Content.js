import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SectionList, StyleSheet, Text, View} from 'react-native';

import TaskContentItem from './UI/TaskContentItem';
import SubjectBar from './SubjectBar';
import {
  getTasks,
  getTasksByCategory,
  getUserByEmail,
} from '../utils/functions/communicateDatabase';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../reducers/task';
import {formateDate, sortTasksByDayLeft} from '../utils/functions/date';
import {setUser} from '../reducers/user';
import {
  NotificationListener,
  getFCMToken,
  requestUserPermission,
} from '../services/notification/configueNotification';
const Content = () => {
  const navigation = useNavigation();
  const {tasks} = useSelector(state => state.tasks);
  const {user} = useSelector(state => state.user);
  const dispatch = useDispatch();

  const [category, setCategory] = useState('All');

  useEffect(() => {
    getFCMToken();
    requestUserPermission();
    NotificationListener();
  }, []);

  useEffect(() => {
    getUserByEmail(user.data.email, user.token)
      .then(res => {
        dispatch(setUser({token: user.token, id: res.id, data: res.data}));
      })
      .catch(err => console.log(err));

    setCategory('All');
  }, []);
  useEffect(() => {
    if (user.id)
      getTasks(user.id, user.token).then(res => dispatch(setTasks(res)));
  }, [user.id]);

  const filterByCategory = async category => {
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
      console.log('Error from querying all tasks');
      console.log(error);
    }
  };
  const renderTaskItem = ({item}) => {
    return (
      <TaskContentItem
        task={item}
        onPress={() => {
          navigation.navigate('ManageTask', {
            id: item.id,
            data: item.data,
          });
        }}
      />
    );
  };
  const Title = ({date}) => {
    return (
      <View style={styles.dateContainer}>
        <Text style={styles.date}>{formateDate(date)}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SubjectBar
        isAll={true}
        focusedCategory={category}
        onPress={name => {
          setCategory(name);
          filterByCategory(name);
        }}
        containerStyle={{top: 0, position: 'absolute'}}
      />
      <SectionList
        sections={sortTasksByDayLeft(tasks)}
        renderItem={renderTaskItem}
        renderSectionHeader={({section: {date}}) => <Title date={date} />}
        style={{height: '80%'}}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.8,
    marginVertical: 8,
  },
  dateContainer: {
    marginTop: 12,
    marginLeft: 12,
  },
  date: {
    color: '#3d3d6a',
    fontSize: 20,
  },
});
