import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import build from './build.js';
import formatBase from './formatters/index.js';

const getAbsPath = (absPath) => path.extname(absPath);
const getMainPath = (mainPath) => fs.readFileSync(mainPath, 'utf-8');

const extractPath = (filePath) => parsers(getAbsPath(filePath), getMainPath(filePath));

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absoluteFile1 = extractPath(filepath1);
  const absoluteFile2 = extractPath(filepath2);
  const buildTree = build(absoluteFile1, absoluteFile2);
  return formatBase(buildTree, format);
};

export default genDiff;
