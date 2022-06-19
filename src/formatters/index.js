import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (buildTree, format) => {
  switch (format) {
    case 'stylish':
      return stylish(buildTree);
    case 'json':
      return json(buildTree);
    case 'plain':
      return plain(buildTree);
    default:
      throw new Error(`Format not supported: ${format}`);
  }
};
