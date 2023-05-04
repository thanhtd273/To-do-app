import React, {useEffect, useState} from 'react';
import {ScrollView, StyleSheet} from 'react-native';

import Colors from '../utils/Colors';
import SubjectItem from './UI/SubjectItem';
import {getCategories} from '../utils/functions/communicateDatabase';

const CATEGORIES = [
  {
    name: 'Work',
    icon: 'monitor',
    color: '#34fc7a',
  },
  {
    name: 'Study',
    icon: 'school',
    color: '#fcaa46',
  },
  {
    name: 'Sport',
    icon: 'sports-football',
    color: '#6e83de',
  },
  {
    name: 'Friend',
    icon: 'people',
    color: '#cc9299',
  },
  {
    name: 'Others',
    icon: 'dynamic-feed',
    color: '#b9c3cb',
  },
];

const SubjectBar = ({
  isAll = false,
  focusedCategory = 'All',
  onPress,
  containerStyle,
}) => {
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    getCategories().then(response => {
      setCategories(response.reverse());
    });
  }, []);
  // console.log(focusedCategory);
  return (
    <ScrollView
      contentContainerStyle={[styles.container, containerStyle]}
      horizontal={true}>
      {isAll && (
        <SubjectItem
          subject={{name: 'All', icon: '', color: ''}}
          onPress={() => {
            onPress('All');
          }}
          style={
            focusedCategory === 'All' && {
              backgroundColor: Colors.bluePurple,
            }
          }
        />
      )}
      {categories.map((item, i) => (
        <SubjectItem
          key={i}
          subject={item}
          onPress={() => {
            onPress(item.name);
          }}
          style={
            focusedCategory === item.name && {
              backgroundColor: Colors.bluePurple,
            }
          }
        />
      ))}
    </ScrollView>
  );
};

export default SubjectBar;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginHorizontal: 8,
  },
});
