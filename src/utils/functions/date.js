export const formateDate = value => {
  const date = new Date(value);
  const formated = date?.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
  if (calculateDayLeft(date) === 0) return formated && `Today, ${formated}`;
  else if (calculateDayLeft(date) === 1) return `Tommorow, ${formated}`;
  return `${calculateDayLeft(date)} days left, ${formated}`;
};

export const calculateDayLeft = value => {
  const date = new Date(value);
  const today = new Date();
  return Math.floor((date - today) / (24 * 60 * 60 * 1000));
};

export const sortTasksByDayLeft = tasks => {
  let target = [...tasks];
  let i, key, j;
  for (i = 0; i < target.length; i++) {
    key = target[i];
    j = i - 1;
    while (
      j >= 0 &&
      calculateDayLeft(target[j].data.deadline) >
        calculateDayLeft(key.data.deadline)
    ) {
      target[j + 1] = target[j];
      j = j - 1;
    }
    target[j + 1] = key;
  }
  const result = [];
  target.forEach(item => {
    const index = result.findIndex(
      element =>
        calculateDayLeft(element.date) === calculateDayLeft(item.data.deadline),
    );
    if (index === -1) {
      const date = item.data.deadline.substring(
        0,
        item.data.deadline.indexOf('T'),
      );
      result.push({date, data: [item]});
    } else {
      result[index].data.push(item);
    }
  });

  return result;
};
