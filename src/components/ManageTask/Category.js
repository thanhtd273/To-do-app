import {Icon} from '@rneui/themed';
import React, {useState} from 'react';
import {View, StyleSheet, Text, Pressable, FlatList} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import Colors from '../../utils/Colors';

import {SUBJECTS} from '../../utils/data';
import {changeSubject} from '../redux/subject';

const Category = ({onPress}) => {
  const [subjectState, setSubjectState] = useState('');
  const subject = useSelector(state => state.subject);
  const dispatch = useDispatch();
  const handleChoosingCategory = subject => {
    setSubjectState(subject);
    dispatch(changeSubject({subject: subject}));
  };

  const renderItem = ({item}) => {
    return (
      <Pressable
        style={[
          styles.subjectContainer,
          subjectState === item.subject && {backgroundColor: Colors.bluePurple},
        ]}
        onPress={() => handleChoosingCategory(item.subject)}>
        <View style={styles.subjectItem}>
          <Icon name={item.icon} size={20} color={item.iconColor} />
          <Text style={styles.subjectText}>{item.subject}</Text>
        </View>
      </Pressable>
    );
  };

  return (
    <View style={styles.categoryContainer}>
      <Text style={styles.title}>Choose category</Text>
      <FlatList
        contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}
        data={SUBJECTS}
        renderItem={renderItem}
        horizontal={true}
      />
    </View>
  );
};

export default Category;

const styles = StyleSheet.create({
  categoryContainer: {
    flex: 0.2,
    marginVertical: 12,
    paddingBottom: 12,
    borderBottomColor: Colors.textTheme,
    borderBottomWidth: 1,
  },
  title: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
  subjectContainer: {
    height: 48,
    width: 72,
    marginRight: 8,
    borderRadius: 6,
  },
  subjectItem: {
    width: '100%',
    height: '100%',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  },
  subjectText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '400',
  },
});
