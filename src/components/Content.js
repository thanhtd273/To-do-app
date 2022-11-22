import React from 'react';
import {ScrollView, StyleSheet, Text, View} from 'react-native';
import Colors from '../utils/Colors';
import TaskContentItem from './UI/TaskContentItem';

const Content = ({data}) => {
  const calculateDateLeft = (date1, date2) =>
    Math.round((date2 - date1) / (1000 * 60 * 60 * 24));
  const sortedData = [
    // {
    //   icon: '',
    //   iconColor: '',
    //   left: 0,
    //   tasks: [],
    // },
  ];
  if (Array.isArray(data)) {
    for (let item of data) {
      item.tasks.forEach(task => {
        const dateLeft = calculateDateLeft(new Date(), task.deadline);
        const haveSameDateLeft = sortedData.find(
          element => element.left === dateLeft,
        );
        if (haveSameDateLeft || haveSameDateLeft === 0) {
          haveSameDateLeft.tasks.push({
            title: task.title,
            isCompleted: task.isCompleted,
            icon: item.icon,
            iconColor: item.iconColor,
            // deadline: task.deadline,
          });
        } else {
          sortedData.push({
            left: dateLeft,
            deadline: task.deadline,
            tasks: [
              {
                // deadline: task.deadline,
                iconColor: item.iconColor,
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
    data.tasks.forEach(task => {
      const dateLeft = calculateDateLeft(new Date(), task.deadline);
      const haveSameDateLeft = sortedData.find(item => item.left === dateLeft);
      if (haveSameDateLeft || haveSameDateLeft === 0)
        haveSameDateLeft.tasks.push({
          title: task.title,
          isCompleted: task.isCompleted,
          icon: data.icon,
          iconColor: data.iconColor,
          // deadline: task.deadline,
        });
      else {
        sortedData.push({
          left: dateLeft,
          deadline: task.deadline,
          tasks: [
            {
              // deadline: task.deadline,
              icon: data.icon,
              iconColor: data.iconColor,
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
      // weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
    if (left === 0) return formated && `Today, ${formated}`;
    else if (left === 1) return `Tommorow, ${formated}`;
    return formated;
  };
  console.log(sortedData);
  return (
    <ScrollView style={styles.container}>
      {sortedData.map((item, index) => (
        <View key={index}>
          <View style={styles.dateContainer}>
            {formateDate(item.deadline, item.left) && (
              <Text style={styles.date}>
                {formateDate(item.deadline, item.left)}
              </Text>
            )}
          </View>
          <View>
            {item.tasks.map((task, index) => (
              <TaskContentItem
                key={index}
                title={task.title}
                deadline={item.deadline}
                subject={item.subject}
                subjectIcon={task.icon}
                subjectIconColor={task.iconColor}
              />
            ))}
          </View>
        </View>
      ))}
    </ScrollView>
  );
};

export default Content;

const styles = StyleSheet.create({
  container: {
    flex: 0.6,
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
