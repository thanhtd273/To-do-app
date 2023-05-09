import axios from 'axios';
import {databaseURL} from '../server/URL';
import {
  formatCategoryToUsable,
  formatTaskToFirebaseForm,
  formatTaskToUsable,
  formatUserToFirbaseForm,
  formatUserToUsable,
} from './formatData';

const queryStructure = ({collectionId, operator, queryBy, value}) => {
  return {
    structuredQuery: {
      from: [
        {
          collectionId: collectionId,
        },
      ],
      where: {
        fieldFilter: {
          field: {
            fieldPath: queryBy,
          },
          op: operator,
          value: {
            stringValue: value,
          },
        },
      },
    },
  };
};

const createNewUser = async ({email, name, token}) => {
  try {
    const response = await axios.post(
      `${databaseURL}/users`,
      formatUserToFirbaseForm({email, name}),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return response.data;
  } catch (error) {
    console.log('Error from createNewUser');
  }
};
const getUserByEmail = async (email, token) => {
  try {
    const response = await axios.post(
      `${databaseURL}:runQuery`,
      queryStructure({
        collectionId: 'users',
        queryBy: 'email',
        operator: 'EQUAL',
        value: email,
      }),

      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const id = response.data[0].document.name.split('/')[6];

    return {
      id,
      data: formatUserToUsable(response.data[0].document.fields),
    };
  } catch (error) {
    console.log('Error from getUserByEmail: ', error);
  }
};
const getCategories = async token => {
  try {
    const response = await axios.get(`${databaseURL}/categories`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data.documents.map(item => {
      return formatCategoryToUsable(item.fields);
    });
  } catch (error) {
    console.log('Error from getCategories');
  }
};
const getCategory = async (category, token) => {
  try {
    const response = await axios.post(
      `${databaseURL}:runQuery`,
      queryStructure({
        collectionId: 'categories',
        operator: 'EQUAL',
        queryBy: 'name',
        value: category,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    return formatCategoryToUsable(response.data[0].document.fields);
  } catch (error) {
    console.log('error from getCategory');
  }
};

const getTasks = async (userID, token) => {
  const response = await axios.get(`${databaseURL}/users/${userID}/tasks`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  try {
    if (Object.keys(response.data).length) {
      const result = await Promise.all(
        response.data.documents.map(async item => {
          const id = item.name.split('/')[8];

          const category = item.fields.category.stringValue;
          const {icon, color} = await getCategory(category, token);
          return {
            id,
            data: {...formatTaskToUsable(item.fields), icon, color},
          };
        }),
      );

      return result;
    }
  } catch (error) {
    console.log('Error from here: ', error);
  }
};
const getTasksByCategory = async (category, userID, token) => {
  try {
    const response = await axios.post(
      `${databaseURL}/users/${userID}:runQuery`,
      queryStructure({
        collectionId: 'tasks',
        queryBy: 'category',
        operator: 'EQUAL',
        value: category,
      }),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    if (Object.keys(response.data).length) {
      const result = await Promise.all(
        response.data.map(async item => {
          const id = item.document.name.split('/')[8];
          const {icon, color} = await getCategory(category, token);
          return {
            id,
            data: {...formatTaskToUsable(item.document.fields), icon, color},
          };
        }),
      );
      return result;
    }
  } catch (error) {
    console.log('error from getTasksByCategory');
  }
  return [];
};
const updateTaskToBackend = ({userID, id, data, token}) => {
  axios
    .patch(
      `${databaseURL}/users/${userID}/tasks/${id}`,
      formatTaskToFirebaseForm(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    )
    .catch(err => console.log('Error from updateTaskToBackend'));
};

const createNewTaskToBackend = async ({userID, data, token}) => {
  try {
    const response = await axios.post(
      `${databaseURL}/users/${userID}/tasks`,
      formatTaskToFirebaseForm(data),
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    const id = response.data.name.split('/')[8];
    return id;
  } catch (error) {
    console.log('Error from createNewTaskToBackend');
  }
};
const deleteTaskToBackend = ({userID, id, token}) => {
  console.log(userID, id);
  axios.delete(`${databaseURL}/users/${userID}/tasks/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};

export {
  createNewUser,
  getUserByEmail,
  getCategories,
  getTasks,
  getCategory,
  getTasksByCategory,
  updateTaskToBackend,
  createNewTaskToBackend,
  deleteTaskToBackend,
};
