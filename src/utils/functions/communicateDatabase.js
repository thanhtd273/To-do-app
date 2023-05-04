import axios from 'axios';
import {databaseURL} from '../server/URL';
import {
  formatCategoryToUsable,
  formatTaskToFirebaseForm,
  formatTaskToUsable,
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

const getCategories = async () => {
  const response = await axios.get(`${databaseURL}/categories`);
  return response.data.documents.map(item => {
    return formatCategoryToUsable(item.fields);
  });
};
const getCategory = async category => {
  const response = await axios.post(
    `${databaseURL}:runQuery`,
    queryStructure({
      collectionId: 'categories',
      operator: 'EQUAL',
      queryBy: 'name',
      value: category,
    }),
  );
  return formatCategoryToUsable(response.data[0].document.fields);
};

const getTasks = async userID => {
  const response = await axios.get(`${databaseURL}/users/${userID}/tasks`);
  const result = await Promise.all(
    response.data.documents.map(async item => {
      const id = item.name.split('/').at(-1);
      const category = item.fields.category.stringValue;
      const {icon, color} = await getCategory(category);
      return {id, data: {...formatTaskToUsable(item.fields), icon, color}};
    }),
  );
  return result;
};
const getTasksByCategory = async (category, userID) => {
  const response = await axios.post(
    `${databaseURL}/users/${userID}:runQuery`,
    queryStructure({
      collectionId: 'tasks',
      queryBy: 'category',
      operator: 'EQUAL',
      value: category,
    }),
  );
  const result = await Promise.all(
    response.data.map(async item => {
      const id = item.document.name.split('/').at(-1);
      const {icon, color} = await getCategory(category);
      return {
        id,
        data: {...formatTaskToUsable(item.document.fields), icon, color},
      };
    }),
  );
  return result;
};
const updateTaskToBackend = ({userID, id, data}) => {
  axios.patch(
    `${databaseURL}/users/${userID}/tasks/${id}`,
    formatTaskToFirebaseForm(data),
  );
};
const createNewTaskToBackend = async ({userID, data}) => {
  const response = await axios.post(
    `${databaseURL}/users/${userID}/tasks`,
    formatTaskToFirebaseForm(data),
  );
  const id = response.data.name.split('/').at(-1);
  return id;
};
const deleteTaskToBackend = ({userID, id}) => {
  axios.delete(`${databaseURL}/users/${userID}/tasks/${id}`);
};

export {
  getCategories,
  getTasks,
  getCategory,
  getTasksByCategory,
  updateTaskToBackend,
  createNewTaskToBackend,
  deleteTaskToBackend,
};
