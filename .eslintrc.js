const IGNORE = 0;
module.exports = {
  // Inherit from our package
  extends: 'eslint-config-twolfson',
  rules: {
    'comma-dangle': IGNORE,
  },

  // Configure our environment
  // http://eslint.org/docs/user-guide/configuring#specifying-environments
  parserOptions: {
    ecmaVersion: 8
  },
  env: {
    mocha: true,
    node: true,
  }
};
