import React, {useState} from 'react';
import {Button, StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';

const CustomizedCalendar = ({onPress}) => {
  const [selectedDate, setSelectedDate] = useState(new Date().toDateString());
  return (
    <View
      style={{
        alignSelf: 'center',
      }}>
      <Calendar
        disabledByDefault={false}
        style={{
          position: 'relative',
          width: 350,
          height: 350,
          borderRadius: 16,
        }}
        onDayPress={day => {
          onPress();
          setSelectedDate(day.dateString);
        }}
        markingType="custom"
        markedDates={{
          [selectedDate]: {
            customStyles: {
              container: {
                backgroundColor: '#c86315',
              },
            },
          },
        }}
        theme={{
          calendarBackground: '#343456',
          dayTextColor: '#fff',
          textDisabledColor: '#4f4f91',
          selectedDayBackgroundColor: '#00adf5',
          selectedDayTextColor: '#ffffff',
        }}
        renderHeader={date => {
          return (
            <Text style={{color: '#fff'}}>
              {new Date(selectedDate).toDateString()}
            </Text>
          );
        }}
      />
    </View>
  );
};

export default CustomizedCalendar;
