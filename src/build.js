import _ from 'lodash';

const operators = { minus: '-', plus: '+' };

export default (file1, file2) => {
  const deep = (firstFile, secondFile) => {
    const keys = Object.keys({ ...firstFile, ...secondFile });
    const sortedKeys = _.sortBy(keys);
    const result = sortedKeys.map((key) => {
      const value1 = firstFile[key];
      const value2 = secondFile[key];
      if (!_.has(firstFile, key)) {
        return `${operators.plus} ${key}: ${value2}`;
      }
      if (!_.has(secondFile, key)) {
        return `${operators.minus} ${key}: ${value1}\n`;
      }
      if (!_.isEqual(value1, value2)) {
        return `${operators.minus} ${key}: ${value1}\n${operators.plus} ${key}: ${value2}\n`;
      }
      return `${key}: ${value1}\n`;
    });
    return result;
  };
  return `{\n${deep(file1, file2).join('')}\n}`;
};
