import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {Calendar} from 'react-native-calendars';
import Colors from '../utils/Colors';

const CustomizedCalendar = () => {
  const today = new Date();
  return (
    <Calendar
      // initialDate={today}
      theme={{
        // calendarBackground: Colors.theme,
        // textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: 'red',
        todayBackgroundColor: '#b6c1cd',
      }}
    />
  );
};

export default CustomizedCalendar;
