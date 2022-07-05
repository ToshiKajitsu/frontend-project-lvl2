import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import createDiff from './createDiff.js';
import formatBase from './formatters/index.js';

const getFileFormat = (absPath) => path.extname(absPath).slice(1);
const readFile = (mainPath) => fs.readFileSync(mainPath, 'utf-8');

const getData = (filePath) => parsers(getFileFormat(filePath), readFile(filePath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absoluteFile1 = getData(filepath1);
  const absoluteFile2 = getData(filepath2);
  const result = createDiff(absoluteFile1, absoluteFile2);
  return formatBase(result, format);
};

export default genDiff;
