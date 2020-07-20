const tasks = (a) => a.join(' && ');

module.exports = {
  'hooks': {
    'pre-commit': tasks([
      'yarn run lint',
      'yarn run test',
      'yarn run build',
    ]),
    'pre-push': tasks([
      'yarn run lint',
      'yarn run test',
      'yarn run build',
    ]),
  },
};
