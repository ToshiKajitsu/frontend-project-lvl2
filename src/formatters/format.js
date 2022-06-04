import stylish from './stylish.js';

export default (build, format) => {
  switch (format) {
    case 'stylish':
      return stylish(build);
    case 'json':
      return JSON.stringify(build);
    default:
      throw new Error(`Format not supported: ${format}`);
  }
};
