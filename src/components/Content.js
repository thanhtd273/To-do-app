import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {SectionList} from 'react-native';
import {
  FlatList,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import Colors from '../utils/Colors';
import TaskContentItem from './UI/TaskContentItem';

const Content = ({argument}) => {
  const navigation = useNavigation();
  const calculateDateLeft = (date1, date2) =>
    Math.round((date2 - date1) / (1000 * 60 * 60 * 24));

  const sortedData = [];

  if (Array.isArray(argument)) {
    for (let item of argument) {
      item.tasks.forEach(task => {
        const dateLeft = calculateDateLeft(new Date(), task.deadline);
        const haveSameDateLeft = sortedData.find(
          element => element.left === dateLeft,
        );
        if (haveSameDateLeft || haveSameDateLeft === 0) {
          haveSameDateLeft.data.push({
            id: task.id,
            title: task.title,
            isCompleted: task.isCompleted,
            subject: item.subject,
            icon: item.icon,
            iconColor: item.iconColor,
            deadline: task.deadline,
          });
        } else {
          sortedData.push({
            left: dateLeft,
            deadline: task.deadline,
            data: [
              {
                id: task.id,
                deadline: task.deadline,
                iconColor: item.iconColor,
                subject: item.subject,
                icon: item.icon,
                title: task.title,
                isCompleted: task.isCompleted,
              },
            ],
          });
        }
      });
    }
  } else {
    argument.tasks.forEach(task => {
      const dateLeft = calculateDateLeft(new Date(), task.deadline);
      const haveSameDateLeft = sortedData.find(item => item.left === dateLeft);
      if (haveSameDateLeft || haveSameDateLeft === 0)
        haveSameDateLeft.data.push({
          id: task.id,
          title: task.title,
          isCompleted: task.isCompleted,
          subject: argument.subject,
          icon: argument.icon,
          iconColor: argument.iconColor,
          deadline: task.deadline,
        });
      else {
        sortedData.push({
          left: dateLeft,
          deadline: task.deadline,
          data: [
            {
              id: task.id,
              deadline: task.deadline,
              subject: argument.subject,
              icon: argument.icon,
              iconColor: argument.iconColor,
              title: task.title,
              isCompleted: task.isCompleted,
            },
          ],
        });
      }
    });
  }
  for (let i = 0; i < sortedData.length - 1; i++) {
    for (let j = i + 1; j < sortedData.length; j++) {
      if (sortedData[j - 1].left > sortedData[j].left)
        [sortedData[j - 1], sortedData[j]] = [sortedData[j], sortedData[j - 1]];
    }
  }

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
      navigation.navigate('ManageTask', {
        id: item.id,
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
        sections={sortedData}
        keyExtractor={(item, index) => index}
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
