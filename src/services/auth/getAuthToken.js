import AsyncStorage from '@react-native-async-storage/async-storage';

export const getAuthData = async () => {
  const data = await AsyncStorage.getItem('auth');
  return JSON.parse(data);
};

export const storeAuthData = async (token, email, password) => {
  const data = {token, email, password};
  await AsyncStorage.setItem('auth', JSON.stringify(data));
};

export const removeAuthData = async () => {
  await AsyncStorage.removeItem('auth');
};
