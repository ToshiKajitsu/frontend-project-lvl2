import { readFileSync } from 'fs';
import _ from 'lodash';
import path from 'path';

 
const operators = { minus: '-', plus: '+' };
 
 
const genDiff = (filepath1, filepath2) => {
    let absoluteFile1 = '';
    let absoluteFile2 = '';
    if (filepath1.split('').includes('/')) {
         absoluteFile1 = path.resolve(filepath1);
         absoluteFile2 = path.resolve(filepath2);
    } else {
         absoluteFile1 = path.resolve('__fixtures__', filepath1);
         absoluteFile2 = path.resolve('__fixtures__', filepath2);
    }
    absoluteFile1 = JSON.parse(readFileSync(absoluteFile1, 'utf8'));
    absoluteFile2 = JSON.parse(readFileSync(absoluteFile2, 'utf8'));
     const build = (absoluteFile1, absoluteFile2) => {
          const keys = Object.keys({ ...absoluteFile1, ...absoluteFile2 });
          const sortedKeys = _.sortBy(keys);
          return sortedKeys.map((key) => {
               const value1 = absoluteFile1[key];
               const value2 = absoluteFile2[key];
               if (!_.has(absoluteFile1, key)) {
                    return `${operators.plus} ${key}: ${value2}`;
               }
               if (!_.has(absoluteFile2, key)) {
                    return `${operators.minus} ${key}: ${value1}\n`;
               }
               if (!_.isEqual(value1, value2)) {
                    return `${operators.minus} ${key}: ${value1} \n${operators.plus} ${key}: ${value2}\n`;
               }
                    return `${key} ${value1}\n`;
          });  
     };
     return `{ \n${build(absoluteFile1, absoluteFile2).join('')}\n}`;

}
 
export default genDiff;