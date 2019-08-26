import classNames from 'classnames';

/**
 * Utility method wrap around classeNames to prefix the return class names
 * @param {string} cssPrefix
 * @returns {Function}
 */
const prefixClassNames = (cssPrefix) => (...args) => {
  const prefix = (str) => `${cssPrefix}${str}`;

  const prefixArgs = args.map(arg => {
    if (!arg && arg !== '') {
      return false;
    }

    if (typeof arg === 'object') {
      return Array.isArray(arg) ?
        arg.map(prefix) :
        Object.entries(arg).reduce(
          (accumulator, [key, value]) => (
            Object.assign({}, accumulator, { [prefix(key)]: value })
          ),
          {}
        );
    }

    return prefix(arg);
  });

  return classNames(...prefixArgs);
};

export default prefixClassNames;
