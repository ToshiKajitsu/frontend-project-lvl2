import _ from 'lodash';

const build = (file1, file2) => {
  const keys = _.union(_.keys(file1), _.keys(file2));
  const sortedKeys = _.sortBy(keys);
  return sortedKeys.map((key) => {
    const value1 = file1[key];
    const value2 = file2[key];
    if (!_.has(file1, key)) {
      return { type: 'add', key, val: value2 };
    }
    if (!_.has(file2, key)) {
      return { type: 'remove', key, val: value1 };
    }
    if (_.isPlainObject(value1) && _.isPlainObject(value2)) {
      return { type: 'recursion', key, children: build(value1, value2) };
    }
    if (!_.isEqual(value1, value2)) {
      return {
        type: 'updated', key, val1: value1, val2: value2,
      };
    }
    return { type: 'same', key, val: value1 };
  });
};

export default build;
