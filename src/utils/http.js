import axios from 'axios';

import {DATA} from './data';

const storeTask = async () => {
  const response = await axios.post(
    'https://to-do-app-11762-default-rtdb.asia-southeast1.firebasedatabase.app',
    DATA,
  );

  const id = response.data.id;
  return id;
};

export {storeTask};
