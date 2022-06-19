import fs from 'fs';
import path from 'path';
import parsers from './parsers.js';
import build from './build.js';
import formatBase from './formatters/index.js';

const extractPath = (filePath) => {
  const format = path.extname(filePath);
  const obj = fs.readFileSync(path.resolve(process.cwd(), filePath.trim()), 'utf-8');
  return parsers(format, obj);
};

const genDiff = (filepath1, filepath2, format = 'stylish') => {
  const absoluteFile1 = extractPath(filepath1);
  const absoluteFile2 = extractPath(filepath2);
  const buildTree = build(absoluteFile1, absoluteFile2);
  const getAnswer = formatBase(buildTree, format);
  return getAnswer;
};

export default genDiff;
