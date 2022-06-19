import stylish from './stylish.js';
import plain from './plain.js';
import json from './json.js';

export default (build, format) => {
  switch (format) {
    case 'stylish':
      return stylish(build);
    case 'json':
      return json(build);
    case 'plain':
      return plain(build);
    default:
      throw new Error(`Format not supported: ${format}`);
  }
};
