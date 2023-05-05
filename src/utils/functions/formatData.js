const formatType = value => {
  if (Array.isArray(value)) {
    const result = value.map(item => {
      return formatTypeField(item);
    });
    return {
      arrayValue: {values: result},
    };
  } else if (Number.isInteger(value)) return {integerValue: value};
  else if (Number.isFinite(value)) return {doubleValue: value};
  else if (Date.parse(value)) return {timestampValue: value};
  return {[`${typeof value}Value`]: value};
};

const formatUserToUsable = user => {
  const name = user.name.stringValue;
  const birthday = user.birthday.timestampValue;
  const email = user.email.stringValue;
  return {name, birthday, email};
};
const formatUserToFirbaseForm = user => {
  return {
    fields: {
      name: formatType(user.name),
      birthday: formatType(user.birthday),
      email: formatType(user.email),
    },
  };
};

const formatCategoryToUsable = category => {
  const name = category.name.stringValue;
  const icon = category.icon.stringValue;
  const color = category.color.stringValue;
  return {name, icon, color};
};
const formatCategoryToFirebaseForm = category => {
  return {
    fields: {
      name: formatType(category.name),
      icon: formatType(category.icon),
      color: formatType(category.color),
    },
  };
};

const formatTaskToUsable = task => {
  const category = task.category.stringValue;
  const deadline = task.deadline.timestampValue;
  const reminder = task.reminder.timestampValue;
  const status = task.status.stringValue;
  const title = task.title.stringValue;

  return {category, deadline, reminder, status, title};
};
const formatTaskToFirebaseForm = task => {
  return {
    fields: {
      category: formatType(task.category),
      deadline: formatType(task.deadline),
      reminder: formatType(task.reminder),
      status: formatType(task.status),
      title: formatType(task.title),
    },
  };
};

export {
  formatUserToUsable,
  formatUserToFirbaseForm,
  formatType,
  formatCategoryToUsable,
  formatCategoryToFirebaseForm,
  formatTaskToUsable,
  formatTaskToFirebaseForm,
};
