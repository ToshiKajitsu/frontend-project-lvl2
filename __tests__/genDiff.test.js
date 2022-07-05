import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(filename, 'utf-8');
const stylishResult = readFile(getFixturePath('diffStylish.txt'));
const plainResult = readFile(getFixturePath('diffPlain.txt'));
const jsonResult = readFile(getFixturePath('diffJson.txt'));

const extensions = ['yml', 'yaml', 'json'];

test.each(extensions)('Compare files plain format', (extension) => {
  const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const afterFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
  expect(genDiff(beforeFullPath, afterFullPath, 'plain')).toEqual(plainResult);
});

test.each(extensions)('Compare files json format', (extension) => {
  const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const afterFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
  expect(genDiff(beforeFullPath, afterFullPath, 'json')).toEqual(jsonResult);
});

test.each(extensions)('Compare files stylish format', (extension) => {
  const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const afterFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
  expect(genDiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(stylishResult);
});

test.each(extensions)('Compare files default', (extension) => {
  const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
  const afterFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
  expect(genDiff(beforeFullPath, afterFullPath)).toEqual(stylishResult);
});
