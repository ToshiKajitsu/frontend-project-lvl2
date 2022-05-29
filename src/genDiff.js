import fs from 'fs';
// import _ from 'lodash';
import path from 'path';
import parsers from './parsers.js';
import build from './build.js';

const extractPath = (filePath) => {
  const format = path.extname(filePath);
  const obj = fs.readFileSync(path.resolve(process.cwd(), filePath.trim()), 'utf-8');
  return parsers(format, obj);
};

const genDiff = (filepath1, filepath2) => {
  const absoluteFile1 = extractPath(filepath1);
  const absoluteFile2 = extractPath(filepath2);
  return `{\n${build(absoluteFile1, absoluteFile2).join('')}\n}`;
};

export default genDiff;
