import React from 'react';
import {View, Text, StyleSheet} from 'react-native';

import CustomizedImage from '../UI/CustomizedImage';

const Attachment = () => {
  return (
    <View style={styles.attachmentContainer}>
      <Text style={styles.text}>Add attachment</Text>
      <View style={styles.imageContainer}>
        <CustomizedImage
          src={require('../../utils/images/attachment.png')}
          style={{
            borderWidth: 2,
            borderRadius: 24,
            borderColor: '#fff',
          }}
        />
        <CustomizedImage src={require('../../utils/images/laboratory.jpg')} />
        <CustomizedImage src={require('../../utils/images/holy_bible.jpg')} />
        <CustomizedImage
          src={require('../../utils/images/abstract_background.jpg')}
        />
      </View>
    </View>
  );
};

export default Attachment;

const styles = StyleSheet.create({
  attachmentContainer: {
    flex: 0.2,
    borderBottomWidth: 1,
    borderBottomColor: Colors.textTheme,
  },
  imageContainer: {
    padding: 12,
    flexDirection: 'row',
  },
  text: {
    color: Colors.textTheme,
    fontSize: 20,
    fontWeight: '500',
  },
});
