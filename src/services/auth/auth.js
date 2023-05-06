import axios from 'axios';
import {API_URL} from '../../utils/server/URL';

const authenticate = async (mode, email, password) => {
  const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_URL}`;
  const response = await axios.post(url, {
    email,
    password,
    returnSecureToken: true,
  });
  const token = response.data.idToken;
  return token;
};

const createUser = async (email, password) => {
  console.log(email, password);
  return await authenticate('signUp', email, password);
};

const login = async (email, password) => {
  return await authenticate('signInWithPassword', email, password);
};

export {createUser, login};
