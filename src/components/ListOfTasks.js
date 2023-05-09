import React from 'react';
import {SectionList, View, Text, StyleSheet} from 'react-native';

import TaskContentItem from './UI/TaskContentItem';
import {useNavigation} from '@react-navigation/native';
import {formateDate} from '../utils/functions/date';

const ListOfTasks = ({data}) => {
  const navigation = useNavigation();
  // console.log(data);

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
  if (!data) return <View style={{height: '80%'}}></View>;
  return (
    <SectionList
      sections={data}
      keyExtractor={(item, index) => item.id + index}
      renderItem={renderTaskItem}
      renderSectionHeader={({section: {date}}) => <Title date={date} />}
      style={{height: '80%'}}
    />
  );
};

export default ListOfTasks;

const styles = StyleSheet.create({
  dateContainer: {
    marginTop: 12,
    marginLeft: 12,
  },
  date: {
    color: '#3d3d6a',
    fontSize: 20,
  },
});
