import _ from 'lodash';

const indent = (depth, spaceChar = ' ', spaceCount = 4) => spaceChar.repeat(spaceCount * depth - 2);
const stringify = (data, treeDepth) => {
  if (!_.isObject(data) || data === null) {
    return `${data}`;
  }
  const lines = Object
    .entries(data)
    .map(([key, value]) => `${indent(treeDepth + 1)}  ${key}: ${stringify(value, treeDepth + 1)}`);
  return ['{', ...lines, `${indent(treeDepth)}  }`].join('\n');
};
const stylish = (innerTree) => {
  const iter = (tree, depth) => tree.map((node) => {
    const getValue = (value, sign) => `${indent(depth)}${sign} ${node.key}: ${stringify(value, depth)}\n`;
    switch (node.type) {
      case 'add':
        return getValue(node.val, '+');
      case 'remove':
        return getValue(node.val, '-');
      case 'same':
        return getValue(node.val, ' ');
      case 'updated':
        return `${getValue(node.val1, '-')}${getValue(node.val2, '+')}`;
      case 'recursion':
        return `${indent(depth)}  ${node.key}: {\n${iter(node.children, depth + 1).join('')}${indent(depth)}  }\n`;
      default:
        throw new Error(`This type does not exist: ${node.type}`);
    }
  });
  return `{\n${iter(innerTree, 1).join('')}}`;
};

export default stylish;
