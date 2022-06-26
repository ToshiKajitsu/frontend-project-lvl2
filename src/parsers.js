import yaml from 'js-yaml';

export default (format, data) => {
  const gettFormat = format.split('.')[1];
  switch (gettFormat) {
    case 'json':
      return JSON.parse(data);
    case 'yml':
      return yaml.load(data);
    case 'yaml':
      return yaml.load(data);
    default:
      throw new Error(`This format is not supported: ${format}`);
  }
};
