import _ from 'lodash';

const operators = { minus: '-', plus: '+' };

export default (file1, file2) => {
  const keys = Object.keys({ ...file1, ...file2 });
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return `${operators.plus} ${key}: ${value2}`;
    }
    if (!_.has(file2, key)) {
      return `${operators.minus} ${key}: ${value1}\n`;
    }
    if (!_.isEqual(value1, value2)) {
      return `${operators.minus} ${key}: ${value1}\n${operators.plus} ${key}: ${value2}\n`;
    }
    return `${key}: ${value1}\n`;
  });
};
