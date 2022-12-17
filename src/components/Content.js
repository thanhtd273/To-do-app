import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {SectionList} from 'react-native';
import {StyleSheet, Text, View} from 'react-native';

import Colors from '../utils/Colors';
import TaskContentItem from './UI/TaskContentItem';

const Content = ({data}) => {
  const navigation = useNavigation();
  const calculateDateLeft = (date1, date2) => {
    const result = Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
    if (result === -0) return 0;
    return result;
  };
  let handledData = [];
  if (Array.isArray(data)) {
    for (const item of data) {
      item?.tasks.forEach(task => {
        const dateLeft = calculateDateLeft(new Date(), new Date(task.deadline));
        const haveSameDateLeft = handledData.find(
          element => element.left === dateLeft,
        );
        const itemData = {
          subjectId: item.id,
          id: task.id,
          title: task.title,
          isCompleted: task.isCompleted,
          subject: item.subject,
          icon: item.icon,
          iconColor: item.iconColor,
          deadline: new Date(task.deadline),
          reminder: new Date(task.reminder),
        };
        if (haveSameDateLeft || haveSameDateLeft === 0) {
          haveSameDateLeft.data.push(itemData);
        } else {
          handledData.push({
            left: dateLeft,
            deadline: new Date(task.deadline),
            data: [itemData],
          });
        }
      });
    }
  } else {
    data.tasks.forEach(task => {
      const dateLeft = calculateDateLeft(new Date(), new Date(task.deadline));
      const haveSameDateLeft = handledData.find(item => item.left === dateLeft);
      const itemData = {
        subjectId: data.id,
        id: task.id,
        title: task.title,
        isCompleted: task.isCompleted,
        subject: data.subject,
        icon: data.icon,
        iconColor: data.iconColor,
        deadline: new Date(task.deadline),
        reminder: task.reminder,
      };
      if (haveSameDateLeft || haveSameDateLeft === 0)
        haveSameDateLeft.data.push(itemData);
      else {
        handledData.push({
          left: dateLeft,
          deadline: new Date(task.deadline),
          data: [itemData],
        });
      }
    });
  }

  const insertionSort = arr => {
    let i, key, j;
    for (i = 0; i < arr.length; i++) {
      key = arr[i];
      j = i - 1;
      while (j >= 0 && arr[j].left > key.left) {
        arr[j + 1] = arr[j];
        j = j - 1;
      }
      arr[j + 1] = key;
    }
    return arr;
  };
  handledData = insertionSort(handledData);

  const temp = handledData.filter(item => item.left < 0);
  let numberOfDeletedItems = temp.length;
  while (numberOfDeletedItems > 0) {
    handledData.shift();
    numberOfDeletedItems--;
  }
  handledData.push(...temp.reverse());

  const formateDate = (date, left) => {
    const formated = date?.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (left === 0) return formated && `Today, ${formated}`;
    else if (left === 1) return `Tommorow, ${formated}`;
    return formated;
  };
  const renderTaskItem = ({item}) => {
    const handlePressTaskItem = () => {
      console.log('Item: ', item);
      navigation.navigate('ManageTask', {
        id: item.id,
        subjectId: item.subjectId,
      });
    };

    return (
      <TaskContentItem
        id={item.id}
        title={item.title}
        deadline={item.deadline}
        subject={item.subject}
        subjectIcon={item.icon}
        subjectIconColor={item.iconColor}
        isCompleted={item.isCompleted}
        onPress={handlePressTaskItem}
      />
    );
  };
  const Title = ({deadline, left}) => {
    return (
      <View style={styles.dateContainer}>
        {formateDate(deadline, left) && (
          <Text style={styles.date}>{formateDate(deadline, left)}</Text>
        )}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <SectionList
        sections={handledData}
        keyExtractor={(_, index) => index}
        renderItem={renderTaskItem}
        renderSectionHeader={({section: {deadline, left}}) => (
          <Title deadline={deadline} left={left} />
        )}
      />
    </View>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.7,
    backgroundColor: Colors.theme,
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
