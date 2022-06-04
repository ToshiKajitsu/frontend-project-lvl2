import { fileURLToPath } from 'url';
import path, { dirname } from 'path';
import fs from 'fs';
import genDiff from '../src/genDiff.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const tests = [
  ['file1.json', 'file2.json', 'diffJson.txt', 'stylish'],
  ['file1.yaml', 'file2.yaml', 'diffYaml.txt', 'stylish'],
  ['file1.yml', 'file2.yml', 'diffYaml.txt', 'stylish'],
];

describe('diff 2 json files', () => {
  test.each(tests)('Compare files', (file1, file2, resaultFile, format) => {
    const firstFile = getFixturePath(file1);
    const secondFile = getFixturePath(file2);
    const defaultResult = readFile(resaultFile);
    const result = genDiff(firstFile, secondFile, format);
    expect(result).toEqual(defaultResult);
  });
});
