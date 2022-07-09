import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import createDiff from './createDiff.js';
import formatBase from './formatters/index.js';

const getFileFormat = (filename) => path.extname(filename).slice(1);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');

const getParsedData = (filePath) => parsers(getFileFormat(filePath), readFile(filePath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const parseData1 = getParsedData(filepath1);
  const parseData2 = getParsedData(filepath2);
  const result = createDiff(parseData1, parseData2);
  return formatBase(result, format);
};

export default genDiff;
