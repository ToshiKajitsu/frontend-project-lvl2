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

describe('Checking for the correct difference', () => {
  test.each(extensions)('Compare files', (extension) => {
    const beforeFullPath = `${process.cwd()}/__fixtures__/file1.${extension}`;
    const afterFullPath = `${process.cwd()}/__fixtures__/file2.${extension}`;
    expect(genDiff(beforeFullPath, afterFullPath, 'stylish')).toEqual(stylishResult);
    expect(genDiff(beforeFullPath, afterFullPath, 'plain')).toEqual(plainResult);
    expect(genDiff(beforeFullPath, afterFullPath, 'json')).toEqual(jsonResult);
    expect(genDiff(beforeFullPath, afterFullPath)).toEqual(stylishResult);
  });
});
