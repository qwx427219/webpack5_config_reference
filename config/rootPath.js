const { resolve } = require("path");

module.exports = (path) => {
  const root = process.cwd();

  return resolve(root, path);
};
