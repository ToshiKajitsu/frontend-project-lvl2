import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parsers from './parsers.js';

const operators = { minus: '-', plus: '+' };

const extractPath = (filePath) => {
  const format = path.extname(filePath);
  const obj = fs.readFileSync(path.resolve(process.cwd(), filePath.trim()), 'utf-8');
  return parsers(format, obj);
};

const genDiff = (filepath1, filepath2) => {
  const absoluteFile1 = extractPath(filepath1);
  const absoluteFile2 = extractPath(filepath2);
  const build = (file1, file2) => {
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
  return `{\n${build(absoluteFile1, absoluteFile2).join('')}\n}`;
};

export default genDiff;
