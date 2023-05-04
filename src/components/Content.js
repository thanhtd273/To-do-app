import React, {useState, useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {SectionList, StyleSheet, Text, View} from 'react-native';
import axios from 'axios';

import TaskContentItem from './UI/TaskContentItem';
import SubjectBar from './SubjectBar';
import {databaseURL} from '../utils/server/URL';
import {
  getTasks,
  getTasksByCategory,
} from '../utils/functions/communicateDatabase';
import {useDispatch, useSelector} from 'react-redux';
import {setTasks} from '../reducers/task';
import {formateDate, sortTasksByDayLeft} from '../utils/functions/date';

const Content = () => {
  const navigation = useNavigation();
  const {tasks} = useSelector(state => state.tasks);
  const dispatch = useDispatch();
  const [category, setCategory] = useState('All');
  const [userID, setUserID] = useState('');

  useEffect(() => {
    setCategory('All');
    axios.get(`${databaseURL}/users`).then(response => {
      const id = response.data.documents[0].name.split('/').at(-1);
      setUserID(id);
      getTasks(id).then(res => {
        dispatch(setTasks(res));
      });
    });
  }, []);

  const filterByCategory = async category => {
    if (category === 'All') {
      axios.get(`${databaseURL}/users`).then(response => {
        const id = response.data.documents[0].name.split('/').at(-1);
        setUserID(id);
        getTasks(id).then(res => {
          dispatch(setTasks(res));
        });
      });
    } else {
      const response = await getTasksByCategory(category, userID);
      dispatch(setTasks(response));
    }
  };
  const renderTaskItem = ({item}) => {
    return (
      <TaskContentItem
        id={item.id}
        title={item.data.title}
        deadline={item.data.deadline}
        category={item.data.category}
        icon={item.data.icon}
        color={item.data.color}
        status={item.data.status}
        onPress={() => {
          navigation.navigate('ManageTask', {
            userID: userID,
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
